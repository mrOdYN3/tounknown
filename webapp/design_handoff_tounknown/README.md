# Handoff: toUnknown — Meditation App (Mobile + Desktop Web)

## Overview
Complete design for **toUnknown**, a "digital Gurukula" — a school of ancient meditation traditions. Five-tab app (Home · Mārga · Sangha · Dāna · Sādhana) with four lineage Paths, practice-based unlocking, a Dīkṣā gate, and a dāna-based tuition ladder. Includes a mobile app design (430px frame) and a desktop web adaptation.

## About the Design Files
The files in this bundle are **design references created in HTML/JSX** — prototypes showing intended look and behavior, not production code to copy directly. Recreate these designs in your target codebase's environment (React Native, SwiftUI, Next.js, etc.) using its established patterns. If no environment exists yet, a React + Tailwind or Next.js app is the natural fit; the JSX components translate almost 1:1.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, and copy are final. Recreate pixel-perfectly.

## Design Language — "the temple in daylight"
- Warm paper-white background: linear-gradient `#FBFAF7 → #F5F3ED`
- Ink: `#191813`; secondary text `rgba(25,24,19,0.62)`; tertiary `rgba(25,24,19,0.4)`
- ONE accent — temple gold: `#A8781F` (text), `#D9A441` (fills/seals); gold is reserved for meaning (seals, gates, dāna, membership, lineage)
- Glass cards: `rgba(255,255,255,0.62)` + `backdrop-filter: blur(20px) saturate(1.5)`, 0.5px hairline `rgba(24,22,16,0.09)`, radius 20–24px, soft warm shadows
- Primary buttons: ink-black **pills** (border-radius 999) with paper-white text, 12px/20px padding, 14px/600
- Spring easing: `cubic-bezier(0.32,0.72,0,1)`; 6s "breathe" scale/opacity cycle on the logo mark; staggered fade-up reveals (22px rise, 70ms stagger, IntersectionObserver)
- Full token set: `tokens/*.css` (98 custom properties — copy verbatim)

## Typography
- **Marcellus** (Google Fonts) — the sacred display serif, always weight 400, always upright (never italic, never bold). Used for: view titles (26–32px), section headings (18–21px), card titles (17px), quotes (17px), lineage lines, the ALL-CAPS inscription moments (tracking 2–3.5px)
- **Albert Sans** (Google Fonts) — UI/body sans. Body 13–13.5px, captions 11–12px, buttons 14px/600
- Eyebrow labels: 11px/600 caps, letter-spacing 0.08–0.14em

## Screens (see `ui_kits/app/`)
- **Home** (`HomeScreen.jsx` / `DesktopScreens.jsx` DHome): dark hero photo with radial vignette, centered white wordmark + tagline "KNOW THYSELF THROUGH SPIRITUAL STRENGTH" (11.5–12.5px, 2.5–3px tracking, Marcellus caps) + subline + 2 pill CTAs; philosophy interlude; FEATURED section (inscription heading, 45°-diamond Nataraja image, two glass course cards); four PathCards; "How it works" StepRows; membership TierCard; social footer
- **Mārga** (`PathsScreen.jsx`): 4 PathCards with progress rings + 8 "awaiting its ācārya" future paths + teacher-application card
- **Sangha** (`SanghaScreen.jsx`): gold-bordered live-satsang card, locked CircleCards, Telegram link
- **Dāna** (`DanaScreen.jsx`): generosity interlude; 4 tuition tiers (Seeker $0 · Student $11/mo–$88/yr with "give more if it feels true" slider · Sādhaka $33/mo · Founding $108 once); one-time dāna chips $5/$11/$22/$54/custom; scholarship line "No one is turned away for money."
- **Sādhana** (`ProfileScreen.jsx`): stats, TeacherCard with gold paramparā chain (Gautama Buddha → … → DYNN), FAQ with Sanskrit glossary, SocialLinks footer
- **Path sheet** (`PathSheet.jsx`): modal sheet with grabber, track StepRows (locked/gate states), dāna-after-practice prompt

## Components (JSX in `components/`)
Button (primary/ghost pills) · Chip (gold/green/neutral) · Orb (breathing gold logo mark, inlined) · Interlude (quote + ornamental gold rule) · SocialLinks (8 thin-stroke glyphs, gold hover) · PathCard (dark scrim image card + progress ring) · TierCard (glass, gold "hot" variant) · StatCard · TeacherCard (paramparā) · CircleCard · StepRow (step/gate/locked) · AppHeader · TabBar · Sheet · Toast · DanaChips · GiveSlider. Each has a `.d.ts` props contract and `.prompt.md` usage note.

## Interactions
- Tab switch: instant scroll-to-top; reveals re-run per view
- Sheets: slide-up with spring, Esc closes, grabber handle
- Hover (desktop): cards lift −3px; social icons ink→gold; nav pills tint
- Respect `prefers-reduced-motion` (all animation off)
- Unlock model: tracks open by practice, never payment; dāna prompt only after completed practice

## Assets (`assets/`)
- `logo-black/gold/white.png` — the trident-tree mark (three colorways)
- `wordmark-black/white.png`, `wordmark.png` — the big stylized wordmark
- `hero-monks.png` — home hero photo
- `images.md` — full CDN manifest of all course/section imagery (zyrosite URLs)
- Social links: Telegram t.me/tounknowndotcom · IG/X/YT @tounknowndotcom · insighttimer.com/dyn · patreon.com/c/tounknowndotcom · trustpilot.com/review/tounknown.com · tounknown.com@gmail.com

## Files
- `readme.md` — full design-system guide (content voice, visual foundations, iconography)
- `styles.css` + `tokens/` — the token layer (link these first)
- `components/**` — all primitives (JSX + .d.ts + prompt.md + specimen cards)
- `ui_kits/app/index.html` — interactive mobile app (open in a browser)
- `ui_kits/app/desktop.html` — interactive desktop version
- `ui_kits/admin/index.html` — Admin Studio (dark CMS)
- `SKILL.md` — Claude Code Agent Skill entry point

## Using this as a Claude Code skill
This folder doubles as an Agent Skill: drop the whole design-system project into `.claude/skills/tounknown-design/` in your repo (SKILL.md is at its root). Claude Code will then read SKILL.md → readme.md → tokens/components when asked to build toUnknown UI.
