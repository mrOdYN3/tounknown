-- toUnknown migration 02 — paths become the single source of truth for the UI.

alter table public.paths add column if not exists source text;   -- "Pali Canon · ~5th c. BCE"
alter table public.paths add column if not exists kind  text default 'lineage'; -- lineage | collection

-- ---- living paths: cover art + lineage line ----
update paths set
  tradition='Theravāda Buddhism', source='Pali Canon · ~5th c. BCE',
  description='See things as they are. Sīla, Samādhi, Paññā.',
  cover_url='https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=768,fit=crop/d95DMJoWQZi9KZO2/vipassana-meditation-course-part-1---anapanasati-online-A1aw3ookEphPVrPR.jpg'
where id='vipassana';

update paths set
  tradition='Kashmir Shaivism', source='Vigyan Bhairav Tantra · ~8th c.',
  description='112 doorways of Shiva — breath, sound, presence.',
  cover_url='https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=scale-down/cdn-ecommerce/store_01HBM37W59YM602ZY1SMAMN37W%2Fassets%2F1749811476032-covercopy.jpg'
where id='tantra';

update paths set
  tradition='Advaita Vedanta', source='Upaniṣadic non-duality',
  description='I am — before every thought. Himalayan silence.',
  cover_url='https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/cdn-ecommerce/store_01HBM37W59YM602ZY1SMAMN37W%2Fassets%2F1750926107990-covercopy.jpg'
where id='vedanta';

update paths set
  tradition='Bhakti Yoga', source='The way of devotion',
  description='Whispers of God — surrender, prayer, unconditional love.',
  cover_url='https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/cdn-ecommerce/store_01HBM37W59YM602ZY1SMAMN37W%2Fassets%2F1751001777618-cover_copy_n6ztvgd.jpg'
where id='bhakti';

update paths set
  tradition='Greco-Roman philosophy', source='Meditations of Marcus Aurelius · 2nd c. CE',
  description='The inner citadel — steadiness the emperor practised daily.',
  cover_url='https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=crop/cdn-ecommerce/store_01HBM37W59YM602ZY1SMAMN37W%2Fassets%2F1701949520573-cover.jpg'
where id='stoic';

-- ---- awaiting paths: full lineage text so the UI reads from the DB ----
update paths set tradition='Chan / Zen Buddhism',  source='Zazen · Shikantaza · ~6th c.'            where id='zen';
update paths set tradition='Vajrayāna · Dzogchen', source='Rigpa & Mahāmudrā'                       where id='tibetan';
update paths set tradition='Rāja Yoga',            source='Yoga Sūtras of Patañjali · ~2nd c. BCE'  where id='raja';
update paths set tradition='Islamic mysticism',    source='Dhikr & Muraqaba'                        where id='sufi';
update paths set tradition='Taoism',               source='Zuowang · Tao Te Ching · ~4th c. BCE'    where id='taoist';
update paths set tradition='Christian mysticism',  source='Prayer of the Heart · Philokalia'        where id='hesychast';
update paths set tradition='Jewish mysticism',     source='Hitbodedut & contemplation'              where id='kabbalistic';
update paths set title='The Zen Path'         where id='zen';
update paths set title='The Tibetan Path'     where id='tibetan';
update paths set title='The Yoga Path'        where id='raja';
update paths set title='The Sufi Path'        where id='sufi';
update paths set title='The Taoist Path'      where id='taoist';
update paths set title='The Hesychast Path'   where id='hesychast';
update paths set title='The Kabbalistic Path' where id='kabbalistic';

-- ---- kids & family: a collection, not a lineage Path ----
insert into paths (id,title,tradition,source,description,teacher_id,cover_url,sort,status,kind)
values ('kids','Kids & Family Grove','Mindfulness for children','Ages 6–12 · stories and sittings',
        'Short guided meditations for little ones — and the grown-ups sitting beside them.','dyn',
        'https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/cdn-ecommerce/store_01HBM37W59YM602ZY1SMAMN37W%2Fassets%2F1702177388077-Home%20Alone%20Meditations%20by%20Kewin%20-%2015%20Mindful%20Meditations%20for%20Kids%20(6-12%20Years%20Old)%20.jpg',
        50,'living','collection')
on conflict (id) do update set title=excluded.title, tradition=excluded.tradition, source=excluded.source,
  description=excluded.description, cover_url=excluded.cover_url, sort=excluded.sort,
  status=excluded.status, kind=excluded.kind;

update courses set path_id='kids', sort=0 where id='home-alone-kewin';
update courses set path_id='kids', sort=1 where id='santas-christmas';

