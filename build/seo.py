#!/usr/bin/env python3
"""Generate the crawlable layer for tounknown.com.

The app is client-rendered: without JavaScript a crawler sees a title and nothing else,
and most AI crawlers do not execute JavaScript at all. So at deploy time we read the live
catalogue and write real HTML — a page per Path, a full FAQ, an index, a sitemap and an
llms.txt — all linking into the app. Same facts, served two ways.

    python3 build/seo.py <outdir>
"""
import html, json, os, ssl, subprocess, sys, urllib.request

SB = "https://qugmxlqtvqhpatprhsgu.supabase.co"
KEY = "sb_publishable_bLnUokPSRrPY8fh0IEAE8Q__Hl5J6T_"
SITE = "https://tounknown.com"
OUT = sys.argv[1] if len(sys.argv) > 1 else "seo-out"


# This machine's Python has no CA bundle wired up; curl does, and is always present.
def api(path):
    out = subprocess.run(["curl", "-s", "--fail", "--max-time", "60",
                          SB + "/rest/v1/" + path, "-H", "apikey: " + KEY],
                         capture_output=True, text=True)
    if out.returncode != 0:
        raise SystemExit("could not read the catalogue: " + (out.stderr or "curl failed"))
    return json.loads(out.stdout)


def esc(s):
    return html.escape(str(s or ""), quote=True)


def mins(sec):
    sec = int(sec or 0)
    h, m = sec // 3600, (sec % 3600) // 60
    return (f"{h} h {m} min" if h else f"{m} min")


# ---------------------------------------------------------------- catalogue --
paths = api("paths?order=sort&select=id,title,tradition,source,description,cover_url,status,kind,lang")
courses = api("courses?order=sort&select=id,path_id,title,description,cover_url,free,is_trial,lang")
tracks = api("tracks?order=sort&select=id,course_id,title,seconds,is_sitting,is_gate,free_preview&limit=2000")

by_course = {}
for t in tracks:
    by_course.setdefault(t["course_id"], []).append(t)
by_path = {}
for c in courses:
    c["tracks"] = by_course.get(c["id"], [])
    c["seconds"] = sum(int(t.get("seconds") or 0) for t in c["tracks"])
    c["sittings"] = sum(1 for t in c["tracks"] if t.get("is_sitting"))
    by_path.setdefault(c["path_id"], []).append(c)

LANG = os.environ.get("TU_LANG", "en")
paths = [p for p in paths if (p.get("lang") or "en") == LANG]

TOTAL_TRACKS = sum(len(c["tracks"]) for p in paths for c in by_path.get(p["id"], []))
TOTAL_SECONDS = sum(c["seconds"] for p in paths for c in by_path.get(p["id"], []))
TOTAL_SITTINGS = sum(c["sittings"] for p in paths for c in by_path.get(p["id"], []))

# ---------------------------------------------------------------------- FAQ --
# Answer-first, written the way someone actually asks. These feed both the visible page
# and the FAQPage structured data, so Google and an assistant read the same words.
FAQ = [
  ("Is toUnknown free?",
   "Partly, and honestly. The whole first course of the Vipassana Path is free forever, as is a "
   "15-minute taster that needs no account. Every other Path opens with free introductions you can "
   "listen to before deciding. Membership ($11/month or $88/year) opens the full library of "
   "{sittings} guided sittings. No one is turned away for money — a single honest paragraph to "
   "tounknown.com@gmail.com is enough to be given full access."),
  ("Does meditating actually make the subscription cheaper?",
   "Yes — that is the model. Sit on 20 days in a month and the next month costs 25% less; 25 days, half price; every day, and the next month is free. The free month can be kept or given to someone who cannot pay. It is counted at the end of the month, so a missed day costs nothing and there is no streak to break. Only completed guided sittings count, not talks — the discount follows practice, not listening."),
  ("What makes toUnknown different from Headspace, Calm or Insight Timer?",
   "Every course names its lineage — the tradition, the source text and the era it comes from — "
   "and every teacher names their paramparā, the unbroken chain of teachers behind them. Nothing "
   "is invented for the app. And courses unlock by practice rather than by payment: a sitting "
   "opens only after you have genuinely sat the one before it, verified by elapsed time, so the "
   "track cannot be skipped. And practice lowers the price rather than being irrelevant to it: the more you sit, the less the next month costs."),
  ("What does 'unlock by practice, not payment' mean?",
   "Each guided sitting opens only once you have actually sat the previous one. The server checks "
   "elapsed time, so scrubbing to the end of a track does not open the next. Introductions and "
   "talks are always open to listen to — only the guided meditations form the chain. It is how a "
   "retreat works, and how a living lineage transmits."),
  ("Which meditation traditions are taught?",
   "Five living Paths: Vipassana (Theravāda Buddhism, Pali Canon, ~5th c. BCE), Tantra (Kashmir "
   "Shaivism, Vigyan Bhairav Tantra, ~8th c.), Vedanta (Advaita, Upaniṣadic non-duality), Bhakti "
   "Yoga (the way of devotion) and the Stoic practice from the Meditations of Marcus Aurelius "
   "(2nd c. CE). There is also a Kids & Family collection for ages 6–12."),
  ("Can I learn Vipassana at home, on my own?",
   "Yes. The Vipassana Path is built for self-practice at home: fifteen minutes in the morning and "
   "fifteen in the evening. It begins with Anapanasati — awareness of breathing — then moves "
   "through Sīla (moral conduct), Samādhi (concentration) and Paññā (insight), the three "
   "traditional pillars. A free 15-minute taster lets you find out whether sitting suits you "
   "before committing."),
  ("Who is DYNN?",
   "DYNN is the founder and first teacher of toUnknown, practising in the Vipassana tradition of "
   "S.N. Goenka and Pa-Auk. The paramparā is Gautama Buddha → Ledi Sayadaw → Saya Thetgyi → "
   "Sayagyi U Ba Khin → S.N. Goenka → DYNN. Over twenty Vipassana courses and retreats in more "
   "than fifteen countries; Hatha Yoga since 2017, Ashtanga since 2020."),
  ("What is a Dīkṣā Gate?",
   "A threshold inside a Path. Before the deeper material opens, you are asked to put your "
   "practice into your own words — a written reflection of at least a paragraph, read by a "
   "teacher rather than scored by software. It marks the point where a curious listener becomes "
   "a sādhaka, a committed practitioner."),
  ("Do I need to be Buddhist, or religious at all?",
   "No. These are contemplative techniques, not beliefs, and they are taught as methods you test "
   "in your own experience. The app's own line is: this is not religion, this is inner universe. "
   "The traditions are named honestly so you know where a practice comes from — not so you have "
   "to adopt anything."),
  ("How long are the meditations?",
   "Most guided sittings run 14–20 minutes, with a 15-minute taster to begin. The full library is "
   "{tracks} tracks and roughly {hours} hours across {courses} courses. Introductions and talks "
   "vary from a couple of minutes to a full lecture."),
  ("Can I download meditations for offline practice?",
   "Not yet — sittings stream and need a connection. Offline practice is on the list; if it "
   "matters to you, say so at tounknown.com@gmail.com and it moves up."),
  ("Is there a course for children?",
   "Yes. The Kids & Family Grove holds short guided meditations and stories for ages 6–12 — "
   "including Home Alone Meditations and Santa's Mindful Christmas — designed for a child and "
   "whoever sits beside them."),
  ("Is meditation safe? Can it be harmful?",
   "Meditation is education and practice, not medical or psychological treatment. It can surface "
   "difficult material, especially in intensive practice. If you are unwell, in crisis, or under "
   "a clinician's care, speak with them before beginning. Practise with care and stop if you need "
   "to."),
  ("Can I cancel my membership?",
   "Any time, from your own billing page inside the app — no email required. Access continues to "
   "the end of the period you have already paid for. If a charge was a mistake, write to us and "
   "it will be refunded."),
  ("Is the course available in Russian?",
   "Yes. A Russian version of the app is at tounknown.com/ru, and there is a Russian Vipassana "
   "site at vipassana.tounknown.com covering the same self-practice course."),
]
FACTS = dict(sittings=TOTAL_SITTINGS, tracks=TOTAL_TRACKS,
             hours=round(TOTAL_SECONDS / 3600), courses=len(courses))
FAQ = [(q, a.format(**FACTS)) for q, a in FAQ]

# ------------------------------------------------------------------- shell --
CSS = """
:root{--paper-1:#FBFAF7;--paper-2:#F4F2EC;--ink:#191813;--text-secondary:#57544B;
--text-tertiary:#8C887C;--gold-deep:#A8781F;--hairline:rgba(24,22,16,.10)}
*{box-sizing:border-box}
body{margin:0;background:linear-gradient(180deg,var(--paper-1),var(--paper-2));color:var(--ink);
font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.6}
.wrap{max-width:780px;margin:0 auto;padding:48px 22px 88px}
a{color:var(--gold-deep)}
h1{font-family:Marcellus,Georgia,serif;font-weight:400;font-size:clamp(30px,5vw,44px);letter-spacing:-.03em;margin:0 0 10px;line-height:1.1}
h2{font-family:Marcellus,Georgia,serif;font-weight:400;font-size:clamp(21px,3vw,28px);letter-spacing:-.02em;margin:40px 0 12px}
h3{font-size:17px;margin:28px 0 6px;letter-spacing:-.01em}
p,li{color:var(--text-secondary)}
.eyebrow{font:600 11px/1.4 system-ui;text-transform:uppercase;letter-spacing:.16em;color:var(--gold-deep);margin:0 0 14px}
.lede{font-size:18px;color:var(--ink)}
.card{border:0.5px solid var(--hairline);border-radius:18px;padding:20px 22px;margin:14px 0;background:rgba(255,255,255,.6)}
.meta{font-size:13px;color:var(--text-tertiary);margin:4px 0 0}
.cta{display:inline-flex;align-items:center;min-height:48px;padding:0 24px;border-radius:999px;
background:var(--ink);color:var(--paper-1);text-decoration:none;font-weight:600;font-size:14px;margin:8px 8px 0 0}
.cta.ghost{background:rgba(24,22,16,.06);color:var(--ink)}
ol,ul{padding-left:20px}
footer{margin-top:56px;padding-top:22px;border-top:.5px solid var(--hairline);font-size:13px;color:var(--text-tertiary)}
details{border-bottom:.5px solid var(--hairline);padding:14px 0}
summary{cursor:pointer;font-weight:600;color:var(--ink);font-size:15.5px}
details p{margin:10px 0 0}
"""


def page(title, desc, body, canonical, jsonld=None, lang="en", extra_head="", og_image=None):
    ld = ("\n".join('<script type="application/ld+json">%s</script>' % json.dumps(j, ensure_ascii=False)
                    for j in (jsonld or [])))
    return f"""<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{canonical}">
<meta name="theme-color" content="#FBFAF7">
<link rel="icon" href="/ds/assets/logo-black.png">
<meta property="og:type" content="website">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{og_image or (SITE + '/ds/assets/monk-bowl.jpg')}">
<meta property="og:site_name" content="toUnknown">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@tounknowndotcom">
<link href="https://fonts.googleapis.com/css2?family=Marcellus&display=swap" rel="stylesheet">
<script defer src="https://cloud.umami.is/script.js" data-website-id="b1c487e5-6ce5-40dc-8415-abc06da1f15e"></script>
<style>{CSS}</style>
{extra_head}
{ld}
</head>
<body><div class="wrap">
{body}
<footer>
  <p><a href="/">toUnknown</a> · <a href="/faq">FAQ</a> · <a href="/paths/">All Paths</a> ·
     <a href="/ru">Русский</a> · <a href="/legal.html">Terms &amp; privacy</a></p>
  <p>© 2026 toUnknown · <a href="mailto:tounknown.com@gmail.com">tounknown.com@gmail.com</a></p>
</footer>
</div></body></html>"""


ORG = {"@context": "https://schema.org", "@type": "Organization", "@id": SITE + "/#org",
       "name": "toUnknown", "url": SITE + "/", "logo": SITE + "/ds/assets/logo-black.png",
       "email": "tounknown.com@gmail.com",
       "description": "A digital Gurukula: guided meditation courses rooted in living contemplative "
                      "traditions. Every course names its lineage — tradition, source text, era.",
       "sameAs": ["https://t.me/tounknowndotcom", "https://instagram.com/tounknowndotcom",
                  "https://twitter.com/tounknowndotcom", "https://www.youtube.com/@tounknowndotcom",
                  "https://insighttimer.com/dyn"]}

PERSON = {"@context": "https://schema.org", "@type": "Person", "@id": SITE + "/#dynn",
          "name": "DYNN", "jobTitle": "Meditation teacher", "worksFor": {"@id": SITE + "/#org"},
          "description": "Founder and first teacher of toUnknown. Vipassana in the S.N. Goenka and "
                         "Pa-Auk traditions; paramparā: Gautama Buddha → Ledi Sayadaw → Saya Thetgyi "
                         "→ Sayagyi U Ba Khin → S.N. Goenka → DYNN.",
          "knowsAbout": ["Vipassana", "Anapanasati", "Vigyan Bhairav Tantra", "Advaita Vedanta",
                         "Bhakti Yoga", "Stoicism", "Mindfulness"]}


def course_ld(p, c):
    free = bool(c.get("free") or c.get("is_trial"))
    return {"@context": "https://schema.org", "@type": "Course",
            "name": c["title"], "description": (c.get("description") or "")[:900],
            "url": f"{SITE}/paths/{p['id']}",
            "inLanguage": "en", "provider": {"@id": SITE + "/#org"},
            "about": f"{p['tradition']} · {p['source']}",
            "teaches": p.get("description") or p["title"],
            "isAccessibleForFree": free,
            "hasCourseInstance": {"@type": "CourseInstance", "courseMode": "online",
                                  "courseWorkload": "PT%dM" % max(1, c["seconds"] // 60),
                                  "instructor": {"@id": SITE + "/#dynn"}},
            "offers": {"@type": "Offer", "category": "Free" if free else "Subscription",
                       "price": "0" if free else "11", "priceCurrency": "USD",
                       "availability": "https://schema.org/InStock"}}


os.makedirs(OUT, exist_ok=True)
os.makedirs(os.path.join(OUT, "paths"), exist_ok=True)
os.makedirs(os.path.join(OUT, "faq"), exist_ok=True)
urls = [(SITE + "/", "1.0"), (SITE + "/faq", "0.9"), (SITE + "/paths/", "0.9"), (SITE + "/ru", "0.8")]

# ------------------------------------------------------------- path pages --
living = [p for p in paths if p.get("status") == "living"]
for p in living:
    cs = by_path.get(p["id"], [])
    secs = sum(c["seconds"] for c in cs)
    sits = sum(c["sittings"] for c in cs)
    body = [f'<p class="eyebrow">{esc(p["tradition"])} · {esc(p["source"])}</p>',
            f'<h1>{esc(p["title"])}</h1>',
            f'<p class="lede">{esc(p.get("description"))}</p>',
            f'<p class="meta">{sits} guided sittings · {mins(secs)} · {len(cs)} '
            f'course{"s" if len(cs) != 1 else ""} · taught by DYNN</p>',
            f'<p><a class="cta" href="/">Open this Path in the app</a>'
            f'<a class="cta ghost" href="/faq">How unlocking works</a></p>',
            "<h2>Courses on this Path</h2>"]
    for c in cs:
        tag = " · free" if c.get("free") else ""
        tag = " · free taster" if c.get("is_trial") else tag
        body.append(f'<div class="card"><h3>{esc(c["title"])}</h3>'
                    f'<p class="meta">{c["sittings"]} sittings · {mins(c["seconds"])}{tag}</p>'
                    f'<p>{esc((c.get("description") or "")[:420])}</p></div>')
    # the track list is the entity-rich part — what a search engine and an assistant read
    body.append("<h2>Every sitting on this Path</h2><ol>")
    for c in cs:
        for t in c["tracks"]:
            kind = "gate" if t.get("is_gate") else ("sitting" if t.get("is_sitting") else "introduction")
            body.append(f'<li>{esc(t["title"])} <span class="meta">— {mins(t.get("seconds"))} · {kind}</span></li>')
    body.append("</ol>")

    ld = [ORG, PERSON] + [course_ld(p, c) for c in cs]
    ld.append({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "toUnknown", "item": SITE + "/"},
        {"@type": "ListItem", "position": 2, "name": "Paths", "item": SITE + "/paths/"},
        {"@type": "ListItem", "position": 3, "name": p["title"], "item": f"{SITE}/paths/{p['id']}"}]})
    title = f'{p["title"]} — {p["tradition"]} guided meditation online | toUnknown'
    desc = f'{p.get("description")} {sits} guided sittings from {p["source"]}. First course free.'
    os.makedirs(os.path.join(OUT, "paths", p["id"]), exist_ok=True)
    cover = (p.get("cover_url") or "").split("?")[0]
    if cover.startswith("../../"):
        cover = SITE + "/ds/" + cover[6:]
    elif not cover.startswith("http"):
        cover = None
    open(os.path.join(OUT, "paths", p["id"], "index.html"), "w", encoding="utf-8").write(
        page(title, desc[:300], "\n".join(body), f"{SITE}/paths/{p['id']}", ld, og_image=cover))
    urls.append((f"{SITE}/paths/{p['id']}", "0.8"))

# ------------------------------------------------------------- paths index --
idx = ['<p class="eyebrow">the living paths</p>', "<h1>All meditation Paths</h1>",
       f'<p class="lede">{len(living)} Paths · {TOTAL_SITTINGS} guided sittings · '
       f'{round(TOTAL_SECONDS/3600)} hours. Every Path names its tradition, source text and era.</p>']
for p in living:
    cs = by_path.get(p["id"], [])
    idx.append(f'<div class="card"><h3><a href="/paths/{p["id"]}">{esc(p["title"])}</a></h3>'
               f'<p class="meta">{esc(p["tradition"])} · {esc(p["source"])}</p>'
               f'<p>{esc(p.get("description"))}</p>'
               f'<p class="meta">{sum(c["sittings"] for c in cs)} sittings · {mins(sum(c["seconds"] for c in cs))}</p></div>')
item_ld = {"@context": "https://schema.org", "@type": "ItemList",
           "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": p["title"],
                                "url": f"{SITE}/paths/{p['id']}"} for i, p in enumerate(living)]}
open(os.path.join(OUT, "paths", "index.html"), "w", encoding="utf-8").write(
    page("All meditation Paths — Vipassana, Tantra, Vedanta, Bhakti, Stoic | toUnknown",
         f"{len(living)} guided meditation Paths rooted in living traditions. "
         f"{TOTAL_SITTINGS} sittings, {round(TOTAL_SECONDS/3600)} hours. First course of every Path free.",
         "\n".join(idx), SITE + "/paths/", [ORG, item_ld]))

# -------------------------------------------------------------------- FAQ --
fb = ['<p class="eyebrow">questions</p>', "<h1>Frequently asked questions</h1>",
      '<p class="lede">About the practice, the traditions, access and money — answered plainly.</p>']
for q, a in FAQ:
    fb.append(f"<details open><summary>{esc(q)}</summary><p>{esc(a)}</p></details>")
fb.append('<p style="margin-top:28px"><a class="cta" href="/">Start sitting — free</a>'
          '<a class="cta ghost" href="/paths/">Browse the Paths</a></p>')
faq_ld = {"@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": [{"@type": "Question", "name": q,
                          "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in FAQ]}
open(os.path.join(OUT, "faq", "index.html"), "w", encoding="utf-8").write(
    page("Meditation FAQ — how toUnknown works, what it costs, which traditions | toUnknown",
         "Answers about guided meditation at toUnknown: what is free, how courses unlock by practice, "
         "which traditions are taught, who DYNN is, and whether meditation is safe.",
         "\n".join(fb), SITE + "/faq", [ORG, faq_ld]))

# ------------------------------------------------------------- membership --
TIERS = [
  ("Seeker", "0", "Vipassana's first course free forever, the introductions of every Path, and a "
   "15-minute taster that needs no account.",
   ["First gate of every Path — free forever", "Community, read-only", "Give only if it feels true"]),
  ("Student", "11", "Every Path, unlocked by your practice — the full library of guided sittings. "
   "$11 a month or $88 a year.",
   ["Every Path, unlocked by your practice", "The full library of guided sittings",
    "Sangha participation as the circle opens"]),
  ("Sādhaka", "33", "Everything in Student, plus your place in the first guided circle — no more "
   "than thirty with a lineage teacher — when it opens, and your gate reflections read by a teacher.",
   ["Everything in Student", "A place in the first guided circle — max 30, when it opens",
    "Monthly live guidance once the circle is running",
    "Your gate reflections read by a teacher"]),
  ("Founding member", "108", "Lifetime Student membership, paid once — you keep the library "
   "whatever happens next.", ["Lifetime Student membership", "Paid once, never renewed"]),
]
mb = ['<p class="eyebrow">the tuition ladder</p>', "<h1>Membership &amp; dāna</h1>",
      '<p class="lede">Giving is dāna — you give because the practice was worth something, not to '
      'obtain it. And practice lowers the price: sit on 20 days in a month and the next is 25% '
      'less, 25 days half, every day free — kept or given away. No one is turned away for money.</p>']
prod_ld = []
for name, price, blurb, bullets in TIERS:
    mb.append(f'<div class="card"><h3>{esc(name)} — '
              + ("free" if price == "0" else f"${price}") + "</h3>"
              f"<p>{esc(blurb)}</p><ul>" + "".join(f"<li>{esc(b)}</li>" for b in bullets) + "</ul></div>")
    prod_ld.append({"@context": "https://schema.org", "@type": "Product",
        "name": f"toUnknown · {name}", "description": blurb,
        "image": SITE + "/ds/assets/monk-bowl.jpg",
        "brand": {"@type": "Brand", "name": "toUnknown"},
        "category": "Education > Meditation",
        "url": SITE + "/membership",
        "offers": {"@type": "Offer", "price": price, "priceCurrency": "USD",
                   "availability": "https://schema.org/InStock",
                   "url": SITE + "/membership",
                   "seller": {"@id": SITE + "/#org"}}})
mb.append('<p><a class="cta" href="/">Open the app</a><a class="cta ghost" href="/faq">Read the FAQ</a></p>')
os.makedirs(os.path.join(OUT, "membership"), exist_ok=True)
open(os.path.join(OUT, "membership", "index.html"), "w", encoding="utf-8").write(
    page("Membership & dāna — $11/month, with free courses and introductions | toUnknown",
         "toUnknown membership: Student $11/month or $88/year, Sādhaka $33/month, Founding $108 once. "
         "Vipassana's first course is free forever, every Path opens with free introductions, "
         "and no one is turned away for money.",
         "\n".join(mb), SITE + "/membership", [ORG] + prod_ld))
urls.append((SITE + "/membership", "0.8"))

# Google Merchant Center is deliberately NOT fed. Shopping requires each item to be bought
# individually at the listed price on its landing page; toUnknown sells recurring memberships,
# has a $0 tier, and bills in USD from a EUR/Spain account — every item was rejected. The
# Product/Offer schema on /membership delivers the organic-search benefit without the feed.
# If single-course purchase is ever built, generate the feed from those courses, in EUR.

# ---------------------------------------------------------------- sitemap --
# Google reads lastmod to decide what to recrawl; image entries help the covers surface in
# Google Images, which is where a lot of meditation searches actually begin.
import datetime, subprocess
TODAY = subprocess.run(["date", "-u", "+%Y-%m-%d"], capture_output=True, text=True).stdout.strip()

def url_entry(loc, pri, images=(), changefreq="weekly"):
    out = [f"<url><loc>{loc}</loc>", f"<lastmod>{TODAY}</lastmod>",
           f"<changefreq>{changefreq}</changefreq>", f"<priority>{pri}</priority>",
           f'<xhtml:link rel="alternate" hreflang="en" href="{SITE}/"/>',
           f'<xhtml:link rel="alternate" hreflang="ru" href="{SITE}/ru"/>',
           f'<xhtml:link rel="alternate" hreflang="x-default" href="{SITE}/"/>']
    for src, cap in images:
        if src.startswith("../../"):
            src = SITE + "/ds/" + src[6:]
        if src.startswith("http"):
            out.append(f"<image:image><image:loc>{esc(src.split('?')[0])}</image:loc>"
                       f"<image:caption>{esc(cap)}</image:caption></image:image>")
    out.append("</url>")
    return "".join(out)

sm = ['<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
      'xmlns:xhtml="http://www.w3.org/1999/xhtml" '
      'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">']
sm.append(url_entry(SITE + "/", "1.0", [(p_.get("cover_url") or "", p_["title"]) for p_ in living], "daily"))
sm.append(url_entry(SITE + "/ru", "0.9", [], "weekly"))
sm.append(url_entry(SITE + "/faq", "0.9"))
sm.append(url_entry(SITE + "/paths/", "0.9"))
for p_ in living:
    imgs = [(p_.get("cover_url") or "", p_["title"])] + \
           [(c.get("cover_url") or "", c["title"]) for c in by_path.get(p_["id"], [])]
    sm.append(url_entry(f"{SITE}/paths/{p_['id']}", "0.8", imgs))
sm.append(url_entry(SITE + "/legal.html", "0.3", changefreq="yearly"))
sm.append("</urlset>")
open(os.path.join(OUT, "sitemap.xml"), "w", encoding="utf-8").write("\n".join(sm))

# an index so one submission in Search Console covers all three domains
open(os.path.join(OUT, "sitemap-index.xml"), "w", encoding="utf-8").write(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    f"<sitemap><loc>{SITE}/sitemap.xml</loc><lastmod>{TODAY}</lastmod></sitemap>\n"
    "<sitemap><loc>https://vipassana.tounknown.com/sitemap.xml</loc>"
    f"<lastmod>{TODAY}</lastmod></sitemap>\n"
    "<sitemap><loc>https://nft.tounknown.com/sitemap.xml</loc>"
    f"<lastmod>{TODAY}</lastmod></sitemap>\n"
    "</sitemapindex>\n")

# --------------------------------------------------------------- llms.txt --
lines = ["# toUnknown", "",
         "> A digital Gurukula — guided meditation courses rooted in living contemplative traditions.",
         "> Every course names its lineage: tradition, source text, era. Unlock by practice, not payment.",
         "", "## Facts",
         f"- {len(living)} living Paths · {len(courses)} courses · {TOTAL_TRACKS} tracks · "
         f"{TOTAL_SITTINGS} guided sittings · ~{round(TOTAL_SECONDS/3600)} hours",
         "- Teacher: DYNN. Paramparā: Gautama Buddha → Ledi Sayadaw → Saya Thetgyi → Sayagyi U Ba Khin → S.N. Goenka → DYNN",
         "- Languages: English (tounknown.com) and Russian (tounknown.com/ru, vipassana.tounknown.com)",
         "", "## Access",
         "- The Vipassana Path's first course is free forever; a 15-minute taster needs no account.",
         "- Every other Path opens with free introductions; its guided sittings need membership.",
         "- Membership: Student $11/month or $88/year · Sādhaka $33/month (a place in the first guided circle, max 30, when it opens) · Founding $108 once.",
         "- Scholarships: no one is turned away for money — write to tounknown.com@gmail.com.",
         "- Practice lowers the price: 20 days sat in a month = 25% off the next month, 25 days = 50%,",
         "  every day = free. The free month may be kept or given to someone who cannot pay.",
         "  Counted at month end; a missed day costs nothing. Only completed guided sittings count.",
         "- Unlocking is by practice: a sitting opens only after the previous one has genuinely been sat",
         "  (verified by elapsed time, so scrubbing does not work). Introductions and talks are always open.",
         "- Dīkṣā Gates: before deeper material, a written reflection is read by a teacher.",
         "", "## Paths"]
for p in living:
    cs = by_path.get(p["id"], [])
    lines.append(f"### {p['title']} — {p['tradition']} · {p['source']}")
    lines.append(f"{p.get('description')}")
    lines.append(f"{sum(c['sittings'] for c in cs)} sittings · {mins(sum(c['seconds'] for c in cs))} · {SITE}/paths/{p['id']}")
    for c in cs:
        lines.append(f"- {c['title']} — {c['sittings']} sittings, {mins(c['seconds'])}"
                     + (" (free)" if c.get("free") else ""))
    lines.append("")
lines += ["## FAQ"]
for q, a in FAQ:
    lines += [f"### {q}", a, ""]
lines += ["## Contact", "tounknown.com@gmail.com · https://t.me/tounknowndotcom"]
open(os.path.join(OUT, "llms.txt"), "w", encoding="utf-8").write("\n".join(lines))

# ------------------------------------------------- homepage crawlable copy --
# The app is the homepage, and it renders client-side. This fragment is injected into the
# root page inside <noscript> — genuinely useful to anyone without JavaScript, and the only
# thing an AI crawler that does not execute scripts will ever read there.
ns = ['<div style="max-width:780px;margin:0 auto;padding:40px 22px;font-family:system-ui;line-height:1.6">',
      "<h1>toUnknown — guided meditation from living traditions</h1>",
      f"<p>A digital Gurukula: {len(living)} meditation Paths, {len(courses)} courses and "
      f"{TOTAL_SITTINGS} guided sittings ({round(TOTAL_SECONDS/3600)} hours), each naming its "
      "tradition, source text and era. Taught by DYNN in the Vipassana lineage of S.N. Goenka "
      "and Pa-Auk. Courses unlock by practice, not payment. Vipassana's first course is "
      "free, and no one is turned away for money.</p>",
      "<h2>The Paths</h2><ul>"]
for p_ in living:
    cs = by_path.get(p_["id"], [])
    ns.append(f'<li><a href="/paths/{p_["id"]}"><b>{esc(p_["title"])}</b></a> — '
              f'{esc(p_["tradition"])} · {esc(p_["source"])}. {esc(p_.get("description"))} '
              f'{sum(c["sittings"] for c in cs)} sittings.</li>')
ns.append("</ul>")
ns.append('<h2>Common questions</h2>')
for q, a in FAQ[:6]:
    ns.append(f"<h3>{esc(q)}</h3><p>{esc(a)}</p>")
ns.append('<p><a href="/paths/">All Paths</a> · <a href="/faq">Full FAQ</a> · '
          '<a href="/ru">Русская версия</a> · <a href="/legal.html">Terms &amp; privacy</a></p>')
ns.append("</div>")
open(os.path.join(OUT, "_noscript.html"), "w", encoding="utf-8").write("\n".join(ns))

# -------------------------------------------------------------- IndexNow --
# Bing, Yandex, Seznam and Naver accept a direct "these URLs changed" ping. Google does not
# (it discovers via robots.txt + sitemap), so this covers the engines that will listen.
INDEXNOW_KEY = "ecbce6102236f6bfba779797e9610b47"
open(os.path.join(OUT, INDEXNOW_KEY + ".txt"), "w").write(INDEXNOW_KEY)
open(os.path.join(OUT, "_indexnow_urls.txt"), "w").write("\\n".join(u for u, _ in urls))

# ---------------------------------------------------------------- robots --
open(os.path.join(OUT, "robots.txt"), "w", encoding="utf-8").write(
    "User-agent: *\nAllow: /\nDisallow: /api/\n\n"
    "# AI crawlers are welcome — the catalogue is public and llms.txt summarises it.\n"
    "User-agent: GPTBot\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\n"
    "User-agent: PerplexityBot\nAllow: /\nUser-agent: Google-Extended\nAllow: /\n\n"
    f"Sitemap: {SITE}/sitemap.xml\nSitemap: {SITE}/sitemap-index.xml\n")

print(f"  paths pages : {len(living)}")
print(f"  faq entries : {len(FAQ)}")
print(f"  sitemap urls: {len(urls)+2}")
print(f"  llms.txt    : {len(open(os.path.join(OUT,'llms.txt'),encoding='utf-8').read())//1024} KB")
