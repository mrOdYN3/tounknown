#!/bin/sh
# Reads TU_DB_PASSWORD from the environment — the live copy on the VPS has it inline.
# Nightly dump of the toUnknown database. The audio has Google Drive as its master;
# member accounts, practice history and unlocks exist nowhere else.
set -e
DIR=/srv/backups
mkdir -p "$DIR"
STAMP=$(date +%Y%m%d-%H%M)
PGPASSWORD="$TU_DB_PASSWORD" /usr/lib/postgresql/17/bin/pg_dump \
  -h db.qugmxlqtvqhpatprhsgu.supabase.co -U postgres -d postgres \
  --schema=public --no-owner --no-acl \
  | gzip > "$DIR/tounknown-$STAMP.sql.gz"
# keep a fortnight
find "$DIR" -name "tounknown-*.sql.gz" -mtime +14 -delete
ls -la "$DIR" | tail -3
