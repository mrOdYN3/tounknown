#!/usr/bin/env node
/* Mint a code. Every code carries a reason, a limit and — for anything that is not a founding
 * gift — an expiry, so the coupon table stays a record rather than a drawer of loose keys.
 *
 *   node mint-coupon.js --kind partner --months 3 --uses 25 --expires 2026-12-31 \
 *                       --note "Yoga studio in Valencia"
 *   node mint-coupon.js --kind press --months 12 --note "Journalist review copy"
 *   node mint-coupon.js --list
 *
 * Kinds: founding · partner · press · teacher · scholarship
 * There is deliberately no percent-off kind and no time-limited sale — urgency is the pattern
 * this product is built against, and a discount code would undercut the practice discount,
 * which is the one reduction the model is supposed to reward.
 */
const https = require("https");
const fs = require("fs");

const env = Object.fromEntries(
  fs.readFileSync("/opt/tu-api/env", "utf8").split("\n").filter(Boolean)
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)]));

function sb(path, method = "GET", body) {
  return new Promise((resolve, reject) => {
    const u = new URL(env.SUPABASE_URL + path);
    const r = https.request(u, { method, headers: {
      apikey: env.SUPABASE_SECRET_KEY, Authorization: "Bearer " + env.SUPABASE_SECRET_KEY,
      "Content-Type": "application/json", Prefer: "return=representation" } }, (res) => {
      let d = ""; res.on("data", (c) => (d += c));
      res.on("end", () => res.statusCode >= 400
        ? reject(new Error(`${res.statusCode} ${d}`))
        : resolve(d ? JSON.parse(d) : null));
    });
    r.on("error", reject);
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}

const arg = (n, d) => {
  const i = process.argv.indexOf("--" + n);
  return i > -1 ? process.argv[i + 1] : d;
};

(async () => {
  if (process.argv.includes("--list")) {
    const rows = await sb("/rest/v1/coupons?order=created_at.desc&select=code,kind,months,redemptions,max_redemptions,expires_at,note");
    if (!rows.length) return console.log("no codes issued yet");
    for (const c of rows) {
      const exp = c.expires_at ? new Date(c.expires_at).toISOString().slice(0, 10) : "no expiry";
      console.log(`${c.code}  ${c.kind.padEnd(11)} ${c.months}mo  ${c.redemptions}/${c.max_redemptions}  ${exp}  ${c.note || ""}`);
    }
    return;
  }

  const kind = arg("kind");
  const KINDS = ["founding", "partner", "press", "teacher", "scholarship"];
  if (!KINDS.includes(kind)) {
    console.error("--kind must be one of: " + KINDS.join(", "));
    process.exit(1);
  }
  const note = arg("note");
  if (!note) { console.error("--note is required: every code should say why it exists"); process.exit(1); }

  // Readable but not guessable, and visibly ours.
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";   // no I/O/0/1
  const rand = (n) => Array.from({ length: n }, () =>
    alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  const code = arg("code") || `TU-${kind.slice(0, 2).toUpperCase()}${rand(5)}`;

  const row = {
    code,
    kind,
    months: parseInt(arg("months", "1"), 10),
    max_redemptions: parseInt(arg("uses", "1"), 10),
    expires_at: arg("expires") ? new Date(arg("expires") + "T23:59:59Z").toISOString() : null,
    note,
  };
  await sb("/rest/v1/coupons", "POST", row);
  console.log(`${code}  ${row.kind}  ${row.months} month(s)  ${row.max_redemptions} use(s)  ` +
              `${row.expires_at ? "expires " + row.expires_at.slice(0, 10) : "no expiry"}`);
  console.log(`  ${note}`);
})().catch((e) => { console.error(e.message); process.exit(1); });
