#!/bin/sh
# Apply a migration to the toUnknown database.
#
#   sh server/migrate.sh server/migrate-04-name-and-birthday.sql
#
# Why this exists: PostgREST — the API the app and the deploy scripts talk to — executes queries
# but cannot execute DDL. Every `alter table` therefore had to be pasted into the Supabase SQL
# editor by hand, which is a bad place for a step that belongs in version control beside the code
# that depends on it.
#
# The connection string lives in /opt/tu-api/env on the VPS as DATABASE_URL, next to the Supabase
# and Stripe keys, and never appears in this repo. psql is already installed there. Get it from
# Supabase → Project Settings → Database → Connection string → URI, and add it with:
#
#   ssh root@72.60.170.97 'echo "DATABASE_URL=postgresql://..." >> /opt/tu-api/env'
#
# Migrations are wrapped in a transaction by --single-transaction: a file that fails partway
# leaves the database exactly as it was, rather than half-migrated.
set -e
VPS=root@72.60.170.97
FILE="$1"

[ -n "$FILE" ] || { echo "usage: sh server/migrate.sh <file.sql>"; exit 1; }
[ -f "$FILE" ]  || { echo "no such file: $FILE"; exit 1; }

echo "→ checking the VPS has a connection string"
ssh "$VPS" 'grep -q "^DATABASE_URL=" /opt/tu-api/env' || {
  echo "  ✗ DATABASE_URL is not in /opt/tu-api/env — see the header of this script"; exit 1; }

echo "→ applying $(basename "$FILE")"
scp -q "$FILE" "$VPS:/tmp/tu-migration.sql"
ssh "$VPS" 'set -a; . /opt/tu-api/env; set +a;
  psql "$DATABASE_URL" --single-transaction -v ON_ERROR_STOP=1 -f /tmp/tu-migration.sql;
  rm -f /tmp/tu-migration.sql'

echo "✓ applied"
