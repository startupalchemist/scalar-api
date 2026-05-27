# Scalar

by Tachyon X Labs

This workspace is the target shape for turning the Dent Society, Reign, Creations by Oracle, and TachyonBuilt repos into `Scalar`, the shared multi-client platform by Tachyon X Labs.

## Target layout

- `apps/`
  - one frontend per client brand
- `packages/engine/`
  - shared backend API engine for Scalar
- `packages/contracts/`
  - shared request and response types, validation, and schema fragments
- `packages/config/`
  - per-client branding, feature flags, service catalogs, SEO defaults, and route configuration

## Source repos

- `../dent_society`
- `../Dent_society_dfw`
- `../Reign-Services-Tx`
- `../Creations-by-Oracle`
- `../tachyonbuilt-contracting`
- `../Ecommia-api`
- `../scalar-api`
- `../reignservices-frontend`

## First migration rule

Do not copy whole repos into this workspace.

Extract in this order:

1. shared schema and storage primitives
2. shared auth/session/webhook/email/AI services
3. domain route modules
4. per-client config
5. frontend apps

Read `docs/migration-blueprint.md` before moving code.
