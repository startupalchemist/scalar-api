# Dent Society - Precision Restoration Lab

## Overview
Luxury dark-themed website for Dent Society, a precision dent repair / storm damage restoration company in Dallas, TX. Built with a Porsche-engineered aesthetic - controlled, confident, minimal. Phase 2 adds blog CMS, AI content generation, newsletter system, and admin dashboard with role-based access.

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

## Pages
- / - Homepage (hero "After the storm", pinned scroll car reveal with Impact Level counter, contour sweep, guarantee, process, CTA)
- /services - Service offerings
- /about - Company narrative
- /faq - Expandable FAQ
- /contact - Lead capture form
- /blog - Public blog index (shows published posts)
- /blog/:slug - Individual blog post page
- /login - Admin login
- /admin - Admin dashboard (5 tabs: Dashboard, Leads, Blog, Newsletter, Users)
- 39 SEO pages (pillar, location, insurance, comparison, fleet, storm)

## Database Schema
- `leads` table: id, name, phone, email, vehicle, insurance, message, status, loanerRequested, pickupRequested, insuranceApproved, insuranceApprovalTimestamp, createdAt
- `users` table: id, name, email, passwordHash, role (root/admin/editor), createdAt
- `sessions` table: id, userId, token, expiresAt
- `posts` table: id, title, slug, content, excerpt, tags[], seoTitle, seoDescription, featuredImage, status (draft/published), authorId, publishedAt, createdAt, updatedAt
- `subscribers` table: id, name, email, status (active/unsubscribed), unsubscribeToken, createdAt
- `newsletters` table: id, subject, htmlContent, status (draft/sent), sentAt, recipientCount, createdAt
- `ai_jobs` table: id, type, input, output, status, createdAt

## API Endpoints
### Public
- POST /api/leads - Create new lead
- POST /api/subscribers - Subscribe to newsletter
- GET /api/posts - List posts (optional ?status=published)
- GET /api/posts/:idOrSlug - Get single post
- GET /api/unsubscribe/:token - Unsubscribe from newsletter

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
- POST /api/ai/generate-article - AI article generation (root/admin/editor)
- GET /api/subscribers - List subscribers (root/admin)
- DELETE /api/subscribers/:id - Delete subscriber (root/admin)
- POST /api/newsletters - Create newsletter (root/admin)
- POST /api/newsletters/:id/send - Send newsletter (root/admin)
- GET /api/users - List users (root only)
- POST /api/users - Create user (root only)
- DELETE /api/users/:id - Delete user (root only)
- GET /api/stats - Dashboard stats (root/admin)

## Brand Guidelines
- Font: Manrope, uppercase dominant headlines
- Colors: #0B0B0D bg, #141416 cards, #FF192C accent, #F5F5F7 text, #B3B3B8 secondary text
- Tone: Controlled. Minimal. Confident. Slight smirk. (6.5/10)
- No exclamation points. No sales hype. No "best in Dallas" language.
- Logo assets in attached_assets/ directory
