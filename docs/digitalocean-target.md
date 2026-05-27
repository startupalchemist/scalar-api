# DigitalOcean Target

## Goal

Run multiple branded sites from one codebase on shared infrastructure without cloning repositories again.

Product identity:

- `Scalar` = shared platform
- `Tachyon X Labs` = technology builder/endorser
- client brands remain client-facing sites on top of Scalar

## Recommended shape

### Compute

- 1 shared DigitalOcean droplet for the application runtime
- 1 managed Postgres cluster shared by all clients
- 1 Spaces bucket for uploads, media, and generated assets

### Runtime layout on the droplet

- `scalar-api`
  - one Node process for the shared backend engine
- `scalar-admin`
  - one admin/CMS frontend for multi-client management
- `frontend-dent-society`
  - one static build or lightweight SSR process
- `frontend-dent-society-dfw`
- `frontend-reign-services`
- `frontend-tachyonbuilt`
- `frontend-creations-by-oracle`
- `nginx`
  - reverse proxy and TLS termination

## Routing model

### Preferred

Route by hostname:

- `api.yourplatformdomain.com` -> Scalar shared backend engine
- `app.yourplatformdomain.com` -> Scalar admin/CMS frontend
- `dentsociety.com` -> Dent Society frontend
- `dentsocietydfw.com` -> Dent Society DFW frontend
- `reignservices...` -> Reign frontend
- `tachyonbuilt...` -> Tachyon frontend
- `creationsbyoracle...` -> Creations frontend

### Backend client resolution

Every frontend should send a client key header or use a domain-to-client mapping:

- `dent-society`
- `dent-society-dfw`
- `reign-services`
- `tachyonbuilt`
- `creations-by-oracle`

The backend then loads the correct client config and enabled module set.

## Database model

Use one shared Postgres cluster with either:

### Option A: single database, tenant column strategy

Best long-term if you want one operational surface.

Requirements:

- add `client_key` to almost every domain table
- enforce tenant scoping in every repository
- add composite indexes including `client_key`

### Option B: one schema per client

Best migration step if you want lower blast radius while consolidating.

Requirements:

- same codebase
- separate schema or database per client
- client config maps to schema name

## Recommendation

Start with one schema per client while extracting.
Move toward shared tables with `client_key` only after the engine is stable.

That reduces migration risk substantially.

## Media and generated assets

Store in Spaces, not on the droplet:

- gallery images
- logo uploads
- generated product images
- proposal PDFs
- invoice files

Use path prefixes by client key:

- `dent-society/...`
- `tachyonbuilt/...`

## Deployment workflow

1. Build shared packages
2. Build each frontend app
3. Build one backend engine artifact
4. Deploy backend once
5. Deploy frontend artifacts per client
6. Reload nginx

## First deployable API target

The first shared API host now lives at `apps/platform-api`.

Minimum environment for a droplet process:

- `DATABASE_URL`
- `PLATFORM_CLIENT_KEY`
- `PORT`
- `NODE_ENV=production`

Start with `PLATFORM_CLIENT_KEY=reign-services` while validating the shared contractor core.
Run separate processes only if you want per-client process isolation; otherwise run one process and add hostname-based client resolution after the router extraction is complete.

## Recommended Scalar domain shape

- `your-scalardomain.com` = Scalar marketing/product site
- `app.your-scalardomain.com` = Scalar admin
- `api.your-scalardomain.com` = Scalar backend
- `dev-app.your-scalardomain.com` = Scalar admin QA
- `dev-api.your-scalardomain.com` = Scalar backend QA

## Future logo automation fit

The Dent Society particle-logo feature should be a frontend-shared capability:

- upload PNG to Spaces
- process alpha mask into point cloud
- save generated particle metadata per client
- frontend reads particle metadata from config or asset manifest

This should not require a separate repo.
