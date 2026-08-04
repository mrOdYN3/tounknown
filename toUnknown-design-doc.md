# toUnknown — Design Doc {#tounknown-design-doc}

**Companion file:** *toUnknown — Coding Doc (Build Spec)*. The two fit together: this doc defines how the app looks, feels, and speaks; the coding doc defines how it is built, its data, payments, and SEO. Paste this doc as the design brief, the coding doc as the technical spec — together they are the complete prompt.

* * *

## 1 · Vision {#1-vision}

A super\-fast\-selling, donation\-based meditation web\-app for **toUnknown.com**, designed as if crafted by Apple's leading product designers for the latest iOS, with the discipline of Google's newest design systems. Elegant, modern, premium, sophisticated, and mindful. Every element intentional, minimal, beautifully balanced — exceptional typography, spacing, animation, and interaction. World\-class: an interface the best design agencies would be proud of, setting a new benchmark for meditation app design. Zero friction from arrival to donation: **any payment path reachable in ≤ 2 taps.**

## 2 · Brand foundation {#2-brand-foundation}

**Name:** toUnknown · **Author/teacher:** DYN · **Concept:** Dāna (generosity\-based giving).

**Voice:** calm, direct, non\-dogmatic, quietly confident. Never salesy. The app whispers; it never shouts.

### Copy bank (use verbatim) {#copy-bank-use-verbatim}

- "KNOW THYSELF THROUGH SPIRITUAL STRENGTH"
- "this is not religion — this is inner universe"
- "WE DON'T GIVE ANSWERS. WE CREATE A SPACE WHERE YOU HEAR YOUR OWN"
- "THEREFORE, DON'T TRY"
- "You are your OWN masterpiece..."
- "These meditations are offered freely — in the spirit of generosity."
- "No fixed cost. No pressure. Only presence, and the freedom to give — if it feels true."
- "IF IT HELPS YOU, FEEL FREE TO DONATE ANY AMOUNT AFTER COMPLETING IT\!"
- "Generosity is the root of a connected life."
- CTAs: "Let's try" · "Start\!" · "START THE COURSE FOR $0 NOW" · "\+ I WANT THIS\!" · "WRITE US 💬"

## 3 · Design system {#3-design-system}

### Color — white, one gold accent (the temple in daylight) {#color-white-one-gold-accent-the-temple-in-daylight}

*(Updated: the app is light\-first — Apple's latest iOS light language.)*

- Background: warm paper\-white `#FBFAF7` → `#F5F3ED`; desktop stage `#ECE9E1` with faint gold/violet auras
- Surface: pure white cards `#FFFFFF`, 0.5 px hairline `rgba(24,22,16,0.09)`, soft warm shadows `rgba(60,50,20,0.06–0.16)` — depth by light, never dark borders
- Ink: near\-black warm `#191813`; secondary 60 %, tertiary 38 %
- Accent (single): temple\-gold — deep `#A8781F` for text/chips (AA on white), bright `#D9A441` for fills and the breathing orb
- Primary buttons: near\-black ink pills with white text (the Apple move); gold is reserved for meaning — seals, gates, membership, dāna
- Imagery cards keep a dark gradient scrim at the base with white text — photographs stay rich against the white page
- Semantic: sage `#5E8A4A`; translucent surfaces (header, tab bar, sheets) are white blur `rgba(251,250,247,0.78–0.96)` \+ saturate(1.8)

### Language — Sanskrit\-first naming {#language-sanskrit-first-naming}

The interface speaks the traditions' own words, each introduced once and always used consistently: **Sādhana** (practice; the profile tab), **Mārga** (the Paths tab), **Dīkṣā** (the gate/initiation), **Abhyāsa** (steady practice — the unlock mechanic), **Dāna** (giving tab), **Sangha** (community tab), **Satsang** (live gatherings), **Sādhaka** (committed practitioner; the guided tier and the gate seal), **Ācārya** (teacher). A glossary lives in the FAQ. English glosses appear beside first uses — reverent, never obscure.

### Typography — SF Pro feel {#typography-sf-pro-feel}

System stack `-apple-system, "SF Pro Display", Inter, sans-serif`. Scale: Large Title 34/700 tight\-tracked (−0.4 px) → collapses to 17/600 compact header on scroll (iOS large\-title behavior) · Title 22/600 · Body 17/400, line\-height 1.5 · Caption 13/400 · Label 11/600 uppercase \+0.08 em. Quotes from the copy bank set in serif italic (New York feel, `Georgia` fallback) as full\-bleed "breathing" interludes between sections.

### Space, shape, depth {#space-shape-depth}

8 pt grid throughout; screen gutter 20 px; card padding 20 px. Radii: cards 20 px, sheets 28 px top, buttons 14 px, chips full. iOS translucency: header, tab bar, and sheets use `backdrop-filter: blur(24px) saturate(1.6)` over content. Shadows soft and layered, never harsh. Safe\-area aware (`env(safe-area-inset-*)`).

### Motion — 60 fps, transform/opacity only {#motion-60-fps-transformopacity-only}

- Spring easing `cubic-bezier(0.32, 0.72, 0, 1)`, 320–420 ms
- Hero "breathing orb": slow 6 s scale 1→1.06 loop behind the tagline — the app's heartbeat
- Cards: press\-scale 0.97 \+ lift; staggered 24 px fade\-up on scroll (IntersectionObserver, 60 ms stagger)
- Sheets: slide\-up with grabber handle, background scales to 0.94 and dims (iOS modal push\-back)
- Tab switches: 200 ms cross\-fade \+ 8 px slide; donation success: single soft gold pulse, no confetti
- Respect `prefers-reduced-motion` — swap all motion for opacity fades

## 4 · Structure — 4 tabs (iOS bottom tab bar) {#4-structure-4-tabs-ios-bottom-tab-bar}

**Home · Courses · Dāna · About** — inline SVG icons in SF Symbols style (1.5 px stroke), active state gold with label.

### Home {#home}

Full\-bleed hero (Vipassana image, dark gradient scrim) → breathing orb → "KNOW THYSELF THROUGH SPIRITUAL STRENGTH" large\-title → "this is not religion — this is inner universe" → paired CTAs "Let's try" (Tantra) \+ "Start\!" (Vipassana). Below: Featured Techniques horizontal snap\-scroll row (cards 260×340, cover image, title, duration chip, level chip) → serif interlude "WE DON'T GIVE ANSWERS…" → free tasters row (15\-min Anapanasati, YouTube/SoundCloud samples with play glyph) → Trustpilot strip → newsletter field (single input, inline button).

### Courses {#courses}

Sticky search\-less header with filter chips (horizontal scroll, snap): **All · For Men · For Women · For Kids · Beginners · Intermediate · Advanced**. Vertical card list, each: cover, title, one\-line essence, duration \+ level chips, "Donation based" tag in gold. Tap → **course sheet** (the sale moment): cover parallax, title, stats row (duration · sessions · level), full description, then a fixed bottom bar with primary gold button **"Start for $0"** / **"Full Access →"** and quiet secondary "give what feels true". Embedded media (YouTube sample, SoundCloud preview) inside the sheet, lazy, facade\-loaded.

### Dāna — the emotional center {#dna-the-emotional-center}

Serif full\-screen opening: "These meditations are offered freely — in the spirit of generosity." → explanation of dāna in 2 short paragraphs → amount chips **$5 · $11 · $22 · $54 · Custom** (single row, gold selected state) → primary button "Give with a free heart" (Stripe) → secondary equal\-dignity card "Full Access 💎 via Patreon — support monthly, unlock everything" → tertiary quiet text link: PayPal. Never guilt, never urgency banners.

### About {#about}

Author DYN: portrait, bio (20\+ Vipassana courses in S.N. Goenka & Pa\-Auk traditions, Hatha Yoga since 2017, Ashtanga since 2020, retreats in 15\+ countries), mission quote. "You are your OWN masterpiece..." interlude → Tounknown Family / community section (Telegram, Instagram, X, YouTube, Insight Timer) → Trustpilot → FAQ accordion (from donation FAQ, verbatim Q&A) → contact email \+ terms link.

## 5 · Image bank (real assets — use these exact URLs) {#5-image-bank-real-assets-use-these-exact-urls}

| Use | URL |
| --- | --- |
| Hero | https://assets.zyrosite.com/cdn\-cgi/image/format\=auto,w\=1440,h\=756,fit\=crop,f\=jpeg/d95DMJoWQZi9KZO2/vipassana\-meditation\-mjEPpWR2lWHvRnVz.jpg |
| OG / brand hero | https://assets.zyrosite.com/cdn\-cgi/image/format\=auto,w\=1440,h\=756,fit\=crop,f\=jpeg/d95DMJoWQZi9KZO2/tounknowndotcom\-mePvblBa96ugbge1.jpg |
| Logo mark | https://assets.zyrosite.com/cdn\-cgi/image/format\=auto,w\=375,fit\=crop/d95DMJoWQZi9KZO2/dod1\-2dud\-d\-d2dunnd1\-2d3\-4d1\-4n\-Aq2eB6DL6VSjnbXR.png |
| Wordmark | https://assets.zyrosite.com/cdn\-cgi/image/format\=auto,w\=768,h\=155,fit\=crop/d95DMJoWQZi9KZO2/logo\-copy\-YbNnaZVgpyCnog3e.png |
| Tantra 112 cover | https://assets.zyrosite.com/cdn\-cgi/image/format\=auto,w\=1440,h\=756,fit\=crop,f\=jpeg/d95DMJoWQZi9KZO2/112\-meditation\-techniques\-of\-vigyan\-bhairav\-tantra\-vijniana\-bhairava\-tantra\-mv058VBbxxHle1ZR.jpg |
| Tantra alt cover | https://cdn.zyrosite.com/cdn\-cgi/image/format\=auto,w\=1440,h\=756,fit\=crop,f\=jpeg/cdn\-ecommerce/store\_01HBM37W59YM602ZY1SMAMN37W%2Fassets%2F1749811476032\-covercopy.jpg |
| Vipassana Pt 1 card | https://assets.zyrosite.com/cdn\-cgi/image/format\=auto,w\=768,h\=768,fit\=crop/d95DMJoWQZi9KZO2/vipassana\-meditation\-course\-part\-1\-\-\-anapanasati\-online\-A1aw3ookEphPVrPR.jpg |
| Food Detox card | https://assets.zyrosite.com/cdn\-cgi/image/format\=auto,w\=768,h\=768,fit\=crop/d95DMJoWQZi9KZO2/cover\-food\-detox\-edition\-dOqyPagbKlIjMrE0.jpg |
| Himalayan Silence cover | https://cdn.zyrosite.com/cdn\-cgi/image/format\=auto,w\=1440,h\=756,fit\=crop,f\=jpeg/cdn\-ecommerce/store\_01HBM37W59YM602ZY1SMAMN37W%2Fassets%2F1750926107990\-covercopy.jpg |
| Whispers of God cover | https://cdn.zyrosite.com/cdn\-cgi/image/format\=auto,w\=1440,h\=756,fit\=crop,f\=jpeg/cdn\-ecommerce/store\_01HBM37W59YM602ZY1SMAMN37W%2Fassets%2F1751001777618\-cover\_copy\_n6ztvgd.jpg |
| Shiva meditation | https://assets.zyrosite.com/cdn\-cgi/image/format\=auto,w\=768,h\=789,fit\=crop/d95DMJoWQZi9KZO2/shiva\-meditation\-online\-A85Vy47MEOF7lOJL.jpg |
| True meditation | https://assets.zyrosite.com/cdn\-cgi/image/format\=auto,w\=768,h\=768,fit\=crop/d95DMJoWQZi9KZO2/true\-meditation\-AzGjpnnRKjCvn38p.jpg |
| Dāna page image | https://assets.zyrosite.com/cdn\-cgi/image/format\=auto,w\=1440,h\=756,fit\=crop,f\=jpeg/d95DMJoWQZi9KZO2/dana\-m5Kn67gab6IJl6G1.jpg |
| Author portrait (DYN) | https://assets.zyrosite.com/cdn\-cgi/image/format\=auto,w\=375,h\=466,fit\=crop/d95DMJoWQZi9KZO2/dyn\-A3QlQeJvnpinw4Vv.jpg |
| Community banner | https://cdn.zyrosite.com/cdn\-cgi/image/format\=auto,fit\=crop,q\=80,w\=768/cdn\-ecommerce/store\_01HBM37W59YM602ZY1SMAMN37W/assets/958fa256\-7a1d\-4425\-9c18\-62e57f830a83.jpg |
| Trustpilot badge | https://assets.zyrosite.com/cdn\-cgi/image/format\=auto,w\=375,h\=61,fit\=crop/d95DMJoWQZi9KZO2/trustpilot\-vipassana.life\-95flksHt92UTTjoa.png |

All images: `object-fit: cover`, rounded 16–24 px, skeleton shimmer while loading, graceful indigo\-gradient fallback on error, descriptive `alt` text.

## 6 · Quality bar {#6-quality-bar}

Tap targets ≥ 44 px, thumb\-reachable primary actions, WCAG AA contrast in both themes, visible gold focus rings, optical icon alignment, consistent radii, spacing rhythm audited on the 8 pt grid. Desktop: the 430 px app frame floats centered over an ambient blurred aurora backdrop — an app showcase, not a stretched website. Final check: does the whole interface breathe calm? Would a designer at Apple nod?

## 7 · Marketplace & community extensions (own membership — no Patreon) {#7-marketplace-community-extensions-own-membership-no-patreon}

*Added per the Marketplace Strategy doc. Patreon disappears from the UI entirely; "Full Access 💎" becomes* ***toUnknown\+ Membership.***

### Structure grows to 5 tabs {#structure-grows-to-5-tabs}

**Home · Courses · Community · Membership · Profile** — same tab bar spec as §4. "Dāna" moves inside Membership as the free\-giving path; Profile holds the member's library, streak dot, and settings.

### New screens {#new-screens}

- **Membership (paywall done kindly):** hero line "One membership. Every practice." → toUnknown\+ card ($11/mo · $88/yr, gold border, breathing) → the \\\\\\\*\\\\\\\*"give more if it feels true" slider\\\\\\\*\\\\\\\* above the pay button (base is minimum, slider only raises — serif caption: "if it feels true") → Founding Member one\\\\\\\-time card ($108, gratitude wall) → below the fold, classic dāna one\-off giving for non\-members. Never a countdown, never fake scarcity.
- **Community:** calm feed of Circles (Vipassana · Tantra · Kids · Teachers). Cards carry text or audio notes; no like\-counters — a small 🙏 "gratitude" tap instead. Monthly live satsang banner (video) at top. Members\-only; read\-only preview for free tier with a soft blur and a single quiet join line.
- **Teacher profile:** portrait, lineage line ("Vipassana · Goenka tradition"), a serif quote, their courses, their 90/10 dāna button, "Teaches in the Sangha Circle" badge. Teacher cards in the catalog show name \+ small avatar under the course title.
- **Player:** full\-screen audio player — album\-art blur backdrop, breathing progress ring instead of a bar, 15s skip, sleep timer, download (members). Video lessons: edge\-to\-edge player, lesson list as a bottom sheet, subtle "continue where you left" chip.
- **Teacher application ("Teach with us"):** one elegant form (name, lineage, sample link, intent) — the entry point to the $25/mo Sangha Circle after approval.

### Component notes {#component-notes}

Membership state is a quiet gold dot on the Profile tab icon, not a badge shouting "PRO". Locked content shows a thin gold hairline \+ "opens with toUnknown\+" caption — content stays visible (titles, covers, descriptions) so the library sells itself. All motion, color, and type rules from §3 apply unchanged.

### The roots rule (positioning: Insight Timer, curated to ancient traditions only) {#the-roots-rule-positioning-insight-timer-curated-to-ancient-traditions-only}

Every course carries a **Lineage line** — small serif caption under the title: tradition · source text · era (e.g. "Vigyan Bhairav Tantra · Kashmir Shaivism · \~8th c."). The Courses tab gains a second filter row, **Traditions**\: Buddhist · Tantra/Shaiva · Vedanta · Bhakti · Stoic — rendered as quiet serif chips, distinct from the level/audience pills. The catalog should feel like a living library of humanity's contemplative roots, never a content feed. The "Teach with us" form leads with lineage questions: which tradition, trained by whom, which source texts.
