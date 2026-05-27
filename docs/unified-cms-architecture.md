# Unified CMS Architecture

## Goal

Treat blog posts, services, products, art pieces, collections, landing pages, and newsletters as CMS-managed content, not separate admin systems.

That means the platform must support:

- manual authoring
- AI-assisted authoring
- AI-generated drafts
- editorial review before publish
- true CMS persistence
- publish to the public site
- publish to the blog index when appropriate
- newsletter preview generation
- subscriber email delivery
- SEO metadata and schema generation

## Core rule

Every public-facing content object should map to a CMS item envelope with:

- content kind
- slug
- authoring mode
- publish status
- SEO fields
- distribution channels
- placement and navigation rules
- related content references
- content-specific metadata

The specialized data for a service, product, or art piece can still live in domain tables, but the publishing and editorial workflow must be shared.

See [cms-domain-boundary.md](./cms-domain-boundary.md) for the explicit split between the shared CMS envelope and kind-specific domain records.

## Content kinds

- `post`
- `service`
- `product`
- `art-piece`
- `collection`
- `landing-page`
- `newsletter`

## Shared workflow

1. Create item manually or generate an AI draft.
2. Store it as a CMS item with draft status.
3. Set placement rules for where it appears:
   - own detail page
   - blog index
   - services/products listing page
   - top-level navigation
   - dropdown navigation
4. Generate or edit SEO metadata.
5. Generate newsletter preview content when distribution includes subscribers.
6. Approve preview.
7. Publish to site.
8. Publish to the blog index or listing pages when that content kind is configured for the client.
9. Queue/send subscriber updates and newsletter deliveries.

## Placement behavior

Blog posts:

- always get their own detail page
- publish to the main blog page for visitors
- can appear in site navigation as a section-level link

Services and products:

- get their own detail pages
- render as cards or linked items on the main services/products index pages
- can be toggled into or out of dropdown navigation independently
- do not need to appear as top-level navigation items unless configured

This should be driven by CMS item placement flags, not hardcoded route logic.

## What this means for implementation

### Backend

Add a shared `cms` module to the engine with:

- CMS item repository
- content-kind registry
- publish orchestrator
- newsletter preview and send pipeline
- subscriber audience segmentation
- SEO generation hooks

Blog, services, ecommerce, and artwork modules should plug into this layer instead of each implementing their own publishing stack.

The CMS module should not absorb product inventory, art dimensions, or service-specific structured fields directly into one generic table. Those remain in domain-specific records.

### Frontend/admin

Use one admin shell for content collections:

- Blog
- Services
- Products
- Art Pieces
- Landing Pages
- Newsletters

Each collection can render kind-specific fields, but the publishing rail should stay shared:

- status
- preview
- SEO
- channels
- placement
- navigation visibility
- send/publish controls

## First extraction target

The current contractor stack already has most of the pieces split across different areas:

- posts
- subscribers
- newsletters
- services
- SEO settings

The next backend refactor should normalize those into CMS-oriented repositories and orchestration services before the frontends are wired to final admin screens.
