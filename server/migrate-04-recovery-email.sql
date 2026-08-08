-- toUnknown migration 04 — somewhere to reach a member who has lost their inbox.
--
-- Passwordless auth makes the sign-in address the account, so losing the inbox is the one
-- failure no automatic flow can repair. A second address, given voluntarily and long before it
-- is needed, is the whole fix.
--
-- Deliberately not a nickname or a date of birth. Those are guessable by anyone who knows the
-- person, and collecting a birthday would tell us which of our readers are children — which
-- brings GDPR consent duties we do not have while we simply don't know.
--
-- Run it in the Supabase SQL editor: Dashboard → SQL Editor → New query → Run.
-- Safe to run twice. Nothing in the app breaks before or after — the recovery card checks
-- whether this column exists and stays hidden until it does.

alter table public.members
  add column if not exists recovery_email text;

comment on column public.members.recovery_email is
  'Optional second address, used only to verify identity if the member loses their sign-in inbox. Never emailed for anything else.';

-- The existing row-level policy already lets a member update their own row — the same one that
-- carries display_name — so no policy change is needed. Verify with:
--   select id, email, recovery_email from public.members;
