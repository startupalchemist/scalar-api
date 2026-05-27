# CMS Domain Boundary

## Rule

Use one shared CMS envelope for editorial and publishing workflow, but keep domain data in separate typed records.

## Shared CMS layer owns

- slug
- publish status
- authoring mode
- SEO metadata
- placement rules
- navigation visibility
- newsletter/subscriber distribution
- preview and approval workflow

## Domain records own

### `service`

- service copy
- service badges and icons
- pricing note
- key details
- service ordering

### `product`

- product pricing
- variants
- inventory
- shipping requirements
- commerce-oriented merchandising

### `art-piece`

- medium
- dimensions
- availability
- edition size
- commission reference behavior
- story-first presentation

### `collection`

- grouped art or product presentation
- collection membership
- collection ordering

## Why this split matters

`product` and `art-piece` can share CMS behavior, but they should not share the same business record.

A product is commerce-first.

An art piece is creative-object-first and may optionally be purchasable.

That distinction should exist in the schema from the start, even if some frontend/admin behavior overlaps.

## Recommended persistence shape

- `cms_items`
- `service_entries`
- `product_entries`
- `art_piece_entries`
- `collection_entries`
- join tables where needed for item relationships

The CMS module should orchestrate publish state and placement. Domain modules should supply kind-specific fields and validation.
