#!/usr/bin/env node
/* Close the month: count each member's practice days, record what they earned, and discount
 * their next invoice in Stripe.
 *
 * Runs on the 1st. It looks at the month that just ended, never the current one — a discount
 * is earned by a month of practice that is over, so nothing is provisional.
 *
 * The tiers live here and in server.js; keep them in step.
 *   20 days → 25% off next month
 *   25 days → 50%
 *   30 days → free month, which the member may keep or give away
 *
 *   node practice-discount.js [--dry-run] [--period YYYY-MM-01]
 */
const https = require("https");
const fs = require("fs");

const env = Object.fromEntries(
  fs.readFileSync("/opt/tu-api/env", "utf8").split("\n").filter(Boolean)
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)]));

const SB = env.SUPABASE_URL;
const SB_KEY = env.SUPABASE_SECRET_KEY;
const STRIPE = env.STRIPE_SECRET_KEY;
const DRY = process.argv.includes("--dry-run");

const TIERS = [
  { days: 20, pct: 25 },
  { days: 25, pct: 50 },
  { days: 30, pct: 100 },
];
const discountFor = (d) => TIERS.reduce((p, t) => (d >= t.days ? t.pct : p), 0);

function req(url, opts = {}, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const r = https.request(u, { method: opts.method || "GET", headers: opts.headers || {} }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => {
        if (res.statusCode >= 400) return reject(new Error(`${res.statusCode} ${url}\n${d}`));
        try { resolve(d ? JSON.parse(d) : null); } catch { resolve(d); }
      });
    });
    r.on("error", reject);
    if (body) r.write(body);
    r.end();
  });
}
const sb = (path, opts = {}, body) => req(SB + path, {
  ...opts, headers: { apikey: SB_KEY, Authorization: "Bearer " + SB_KEY,
    "Content-Type": "application/json", ...(opts.headers || {}) } }, body);
const stripe = (path, params) => req("https://api.stripe.com/v1/" + path,
  { method: "POST", headers: { Authorization: "Bearer " + STRIPE,
    "Content-Type": "application/x-www-form-urlencoded" } },
  new URLSearchParams(params).toString());

/* Stripe coupons are reusable, so make one per tier and keep it. */
async function couponFor(pct) {
  const id = `practice-${pct}`;
  try {
    return (await req("https://api.stripe.com/v1/coupons/" + id,
      { headers: { Authorization: "Bearer " + STRIPE } })).id;
  } catch {
    const c = await stripe("coupons", {
      id, percent_off: String(pct), duration: "once",
      name: `${pct}% — a month of practice`,
    });
    return c.id;
  }
}

(async () => {
  const arg = process.argv.indexOf("--period");
  let period;
  if (arg > -1) period = process.argv[arg + 1];
  else {
    const n = new Date();
    period = new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth() - 1, 1)).toISOString().slice(0, 10);
  }
  console.log(`closing ${period}${DRY ? " (dry run)" : ""}`);

  const months = await sb(`/rest/v1/practice_month?period=eq.${period}&select=member_id,days`);
  if (!months.length) return console.log("  no practice recorded in that month");

  for (const m of months) {
    const pct = discountFor(m.days);
    if (!pct) { console.log(`  ${m.member_id.slice(0, 8)} · ${m.days} days · below the first tier`); continue; }

    const already = await sb(`/rest/v1/practice_rewards?member_id=eq.${m.member_id}&period=eq.${period}&select=id`);
    if (already.length) { console.log(`  ${m.member_id.slice(0, 8)} · already closed`); continue; }

    const mem = (await sb(`/rest/v1/members?id=eq.${m.member_id}&select=stripe_subscription_id,tier`))[0];
    console.log(`  ${m.member_id.slice(0, 8)} · ${m.days} days → ${pct}% off next month`);
    if (DRY) continue;

    await sb("/rest/v1/practice_rewards", { method: "POST" },
      JSON.stringify({ member_id: m.member_id, period, days: m.days, discount_pct: pct }));

    // A member without an active subscription still earns the record — it applies whenever
    // they next subscribe, and a 100% month can be given away regardless.
    if (mem && mem.stripe_subscription_id) {
      try {
        const coupon = await couponFor(pct);
        await stripe("subscriptions/" + mem.stripe_subscription_id, { "discounts[0][coupon]": coupon });
        await sb(`/rest/v1/practice_rewards?member_id=eq.${m.member_id}&period=eq.${period}`,
          { method: "PATCH" }, JSON.stringify({ status: "applied", applied_at: new Date().toISOString() }));
        console.log(`      applied ${coupon} to ${mem.stripe_subscription_id}`);
      } catch (e) {
        console.error(`      could not apply the discount: ${e.message.split("\n")[0]}`);
      }
    }
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
