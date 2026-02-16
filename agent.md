# Alpaca Farm Website — zagrodaalpakoterapii.com

> Public-facing website for the alpaca farm: activities, animal profiles, accommodation, adoption program, voucher shop, and blog.
> Inherits global standards from `~/.gemini/GEMINI.md`.

## Project Context

This is the **customer-facing website** for Zagroda Alpakoterapii — an alpaca therapy farm. It serves:
- Information about the farm, animals, and activities
- Online alpaca adoption program with Stripe payments
- Gift voucher purchase and PDF certificate generation
- Accommodation listings (future: room booking via Zoho/Beds25)
- Blog/content management
- Marketing campaign landing pages

### Languages
Polish (default), English, German, Czech, Dutch — via `next-intl` with locale-based routing (`/pl/`, `/en/`, etc.)

## Key Decisions

- **Zoho CRM backend** — Pivoted from local Prisma DB to Zoho CRM as data backend for contacts and adoption records. Prisma schema was emptied but dependency kept (may be repurposed for local caching)
- **Docker deployment** — Containerized via Docker Compose, deployed to Hostinger VPS at port 3001 behind Caddy
- **Stripe for payments** — Adoption sponsorships and voucher purchases, with automated email confirmations
- **next-intl for i18n** — Locale detection disabled, Polish as default, Facebook crawler handling in middleware

## i18n Rules (Critical)

> **Every translation change MUST touch all 5 locale files**: `pl.json`, `en.json`, `de.json`, `cs.json`, `nl.json`.

- When adding or modifying any key in `messages/*.json`, update **all 5 files** in the same commit — never assume the other locales already have it
- After i18n changes, run `npm run build` and grep for `MISSING_MESSAGE` — the build will succeed but log errors for missing keys
- The privacy page component (`app/[locale]/privacy/page.tsx`) calls `renderItems()` on all sections, expecting `title`, `content`, and `items` for each
- Translation structure must be consistent: if one locale has an `items` array, all must have it
- **PDF generation** — pdfkit for adoption certificates and voucher PDFs

## Tech Stack

- **Framework**: Next.js 14.0.2 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Radix UI + Framer Motion
- **Payments**: Stripe (JS + server SDK)
- **CRM**: Zoho CRM REST API
- **Email**: Nodemailer
- **PDF**: pdfkit (certificates, vouchers)
- **Analytics**: Facebook Pixel + Google Tag Manager
- **Deployment**: Docker Compose → Hostinger VPS (port 3001), GitHub Actions auto-deploy
- **Domain**: `zagrodaalpakoterapii.com` (prod), `futuresolutionstestbed.eu` (staging)

## Current State

- ✅ Multi-language content (PL, EN, DE, CS, NL)
- ✅ Adoption program with Stripe checkout
- ✅ Voucher purchase flow with PDF generation
- ✅ Email service (confirmations, certificates)
- ✅ Campaign landing pages
- ✅ Blog/content CMS
- ✅ Facebook Pixel + GA tracking
- ✅ Docker deployment pipeline (GitHub Actions)
- ⬜ Room booking frontend (will integrate with Beds25/Zoho backend)
- ⬜ Production Stripe keys (currently test mode)
- ⬜ Component refactoring (large monolith components need splitting)

## Cross-Project Links

- **Beds25** (`F:\Git Hub Projects\Beds25\`): The internal booking admin system. When room booking is added to this site, it will call the same Zoho CRM modules (Bookings, Rooms) that Beds25 manages. The `zoho.ts` clients in both projects should eventually converge.
- **Marketing Strategy**: Research and campaigns managed in the "Alpaca Farm Marketing Strategy" NotebookLM notebook.

## Known Issues

- Large monolith components need refactoring: `AdoptionPageContent.tsx` (23KB), `VoucherPurchaseFlow.tsx` (17KB), `CampaignLandingPage.tsx` (18KB)
- Prisma dependency is kept but schema is empty (may repurpose for local caching)

## Key Files

| File | Purpose |
|---|---|
| `lib/zoho.ts` | Zoho CRM API client (12KB) |
| `lib/email-service.ts` | Nodemailer email sending (15KB) |
| `lib/certificate-generator.ts` | PDF certificate generation |
| `lib/voucher-generator.ts` | Voucher PDF creation |
| `lib/voucher-utils.ts` | Voucher validation logic |
| `components/AdoptionPageContent.tsx` | Adoption flow UI (needs refactoring) |
| `components/VoucherPurchaseFlow.tsx` | Voucher purchase UI (needs refactoring) |
| `components/CampaignLandingPage.tsx` | Marketing campaign page |
| `middleware.ts` | i18n routing + Facebook crawler handling |
| `docker-compose.yml` | Container config (port 3001) |
| `.github/workflows/deploy.yml` | Auto-deploy to Hostinger via SSH |
