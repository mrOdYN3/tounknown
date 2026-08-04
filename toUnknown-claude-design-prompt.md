# toUnknown — Paste\-Ready Claude Design Prompt {#tounknown-paste-ready-claude-design-prompt}

**How to use:** run `download-images.sh` first (Terminal: `cd ~/Desktop/toUnknown.Com && sh download-images.sh`) → open a Claude chat → **attach the images** from the `images/` folder you want it to use → paste everything below the line. That's the whole ritual.

* * *

## THE PROMPT {#the-prompt}

You are the world's leading product designers and engineers at Apple, crafting the latest iOS flagship app. Build a complete, single\-file web app (all CSS/JS inline, vanilla JS, no frameworks, no localStorage) for **toUnknown — a digital Gurukula**\: a school of ancient meditation traditions. Craft an elegant, modern meditation app with a premium, sophisticated, and mindful aesthetic. Every element must feel intentional, minimal, and beautifully balanced, with exceptional typography, spacing, animations, and interactions. World\-class — an interface the best design agencies would be proud of, setting a new benchmark for meditation app design.

**Design system — the temple in daylight (white, Apple light language):** warm paper\-white background `#FBFAF7→#F5F3ED`; pure\-white cards with 0.5px hairlines `rgba(24,22,16,0.09)` and soft warm shadows; ink `#191813`; ONE accent: temple\-gold (`#A8781F` text, `#D9A441` fills); primary buttons are ink\-black pills with white text; gold is reserved for meaning — seals, gates, dāna, membership. System font stack (SF Pro feel), 34px large\-titles collapsing into a blurred compact header on scroll; serif italic (New York/Georgia) for sacred quotes and lineage lines. 8pt grid, 20–24px radii, translucent white blur on header/tab\-bar/sheets, spring easing cubic\-bezier(0.32,0.72,0,1), a slow 6s breathing gold orb as the app's heartbeat, staggered fade\-ups, sheet modals with grabber handles, respect prefers\-reduced\-motion. Mobile\-first 430px frame centered on an ambient warm desktop backdrop.

**Language — Sanskrit\-first:** Sādhana (practice; profile tab) · Mārga (Paths tab) · Dīkṣā (initiation gate) · Abhyāsa (steady practice — the unlock principle) · Dāna (giving) · Sangha (community) · Satsang (live gathering) · Sādhaka (committed practitioner) · Ācārya (teacher) · **Paramparā (the unbroken teacher\-to\-student chain — every teacher displays theirs)**. Glossary in the FAQ; English glosses beside first uses.

**The product model:** 5 tabs — Home · Mārga · Sangha · Dāna · Sādhana. Four living Paths, each citing tradition · source text · era: Vipassana (Theravāda · Pali Canon · \~5th c. BCE), Tantra (Kashmir Shaivism · Vigyan Bhairav Tantra · \~8th c.), Vedanta (Advaita · Upaniṣads), Bhakti (the way of devotion). Eight more Paths shown as "awaiting its ācārya · apply": Zen, Tibetan/Dzogchen, Rāja Yoga (Patañjali), Sufi, Taoist, Stoic, Hesychast, Kabbalistic. **Tracks unlock by practice, not payment** — each opens after the previous is sat (gold seal: "opens when you have sat …"); a Dīkṣā Gate mid\-Path asks a written reflection and grants the sādhaka seal; the dāna prompt appears AFTER completed practice, never before. Teacher card shows the paramparā chain in gold serif: *Gautama Buddha → Ledi Sayadaw → Saya Thetgyi → Sayagyi U Ba Khin → S.N. Goenka → DYN*.

**Tuition ladder (Dāna tab):** Seeker $0/dāna (first gate of every Path free) · Student toUnknown\+ $11/mo or $88/yr with a "give more if it feels true" slider (only raises, never pressures) · Sādhaka $33/mo — guided circle of max 30 with a teacher, monthly live guidance · Founding $108 once · one\-time dāna chips $5/$11/$22/$54/custom · public scholarship line: "No one is turned away for money." Payment buttons open Stripe Payment Links (placeholders `YOUR_STRIPE_*` as constants); quiet PayPal fallback: https://www.paypal.com/donate?hosted\_button\_id\=H5VQT3VLQBUBJ

**Copy bank (verbatim):** "KNOW THYSELF THROUGH SPIRITUAL STRENGTH" · "this is not religion — this is inner universe" · "WE DON'T GIVE ANSWERS. WE CREATE A SPACE WHERE YOU HEAR YOUR OWN" · "THEREFORE, DON'T TRY" · "You are your OWN masterpiece..." · "These meditations are offered freely — in the spirit of generosity." · "No fixed cost. No pressure. Only presence, and the freedom to give — if it feels true."

**Images (attached — use these files):** `logo.png` (header), `hero-vipassana.jpg` (Home hero with white gradient scrim), `tantra-112-cover.jpg`, `vipassana-part1.jpg`, `himalayan-silence.jpg`, `whispers-of-god.jpg` (the four Path cards — dark scrim at base, white text), `dyn-portrait.jpg` (teacher), `dana.jpg` (Dāna tab), `true-meditation.jpg` (satsang card), `masterpiece.png` ("You are your OWN masterpiece" section), `trustpilot.png`, `community-banner.jpg`, `shiva-meditation.jpg`, `food-detox.jpg`. Reference them as `images/<name>` paths. Every image: object\-fit cover, rounded 20–24px, lazy\-loaded, graceful warm\-gradient fallback.

**Links:** Telegram t.me/tounknowndotcom · Instagram/X/YouTube @tounknowndotcom · Insight Timer insighttimer.com/dyn · Trustpilot trustpilot.com/review/tounknown.com · email tounknown.com@gmail.com · teacher application mailto with subject "Sangha Circle — my paramparā".

**Engineering:** semantic HTML, one h1 per view, ARIA labels, keyboard nav \+ Esc closes sheets, WCAG AA, explicit image dimensions (no CLS), JSON\-LD (Organization, Course ItemList, FAQPage, Person for DYN), Open Graph tags, total JS \< 50KB, works opened directly from the file system.

Polish until an Apple designer would nod: optical alignment, consistent radii, spacing rhythm on the 8pt grid — the whole interface should breathe calm.

* * *

*Note: your current `tounknown-app.html` already implements all of this — use this prompt when you want Claude to regenerate, redesign a screen, or iterate on the design elsewhere.*
