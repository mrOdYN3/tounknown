#!/usr/bin/env python3
"""Build /ru from the freshly built English root.

Runs on the server, after the root index.html exists. The Russian page is the same app —
the locale comes from the URL — but its metadata has to be Russian, or search engines file
it as a duplicate of the English page.
"""
import os
import re

ROOT = "/var/www/tounknown"
SRC = os.path.join(ROOT, "index.html")
DST_DIR = os.path.join(ROOT, "ru")

RU_TITLE = "Медитация онлайн — Випассана, Тантра, Веданта, Бхакти | toUnknown"
RU_DESC = ("Цифровая Гурукула: ведомые медитации из живых традиций. Каждый курс называет свою "
           "традицию, источник и эпоху. Открывается практикой, а не оплатой. "
           "Первый курс каждого Пути бесплатен.")

s = open(SRC, encoding="utf-8").read()
s = s.replace('<html lang="en">', '<html lang="ru">')
s = re.sub(r"<title>.*?</title>", "<title>" + RU_TITLE + "</title>", s, count=1, flags=re.S)
for prop, val in (('name="description"', RU_DESC),
                  ('property="og:title"', RU_TITLE),
                  ('property="og:description"', RU_DESC)):
    s = re.sub(r'<meta ' + re.escape(prop) + r' content="[^"]*">',
               '<meta ' + prop + ' content="' + val + '">', s, count=1)
s = s.replace('<link rel="canonical" href="https://tounknown.com/">',
              '<link rel="canonical" href="https://tounknown.com/ru">')
s = s.replace('property="og:url" content="https://tounknown.com/"',
              'property="og:url" content="https://tounknown.com/ru"')
s = s.replace("</head>",
              '<link rel="alternate" hreflang="ru" href="https://tounknown.com/ru">'
              '<link rel="alternate" hreflang="en" href="https://tounknown.com/">'
              '<link rel="alternate" hreflang="x-default" href="https://tounknown.com/">'
              "</head>", 1)

os.makedirs(DST_DIR, exist_ok=True)
open(os.path.join(DST_DIR, "index.html"), "w", encoding="utf-8").write(s)

# the English root should point back at its Russian twin
en = open(SRC, encoding="utf-8").read()
if 'hreflang="ru"' not in en:
    en = en.replace("</head>",
                    '<link rel="alternate" hreflang="en" href="https://tounknown.com/">'
                    '<link rel="alternate" hreflang="ru" href="https://tounknown.com/ru">'
                    '<link rel="alternate" hreflang="x-default" href="https://tounknown.com/">'
                    "</head>", 1)
    open(SRC, "w", encoding="utf-8").write(en)

print("   /ru built with Russian metadata; hreflang pairs both ways")
