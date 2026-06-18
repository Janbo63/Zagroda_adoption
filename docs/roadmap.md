# 🦙 Alpaca Farm Website — Product Roadmap

**Site**: zagrodaalpakoterapii.com  
**Stack**: Next.js 14 · TypeScript · Tailwind · Zoho CRM · Stripe · Docker → Hostinger VPS  
**Last updated**: 2026-06-08

> This is the single source of truth for planned website changes.
> Cross-project dependencies are documented in `c:\Users\jan\.gemini\antigravity\CONTEXT.md`.

---

## ✅ Current Baseline (Live in Production)

| Area | Status |
|---|---|
| Multi-language site — PL, EN, DE, CS, NL | ✅ |
| Alpaca adoption with Stripe checkout | ✅ |
| Gift voucher purchase + PDF generation | ✅ |
| Email confirmations | ✅ |
| Campaign landing pages | ✅ |
| Blog / content pages | ✅ |
| Facebook Pixel + GA4 tracking | ✅ |
| Admin: /campaigns dashboard (GA4 + Meta Ads) | ✅ |
| Admin: Adoptions + Vouchers management | ✅ |
| Docker deployment (GitHub Actions → Hostinger) | ✅ |
| Stay page with Beds24 iframe widget (feature-flagged) | ✅ Flag on |
| Private booking toggle → Zoho CRM | ✅ Fixed Feb 2026 |
| Discover page (local area guide) | ✅ Exists at `/discover` |
| JSON-LD structured data (farm, accommodation, discover) | ✅ |
| AI discoverability — Phase 1 (SEO/crawlers/llms.txt) | ✅ Deployed Jun 2026 |

---

## ✅ Recently Completed

### AI Discoverability — Phase 1 (June 2026)
Commit: `f910466` on `main`

| Fix | Impact |
|---|---|
| Canonical URL bug fixed | Every page had canonical pointing to homepage — now correct per-page |
| `robots.txt` with AI crawler rules | AI search bots (ChatGPT, Perplexity, Claude) allowed; training bots blocked |
| `llms.txt` created | Structured business info for AI agents |
| All 5 locales on every page | Dutch/German/Czech visitors can now reach all pages |
| Localised metadata on all pages | Title/description in all 5 languages |
| Enhanced JSON-LD schemas | `faqSchema()`, `breadcrumbSchema()`, `therapyServiceSchema`, expanded `sameAs` |

---

## 🚀 Release Plan

### R-SEO — AI Discoverability Phase 2 ⭐ NEXT UP
**Goal**: Maximise AI citation share — be recommended when someone asks "recommend an alpaca farm in Poland".

See [docs/ai-discoverability.md](ai-discoverability.md) for the full evaluation and strategy.

| Task | Effort | Impact |
|---|---|---|
| Add visible FAQ sections to home, stay, activities, discover pages | 3 hrs | 🔴 Critical |
| Wire `faqSchema()` JSON-LD to FAQ sections | 30 min | 🔴 Critical |
| Wire `breadcrumbSchema()` to all pages | 1 hr | 🟡 Medium |
| Add `therapyServiceSchema` to home + activities | 30 min | 🟡 Medium |
| Generate proper 1200×630 OG images per page | 2 hrs | 🟡 Medium |
| Rewrite headings as question-based (AI-friendly) | 1 hr | 🟡 Medium |
| Add entity description paragraphs to page tops | 2 hrs | 🟡 Medium |
| Create trip-planning blog posts (itineraries) | 4 hrs each | 🟢 High long-term |
| Create Wikidata entity for the farm | 1 hr | 🟢 Medium |

**External actions (no code)**:
- Audit AI presence: ask ChatGPT/Perplexity/Gemini "recommend alpaca farm Poland"
- Optimise Google Business Profile — complete all fields, post weekly
- Get listed on dolnyslask.travel, karkonosze.pl, TripAdvisor
- Encourage guests to leave descriptive reviews mentioning specific activities

---

### R-DESIGN — Concept C "Living Countryside" Redesign
**Goal**: Complete ground-up rebuild of the presentation layer with warm, organic design.
**Branch**: `redesign/living-countryside` (parked, commit `03f79c4`)

**Background**: Three design concepts were created (Storybook Journey, Alpine Editorial, Living Countryside). Jan and Agnieszka chose **Concept C: "Living Countryside"** — warm earth-tone palette, bento-box grid layout, bottom tab navigation, watercolour textures, torn-paper dividers.

Initial implementation was deemed a "colour reskin" rather than a true redesign. Agreed to do a proper ground-up rebuild. Parked in favour of SEO fixes which deliver immediate value.

| Phase | Task | Status |
|---|---|---|
| Foundation | New colour palette, fonts, CSS variables | ✅ Done (uncommitted → committed) |
| Foundation | Bottom tab navigation (mobile) | ✅ Done |
| Foundation | Simplified warm navbar | ✅ Done |
| Homepage | Bento masonry grid | ⬜ Needs ground-up rebuild |
| Homepage | Social proof (Booking.com 9.6 score) | ⬜ Needs guest reviews |
| Homepage | Farm life amenities card | ✅ Component created |
| Homepage | Discover teaser card | ✅ Component created |
| Inner pages | Restyle stay, adopt, vouchers, discover, activities | ⬜ Not started |
| New content | Activity pricing table | ⬜ Needs Jan's input |
| New content | Guest review quotes (3-5 favourites) | ⬜ Needs Jan's input |
| New content | Professional photography | ⬜ Needs Jan's input |

**Content Jan needs to provide for redesign**:
1. **Booking.com reviews** — 3-5 favourite guest quotes with names/countries
2. **Activity pricing** — exact prices for each activity type
3. **Professional photos** — high-quality images of rooms, alpacas, views, activities
4. **Amenity confirmations** — fireplace, playground, kitchen, garden details

**Style board**: Available at `public/styleboard.html` (run dev server and visit `/styleboard.html`)
**Concept mockups**: Stored in `public/concept_*.png`

---

### R0 — Staging Environment
**Goal**: A proper VPS staging environment so all future releases can be tested before hitting production.

| Task | Notes |
|---|---|
| Set up `/var/www/alpaca-staging` on Hostinger VPS | Separate from prod at port 3001 |
| Caddy config: `futuresolutionstestbed.eu` → port 3002 | Already own this domain |
| Create `env.staging.example` with all vars documented | Stripe **test** keys only on staging |
| Add `develop` branch GitHub Actions deploy job | Push to `develop` → auto-deploy to staging |
| Test full booking + payment flow on staging | Before any feature goes live |

**Branch strategy**:
- `main` → production (`zagrodaalpakoterapii.com`)
- `develop` → staging (`futuresolutionstestbed.eu`)
- `feature/*` → local dev only, PR into `develop`

---

### R0.5 — Pre-Release Alignment (Booking Readiness)
**Goal**: Ensure the data model, attributes, and end-to-end flows are correct before the booking widget goes fully public. This is a prerequisite for R1.

| Task | Notes |
|---|---|
| Audit room/property attributes currently shown in widget | Remove inaccurate ones (e.g. breakfast — farm has no food service) |
| Define canonical attribute set at **property level** | Check-in/out times, parking, pets, accessibility, WiFi |
| Define canonical attribute set at **room level** | Bed config, max occupancy, en-suite, view, private entrance |
| Align attributes with what Booking.com expects | Required for future Phase 3 direct OTA connectivity |
| Store attributes in Beds25 (source of truth) | Website reads from Beds25 API rather than hard-coding |
| Verify full Beds25 booking flow end-to-end | Availability → deposit → Stripe webhook → Beds25 create → Zoho sync |
| Verify Beds24 mirror booking works | Beds25 → Beds24 → OTA calendar blocked |
| Confirm Zoho Bookings record created correctly | Check all fields map as expected |

> **Dependency**: Beds25 (`F:\Git Hub Projects\Beds25\`) must have its booking creation API stable before this can be fully tested.

---

### R1 — Booking Widget Live
**Goal**: Remove the feature flag and make the native booking flow fully public.

| Task | Notes |
|---|---|
| Remove `NEXT_PUBLIC_BOOKING_WIDGET_ENABLED` feature flag | Widget always-on after R0.5 passes |
| Switch Stripe to **production/live keys** | Currently in test mode |
| End-to-end test in all 5 locales on staging first | Part of R0.5 verification |
| Smoke-test adoption + voucher flows with live Stripe | Regression check |
| Update `agent.md` current state | Remove ⬜ booking item |

> [!IMPORTANT]
> **Stripe production keys must be active before go-live.** All purchase flows depend on this.

---

### R2 — Component Refactoring
**Goal**: Break up monolith components that have grown too large to maintain safely.

| Component | Size | Action |
|---|---|---|
| `BookingWidget.tsx` | 48 KB | Split: shell, room card, date picker, summary |
| `StayPageContent.tsx` | 34 KB | Extract: room listings, availability, pricing |
| `AdoptionPageContent.tsx` | 23 KB | Extract: sponsor card, animal picker, checkout steps |
| `CampaignLandingPage.tsx` | 18 KB | Extract: hero, social proof, CTA block |
| `VoucherPurchaseFlow.tsx` | 17 KB | Extract: selector, personalisation, preview |

Zero user-visible impact. One component per PR.

---

### R3 — Admin Analytics Enhancement
**Goal**: Improve `/admin/campaigns` dashboard with richer data and automation.

| Task | Notes |
|---|---|
| Dual-funnel dashboard: Direct vs Partner campaigns | In progress Feb 2026 |
| Booking widget funnel tab (Beds25 log data) | Designed Feb 2026; needs wiring |
| GA4 pull script → scheduled cron | Currently manual: `node .agent/scripts/ga4-pull.js` |
| Meta Ads: automate data ingestion | Currently manual CSV |
| Define scope for `/admin/reports` | Placeholder exists |

---

## 🟡 Backlog (Unscheduled)

| Item | Why Deferred |
|---|---|
| Seasonal voucher templates (Easter, Christmas etc.) | Valentine's was one-off; generalise template system |
| Zoho ↔ Prisma local cache | Only if API rate limits become a problem |
| Native booking engine (no Beds24/25 embed) | Large scope; iframe sufficient for now |
| Push notifications / cart abandonment emails | Requires Brevo wired to booking funnel |
| Alpaca/animal profiles CMS | Static content; low priority |
| Admin: booking calendar view | Tape chart in Beds25; lightweight version here TBD |
| Winter vol liefde campaign activation | Route exists; needs content + activation decision |
| Performance / Lighthouse audit | Not yet measured |
| Next.js 14 → 15 upgrade | Current version outdated, upgrade when stable |

---

## 📌 Release Sequencing (Updated June 2026)

```
R-SEO (AI Phase 2) → R-DESIGN (Living Countryside) → R0 (Staging) → R0.5 → R1 (Booking Live) → R2+R3 (parallel)
```

- **R-SEO first**: Quick wins that improve discoverability with zero visual risk
- **R-DESIGN next**: Full presentation layer rebuild (Concept C)
- **R0 before R1**: Staging needed before booking goes public
- **R0.5 before R1**: Data accuracy verification
- **R1**: Core revenue — booking goes live
- **R2, R3 in parallel**: Tech debt cleanup

---

## 🌿 Branch Registry

| Branch | Purpose | Status |
|---|---|---|
| `main` | Production (auto-deploys to Hostinger) | ✅ Active |
| `redesign/living-countryside` | Concept C redesign (WIP) | ⏸️ Parked |
| `custom-booking-system` | Old booking experiments | 🔴 Stale (merged to main) |
| `feat/booking-widget-golive` | Old booking widget | 🔴 Stale (merged to main) |
| `look-and-feel-upgrade` | Experimental features (AI chatbot, Tinder swipe) | 🔴 Stale (incomplete prototypes) |

---

## 🔗 Cross-Project Dependencies

| This project needs | Provided by |
|---|---|
| Booking availability + room data | **Beds25** API (`/api/public/availability`) |
| Booking creation on checkout | **Beds25** API (`/api/booking/create`) |
| Voucher validation | **Beds25** API (`/api/public/voucher/validate`) |
| Room/property attribute definitions | **Beds25** (source of truth) |
| Zoho Booking records | **Beds25** → Zoho sync |
| GA4 data | `.agent/scripts/ga4-pull.js` |
| Meta Ads spend data | Manual CSV export |
| Marketing strategy | NotebookLM "Alpaca Farm Marketing Strategy" notebook |
