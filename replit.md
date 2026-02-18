# Dent Society - Precision Restoration Lab

## Overview
Luxury dark-themed website for Dent Society, a precision dent repair / storm damage restoration company in Dallas, TX. Built with a Porsche-engineered aesthetic - controlled, confident, minimal. Phase 2 adds blog CMS, AI content generation, newsletter system, and admin dashboard with role-based access. Phase 3 restructures blog into multi-stage AI agent system (Research → Writer → Publisher) with read/share analytics and social share buttons. Phase 4 adds webhook integration system for CRM connectivity with Zapier, Make, and custom systems.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS + wouter routing
- Backend: Express.js + Node.js
- Database: PostgreSQL with Drizzle ORM
- Auth: Session-based with httpOnly cookies (bcrypt + 7-day sessions)
- AI: OpenAI (gpt-5.2) via Replit AI Integrations for article generation
- Email: Resend integration for newsletter delivery
- Font: Manrope (Google Fonts)

## Architecture
- Dark-only theme (#0B0B0D primary bg, #FF192C accent red)
- No sidebar layout - traditional header/footer navigation
- CRM-style lead management in /admin
- Contact form submits to /api/leads
- Session-based auth with role middleware (root/admin/editor)
- Root user (webmaster) seeded on startup: startupalchemist@consultant.com
- Role hierarchy: root (webmaster, protected) > admin (can manage users except root) > editor

## Blog Workflow (Multi-Stage AI Agent System)
1. **Research Agent** (Get Topics): POST /api/ai/research → AI produces 5 topic suggestions stored in `topics` table (NOT full articles). Each topic has title, overview, keywords, search stats, reasoning.
2. **Writer Agent** (Generate Article): POST /api/topics/:id/generate → AI writes full article from topic → creates post with status "queued" linked to topic via topicId.
3. **Archive**: PATCH /api/topics/:id/archive → moves topic to archived status.
4. **Publisher Agent** (Publish): POST /api/posts/:id/publish → triggers full pipeline:
   - SEO Agent enriches missing seoTitle/seoDescription/seoKeywords
   - Backlink Agent creates UTM-tracked backlinks for Reddit, LinkedIn, Twitter, Medium, Hacker News
   - Auto-creates and sends newsletter to all active subscribers (subject = article title, body = excerpt + read link)
5. **Read/Share Tracking**: POST /api/posts/:id/read (increment on page view), POST /api/posts/:id/share (increment on social share click)
6. **Social Share Buttons**: Blog post pages have Twitter/X, Facebook, LinkedIn share buttons + copy link

## Admin Blog Sub-Tabs
- **Topics**: Suggested topics from Research Agent with Preview/Generate/Archive actions
- **Queue**: Queued articles waiting for publishing with Publish/Discard actions
- **Archive**: Archived topics (read-only)
- **Published**: Published articles with read count and share count metrics
- **Backlinks**: Backlink management per published post (admin only)

## Pages
- / - Homepage (hero "After the storm", pinned scroll car reveal with Impact Level counter, contour sweep, guarantee, process, CTA)
- /services - Service offerings
- /about - Company narrative
- /faq - Expandable FAQ
- /contact - Lead capture form
- /blog - Public blog index (shows published posts)
- /blog/:slug - Individual blog post page (with share buttons, read/share counters)
- /login - Admin login
- /admin - Admin dashboard (6 tabs: Dashboard, Leads, Blog, Newsletter, Users, Integrations)
- 39 SEO pages (pillar, location, insurance, comparison, fleet, storm)

## Database Schema
- `leads` table: id, name, phone, email, vehicle, insurance, message, status, loanerRequested, pickupRequested, insuranceApproved, insuranceApprovalTimestamp, createdAt
- `users` table: id, name, email, passwordHash, role (root/admin/editor), createdAt
- `sessions` table: id, userId, token, expiresAt
- `topics` table: id, title, overview, targetKeywords[], searchIntent, estimatedSearchVolume, competitionLevel, leadPotential, reasoning, status (suggested/generating/generated/archived), aiJobId, postId, createdAt
- `posts` table: id, title, slug, content, excerpt, tags[], seoTitle, seoDescription, seoKeywords[], featuredImage, status (draft/queued/published), authorId, topicId, readCount, shareCount, researchJobId, publishedAt, createdAt, updatedAt
- `subscribers` table: id, name, email, status (active/unsubscribed), unsubscribeToken, createdAt
- `newsletters` table: id, subject, htmlContent, status (draft/sent), sentAt, recipientCount, createdAt
- `ai_jobs` table: id, type, input, output, status, createdAt
- `backlinks` table: id, postId, platform, url, utmSource, utmMedium, utmCampaign, shortCode, clicks, createdAt
- `backlink_clicks` table: id, backlinkId, referrer, userAgent, clickedAt
- `webhooks` table: id, name, url, events[], secret, active, createdAt
- `webhook_logs` table: id, webhookId, event, payload, statusCode, response, success, duration, createdAt

## API Endpoints
### Public
- POST /api/leads - Create new lead
- POST /api/subscribers - Subscribe to newsletter
- GET /api/posts - List posts (optional ?status=published)
- GET /api/posts/:idOrSlug - Get single post
- POST /api/posts/:id/read - Increment read count
- POST /api/posts/:id/share - Increment share count
- GET /api/unsubscribe/:token - Unsubscribe from newsletter
- GET /r/:shortCode - Backlink click tracking redirect

### Auth
- POST /api/auth/login - Login
- POST /api/auth/logout - Logout
- GET /api/auth/me - Current user

### Admin (auth required)
- GET /api/leads - List all leads (root/admin)
- PATCH /api/leads/:id - Update lead (root/admin)
- POST /api/posts - Create post (root/admin/editor)
- PATCH /api/posts/:id - Update post (root/admin/editor)
- DELETE /api/posts/:id - Delete post (root/admin)
- GET /api/posts/queue - Get queued posts (root/admin/editor)
- POST /api/posts/:id/publish - Publish post with full agent pipeline (root/admin/editor)
- GET /api/topics - List topics (optional ?status=suggested/archived) (root/admin/editor)
- GET /api/topics/:id - Get single topic (root/admin/editor)
- POST /api/ai/research - Launch Research Agent for 5 topic suggestions (root/admin/editor)
- POST /api/topics/:id/generate - Launch Writer Agent to generate article from topic (root/admin/editor)
- PATCH /api/topics/:id/archive - Archive topic (root/admin/editor)
- POST /api/ai/generate-article - Direct AI article generation (root/admin/editor)
- GET /api/subscribers - List subscribers (root/admin)
- DELETE /api/subscribers/:id - Delete subscriber (root/admin)
- POST /api/newsletters - Create newsletter (root/admin)
- POST /api/newsletters/:id/send - Send newsletter (root/admin)
- GET /api/users - List users (root/admin)
- POST /api/users - Create user (root/admin)
- DELETE /api/users/:id - Delete user (root/admin)
- GET /api/stats - Dashboard stats (root/admin)
- POST /api/ai/backlink-research - AI backlink platform research (root/admin)
- POST /api/backlinks/generate - Generate backlink with UTM (root/admin)
- GET /api/backlinks - List backlinks (root/admin)
- GET /api/backlinks/analytics - Backlink analytics (root/admin)
- GET /api/webhooks - List webhooks (root/admin)
- POST /api/webhooks - Create webhook (root/admin)
- PATCH /api/webhooks/:id - Update webhook (root/admin)
- DELETE /api/webhooks/:id - Delete webhook (root/admin)
- POST /api/webhooks/:id/test - Test webhook delivery (root/admin)
- GET /api/webhooks/logs - Delivery logs (root/admin)
- GET /api/webhooks/events - Available event types (root/admin)

## Brand Guidelines
- Font: Manrope, uppercase dominant headlines
- Colors: #0B0B0D bg, #141416 cards, #FF192C accent, #F5F5F7 text, #B3B3B8 secondary text
- Tone: Controlled. Minimal. Confident. Slight smirk. (6.5/10)
- No exclamation points. No sales hype. No "best in Dallas" language.
- Logo assets in attached_assets/ directory
