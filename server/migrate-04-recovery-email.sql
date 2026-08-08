-- toUnknown migration 04 — recovery address, and what people want to be called.
--
-- Run it in the Supabase SQL editor: Dashboard → SQL Editor → New query → Run.
-- Safe to run twice. Nothing breaks before or after: the cards check for their columns and stay
-- hidden until these exist.
--
-- If you already ran the earlier version of this file, run it again — the GRANT below is the
-- part that was missing, and without it saving fails with "permission denied for table members".

begin;

alter table public.members
  add column if not exists recovery_email text,
  add column if not exists born_on        date;

comment on column public.members.recovery_email is
  'Optional second address, used only to verify identity if the member loses their sign-in inbox. Never emailed for anything else.';
comment on column public.members.born_on is
  'Date of birth, given by the member. Used to tell two people of the same name apart when one writes in having lost their inbox.';

-- This is the part that is easy to miss. UPDATE was granted column by column when the table was
-- made, so a member could write display_name but not any column added afterwards — the write
-- failed with 42501 while the read succeeded, which looks like a bug in the app rather than a
-- missing privilege. Row-level security still decides *which* row; this decides which columns.
grant update (display_name, recovery_email, born_on) on public.members to authenticated;

commit;

-- Check it took:
--   select id, email, display_name, recovery_email, born_on from public.members;
