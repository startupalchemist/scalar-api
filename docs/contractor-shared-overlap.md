# Contractor Shared Overlap

This document captures the first extraction boundary between `Reign-Services-Tx` and `tachyonbuilt-contracting`.

## Confirmed shared domains

- auth
- users
- sessions
- leads
- blog posts
- topics
- subscribers
- newsletters
- AI jobs
- backlinks
- webhooks
- ratings
- settings
- services
- gallery

## Reign-only or simpler baseline traits

- simpler gallery model without `serviceSlug`
- simpler lead shape tied to service-business intake
- smaller storage surface that is easier to extract first

## Tachyon superset traits to preserve later

- service-scoped gallery
- portal
- pricing
- notifications
- calendar
- email thread system
- chat
- broader contractor CRM

## Extraction rule

When code differs:

1. use Reign for the first shared repository shape
2. add optional extension points where Tachyon clearly expands the domain
3. do not drag Tachyon-only domains into the initial core interfaces
