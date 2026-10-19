#!/usr/bin/env python3
import subprocess,secrets,pathlib,json,os
os.umask(0o077)
base=pathlib.Path('/etc/txl/tenants')
def sql(s,db='postgres'):
 r=subprocess.run(['docker','compose','exec','-T','postgres','psql','-U','postgres','-d',db,'-v','ON_ERROR_STOP=1'],input=s,text=True,capture_output=True,cwd='/srv/txl/core')
 if r.returncode: raise RuntimeError('Database provisioning failed; SQL output suppressed to protect credentials')
sql("REVOKE CONNECT, TEMPORARY ON DATABASE postgres FROM PUBLIC; REVOKE CONNECT, TEMPORARY ON DATABASE template1 FROM PUBLIC;")
for tenant in ['platform_control','clinical_massage','reign_services','tachyonbuilt','creations_oracle']:
 path=base/(tenant+'.json')
 if path.exists(): continue
 app=tenant+'_app'; owner=tenant+'_migrate'
 ap=secrets.token_hex(32); mp=secrets.token_hex(32)
 sql(f"CREATE ROLE {owner} LOGIN PASSWORD '{mp}' NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION CONNECTION LIMIT 3; CREATE ROLE {app} LOGIN PASSWORD '{ap}' NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION CONNECTION LIMIT 5; CREATE DATABASE {tenant} OWNER {owner};")
 sql(f"REVOKE ALL ON DATABASE {tenant} FROM PUBLIC; GRANT CONNECT ON DATABASE {tenant} TO {app}; ALTER ROLE {app} SET statement_timeout='15s'; ALTER ROLE {app} SET idle_in_transaction_session_timeout='30s';")
 sql(f"REVOKE ALL ON SCHEMA public FROM PUBLIC; GRANT USAGE ON SCHEMA public TO {app}; ALTER DEFAULT PRIVILEGES FOR ROLE {owner} IN SCHEMA public GRANT SELECT,INSERT,UPDATE,DELETE ON TABLES TO {app}; ALTER DEFAULT PRIVILEGES FOR ROLE {owner} IN SCHEMA public GRANT USAGE,SELECT ON SEQUENCES TO {app};",tenant)
 path.write_text(json.dumps({'database':tenant,'host':'postgres','app_user':app,'app_password':ap,'migration_user':owner,'migration_password':mp}))
 print('Created isolated database:',tenant)
