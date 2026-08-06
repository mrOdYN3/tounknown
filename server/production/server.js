// toUnknown API — gated audio + Stripe membership.
// No npm dependencies. Env: SUPABASE_URL, SUPABASE_SECRET_KEY, SUPABASE_PUBLISHABLE_KEY, PORT,
// STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_STUDENT_MONTHLY, STRIPE_PRICE_STUDENT_YEARLY,
// STRIPE_PRICE_SADHAKA_MONTHLY, STRIPE_PRICE_FOUNDING_ONCE, SITE_URL.
const http = require("http");
const crypto = require("crypto");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SECRET = process.env.SUPABASE_SECRET_KEY;
const PUB = process.env.SUPABASE_PUBLISHABLE_KEY;
const PORT = process.env.PORT || 3001;
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_WH = process.env.STRIPE_WEBHOOK_SECRET || "";
const SITE = process.env.SITE_URL || "http://72.60.170.97";
// 20 days is roughly every-other-day-plus; 30 is a month of daily sitting. Someone who sits
// every day pays nothing — which is the point.
const TIERS = [
  { days: 20, pct: 25 },
  { days: 25, pct: 50 },
  { days: 30, pct: 100 },
];
function discountFor(days) {
  let pct = 0;
  for (const t of TIERS) if (days >= t.days) pct = t.pct;
  return pct;
}
function nextTier(days) {
  return TIERS.find((t) => days < t.days) || null;
}

const PRICES = {
  "student-monthly": { id: process.env.STRIPE_PRICE_STUDENT_MONTHLY, mode: "subscription", tier: "student" },
  "student-yearly": { id: process.env.STRIPE_PRICE_STUDENT_YEARLY, mode: "subscription", tier: "student" },
  "sadhaka-monthly": { id: process.env.STRIPE_PRICE_SADHAKA_MONTHLY, mode: "subscription", tier: "sadhaka" },
  "founding-once": { id: process.env.STRIPE_PRICE_FOUNDING_ONCE, mode: "payment", tier: "founding" },
};

async function sbFetch(path, opts = {}) {
  const r = await fetch(SUPABASE_URL + path, {
    ...opts,
    headers: {
      apikey: SECRET, Authorization: "Bearer " + SECRET,
      "Content-Type": "application/json", ...(opts.headers || {}),
    },
  });
  return r;
}
async function sb(path) {
  const r = await sbFetch(path);
  return r.ok ? r.json() : null;
}
async function getUser(jwt) {
  const r = await fetch(SUPABASE_URL + "/auth/v1/user", {
    headers: { apikey: PUB, Authorization: "Bearer " + jwt },
  });
  if (!r.ok) return null;
  const u = await r.json();
  return u && u.id ? u : null;
}
async function stripe(path, params) {
  const r = await fetch("https://api.stripe.com/v1/" + path, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + STRIPE_KEY,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params).toString(),
  });
  const j = await r.json();
  if (!r.ok) throw new Error("stripe: " + (j.error && j.error.message));
  return j;
}
function send(res, code, obj) {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
}
function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
  });
}
function verifyStripeSig(raw, header) {
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=")));
  const signed = parts.t + "." + raw;
  const expect = crypto.createHmac("sha256", STRIPE_WH).update(signed).digest("hex");
  const given = Buffer.from(parts.v1 || "", "hex");
  return given.length === 32 && crypto.timingSafeEqual(Buffer.from(expect, "hex"), given) &&
    Math.abs(Date.now() / 1000 - Number(parts.t)) < 600;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://x");

    if (url.pathname === "/api/health") return send(res, 200, { ok: true, stripe: !!STRIPE_KEY });

    // ---- gated audio ----
    const m = url.pathname.match(/^\/api\/audio\/(.+)$/);
    if (m) {
      const trackId = decodeURIComponent(m[1]);
      const rows = await sb("/rest/v1/tracks?id=eq." + encodeURIComponent(trackId) +
        "&select=id,audio_path,course_id,free_preview,courses(free)");
      const track = rows && rows[0];
      if (!track) return send(res, 404, { error: "unknown track" });
      // free when the whole course is free, or when this is part of the course's opening
      const isFree = (track.courses && track.courses.free === true) || track.free_preview === true;
      const jwt = (req.headers.authorization || "").replace(/^Bearer /, "") ||
        url.searchParams.get("token") || "";
      const signedIn = jwt ? await getUser(jwt) : null;
      let userId = signedIn && signedIn.id;
      if (!isFree) {
        const user = signedIn;
        if (!user) return send(res, 401, { error: "sign in to sit this track" });
        // membership gate: free courses are open, everything else needs an active member
        const rows2 = await sb("/rest/v1/members?select=tier,active_until&id=eq." + user.id);
        const m = rows2 && rows2[0];
        const activeUntil = m && m.active_until ? new Date(m.active_until) : null;
        if (!activeUntil || activeUntil <= new Date()) {
          return send(res, 402, { error: "this course opens with membership" });
        }
      }
      // remember when this member started the track — the unlock check reads it back
      if (userId) {
        sbFetch("/rest/v1/listen_sessions?on_conflict=member_id,track_id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates" },
          body: JSON.stringify({ member_id: userId, track_id: trackId, started_at: new Date().toISOString() }),
        }).catch(() => {});
      }

      const internal = "/protected-audio/" +
        track.audio_path.split("/").map(encodeURIComponent).join("/");
      res.writeHead(200, {
        "X-Accel-Redirect": internal,
        "Content-Type": "audio/mpeg",
        "Cache-Control": "private, no-store",
      });
      return res.end();
    }

    // ---- unlock: granted by elapsed practice, never by a click ----
    if (url.pathname === "/api/unlock" && req.method === "POST") {
      const jwt = (req.headers.authorization || "").replace(/^Bearer /, "");
      const user = jwt ? await getUser(jwt) : null;
      if (!user) return send(res, 401, { error: "sign in first" });
      const body = JSON.parse((await readBody(req)).toString() || "{}");
      const trackId = String(body.track_id || "");
      if (!trackId) return send(res, 400, { error: "track_id required" });

      const tRows = await sb("/rest/v1/tracks?id=eq." + encodeURIComponent(trackId) + "&select=id,seconds");
      const track = tRows && tRows[0];
      if (!track) return send(res, 404, { error: "unknown track" });

      const sRows = await sb("/rest/v1/listen_sessions?select=started_at&member_id=eq." + user.id +
        "&track_id=eq." + encodeURIComponent(trackId));
      const started = sRows && sRows[0] && Date.parse(sRows[0].started_at);
      if (!started) return send(res, 409, { error: "start the sitting first" });

      const elapsed = (Date.now() - started) / 1000;
      const needed = Math.max(30, (track.seconds || 0) * 0.8);
      if (elapsed < needed) {
        return send(res, 425, { error: "still sitting", remaining: Math.ceil(needed - elapsed) });
      }

      await sbFetch("/rest/v1/unlocks?on_conflict=member_id,track_id", {
        method: "POST",
        headers: { Prefer: "resolution=ignore-duplicates" },
        body: JSON.stringify({ member_id: user.id, track_id: trackId }),
      });
      return send(res, 200, { unlocked: true });
    }

    // ---- Stripe checkout ----
    if (url.pathname === "/api/checkout" && req.method === "POST") {
      if (!STRIPE_KEY) return send(res, 503, { error: "payments not configured yet" });
      const jwt = (req.headers.authorization || "").replace(/^Bearer /, "");
      const user = jwt ? await getUser(jwt) : null;
      if (!user) return send(res, 401, { error: "sign in first" });
      const body = JSON.parse((await readBody(req)).toString() || "{}");
      const price = PRICES[body.plan];
      if (!price || !price.id) return send(res, 400, { error: "unknown plan" });

      // Reuse this member's Stripe customer. Passing customer_email each time mints a new
      // customer per checkout, which fragments their billing history and breaks the portal.
      const mrows = await sb("/rest/v1/members?select=stripe_customer_id&id=eq." + user.id);
      let customerId = mrows && mrows[0] && mrows[0].stripe_customer_id;
      // A stored id can be stale — an account restored from backup, a switch between test and
      // live keys. Confirm it still exists, and quietly mint a new one rather than 500.
      if (customerId) {
        const check = await fetch("https://api.stripe.com/v1/customers/" + encodeURIComponent(customerId),
          { headers: { Authorization: "Bearer " + STRIPE_KEY } });
        if (!check.ok) customerId = null;
      }
      if (!customerId) {
        const cust = await stripe("customers", { email: user.email, "metadata[member_id]": user.id });
        customerId = cust.id;
        await sbFetch("/rest/v1/members?id=eq." + user.id, {
          method: "PATCH", body: JSON.stringify({ stripe_customer_id: customerId }),
        });
      }

      const session = await stripe("checkout/sessions", {
        mode: price.mode,
        "line_items[0][price]": price.id,
        "line_items[0][quantity]": "1",
        customer: customerId,
        client_reference_id: user.id,
        "metadata[member_id]": user.id,
        "metadata[tier]": price.tier,
        success_url: SITE + "/ds/ui_kits/app/?checkout=success",
        cancel_url: SITE + "/ds/ui_kits/app/?checkout=cancelled",
        allow_promotion_codes: "true",
      });
      return send(res, 200, { url: session.url });
    }

    // ---- practice discount: the more you sit, the less next month costs ----
    // Tiers are deliberately reachable. Sitting is daily practice, not a streak game —
    // there is no penalty for missing a day, only a count at the end of the month.
    if (url.pathname === "/api/practice/summary" && req.method === "GET") {
      const jwt = (req.headers.authorization || "").replace(/^Bearer /, "");
      const user = jwt ? await getUser(jwt) : null;
      if (!user) return send(res, 401, { error: "sign in first" });

      const now = new Date();
      const period = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))
        .toISOString().slice(0, 10);
      const rows = await sb("/rest/v1/practice_month?member_id=eq." + user.id +
        "&period=eq." + period + "&select=days");
      const days = (rows && rows[0] && rows[0].days) || 0;
      const daysInMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)).getUTCDate();

      const earned = await sb("/rest/v1/practice_rewards?member_id=eq." + user.id +
        "&order=period.desc&limit=6&select=id,period,days,discount_pct,status,gift_code");

      return send(res, 200, {
        period, days, daysInMonth,
        discount: discountFor(days),
        next: nextTier(days),
        tiers: TIERS,
        history: earned || [],
      });
    }

    // give an earned free month away instead of taking it
    if (url.pathname === "/api/practice/gift" && req.method === "POST") {
      const jwt = (req.headers.authorization || "").replace(/^Bearer /, "");
      const user = jwt ? await getUser(jwt) : null;
      if (!user) return send(res, 401, { error: "sign in first" });
      const body = JSON.parse((await readBody(req)).toString() || "{}");
      const rewardId = String(body.reward_id || "");

      const rows = await sb("/rest/v1/practice_rewards?id=eq." + encodeURIComponent(rewardId) +
        "&member_id=eq." + user.id + "&select=id,discount_pct,status");
      const r = rows && rows[0];
      if (!r) return send(res, 404, { error: "no such reward" });
      if (r.discount_pct < 100) return send(res, 400, { error: "only a full free month can be given away" });
      if (r.status !== "earned") return send(res, 409, { error: "that month has already been used" });

      const code = "TU-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      await sbFetch("/rest/v1/practice_rewards?id=eq." + encodeURIComponent(rewardId), {
        method: "PATCH", body: JSON.stringify({ status: "gifted", gift_code: code }),
      });
      return send(res, 200, { code });
    }

    // give an earned month to the scholarship pool instead of a named person
    if (url.pathname === "/api/practice/pool" && req.method === "POST") {
      const jwt = (req.headers.authorization || "").replace(/^Bearer /, "");
      const user = jwt ? await getUser(jwt) : null;
      if (!user) return send(res, 401, { error: "sign in first" });
      const body = JSON.parse((await readBody(req)).toString() || "{}");
      const rewardId = String(body.reward_id || "");
      const rows = await sb("/rest/v1/practice_rewards?id=eq." + encodeURIComponent(rewardId) +
        "&member_id=eq." + user.id + "&select=id,discount_pct,status");
      const r = rows && rows[0];
      if (!r) return send(res, 404, { error: "no such reward" });
      if (r.discount_pct < 100) return send(res, 400, { error: "only a full free month can be given away" });
      if (r.status !== "earned") return send(res, 409, { error: "that month has already been used" });
      await sbFetch("/rest/v1/practice_rewards?id=eq." + encodeURIComponent(rewardId), {
        method: "PATCH", body: JSON.stringify({ status: "pooled" }),
      });
      return send(res, 200, { pooled: true });
    }

    // how many months are waiting — public, because it is the honest form of social proof
    if (url.pathname === "/api/practice/pool" && req.method === "GET") {
      const rows = await sb("/rest/v1/scholarship_pool?select=months_available,given_by");
      return send(res, 200, (rows && rows[0]) || { months_available: 0, given_by: 0 });
    }

    // redeem a gifted month
    if (url.pathname === "/api/practice/redeem" && req.method === "POST") {
      const jwt = (req.headers.authorization || "").replace(/^Bearer /, "");
      const user = jwt ? await getUser(jwt) : null;
      if (!user) return send(res, 401, { error: "sign in first" });
      const body = JSON.parse((await readBody(req)).toString() || "{}");
      const code = String(body.code || "").trim().toUpperCase();
      if (!code) return send(res, 400, { error: "enter the code you were given" });

      // A code is either a month a practitioner earned and gave away, or one the school issued.
      // Both grant comped time; they differ only in where they came from.
      const rows = await sb("/rest/v1/practice_rewards?gift_code=eq." + encodeURIComponent(code) +
        "&select=id,member_id,status");
      let r = rows && rows[0];
      let months = 1;

      if (!r) {
        const cs = await sb("/rest/v1/coupons?code=eq." + encodeURIComponent(code) +
          "&select=code,kind,months,max_redemptions,redemptions,expires_at");
        const c = cs && cs[0];
        if (!c) return send(res, 404, { error: "that code is not one of ours" });
        if (c.expires_at && new Date(c.expires_at) < new Date())
          return send(res, 409, { error: "that code has expired" });
        if (c.redemptions >= c.max_redemptions)
          return send(res, 409, { error: "that code has been fully used" });
        const mine = await sb("/rest/v1/coupon_redemptions?code=eq." + encodeURIComponent(code) +
          "&member_id=eq." + user.id + "&select=code");
        if (mine && mine.length) return send(res, 409, { error: "you have already used that code" });

        months = c.months;
        const meNow = (await sb("/rest/v1/members?id=eq." + user.id + "&select=active_until"))[0] || {};
        const start = meNow.active_until && new Date(meNow.active_until) > new Date()
          ? new Date(meNow.active_until) : new Date();
        const till = new Date(start); till.setMonth(till.getMonth() + months);
        await sbFetch("/rest/v1/members?id=eq." + user.id, {
          method: "PATCH",
          body: JSON.stringify({ tier: "student", active_until: till.toISOString() }),
        });
        await sbFetch("/rest/v1/coupon_redemptions", {
          method: "POST", body: JSON.stringify({ code: c.code, member_id: user.id }),
        });
        await sbFetch("/rest/v1/coupons?code=eq." + encodeURIComponent(code), {
          method: "PATCH", body: JSON.stringify({ redemptions: c.redemptions + 1 }),
        });
        return send(res, 200, { granted_until: till.toISOString(), months });
      }

      if (r.status === "redeemed") return send(res, 409, { error: "that month has already been taken" });
      if (r.status !== "gifted") return send(res, 409, { error: "that month is not available" });
      if (r.member_id === user.id) return send(res, 400, { error: "a gift is for someone else" });

      // A comped month, granted independently of Stripe — the recipient may have no card at all,
      // which is rather the point.
      const me = (await sb("/rest/v1/members?id=eq." + user.id + "&select=active_until"))[0] || {};
      const from = me.active_until && new Date(me.active_until) > new Date()
        ? new Date(me.active_until) : new Date();
      const until = new Date(from); until.setMonth(until.getMonth() + 1);

      await sbFetch("/rest/v1/members?id=eq." + user.id, {
        method: "PATCH",
        body: JSON.stringify({ tier: "student", active_until: until.toISOString() }),
      });
      await sbFetch("/rest/v1/practice_rewards?id=eq." + r.id, {
        method: "PATCH",
        body: JSON.stringify({ status: "redeemed", gifted_to: user.id, redeemed_at: new Date().toISOString() }),
      });
      return send(res, 200, { granted_until: until.toISOString() });
    }

    // ---- Dīkṣā gate: a written reflection, read by a teacher ----
    if (url.pathname === "/api/reflection" && req.method === "POST") {
      const jwt = (req.headers.authorization || "").replace(/^Bearer /, "");
      const user = jwt ? await getUser(jwt) : null;
      if (!user) return send(res, 401, { error: "sign in first" });
      const body = JSON.parse((await readBody(req)).toString() || "{}");
      const trackId = String(body.track_id || "");
      const text = String(body.reflection || "").trim();
      if (!trackId) return send(res, 400, { error: "track_id required" });
      if (text.length < 120) {
        return send(res, 400, { error: "a gate asks for a real reflection — at least 120 characters", need: 120 - text.length });
      }

      const rows = await sb("/rest/v1/tracks?id=eq." + encodeURIComponent(trackId) + "&select=id,is_gate");
      const track = rows && rows[0];
      if (!track) return send(res, 404, { error: "unknown track" });
      if (!track.is_gate) return send(res, 400, { error: "that track is not a gate" });

      await sbFetch("/rest/v1/gate_reflections?on_conflict=member_id,track_id", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates" },
        body: JSON.stringify({ member_id: user.id, track_id: trackId, reflection: text }),
      });
      return send(res, 200, { passed: true });
    }

    // ---- billing portal: members manage or cancel their own membership ----
    if (url.pathname === "/api/portal" && req.method === "POST") {
      if (!STRIPE_KEY) return send(res, 503, { error: "payments not configured yet" });
      const jwt = (req.headers.authorization || "").replace(/^Bearer /, "");
      const user = jwt ? await getUser(jwt) : null;
      if (!user) return send(res, 401, { error: "sign in first" });
      const rows = await sb("/rest/v1/members?select=stripe_customer_id&id=eq." + user.id);
      const customerId = rows && rows[0] && rows[0].stripe_customer_id;
      if (!customerId) return send(res, 404, { error: "no membership to manage yet" });
      const exists = await fetch("https://api.stripe.com/v1/customers/" + encodeURIComponent(customerId),
        { headers: { Authorization: "Bearer " + STRIPE_KEY } });
      if (!exists.ok) return send(res, 404, { error: "no membership to manage yet" });
      const portal = await stripe("billing_portal/sessions", {
        customer: customerId,
        return_url: SITE + "/?from=portal",
      });
      return send(res, 200, { url: portal.url });
    }

    // ---- Stripe webhook ----
    if (url.pathname === "/api/stripe-webhook" && req.method === "POST") {
      if (!STRIPE_WH) return send(res, 503, { error: "webhook not configured" });
      const raw = (await readBody(req)).toString();
      if (!verifyStripeSig(raw, req.headers["stripe-signature"] || "")) {
        return send(res, 400, { error: "bad signature" });
      }
      const event = JSON.parse(raw);
      const obj = event.data && event.data.object;
      if (event.type === "checkout.session.completed") {
        const memberId = obj.client_reference_id || (obj.metadata && obj.metadata.member_id);
        const tier = (obj.metadata && obj.metadata.tier) || "student";
        if (memberId) {
          const patch = {
            tier,
            stripe_customer_id: obj.customer || null,
            stripe_subscription_id: obj.subscription || null,
            // one-time (founding): lifetime; subscriptions get refreshed by subscription events
            active_until: obj.mode === "payment" ? "2099-01-01T00:00:00Z" : new Date(Date.now() + 35 * 864e5).toISOString(),
          };
          await sbFetch("/rest/v1/members?id=eq." + memberId, { method: "PATCH", body: JSON.stringify(patch) });
        }
      }
      if (event.type === "customer.subscription.updated" || event.type === "invoice.paid") {
        const sub = event.type === "invoice.paid" ? null : obj;
        const custId = obj.customer;
        const periodEnd = sub ? sub.current_period_end : obj.period_end || obj.lines?.data?.[0]?.period?.end;
        if (custId && periodEnd) {
          await sbFetch("/rest/v1/members?stripe_customer_id=eq." + custId, {
            method: "PATCH",
            body: JSON.stringify({ active_until: new Date((periodEnd + 3 * 86400) * 1000).toISOString() }),
          });
        }
      }
      if (event.type === "customer.subscription.deleted") {
        await sbFetch("/rest/v1/members?stripe_customer_id=eq." + obj.customer, {
          method: "PATCH",
          body: JSON.stringify({ tier: "seeker", active_until: new Date().toISOString(), stripe_subscription_id: null }),
        });
      }
      return send(res, 200, { received: true });
    }

    send(res, 404, { error: "not found" });
  } catch (e) {
    console.error(e);
    send(res, 500, { error: "server error" });
  }
});

server.listen(PORT, "127.0.0.1", () => console.log("tu-api on :" + PORT));
