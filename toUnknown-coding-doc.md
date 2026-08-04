# toUnknown — Coding Doc (Build Spec) {#tounknown-coding-doc-build-spec}

**Companion file:** *toUnknown — Design Doc (Claude Design Prompt)*. That doc owns look, feel, motion, and copy; this doc owns engineering, data, payments, and SEO. They share the same 4\-tab structure (Home · Courses · Dāna · About) and the same course catalog below — build exactly to both.

* * *

## 1 · Deliverable & constraints {#1-deliverable-constraints}

One self\-contained, production\-quality **single HTML file** (all CSS \+ JS inline). No build step, no frameworks — vanilla JS (external scripts only from cdnjs if truly unavoidable). **No localStorage/sessionStorage** — in\-memory state only. Works perfectly opened directly in a browser and deployed to any static host. Semantic HTML5, full keyboard navigation, ARIA labels, `prefers-reduced-motion` and `prefers-color-scheme` respected.

## 2 · Course catalog (real data — render from a single JS `COURSES` array) {#2-course-catalog-real-data-render-from-a-single-js-courses-array}

| Course | Level | Duration / structure | Model | Access link |
| --- | --- | --- | --- | --- |
| 112 Guided Meditations of Vigyan Bhairav Tantra by Shiva (Vijñana Bhairava Tantra) | All levels | 112 techniques · \~15 min each · 11 parts · 43 h 11 min | Donation / membership | https://www.patreon.com/c/tounknowndotcom |
| Vipassana Meditation Part 1: Anapanasati Essentials (5\-Day Course) | Beginner\+ | 5 days · 2×15 min daily · 5 h 32 min · optional 25\-day extension | $0 now, donate after (anchor \\\\\\\~\\\\\\\~$23\~\~) | https://tounknown.com/vipassana\-meditation\-part\-1\-anapanasati\-essentials |
| Vipassana Part 1 — Food Detox Edition | Beginner\+ | Same 5\-day structure \+ food\-detox guidance | $0 now, donate after | https://www.tounknown.com/vipassana\-meditation\-part\-1\-anapanasati\-essentials1 |
| Himalayan Silence: I Am Shiva – I Am Presence | Intermediate\+ | 5 meditations · 23–35 min each · 3 h 05 min | Donation ("a gift") | https://tounknown.com/himalayan\-silence\-i\-am\-shiva\-i\-am\-presence |
| Whispers of God: Bhakti Yoga & Anapanasati | Beginner\+ | 10 meditations · 18–45 min each · 6 h 45 min | Donation / Patreon | https://tounknown.com/whispers\-of\-god\-bhakti\-yoga\-and\-anapanasati\-vipassana |
| Unconditional Love. The YOGA of Liberation | All levels | Guided audio collection | Donation | https://www.tounknown.com/unconditional\-love\-the\-yoga\-of\-liberation |
| Super Power\+ of REAL NOW: 3 Insider Methods for the Present | Beginner | 3 guided audio meditations | Donation | YouTube: https://www.youtube.com/watch?v\=3ptXZbv3je8 |
| Anapanasati 15\-min taster | Free | Single 15\-min session | Free | via Vipassana course page |
| Free Tantra singles (samples) | Free | 15 min each — e.g. 6\# Breathing in the Throat · 7\# Savoring the Taste of Existence · 11\# Passage of Breath through the Nose · 12\# Mindful Breath While Walking | Free | https://tounknown.com/6\-guided\-audio\-meditation\-of\-vigyan\-bhairav\-tantra\-breathing\-in\-the\-throat (pattern holds for others) |
| Santa's Mindful Christmas (Kids) · Shiva OM chanting · Stoic (Marcus Aurelius) · Death & Unconditional Love meditations | Mixed | Part of catalog | Donation | https://tounknown.com/guided\-meditation\-courses\-online |

Category filter values: `all · men · women · kids · beginner · intermediate · advanced`. Cover image URLs per course: see Design Doc §5 image bank.

**Do NOT use or link tounknowndotcom.gumroad.com anywhere.**

## 3 · Media & channels {#3-media-channels}

- YouTube channel: https://www.youtube.com/@tounknowndotcom (channel ID `UC37IgsIJ9bw22yk0ANjMzAw`) — "Mental Health • Self\-connection through meditation"
- Known videos to embed via `youtube-nocookie.com/embed/` with click\-to\-play facade (thumbnail `https://i.ytimg.com/vi/{id}/hqdefault.jpg`): homepage video `c31q7Ag5dlE` · Whispers of God `Dg45kLzmhQU` · Super Power\+ of REAL NOW `3ptXZbv3je8`
- SoundCloud previews: https://soundcloud.com/tounknowndotcom (embed player lazily on course sheets)
- Insight Timer teacher profile: https://insighttimer.com/dyn · Himalayan Silence deep link: https://insig.ht/7Weoq8bsNXb
- Social: Telegram https://t.me/tounknowndotcom · Instagram https://www.instagram.com/tounknowndotcom · X https://x.com/tounknowndotcom · Trustpilot https://trustpilot.com/review/tounknown.com
- Contact: tounknown.com@gmail.com (community: smile@tounknown.com) · Blog https://tounknown.com/blog · Terms https://tounknown.com/terms\-of\-use · NFT https://nft.tounknown.com/ (SōulFlow of Ganesha — footer link only)

## 4 · Payments — fast selling, ≤ 2 taps {#4-payments-fast-selling-2-taps}

1. **Stripe Payment Links** (no backend). Two placeholders as top\-of\-file constants with loud comments: `STRIPE_DONATION_LINK` (create in Stripe as "customer chooses what to pay" — the Dāna amount chips $5/$11/$22/$54/custom pass the chosen amount as prefill where supported, otherwise open the link) and `STRIPE_COURSE_LINK` (per\-course optional map, fallback to donation link). Open in new tab; button shows pressed state \+ 400 ms spinner.
2. **Patreon** "Full Access 💎": https://www.patreon.com/c/tounknowndotcom — presented with equal dignity on Dāna tab and course sheets.
3. **PayPal** quiet fallback text link: https://www.paypal.com/donate?hosted\_button\_id\=H5VQT3VLQBUBJ
4. Success \= gold pulse toast "Thank you — may it serve you well." No upsell after giving.

## 5 · SEO — Google best practices \+ LLM/AI\-search (AEO/GEO) {#5-seo-google-best-practices-llmai-search-aeogeo}

**Head:** one `<h1>` per view; `<title>` ≤ 60 chars — `Guided Meditation Courses Online | Vipassana, Tantra & Mindfulness — toUnknown`; meta description ≤ 155 chars using "donation\-based guided meditation courses online"; canonical `https://tounknown.com/`; full Open Graph \+ Twitter Card (og:image \= brand hero); `theme-color` both schemes; hreflang links `en`, `es` (`/es`), `ru` (`/ru`).

**Structured data — JSON\-LD blocks (all four):**

1. `Organization` \+ `WebSite` (name toUnknown, logo, `sameAs`\: Instagram, X, YouTube, Telegram, Patreon, Insight Timer, Trustpilot)
2. `ItemList` of `Course` objects — each with `name`, `description`, `provider` toUnknown, `timeRequired` (ISO\-8601, e.g. `PT5H32M`), `educationalLevel`, and `offers: {price: 0, priceCurrency: USD, description: "Donation-based"}`
3. `FAQPage` from the real donation FAQ (What is the Tounknown Family? · Can I join without donating? · How are donations used? · Why monthly? · How do I cancel? · Tax\-deductible?) — verbatim answers
4. `VideoObject` for each embedded YouTube video (name, thumbnailUrl, embedUrl) and `Person` for author DYN (jobTitle: Meditation Instructor; credentials: 20\+ Vipassana courses, S.N. Goenka & Pa\-Auk Sayadaw traditions, retreats in 15\+ countries)

**AEO/GEO (LLM answerability):** every section leads with a direct one\-sentence answer before elaborating; FAQ rendered as real `<details>` Q&A in the DOM (not JS\-only); entity\-rich copy naming Vipassana, Anapanasati, Vigyan Bhairav Tantra, Advaita Vedanta, Dāna explicitly; author E\-E\-A\-T block with credentials near the fold of About; stable descriptive `id` anchors (`#courses`, `#dana`, `#faq`, `#author`); plain\-text content fully server\-visible (no content behind JS\-only rendering — all copy in the initial HTML). Ship alongside the HTML (as comments at file top for easy extraction): a recommended `robots.txt` (allow all \+ sitemap line), a one\-page `sitemap.xml`, and an `llms.txt` summarizing the site for AI crawlers (brand, offerings, donation model, key links).

**Core Web Vitals budget:** LCP \< 2.5 s (hero `fetchpriority="high"`, `preconnect` to assets.zyrosite.com \+ cdn.zyrosite.com), CLS \< 0.05 (explicit width/height on all images), INP \< 200 ms (no long tasks, passive listeners), total JS \< 50 KB. All non\-hero images `loading="lazy" decoding="async"`; video embeds are thumbnail facades until click.

## 6 · QA checklist (verify before returning) {#6-qa-checklist-verify-before-returning}

- [ ] All 4 tabs render; deep\-link anchors work; back button closes sheets
- [ ] Every course card opens its sheet; every payment button opens correct URL in new tab
- [ ] No Gumroad references anywhere
- [ ] Images: alt text present, fallback works offline, no CLS
- [ ] JSON\-LD validates (paste into Schema.org validator mentally: no trailing commas, matching visible content)
- [ ] Keyboard\-only pass: tab order, Esc closes sheet, focus trap in modal, visible focus rings
- [ ] Light \+ dark themes both AA contrast; reduced\-motion honored
- [ ] Lighthouse\-minded: lazy images, preconnects, no console errors

## 7 · Admin panel (`admin.html`) {#7-admin-panel-adminhtml}

A second self\-contained single HTML file, same design system as the app (deep indigo, temple\-gold accent, SF stack, hairline borders, 20 px radii). It is a **content studio**, not a hosted backend: everything runs client\-side, edits live in memory, and the output is a config the app consumes. No localStorage; persistence is via export/import.

**Config contract (shared with the app).** The app renders everything from one JSON object embedded as `<script type="application/json" id="tu-config">…</script>`\:

```
TU_CONFIG = {
  brand:    { name, tagline, subline, philosophy, quotes[], email },
  payments: { stripeDonation, stripeCourseDefault, paypal, patreon, danaAmounts[] },
  links:    { telegram, instagram, x, youtube, insightTimer, trustpilot, blog, terms, nft },
  videos:   [ { id, title } ],
  courses:  [ { id, title, essence, description, durationText, isoDuration, level,
                categories[], model, accessUrl, stripeUrl, image, videoId,
                soundcloud, featured, free } ]
}
```

**Sections (sidebar navigation):**

1. **Courses** — card list with add / duplicate / delete / reorder; edit panel with all fields, category checkboxes, live iOS\-style card preview using the real image URL
2. **Content** — copy\-bank editor (tagline, subline, philosophy, interlude quotes, Dāna texts)
3. **Payments** — Stripe donation link, default course link, PayPal, Patreon, editable Dāna amount chips; placeholder links flagged in gold until replaced
4. **Links & media** — social URLs, YouTube video IDs with thumbnail preview
5. **Export / Import** — pretty JSON view; Download `tu-config.json`; Copy JSON; Copy as ready\-to\-paste `<script id="tu-config">` block; import via paste or file; **validation report** (missing images, empty required fields, non\-https URLs, unreplaced `YOUR_STRIPE_…` placeholders, Gumroad links → error)

**Workflow:** open admin.html locally → edit → Export → paste the script block over the existing `#tu-config` in the app file (or upload `tu-config.json` next to it) → done. Ships pre\-seeded with the full real catalog from §2.

## 8 · Marketplace architecture (own membership \+ revenue share) {#8-marketplace-architecture-own-membership-revenue-share}

*Per the Marketplace Strategy doc. Patreon is removed from all links and UI; membership is owned.*

**Phase 1 (static — extend the current single\-file app now):**

- Replace every Patreon CTA with **toUnknown\+ Membership**\: Stripe **subscription** Payment Links — `STRIPE_MEMBER_MONTHLY` ($11/mo), \`STRIPE\_MEMBER\_YEARLY\` ($88/yr), `STRIPE_FOUNDING_ONEOFF` ($108) — added to the config `payments` object alongside the donation link
- "Give more if it feels true": implement as multiple monthly links ($11/$17/$25) presented by the slider, or one link with adjustable\-quantity enabled — no backend needed
- Fulfillment: Stripe post\-checkout redirect → a `/welcome` view with the private Telegram invite \+ email instructions
- Course schema gains `author: {name, avatar, url, lineage}` and `media: {type: "audio"|"video", provider, embedId}`; catalog cards render the author line. Teacher application \= simple form CTA (mailto or Tally/Typeform link) on an "Teach with us" section
- Admin Studio: author fields per course; teachers' courses added manually after approval

**Phase 2 (gated library):** Supabase (magic\-link auth, Postgres, RLS) \+ Stripe Billing webhooks (`checkout.session.completed`, `customer.subscription.updated/deleted` → `members` table). Media: Cloudflare Stream or Bunny Stream for video, R2/Bunny storage for audio — **signed URLs minted only for active members**. The app stays a single\-page front end talking to Supabase; player views per Design Doc §7.

**Phase 3 (marketplace):** **Stripe Connect Express** per teacher — destination charges with `application_fee_percent`\: 20% on one\-off sales, 10% on teacher dāna tips. Sangha Circle seat \= $25/mo subscription per teacher (Stripe Billing). Membership pool payout: monthly job aggregates playback minutes per teacher (Stream analytics) → distributes 70% of net membership revenue pro\-rata → Connect transfers. Tables: `teachers`, `courses`, `lessons`, `playback_events`, `payouts`. Admin evolves: approval queue (courses/teachers), payout ledger, engagement dashboard.

**Data\-model deltas to `TU_CONFIG` (Phase 1, so app \+ admin stay fitting):**

```
payments += { memberMonthly, memberYearly, foundingOneOff, giveMoreLinks[] }
courses[] += { author:{name,avatar,url,lineage}, media:{type,provider,embedId} }
teachers:  [ { id, name, avatar, lineage, bio, url, danaUrl } ]
```
