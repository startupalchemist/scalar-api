# Reign Services — DFW's Premier Interior/Exterior Renovations Experts

## Overview
Dark-themed website for Reign Services, a Dallas-Fort Worth premium renovation contractor. Services: Custom Turf Design & Install, Foundation Repair, Interior Remodeling, Outdoor Remodeling, Bespoke Outdoor Living Spaces, Turf & Pavers. All CTAs push visitors toward a free property assessment via the contact form or live chat. Admin/blog/CRM backend fully intact and rebranded.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS + wouter routing
- Backend: Express.js + Node.js
- Database: PostgreSQL with Drizzle ORM
- Auth: Session-based with httpOnly cookies (bcrypt + 7-day sessions)
- AI: OpenAI (gpt-5.2) via Replit AI Integrations for article generation
- Email: Resend integration for newsletter delivery
- Font: Poppins / Montserrat (system fallback)

## Architecture
- Dark-only theme (#0B0B0D primary bg, #5D3FD3 purple accent, #0A1F44 navy blue)
- No sidebar layout — traditional header/footer navigation
- CRM-style lead management in /admin
- Contact form submits to /api/leads (backend schema unchanged: vehicle = service type, insurance = property address)
- Session-based auth with role middleware (root/admin/editor)
- Root user (webmaster) seeded on startup: startupalchemist@consultant.com
- Role hierarchy: root (webmaster, protected) > admin (can manage users except root) > editor

## Brand Guidelines
- Colors: #0B0B0D bg, #141416 cards, #5D3FD3 purple primary, #0A1F44 navy blue accent, #F5F5F7 text, #B3B3B8 secondary text
- Tone: Premium, professional, confident. No exclamation hype. Results-focused.
- Logos: IMG_4743_1773978350169.png (header), IMG_8426_1773978350170.png (footer)
- Hero video: attached_assets/generated_videos/pdr_hero_timelapse.mp4 (placeholder — owner to replace with turf timelapse)
- CTA label everywhere: "Book Free Assessment"

## Pages
- / — Homepage (hero video, services grid, trust pillars, process steps, CTA)
- /services — All 6 services with detailed descriptions and CTAs
- /about — Company story, standards, service area, team values
- /faq — Categorized FAQ with filter by category
- /contact — Lead capture form (service type + property address fields)
- /blog — Public blog index (shows published posts)
- /blog/:slug — Individual blog post page (with share buttons)
- /login — Admin login
- /admin — Admin dashboard (Dyno, Leads, Blog, Newsletter, Users, Integrations, Webhooks)
- /rate/:token — Customer sentiment rating page (survey emails)

## Service Pages (6 stubs, all CTA → /contact)
- /custom-turf-install — Custom Turf Design & Install
- /foundation-repair — Foundation Repair
- /interior-remodeling — Interior Remodeling
- /outdoor-remodeling — Outdoor Remodeling
- /outdoor-living — Bespoke Outdoor Living Spaces
- /turf-and-pavers — Turf & Pavers

## Blog Workflow (Multi-Stage AI Agent System)
1. **Research Agent**: POST /api/ai/research → 5 topic suggestions in `topics` table
2. **Writer Agent**: POST /api/topics/:id/generate → full article → status "queued"
3. **Archive**: PATCH /api/topics/:id/archive
4. **Publisher Agent**: POST /api/posts/:id/publish → SEO enrichment + backlinks + newsletter send
5. **Read/Share Tracking**: POST /api/posts/:id/read, POST /api/posts/:id/share
6. Social share buttons on blog post pages

## The Dyno — Performance Dashboard
- SVG gauge cluster on admin panel (first tab)
- Gauges: Traffic, Conversion, Sentiment, Pipeline, CTA Rate
- Data sourced from /api/stats dyno object

## Database Schema
- `leads`: id, name, phone, email, vehicle (service type), insurance (property address), message, status, utmSource, utmMedium, utmCampaign, createdAt + CRM fields
- `users`: id, name, email, passwordHash, role, createdAt
- `sessions`: id, userId, token, expiresAt
- `topics`: id, title, overview, targetKeywords[], searchIntent, estimatedSearchVolume, competitionLevel, leadPotential, reasoning, status, aiJobId, postId, createdAt
- `posts`: id, title, slug, content, excerpt, tags[], seoTitle, seoDescription, seoKeywords[], featuredImage, status, authorId, topicId, readCount, shareCount, publishedAt, createdAt, updatedAt
- `subscribers`: id, name, email, status, unsubscribeToken, createdAt
- `newsletters`: id, subject, htmlContent, status, sentAt, recipientCount, createdAt
- `ai_jobs`: id, type, input, output, status, createdAt
- `backlinks`: id, postId, platform, url, utmSource, utmMedium, utmCampaign, shortCode, clicks, createdAt
- `backlink_clicks`: id, backlinkId, referrer, userAgent, clickedAt
- `webhooks`: id, name, url, events[], secret, active, createdAt
- `webhook_logs`: id, webhookId, event, payload, statusCode, response, success, duration, createdAt
- `ratings`: id, leadId, score (1-5), channel, token, createdAt
- `settings`: id, key, value, updatedAt

## API Endpoints
### Public
- POST /api/leads — Create new lead
- POST /api/subscribers — Subscribe to newsletter
- GET /api/posts — List posts (optional ?status=published)
- GET /api/posts/:idOrSlug — Get single post
- POST /api/posts/:id/read — Increment read count
- POST /api/posts/:id/share — Increment share count
- GET /api/unsubscribe/:token — Unsubscribe
- GET /r/:shortCode — Backlink click tracking redirect
- GET /api/rate/:token — Submit rating

### Auth
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

### Admin (auth required)
- GET/PATCH /api/leads, /api/leads/:id
- POST/PATCH/DELETE /api/posts, /api/posts/:id
- GET/POST /api/topics, PATCH /api/topics/:id/archive
- POST /api/ai/research, POST /api/topics/:id/generate
- POST /api/posts/:id/publish
- GET/DELETE /api/subscribers
- POST/GET /api/newsletters, POST /api/newsletters/:id/send
- GET/POST/DELETE /api/users
- GET /api/stats
- GET/POST/PATCH/DELETE /api/webhooks
- GET /api/ratings, /api/ratings/summary
- GET/PUT /api/settings/:key
- GET /api/analytics/funnel
