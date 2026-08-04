# tounknown.com — full site backup (before VPS migration)

Captured 2026-08-02 from the live Hostinger/zyrosite site.

## Contents

- `pages/` — all 53 English pages as rendered HTML (homepage = `index.html`), paths mirror the live URLs. Includes every course/product page, blog posts, donation, contact, terms, thank-you. Each page contains the full product data (titles, descriptions, prices, reviews) embedded as JSON — this is the content source for the new site. ES/RU variants were skipped (owner: nothing unique there).
- `assets/` — all 433 images referenced anywhere on the site, downloaded from the zyrosite CDN. Filenames are `<6-char-url-hash>-<original-name>` so different crop sizes of the same image don't collide.
- `sitemap.xml`, `robots.txt` — as served.
- `urls.txt` — the list of English page URLs captured.
- `cdn-assets.txt` — raw list of every CDN asset URL found in the pages.

Related: `../images/` holds the 22 curated brand/course images (clean names) from `download-images.sh` — prefer those for the new build.

## What is NOT here

- **Course audio files.** They are digital store products delivered only after purchase — not publicly downloadable. The masters live with the owner; upload them directly to the new media host (R2/Bunny) during Phase 2.
- Store order history / customer emails — export those from the Hostinger store admin before closing the account.
