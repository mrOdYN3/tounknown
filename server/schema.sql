-- toUnknown — Phase 2 schema (Supabase Postgres)
-- Run in: Supabase dashboard > SQL Editor > New query > paste > Run.
-- Idempotent: safe to re-run.

-- ============ Content (seeded from TU_CONFIG, readable by everyone) ============

create table if not exists public.teachers (
  id text primary key,                 -- e.g. 'dyn'
  name text not null,
  bio text,
  parampara text[],                    -- lineage chain, in order
  portrait_url text,
  created_at timestamptz default now()
);

create table if not exists public.paths (
  id text primary key,                 -- e.g. 'vipassana'
  title text not null,
  tradition text,                      -- 'Theravāda Buddhism · Pali Canon · ~5th c. BCE'
  description text,
  teacher_id text references public.teachers(id),
  cover_url text,
  sort int default 0,
  status text default 'living',        -- 'living' | 'awaiting'  (awaiting its ācārya)
  created_at timestamptz default now()
);

create table if not exists public.courses (
  id text primary key,                 -- slug, e.g. 'vipassana-part-1'
  path_id text references public.paths(id),
  title text not null,
  description text,
  cover_url text,
  minutes int,                         -- total audio minutes
  sort int default 0,
  free boolean default false,          -- free sample course
  created_at timestamptz default now()
);

create table if not exists public.tracks (
  id text primary key,                 -- e.g. 'vipassana-part-1/03-nutrition'
  course_id text references public.courses(id),
  title text not null,
  audio_path text not null,            -- server-relative path under /srv/audio
  seconds int,
  sort int default 0,
  is_gate boolean default false,       -- Dīkṣā gate: requires written reflection
  created_at timestamptz default now()
);

-- ============ Members ============

create table if not exists public.members (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  tier text not null default 'seeker', -- 'seeker' | 'student' | 'sadhaka' | 'founding'
  stripe_customer_id text,
  stripe_subscription_id text,
  active_until timestamptz,            -- membership validity (updated by Stripe webhooks)
  created_at timestamptz default now()
);

-- auto-create member row on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.members (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ Practice (the abhyāsa engine) ============

create table if not exists public.practice_events (
  id bigint generated always as identity primary key,
  member_id uuid not null references public.members(id) on delete cascade,
  track_id text references public.tracks(id),
  seconds_listened int not null default 0,
  completed boolean default false,
  created_at timestamptz default now()
);
create index if not exists practice_events_member_idx on public.practice_events (member_id, created_at);

create table if not exists public.unlocks (
  member_id uuid not null references public.members(id) on delete cascade,
  track_id text not null references public.tracks(id),
  reflection text,                     -- Dīkṣā gate answer, when required
  unlocked_at timestamptz default now(),
  primary key (member_id, track_id)
);

-- ============ Row Level Security ============

alter table public.teachers enable row level security;
alter table public.paths enable row level security;
alter table public.courses enable row level security;
alter table public.tracks enable row level security;
alter table public.members enable row level security;
alter table public.practice_events enable row level security;
alter table public.unlocks enable row level security;

-- content: public read
drop policy if exists "public read teachers" on public.teachers;
create policy "public read teachers" on public.teachers for select using (true);
drop policy if exists "public read paths" on public.paths;
create policy "public read paths" on public.paths for select using (true);
drop policy if exists "public read courses" on public.courses;
create policy "public read courses" on public.courses for select using (true);
drop policy if exists "public read tracks" on public.tracks;
create policy "public read tracks" on public.tracks for select using (true);

-- members: each person sees/edits only their own row (tier/stripe fields guarded by column grants below)
drop policy if exists "own member row" on public.members;
create policy "own member row" on public.members
  for select using (auth.uid() = id);
drop policy if exists "update own member row" on public.members;
create policy "update own member row" on public.members
  for update using (auth.uid() = id) with check (auth.uid() = id);
revoke update on public.members from authenticated;
grant update (display_name) on public.members to authenticated;

-- practice: insert/read own events only
drop policy if exists "own practice read" on public.practice_events;
create policy "own practice read" on public.practice_events
  for select using (auth.uid() = member_id);
drop policy if exists "own practice insert" on public.practice_events;
create policy "own practice insert" on public.practice_events
  for insert with check (auth.uid() = member_id);

-- unlocks: read/insert own
drop policy if exists "own unlocks read" on public.unlocks;
create policy "own unlocks read" on public.unlocks
  for select using (auth.uid() = member_id);
drop policy if exists "own unlocks insert" on public.unlocks;
create policy "own unlocks insert" on public.unlocks
  for insert with check (auth.uid() = member_id);

-- Done. Content tables are seeded separately (seed script reads TU_CONFIG).
