#!/bin/bash
set -euo pipefail
umask 077
cd /srv/txl/core
stamp=$(date -u +%Y%m%dT%H%M%SZ)
out="/srv/txl/backups/postgres-$stamp.sql.age"
docker compose exec -T postgres pg_dumpall -U postgres | age -R /etc/txl/backup-recipient -o "$out"
test -s "$out"
printf 'txl_backup_last_success_timestamp_seconds %s\n' "$(date +%s)" > textfile/backup.prom.tmp
chmod 644 textfile/backup.prom.tmp
mv textfile/backup.prom.tmp textfile/backup.prom
find /srv/txl/backups -name 'postgres-*.sql.age' -mtime +7 -delete
echo "$out"
