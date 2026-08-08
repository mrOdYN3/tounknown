# toUnknown — Project Context for Claude Code

## What this project is

**toUnknown (tounknown.com)** — a "digital Gurukula": a curated school/marketplace of ancient meditation traditions. Positioning: "Insight Timer, but only the roots" — every course cites its lineage (tradition · source text · era); teachers are verified by **paramparā** (the unbroken teacher→student chain). Founder/first teacher: DYN (Vipassana, Goenka & Pa-Auk traditions; paramparā: Gautama Buddha → Ledi Sayadaw → Saya Thetgyi → Sayagyi U Ba Khin → S.N. Goenka → DYN).

## Read these first (in this folder)

1. `toUnknown-marketplace-strategy.md` — business model: tuition ladder, teacher economics, Gurukula model, format focus (audio-first)
2. `toUnknown-design-doc.md` — full design system (white "temple in daylight" theme, Sanskrit naming, screens)
3. `toUnknown-coding-doc.md` — build spec incl. §8 marketplace architecture (Phase 2/3) and the TU_CONFIG contract
4. `toUnknown-claude-design-prompt.md` — condensed design brief
5. `tounknown-app.html` — **working Phase 1 app** (single file). This is the reference implementation of design + UX
6. `tounknown-admin.html` — content studio; exports the `#tu-config` JSON the app consumes
7. `images/` — all brand/site images (run `sh download-images.sh` if missing)

## Core product decisions (do not re-litigate without asking the owner)

- **White, Apple-grade design**: paper-white `#FBFAF7`, ink `#191813`, single temple-gold accent (`#A8781F` text / `#D9A441` fills), ink-black pill buttons, SF-style type, serif italic for sacred lines, spring easing `cubic-bezier(0.32,0.72,0,1)`, breathing gold orb
- **Sanskrit-first UI language**: Sādhana, Mārga, Dīkṣā, Abhyāsa, Dāna, Sangha, Satsang, Sādhaka, Ācārya, Paramparā (glossary in FAQ)
- **Unlock by practice, not payment** (abhyāsa): tracks open sequentially after being sat; Dīkṣā Gates require a written reflection; dāna prompts appear AFTER practice only
- **Tuition ladder**: Seeker $0 · Student $11/mo / $88/yr (+"give more if it feels true" slider, raises only) · Sādhaka $33/mo (guided circle ≤30) · Founding $108 once · retreats/cohorts $108–330 · scholarship: "no one is turned away for money"
- **Teacher economics**: Sangha Circle seat $25/mo (first 3 months free for founding teachers); splits 80/20 one-off sales, 70/30 membership pool by minutes practiced, 90/10 teacher dāna tips; ≤2–3 ācāryas per Path
- **Four living Paths** (Vipassana, Tantra/VBT, Vedanta, Bhakti — DYN) + 8 future Paths shown as "awaiting its ācārya" (Zen, Tibetan, Rāja Yoga, Sufi, Taoist, Stoic, Hesychast, Kabbalistic)
- **No Patreon. No Gumroad.** Membership is owned via Stripe
- Audio-first product; video only as trust layer (satsangs, teacher intros)

## Phase 2 — what to build next (see coding doc §8)

Recommended stack: **Next.js (App Router) + Supabase (magic-link auth, Postgres, RLS) + Stripe Billing** (Checkout + webhooks: `checkout.session.completed`, `customer.subscription.updated/deleted` → `members` table). Media: Cloudflare Stream/R2 or Bunny — **signed URLs minted only for active members**. Port the Phase 1 app's UI 1:1 (it is the design source of truth), moving practice progress (PROG object) from memory into `practice_events` / `unlocks` tables. Keep the Admin Studio's TU_CONFIG shape as the seed for `paths`, `courses`, `teachers` tables.

Phase 3: Stripe Connect Express payouts, teacher dashboard, cohort scheduling, monthly membership-pool payout job from playback minutes.

## Database changes — never hand the owner SQL

Schema changes are applied with `sh server/migrate.sh server/migrate-NN-name.sql`, which runs the
file against the database over psql from the VPS, inside a single transaction. Write the
migration, run it, verify it, and say what changed — do not paste `alter table` into chat and ask
the owner to run it in the Supabase dashboard. That was the old habit and it was wrong: it put a
step that belongs in version control into a web form, and it stalled work every time.

The connection string is `DATABASE_URL` in `/opt/tu-api/env`, beside the Supabase and Stripe
keys. It is never committed. If `migrate.sh` reports it missing, that is the only case where the
owner is asked for anything — one line, once.

Two things the schema will bite on, both learned the hard way:
- `UPDATE` on `members` is granted **column by column**. A new column a member must write needs
  `grant update (col) on public.members to authenticated;` in the same migration, or the read
  succeeds, the write returns 42501, and it looks like an app bug.
- A `select` naming a column that does not exist 400s the whole request. Never fold a new column
  into `loadMember`'s select — probe for it separately, so a missing migration cannot take
  sign-in down.

## Never leave a hard edge

Nothing in this product ends in a straight cut. Where a photograph meets paper, where a section
meets the next, where a scroll strip runs off the side — it fades. A visible seam is the single
thing that makes an interface look assembled rather than made.

Prefer `mask-image` over an overlaid gradient. An overlay only guesses at the colour beneath it
and shows a seam wherever the guess is wrong — over glass, over a gradient, in the other theme.
A mask fades the element's own alpha, so whatever is behind simply arrives, at any opacity and on
any ground:

```
WebkitMaskImage: "linear-gradient(180deg,#000 0%,#000 46%,rgba(0,0,0,0) 100%)",
maskImage:       "linear-gradient(180deg,#000 0%,#000 46%,rgba(0,0,0,0) 100%)",
```

The same applies to motion: things arrive and leave, they do not appear and vanish. Transitions
use `--ease-spring` or `--ease-out`, never `linear`, and always honour `prefers-reduced-motion`.

## Conventions

- SEO/AEO matters: JSON-LD (Organization, Course, FAQPage, Person), answer-first copy, entity-rich lineage text, llms.txt
- Accessibility: WCAG AA, 44px targets, keyboard nav, prefers-reduced-motion
- Tone: calm, non-salesy, never guilt or urgency; dāna spirit everywhere
- Owner contact: tounknown.com@gmail.com · PayPal fallback link and social URLs are in the app config
