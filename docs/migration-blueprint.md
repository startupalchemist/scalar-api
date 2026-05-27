# Migration Blueprint

## What the current repos actually are

This consolidation target is now the basis for `Scalar by Tachyon X Labs`.

All of the client repos are the same runtime shape:

- `client/` = React + Vite frontend
- `server/` = Express server
- `shared/` = Drizzle schema and shared types

This means you do not need to "separate frontend and backend" from scratch. The seam already exists. The real work is:

1. extracting the backend from `server/` + `shared/`
2. replacing repo-specific route logic with modular domain handlers
3. moving brand and feature differences into config
4. keeping each frontend as a separate app

## Repo map

### `dent_society`

- PDR-specific lead pipeline and insurance workflow
- many localized SEO landing pages
- narrower feature set than the contractor and art branches

### `Dent_society_dfw`

- same PDR family as `dent_society`
- added presentation and visual changes
- still fundamentally the same backend domain

### `Reign-Services-Tx`

- first contractor fork from the original baseline
- common contractor CRM, blog, services, gallery, ratings, webhooks, auth
- good starting point for a contractor core

### `Creations-by-Oracle`

- major domain expansion
- artwork, commissions, ecommerce, payments, image workflows
- should become its own domain module set, not merged directly into contractor routes

### `tachyonbuilt-contracting`

- the biggest contractor/services branch
- portal, pricing, notifications, chat widget, service-city pages, more admin tooling
- strongest candidate for the contractor feature superset

### `Ecommia-api`

- appears to be intended as a shared backend target for ecommerce-heavy features
- should be evaluated as a domain module donor, not assumed to be the final platform root

### `scalar-api`

- appears intended for blog automation, SEO, and growth tooling
- should become a marketing/automation donor repo inside the Scalar engine

### `reignservices-frontend`

- likely a frontend-only extraction target, but still currently shaped like the same full-stack family

## Recommended target architecture

Brand architecture:

- `Startup Alchemist` = parent company
- `Tachyon X Labs` = technology and AI development arm
- `Scalar` = shared platform product
- `Forge` = separate marketing and social automation engine

### `apps/`

- `apps/dent-society`
- `apps/dent-society-dfw`
- `apps/reign-services`
- `apps/creations-by-oracle`
- `apps/tachyonbuilt`

Each app should own:

- routes and page composition
- brand styling and assets
- content blocks that are truly custom
- frontend-only feature toggles

Each app should not own:

- database access
- auth internals
- email sending internals
- OpenAI client setup
- Stripe core integration
- webhook dispatch infrastructure
- blog automation core

Each client app should be treated as a tenant-facing frontend on top of Scalar, not as the platform itself.

### `packages/engine/`

Break the backend into modules:

- `cms`
- `auth`
- `users`
- `leads`
- `blog`
- `seo`
- `services`
- `gallery`
- `ratings`
- `webhooks`
- `notifications`
- `ai`
- `marketing-automation`
- `ecommerce`
- `art-commissions`
- `contractor-portal`

Each module should export:

- routes
- service layer
- storage interface
- schema fragments when needed

### `packages/contracts/`

Shared Zod and TypeScript contracts:

- auth DTOs
- CMS item DTOs
- lead DTOs
- post DTOs
- service DTOs
- product DTOs
- art-piece DTOs
- gallery DTOs
- artwork and order DTOs

### `packages/config/`

Per-client config objects:

- brand name
- theme tokens
- enabled modules
- CMS collections and publish rules
- lead form shape
- service catalog
- SEO defaults
- webhook defaults
- email copy
- landing page catalog

## Extraction order

### Phase 1

Create the Scalar engine from `Reign-Services-Tx` plus `tachyonbuilt-contracting`:

- auth
- users
- blog
- services
- gallery
- ratings
- webhooks
- settings

Use `tachyonbuilt-contracting` as the contractor superset when features conflict.

### Phase 2

Create client configs:

- `dent-society`
- `dent-society-dfw`
- `reign-services`
- `tachyonbuilt`

This gets the service-business family onto one engine first.
This gets the service-business family onto Scalar first.

### Phase 3

Pull in `Creations-by-Oracle` as optional modules:

- artwork catalog
- commission workflow
- Stripe checkout and payment confirmation
- AI product description and image tooling

Do not force the art/ecommerce schema into contractor tables. Keep it modular.

### Phase 4

Pull in `scalar-api` concepts into a `marketing-automation` module:

- topic research
- blog generation
- SEO settings
- newsletter and subscriber flows
- backlink and attribution analytics

### Phase 5

Normalize a shared CMS envelope across domain content:

- posts
- services
- products
- art pieces
- landing pages
- newsletters

This is the layer that makes manual authoring, AI-assisted authoring, site publishing, newsletter preview, and subscriber sends all part of the same management system.

Do not collapse `product` and `art-piece` into one domain record. They should share the CMS workflow but keep separate typed business records.

## Important design rule

Do not encode client differences in `if (client === "...")` inside route handlers.

Put client differences in config:

- enabled modules
- role permissions
- lead status pipeline
- service slugs
- email templates
- public navigation

## Immediate next implementation tasks

1. copy `shared/schema.ts` into a normalized package and split it by domain
2. replace the monolithic `server/routes.ts` with module routers
3. replace the monolithic `server/storage.ts` with domain repositories
4. stand up one frontend app against the shared engine
5. validate with `Reign-Services-Tx` first

## Naming note

Use `Scalar by Tachyon X Labs` for product-facing documentation and deployment planning.
Keep `Forge` separate as the marketing and social automation engine, even if Forge later plugs into Scalar as an internal module or integration.
