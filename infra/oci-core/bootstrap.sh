#!/bin/bash
set -euo pipefail
install -d -m 700 /etc/txl/secrets /etc/txl/tenants /srv/txl/backups
install -d -m 755 /srv/txl/core/textfile
if ! test -s /etc/txl/secrets/postgres_password; then
  python3 -c 'import secrets; print(secrets.token_hex(32))' > /etc/txl/secrets/postgres_password
  chmod 444 /etc/txl/secrets/postgres_password
fi
if ! test -s /etc/txl/backup-recipient; then
  age-keygen -o /etc/txl/secrets/backup.agekey 2>/dev/null
  age-keygen -y /etc/txl/secrets/backup.agekey > /etc/txl/backup-recipient
fi
install -d /etc/ssh/sshd_config.d
printf 'PasswordAuthentication no\nKbdInteractiveAuthentication no\nPermitRootLogin no\n' > /etc/ssh/sshd_config.d/00-txl-hardening.conf
sshd -t
systemctl reload ssh
systemctl enable --now docker
cd /srv/txl/core
docker compose config -q
docker compose up -d
