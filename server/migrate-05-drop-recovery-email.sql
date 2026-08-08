-- toUnknown migration 05 — drop the recovery address column.
--
-- Added in an earlier draft of 04 and never used: asking someone for a spare inbox before
-- anything has gone wrong is a lot to ask, and the app now recovers an account from the name and
-- birthday it already holds, plus the Stripe record for anyone who has paid. The column held no
-- data. Dropping it rather than leaving it as a field nobody writes and nobody reads.
--
-- No begin/commit here: migrate.sh runs every file with --single-transaction.

alter table public.members drop column if exists recovery_email;
