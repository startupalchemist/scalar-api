# TachyonX Oracle core
Target: txl-oci-app01, Ubuntu 24.04 ARM64, Phoenix AD-1, 2 OCPU/12GB/100GB.
One host is not high availability. This does not resolve the LaunchWorks API build or implement client applications.

Run from /srv/txl/core. Create root-only /etc/txl/secrets/postgres_password before starting.
Docker Compose networks keep PostgreSQL/Valkey unexposed. Per-app databases and roles remain mandatory.
Metrics and Alertmanager bind only to loopback. Reach them via SSH tunnels; never proxy unrestricted metrics to clients.
Prometheus retains 7 days/2GB. Alertmanager evaluates incidents but notification delivery is not configured.
Edge /healthz checks only Caddy. Unknown paths return 503 until a validated application is deployed.
Add production domains and test TLS before handling client data.
Backups must be encrypted, copied off-host, and restored before production acceptance.
Manual promotion and rollback must be implemented per app. Do not deploy unreviewed main branches automatically.
Database credentials, SSH keys and all /etc/txl files must never be committed.
