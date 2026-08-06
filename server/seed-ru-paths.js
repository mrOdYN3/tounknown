#!/usr/bin/env node
/* Seed the Russian path catalogue.
 *
 * tu-live.js has always asked for `paths?lang=eq.ru` and fallen back to English when the query
 * came back empty — which it always did, because nothing ever wrote Russian rows. So /ru served
 * a Russian shell around an English library.
 *
 * Sanskrit and Pali terms are transliterated, not translated: Випассана, not "прозрение". The
 * whole claim of the product is that these words belong to the tradition rather than to us.
 *
 * Requires migrate-03-locale.sql to have been run first — until paths is keyed by (id, lang)
 * a Russian row with id='vipassana' cannot exist beside the English one, and this exits with
 * "no unique or exclusion constraint".
 *
 * Idempotent — re-running updates the same rows.
 *   node seed-ru-paths.js [--dry-run]
 */
const https = require("https");
const fs = require("fs");

const env = Object.fromEntries(
  fs.readFileSync("/opt/tu-api/env", "utf8").split("\n").filter(Boolean)
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)]));

const DRY = process.argv.includes("--dry-run");

function sb(path, method = "GET", body, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(env.SUPABASE_URL + path);
    const r = https.request(u, { method, headers: {
      apikey: env.SUPABASE_SECRET_KEY, Authorization: "Bearer " + env.SUPABASE_SECRET_KEY,
      "Content-Type": "application/json", Prefer: "return=representation", ...extraHeaders } }, (res) => {
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

const RU = {
  vipassana: {
    title: "Путь Випассаны",
    tradition: "Тхеравāда",
    source: "Пали-канон · ок. V в. до н. э.",
    description: "Видеть вещи как они есть. Сӣла, самāдхи, паннā.",
  },
  tantra: {
    title: "Путь Тантры",
    tradition: "Кашмирский шиваизм",
    source: "Виджняна Бхайрава Тантра · ок. VIII в.",
    description: "112 дверей Шивы — дыхание, звук, присутствие.",
  },
  vedanta: {
    title: "Путь Веданты",
    tradition: "Адвайта-веданта",
    source: "Недвойственность Упанишад",
    description: "Я есть — до всякой мысли. Гималайская тишина.",
  },
  bhakti: {
    title: "Путь Бхакти",
    tradition: "Бхакти-йога",
    source: "Путь преданности",
    description: "Шёпот Бога — предание себя, молитва, безусловная любовь.",
  },
  stoic: {
    title: "Путь стоиков",
    tradition: "Греко-римская философия",
    source: "«Размышления» Марка Аврелия · II в. н. э.",
    description: "Внутренняя цитадель — стойкость, которую император упражнял каждый день.",
  },
  zen: { title: "Путь Дзэн", tradition: "Чань / Дзэн-буддизм", source: "Дзадзэн · сикантадза · ок. VI в.", description: "" },
  tibetan: { title: "Тибетский Путь", tradition: "Ваджраяна · Дзогчен", source: "Ригпа и махāмудрā", description: "" },
  raja: { title: "Путь Йоги", tradition: "Рāджа-йога", source: "«Йога-сӯтры» Патанджали · ок. II в. до н. э.", description: "" },
  sufi: { title: "Путь суфиев", tradition: "Исламский мистицизм", source: "Зикр и муракаба", description: "" },
  taoist: { title: "Путь Дао", tradition: "Даосизм · цзован", source: "«Дао дэ цзин» · ок. IV в. до н. э.", description: "" },
  hesychast: { title: "Путь исихастов", tradition: "Христианский мистицизм", source: "Молитва сердца · «Добротолюбие»", description: "" },
  kabbalistic: { title: "Путь Каббалы", tradition: "Еврейский мистицизм", source: "Хитбодедут и созерцание", description: "" },
  kids: {
    title: "Роща для детей и семьи",
    tradition: "Осознанность для детей",
    source: "6–12 лет · истории и практики",
    description: "Короткие ведомые медитации для маленьких — и для взрослых, что сидят рядом.",
  },
};

(async () => {
  const en = await sb("/rest/v1/paths?lang=eq.en&select=*&order=sort");
  console.log(`${en.length} English paths`);

  const rows = en.map((p) => {
    const t = RU[p.id];
    if (!t) throw new Error("no Russian copy for path " + p.id);
    // Everything structural — cover, sort, status, kind, teacher — is shared with the English
    // row. Only the words change.
    return { ...p, ...t, lang: "ru", created_at: undefined };
  });

  if (DRY) return console.log(JSON.stringify(rows, null, 2));

  await sb("/rest/v1/paths?on_conflict=id,lang", "POST", rows,
    { Prefer: "resolution=merge-duplicates,return=representation" });
  const check = await sb("/rest/v1/paths?lang=eq.ru&select=id,title&order=sort");
  console.log(`${check.length} Russian paths now live:`);
  for (const c of check) console.log(`  ${c.id.padEnd(12)} ${c.title}`);
})().catch((e) => {
  if (/no unique or exclusion constraint/.test(e.message)) {
    console.error("paths is still keyed by (id) alone — run server/migrate-03-locale.sql first.");
  } else console.error(e.message);
  process.exit(1);
});
