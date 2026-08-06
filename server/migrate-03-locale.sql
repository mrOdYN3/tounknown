-- toUnknown migration 03 — make the `lang` column on `paths` mean something.
--
-- tu-live.js has asked for `paths?lang=eq.ru` since the day /ru was built, falling back to
-- English whenever the result came back empty. It always came back empty: paths_pkey is on (id)
-- alone, so a Russian row with id='vipassana' cannot exist beside the English one. The column has
-- been decoration, and /ru is a Russian shell around an English catalogue until this runs.
--
-- Why paths and not courses: loadPathCourses() falls back to the English courses under the SAME
-- path_id, which is what we want — the Russian catalogue should show Russian Path names over the
-- existing recordings rather than hiding them behind an empty library. So courses keep their
-- single-column key, and the foreign key from courses to paths is dropped: with paths keyed by
-- (id, lang) there is no single row for courses.path_id to point at, and a course is deliberately
-- shared across languages. Integrity for that edge moves to the seed script.
--
-- Run in the Supabase SQL editor (Dashboard → SQL Editor → New query → Run). It is idempotent and
-- transactional: if any statement fails, nothing changes.
--
-- Then seed the Russian catalogue:
--     ssh root@72.60.170.97 'cd /opt/tu-api && node seed-ru-paths.js'

begin;

-- The FK cannot survive a composite parent key, and a course is shared between languages anyway.
alter table public.courses drop constraint if exists courses_path_id_fkey;

alter table public.paths alter column lang set default 'en';
update      public.paths set lang = 'en' where lang is null;
alter table public.paths alter column lang set not null;

alter table public.paths drop constraint if exists paths_pkey;
alter table public.paths add  constraint paths_pkey primary key (id, lang);

commit;

-- Sanity check after running:
--   select lang, count(*) from paths group by lang;      -- expect en 13, then ru 13 after seeding
--   select id, lang, title from paths where lang = 'ru' order by sort;
--
-- To undo (removes the Russian catalogue, restores the single-column key):
--   begin;
--     delete from public.paths where lang <> 'en';
--     alter table public.paths drop constraint paths_pkey;
--     alter table public.paths add  constraint paths_pkey primary key (id);
--   commit;
