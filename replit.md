# Dent Society - Precision Restoration Lab

## Overview
Luxury dark-themed website for Dent Society, a precision dent repair / storm damage restoration company in Dallas, TX. Built with a Porsche-engineered aesthetic - controlled, confident, minimal.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS + wouter routing
- Backend: Express.js + Node.js
- Database: PostgreSQL with Drizzle ORM
- Font: Manrope (Google Fonts)

## Architecture
- Dark-only theme (#0B0B0D primary bg, #FF192C accent red)
- No sidebar layout - traditional header/footer navigation
- CRM-style lead management in /admin
- Contact form submits to /api/leads

## Pages
- / - Homepage (hero, car transform scroll, guarantee, process, CTA)
- /services - Service offerings
- /about - Company narrative
- /faq - Expandable FAQ
- /contact - Lead capture form
- /admin - Lead management dashboard

## Database Schema
- `leads` table: id (serial), name, phone, email, vehicle, insurance, message, status, created_at

## API Endpoints
- POST /api/leads - Create new lead
- GET /api/leads - List all leads
- GET /api/leads/:id - Get single lead
- PATCH /api/leads/:id - Update lead status

## Brand Guidelines
- Font: Manrope, uppercase dominant headlines
- Colors: #0B0B0D bg, #141416 cards, #FF192C accent, #F5F5F7 text, #B3B3B8 secondary text
- Tone: Controlled. Minimal. Confident. Slight smirk. (6.5/10)
- No exclamation points. No sales hype. No "best in Dallas" language.
- Logo assets in attached_assets/ directory
