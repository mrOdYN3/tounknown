# toUnknown — Design System

**toUnknown** (tounknown.com) is a donation-based "digital Gurukula" — a school of ancient meditation traditions (Vipassana, Vigyan Bhairav Tantra, Advaita Vedanta, Bhakti Yoga), taught by lineage teachers, led by founder/teacher **DYN**. Paths unlock by *practice, not payment* (abhyāsa); giving is *dāna* — voluntary, after practice, never before. "No one is turned away for money."

## Sources
- Local codebase `~/Desktop/toUnknown.Com/` (mounted read-only):
  - `tounknown-app.html` — the flagship mobile web app (light, 430px iOS-style frame). **Ground truth for the design system.**
  - `tounknown-admin.html` — Admin Studio (dark desktop CMS for editing app content).
  - `toUnknown-design-doc.md`, `toUnknown-coding-doc.md`, `toUnknown-marketplace-strategy.md`, `toUnknown-claude-design-prompt.md` — brief, spec, strategy.
  - `download-images.sh` — pulls brand imagery from the zyrosite CDN. **The `images/` folder was not mounted**, so all imagery in this system references the CDN URLs directly (see `assets/images.md`).

## Products
1. **The app** — mobile-first (430px frame on an ambient desktop stage), 5 tabs: Home · Mārga · Sangha · Dāna · Sādhana. Light "temple in daylight" language.
2. **Admin Studio** — dark desktop sidebar CMS, same gold accent and spring motion.

## CONTENT FUNDAMENTALS
- **Voice:** calm, direct, non-dogmatic, quietly confident. The app whispers; it never shouts. Never salesy — no urgency, no countdowns, no fake scarcity, no guilt.
- **Sanskrit-first naming**, each term introduced once with an English gloss, then used consistently: Sādhana (practice/profile) · Mārga (paths) · Dīkṣā (the gate) · Abhyāsa (steady practice — the unlock mechanic) · Dāna (giving) · Sangha (community) · Satsang (live gathering) · Sādhaka (committed practitioner) · Ācārya (teacher) · Paramparā (the teacher-to-student chain, shown in gold serif: *Gautama Buddha → … → S.N. Goenka → DYN*).
- **Casing:** brand statements in ALL CAPS ("KNOW THYSELF THROUGH SPIRITUAL STRENGTH"); sublines lowercase serif (Marcellus) ("this is not religion — this is inner universe"). Labels are 11px uppercase tracked. Buttons sentence case ("Begin a Path", "Give with a free heart", "not now").
- **Copy bank (verbatim):** "WE DON'T GIVE ANSWERS. WE CREATE A SPACE WHERE YOU HEAR YOUR OWN" · "THEREFORE, DON'T TRY" · "You are your OWN masterpiece..." · "These meditations are offered freely — in the spirit of generosity." · "No fixed cost. No pressure. Only presence, and the freedom to give — if it feels true." · "Generosity is the root of a connected life."
- **Person:** speaks to "you", softly imperative; the brand is "we" only in philosophy lines. Money language is dignified: "give what feels true", "quietly via PayPal", "a quiet checkout".
- **Emoji:** rare and meaningful only — ☸ (seal), ⛩ (gate), 🙏 (gratitude), 💬 ("WRITE US 💬"). Never decorative confetti.

## VISUAL FOUNDATIONS
- **Color:** warm paper-white bg `#FBFAF7→#F5F3ED`; desktop stage `#ECE9E1` with faint gold/violet radial auras. Pure-white cards. Ink `#191813` (secondary 60%, tertiary 38%). ONE accent: temple-gold — deep `#A8781F` for text/chips (AA on white), bright `#D9A441` for fills and the breathing orb. Gold is reserved for *meaning*: seals, gates, dāna, membership, lineage. Primary buttons are ink-black pills with white text. Semantic green: sage `#5E8A4A`. Dark theme (Admin) `#0B0B10→#101018` with `rgba(255,255,255,0.04)` surfaces.
- **Type:** system SF Pro stack; Large Title 34/700 −0.4px collapsing to a 17/600 compact header on scroll (iOS behavior); Title 22/600; Body 17/400 lh 1.5; Caption 13; Label 11/600 uppercase +0.08em. Serif italic (New York/Georgia) for quotes, lineage lines, and "if it feels true" captions. Timer numerals 40/200 tabular.
- **Space & shape:** 8pt grid; 20px screen gutter; card padding 20–22px. Radii: cards 20px, path/tier cards 24px, hcards 22px, sheets 28px top, buttons 16px (in-app) / 14px inputs, chips full pill.
- **Depth:** 0.5px hairlines `rgba(24,22,16,0.09)` + soft warm layered shadows `rgba(60,50,20,0.06–0.18)` — depth by light, never dark borders. Gold-tinted glow on membership ("hot") cards.
- **Imagery:** rich warm photography (meditators, Himalaya, deities) stays dark against the light page — every photo card carries a dark base scrim `rgba(11,11,16,0.05→0.88)` with white text. Hero photos fade into the paper bg with a white gradient scrim. `object-fit:cover`, rounded 20–24px, lazy, warm-gradient fallback.
- **Glass surfaces (refined):** cards are translucent white glass — rgba(255,255,255,0.62) + blur(20px) saturate(1.5) over the warm paper — Notion-calm density, latest-iOS glassy materials. Type runs small and quiet: view titles 26 (Marcellus), sections 18-21, body 13-13.5.
- **Translucency:** header/tab-bar/sheets are white blur `rgba(251,250,247,0.78–0.96)` + `backdrop-filter: blur(24–30px) saturate(1.8)`.
- **Motion:** transform/opacity only, spring `cubic-bezier(0.32,0.72,0,1)` 320–420ms. The **breathing logo mark** (6s scale 1→1.06, gold on light / white on dark) is the app's heartbeat; the `Orb` component renders this breathing gold mark (inlined) — no gold sphere remains anywhere. Cards press-scale 0.97–0.98; staggered 22px fade-ups on scroll (60ms stagger); sheets slide up with grabber handles; tab switch 200ms fade + 8px slide; gold pulse on the next practice step; donation success = one soft gold pulse, no confetti. Respect `prefers-reduced-motion`.
- **Ancient touches (brand direction):** the interface should feel like rooted, ancient knowledge in a modern vessel — aged-paper warmth (never cold white), the Marcellus inscription serif for anything sacred (quotes, lineage, "if it feels true"), gold ☸ seals and ⛩ gates as ritual markers, paramparā chains typeset in gold serif with → arrows, thin gold hairline rules as manuscript ornaments, lineage lines citing tradition · source text · era under every title. Modern chrome (blur, springs) carries the old content; the old never imitated with fake distressing or parchment textures.
- **Featured pattern (from the live site):** a centered "FEATURED / MEDITATION TECHNIQUES ↓" inscription heading (Marcellus, wide tracking) flanked by a 45°-rotated diamond-clipped deity image — the site's signature ancient-gallery moment. Recreated on Home in both UI kits.
- **Social channels:** Telegram t.me/tounknowndotcom · Instagram/X/YouTube @tounknowndotcom · Insight Timer insighttimer.com/dyn · Patreon patreon.com/c/tounknowndotcom · Trustpilot trustpilot.com/review/tounknown.com · email tounknown.com@gmail.com — rendered by the `SocialLinks` component (thin 1.6-stroke glyphs, gold on hover).
- **Focus:** visible gold rings — `outline:2px solid var(--gold-deep)` or `box-shadow:0 0 0 3px rgba(217,164,65,0.18)`.
- **Layout constants:** sticky blurred header; fixed bottom tab bar (5 tabs, active = gold); 430px frame centered on ambient stage on desktop; safe-area aware.

## ICONOGRAPHY
- **Inline SVG in SF Symbols style**: 23–24px viewBox 24, `stroke:currentColor`, `fill:none`, stroke-width 1.5–1.6, round caps/joins. Hand-drawn per-icon in the source (home, path, sangha, lotus-flame, person) — copied into `assets/icons.svg` sprite + documented in `assets/images.md`. No icon font, no CDN set.
- **Unicode as icons:** ☸ ⛩ ✓ ▶ · for step states and seals; "+" rotating 45° as accordion chevron; → for paramparā chains; ↗ for external links.
- **Logo:** the trident-tree mark, user-provided in three colorways: `assets/logo-black.png` (light surfaces — default), `assets/logo-gold.png` (ceremonial/gold moments), `assets/logo-white.png` (dark surfaces, photo scrims, Admin Studio); plus the big stylized TOUNKNOWN wordmark `assets/wordmark-black.png` / `wordmark-white.png`. Never redraw them.

## Tokens & fonts
`styles.css` → `tokens/{fonts,colors,typography,spacing,effects}.css`. Webfonts (Google Fonts, CDN-linked): **Cormorant Garamond** — the sacred serif (quotes, lineage lines, paramparā chains, dāna captions; old-manuscript elegance for the ancient-roots feel) and **Albert Sans** — the calm humanist UI sans (SF Pro feel, warmer). Fallbacks: system stack + Georgia.

## Index
- `tokens/` — colors, typography, spacing/radii, effects (shadows, blur, motion).
- `assets/` — `icons.svg` sprite, `images.md` CDN image manifest.
- `guidelines/` — foundation specimen cards (Design System tab).
- `components/core/` — Orb, Button, Chip, Interlude
- `components/cards/` — PathCard, TierCard, StatCard, TeacherCard, CircleCard
- `components/lists/` — StepRow
- `components/navigation/` — AppHeader, TabBar
- `components/overlays/` — Sheet, Toast
- `components/dana/` — DanaChips, GiveSlider
- `ui_kits/app/` — the mobile app (Home · Mārga · Sangha · Dāna · Sādhana), interactive.
- `ui_kits/admin/` — Admin Studio (dark CMS: Courses, Teachers, Content, Payments).
- `SKILL.md` — agent skill entry point.
- `thumbnail.html` — homepage tile.

### Intentional additions
- None — the component inventory is lifted 1:1 from `tounknown-app.html`.

### Caveats
- Image binaries live on the zyrosite CDN (not mounted locally); all references are remote URLs. Run `download-images.sh` and attach `images/` to localize them.
