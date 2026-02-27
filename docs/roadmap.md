# 🦙 Alpaca Farm Website — Product Roadmap

**Site**: zagrodaalpakoterapii.com  
**Stack**: Next.js 14 · TypeScript · Tailwind · Zoho CRM · Stripe · Docker → Hostinger VPS  
**Last updated**: 2026-02-26

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

---

## 🚀 Release Plan

### R0 — Staging Environment ⭐ HIGHEST PRIORITY
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

### R4 — Local Area Guide (New Feature)
**Goal**: A dedicated section covering activities and places of interest near the farm, helping visitors from further afield (Netherlands, Belgium) plan their full trip and make the booking decision.

| Task | Notes |
|---|---|
| Define content scope: local vs extended area radius | Local (within 30 min) + extended (within 2 hrs for overnight visitors) |
| Design page structure and navigation | Separate route, e.g. `/discover/area` or `/area` |
| Content categories: nature, castles, towns, restaurants, family | Curated, not exhaustive |
| Multi-language content for NL/EN priority locales | NL first (partner campaign audience) |
| Link from accommodation/stay page | Decision-making context for overnight guests |
| SEO: target "things to do near [farm location]" | Organic discovery from target markets |

> **Note**: This is a standalone feature with no cross-project dependencies. Can be started in parallel with R2/R3.

---

### R5 — Content & SEO
**Goal**: Improve organic discovery and keep content fresh.

| Task | Notes |
|---|---|
| Regular blog publishing cadence | CMS exists; no cadence yet |
| Meta titles/descriptions review across all locales | EN/DE/NL likely need keyword work |
| Dutch (`nl`) locale copy quality review | Priority — partner campaign traffic |
| Activities page — gallery and pricing audit | `ActivitiesPageContent.tsx` |
| About page content freshness check | |

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

---

## 📌 Release Sequencing

```
R0 (Staging) → R0.5 (Alignment) → R1 (Booking Live) → R2+R3+R4 (parallel) → R5
```

- **R0 first**: Everything must be testable before we make major changes
- **R0.5 before R1**: Data accuracy and flow verification before public launch
- **R1**: Core revenue — booking goes live with correct Stripe keys
- **R2, R3, R4 can run in parallel** — no dependencies between them
- **R5 ongoing**: Content is evergreen, can start any time

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
