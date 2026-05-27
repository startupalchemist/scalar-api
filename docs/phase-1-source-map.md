# Phase 1 Source Map

## Module authority map

### Contractor/service core

- Primary baseline: `../Reign-Services-Tx`
- Superset donor: `../tachyonbuilt-contracting`

Use `Reign-Services-Tx` for the first clean extraction shape because its backend is simpler.
Use `tachyonbuilt-contracting` when deciding the future superset for:

- contractor CRM
- portal
- notifications
- pricing
- calendar
- chat

### PDR family

- `../dent_society`
- `../Dent_society_dfw`

These should become:

- shared PDR client config
- PDR lead pipeline config
- shared particle-logo frontend capability

The DFW branch is the preferred source for the light-mode Dent Society design language.

### Art/ecommerce family

- `../Creations-by-Oracle`
- `../Ecommia-api`

These are deferred from the contractor core and should become later modules:

- ecommerce
- artwork catalog
- commissions
- Stripe flows
- AI product-description generation
- AI image enhancement and capture guidance

### Marketing/growth automation

- `../scalar-api`
- blog and SEO portions already embedded across the repo family

These should become the future:

- marketing-automation module
- SEO module
- newsletter module
- backlink analytics module

## Explicit deferrals after Phase 1

- Full Drizzle schema split
- shared repository/storage implementation
- Express route extraction
- portal auth
- email thread system
- artwork and order tables
- logo-upload to particle-morph automation

## Logo automation note

The Dent Society particle treatment should become a reusable frontend capability driven by client config:

- upload PNG logo
- sample non-transparent pixels
- normalize to a point cloud
- reuse the Dent Society particle-field renderer for morph targets
- allow per-client color palettes and page visibility

That belongs in a later frontend-shared package, not in the backend engine.
