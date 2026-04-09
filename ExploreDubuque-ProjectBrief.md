# Explore Dubuque — Project Brief & Session Context

> Save this file and load it into any new Claude Code session with:
> `claude --context ExploreDubuque-ProjectBrief.md`
> Or simply paste the contents at the start of a new session.

---

## Project Overview

**Site Name:** Explore Dubuque
**Domain:** ExploreDubuque.com (registered on GoDaddy — used for DNS only)
**Purpose:** A local/tourist resource directory showcasing everything Dubuque, IA has to offer
**Target Audience:** Locals and tourists
**Date Started:** April 2026

---

## Business Model

- Personal/community project with future monetization
- Revenue streams: featured listings, sponsored placements, display ads, Google AdSense
- Future: business owner self-service portal, newsletter sponsorships

**Listing Tiers (planned):**
| Tier | Features | Suggested Price |
|---|---|---|
| Basic | Listed in directory | Free |
| Featured | Highlighted card, top of category | ~$29/mo |
| Premium | Homepage placement, badge, priority search | ~$79/mo |
| Sponsor | Banners, homepage feature, event promotion | Custom |

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | Next.js | SSR, PWA support, SEO-friendly |
| CMS | Payload CMS | Self-hosted, role-based, custom content types |
| Database | PostgreSQL | Payload-native |
| Media | Cloudinary | Image optimization, CDN, free tier |
| Frontend Hosting | Vercel | Free tier, auto-deploys from GitHub |
| CMS/DB Hosting | NerdVM VPS (4GB RAM) | $29.98/yr, run Payload + PostgreSQL here |
| SSL | Let's Encrypt via Certbot | Free |
| Reverse Proxy | Nginx | Routes traffic on VPS |
| Payments (future) | Stripe | Featured/sponsored listing upgrades |
| Email (future) | Resend or SendGrid | Transactional emails |

**DNS Setup:** GoDaddy holds the domain. DNS points to Vercel (frontend) and NerdVM VPS (CMS/admin).

---

## Hosting Architecture

```
GoDaddy          → holds ExploreDubuque.com domain only (DNS)
Vercel (free)    → serves Next.js frontend to visitors
NerdVM VPS 4GB   → runs Payload CMS admin + PostgreSQL database
Cloudinary       → stores and serves all media/photos
```

### VPS Server Stack
```
NerdVM VPS (4GB RAM)
├── Nginx (reverse proxy + SSL termination)
├── Payload CMS (Node.js — admin panel at /admin)
├── PostgreSQL (database)
└── Certbot (Let's Encrypt SSL)
```

### VPS User Setup
- User: `claude` with passwordless sudo
- SSH key authentication enabled
- Root SSH login disabled
- UFW firewall: ports 22, 80, 443 open

---

## Admin Panel

- URL: `ExploreDubuque.com/admin`
- Powered by Payload CMS
- Accessible to: Super Admin, Category Editors, Business Owners (scoped)

---

## User Roles

```
Super Admin (site owner)
  └── Category Editors (manage specific sections)
       └── Business Owners (manage their listing + events)
            └── Future: Registered Users (reviews, saved places)
```

---

## Content Types (Payload CMS Collections)

### Listings
- Name, description, address, phone, website, hours
- Category / subcategory
- Neighborhood
- Photos (Cloudinary)
- Social media links
- Tags (dog-friendly, family-friendly, outdoor seating, etc.)
- `isFeatured` flag, sponsorship tier
- Business owner linked account
- Local/unique focus (chains and casinos included but not prioritized)

### Events
- Title, description, start/end date+time
- Recurring event support
- Linked listing (optional)
- Category, hero image
- Ticket/info URL (links out — no on-site ticketing)
- Submitted by (business owner or editor)
- Status: pending approval / published

### Articles / Guides
- Title, rich text body, hero image
- Category, tags, author
- SEO fields (meta title, description)
- Can be marked as sponsored content

### Categories (initial set)
1. Dining & Drinks
2. Attractions & Sightseeing
3. Outdoors & Recreation
4. Arts & Culture
5. Shopping
6. Lodging & Stays
7. Services & Local Resources

### Neighborhoods (initial set)
1. Downtown
2. Millwork District
3. Cable Car Square / Historic Bluffs
4. North End
5. West End / Asbury Area
6. South End

### Advertisements
- Manage AdSense zones and direct ad placements
- Homepage, category pages, sidebar zones

### Reviews (future)
- Linked to listing + user account
- Star rating, body text
- Moderation status

---

## Site Structure

```
ExploreDubuque.com/
├── Home
│   ├── Hero (full-width Dubuque photo + search bar)
│   ├── Category quick-links (icons)
│   ├── Upcoming Events (3-4 cards + See All)
│   ├── Featured Listings (sponsored, horizontal scroll mobile)
│   ├── Explore by Neighborhood (photo cards)
│   ├── Local Spotlight (article/guide)
│   └── Footer (links, social, about)
│
├── Explore/
│   ├── Dining & Drinks
│   ├── Attractions & Sightseeing
│   ├── Outdoors & Recreation
│   ├── Arts & Culture
│   ├── Shopping
│   ├── Lodging & Stays
│   ├── Services & Local Resources
│   └── [each: filters, map view, list view]
│
├── Events/
│   ├── Calendar view + list view
│   ├── Filter by category / date / neighborhood
│   └── Submit an Event (business owners)
│
├── Neighborhoods/
│   ├── Downtown
│   ├── Millwork District
│   ├── Cable Car Square
│   ├── North End
│   ├── West End / Asbury
│   └── South End
│
├── Guides/          ← curated articles and local tips
├── About/
├── Advertise/       ← business inquiry page
└── /admin           ← Payload CMS admin panel
```

---

## Design System

### Color Palette
| Role | Hex | Rationale |
|---|---|---|
| Primary | `#1B4F72` | Deep river blue — Mississippi River |
| Accent | `#E8A020` | Warm amber — autumn bluffs, historic warmth |
| Surface | `#F8F6F2` | Off-white — clean, not sterile |
| Text | `#1A1A2E` | Near-black — readable, not harsh |
| Tag/Success | `#5A8A6A` | Sage green — Iowa greenery |

### Typography
- **Headings:** Playfair Display (Google Fonts) — characterful serif
- **Body/UI:** Inter (Google Fonts) — clean, readable at all sizes

### Navigation

**Mobile — Bottom Tab Bar:**
```
[ Explore ]  [ Events ]  [ Map ]  [ Saved ]
```
Hamburger for: Neighborhoods, Guides, About, Advertise

**Desktop — Top Nav:**
```
Logo | Explore ▾  Events  Neighborhoods  Guides  | [Search] [Advertise]
```

### Listing Card
- 16:9 photo
- Category tag + Featured badge (if applicable)
- Business name (bold)
- Neighborhood + star rating (future)
- 1-line description
- Quick actions: Map pin · Phone · Website

---

## PWA Features

- Offline mode — cached recently viewed listings
- Install prompt — "Add Explore Dubuque to your home screen"
- Push notifications — event reminders, new listings in followed categories
- Near Me — geolocation filtering
- Save Places — bookmark listings (local storage → account-synced future)
- Dark mode — system preference aware
- App manifest + service worker

---

## Maps

- **Provider:** Google Maps
- Used on: individual listing pages, category browse pages (map/list toggle)
- "Get Directions" native mobile integration
- Places API for pre-filling business data (future)

---

## SEO Strategy

- JSON-LD structured data on every listing and event
- Location-based URLs: `/dining/downtown`, `/events/2026-04`
- Auto-generated sitemap
- Fast Core Web Vitals (Next.js + Cloudinary image optimization)
- RankMath or Yoast-equivalent SEO fields in CMS

---

## Phased Roadmap

### Phase 1 — Launch
- [ ] VPS setup (Nginx, Node.js, PostgreSQL, Certbot)
- [ ] Payload CMS install and configuration
- [ ] Next.js frontend scaffold with PWA
- [ ] All content types built in CMS
- [ ] Core pages: Home, Explore, Events, Neighborhoods, Guides
- [ ] Google Maps integration
- [ ] Google AdSense integration
- [ ] ~50 seed listings across all categories
- [ ] Free stock photography (Unsplash) for launch
- [ ] Deploy: Vercel (frontend) + NerdVM VPS (CMS/DB)
- [ ] DNS configured on GoDaddy → Vercel + VPS

### Phase 2 — Business Accounts
- [ ] Business owner portal (claim listing, edit info, add events)
- [ ] Event submission + editor approval workflow
- [ ] Featured/sponsored listing tiers with Stripe
- [ ] Direct ad placement management

### Phase 3 — Community
- [ ] User accounts + saved places (synced)
- [ ] Reviews and ratings system
- [ ] Push notifications
- [ ] Newsletter integration (Mailchimp or ConvertKit)
- [ ] Category editor role assignments

---

## Key Decisions Already Made

- No ticket sales — events link out to official ticket pages only
- Casinos and chain businesses are included (not excluded)
- Content focus: local and unique, but comprehensive
- Photography: free stock (Unsplash) at launch, real photos later
- No on-site user reviews at launch — curated content only
- Newsletter deferred to Phase 3
- Admin panel at `/admin` (not a subdomain)
- CMS is self-hosted (Payload) not a SaaS (no Contentful/Sanity costs)

---

## Notes for New Session

This project brief captures all planning decisions made before any code was written.
The next step is to begin **Phase 1 build** starting with:

1. VPS server setup (Nginx, Node.js, PostgreSQL, SSL)
2. Payload CMS installation and collection configuration
3. Next.js frontend with Payload as the data source
4. PWA manifest and service worker setup

When starting a new session, tell Claude:
> "I am building ExploreDubuque.com. Load this project brief for full context and let's begin Phase 1."
