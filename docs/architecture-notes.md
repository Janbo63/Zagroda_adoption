# Zagroda Alpakoterapii Website — Architecture notes

Lasting project knowledge moved here from the former `agent.md` on 2026-10-24, when the repo adopted the Project Standard. Items marked *(unverified)* came from the old file and have not been re-checked against the code or the server.

## Architecture

- **Customer-facing site** on Next.js 14.0.2 (App Router) + React 18 + TypeScript, Tailwind CSS + Radix UI + Framer Motion.
- **Booking Triad**: the site calls Beds25 (`BEDS25_BASE_URL`, `BEDS25_API_KEY`) for availability, rooms, booking intent/cancel and voucher validation (`app/api/booking/*`). Beds24 is the master PMS; bookings carry source `WEBSITE`. Never build a two-way sync loop. Room/property attributes are owned by Beds25.
- **Zoho CRM backend** for contacts, adoption records and vouchers (`lib/zoho.ts`). The project pivoted away from a local Prisma DB: `prisma/schema.prisma` keeps only the SQLite datasource with no models, but the dependency is kept for possible local caching.
- **Stripe** for adoption sponsorships, vouchers and bookings (multi-currency PLN, CZK, EUR, GBP since commit `80fb579`). Webhook `app/api/stripe/webhook/route.ts` verifies signatures with `constructEvent`. Whether production uses live keys was "test mode" in the old notes *(unverified)*.
- **PDFs** with pdfkit: adoption certificates and vouchers. **Email** with Nodemailer (`lib/email-service.ts`).
- **i18n** via `next-intl` 3.x: locales `pl` (default), `en`, `de`, `cs`, `nl`; locale detection off; `middleware.ts` rewrites `/` to `/pl` for the Facebook crawler and skips `/api` and `/messenger-webhook`.
- **Inbound mail webhook** `app/api/webhooks/hostinger-mail/route.ts` logs incoming mail to Stef (`app: zagroda-mail-webhook`).

## Deployment (Hostinger)

- Docker Compose service `web`, `node:18-alpine` standalone image; host port **3001** → container port 3000 (`docker-compose.yml`). Caddy in front *(unverified, config not in repo)*.
- `.github/workflows/deploy.yml`: on push to `main`, SSH as `root` to the VPS, `cd /var/www/Zagroda_adoption && bash scripts/deploy-vps.sh`, then post success/failure to Stef (`app: zagroda-website`). No lint/typecheck/test step.
- `scripts/deploy-vps.sh`: (1) drift detection, reverts server-side edits and warns Stef; (2) `git reset --hard origin/main`; (3) `docker compose build --no-cache && up -d`; (4) HTTP smoke tests; (5) DOM integrity (exactly one `<html>/<head>/<body>`) plus GA4 `G-V9R1JJYYSG` and Microsoft Clarity present; (6) report to Stef. Reads `STEF_LOG_KEY` from the server `.env`.
- `.github/workflows/drift-check.yml`: daily 05:00 UTC, alerts Stef if the VPS tree is dirty or behind `origin/main`.
- **Why the no-SSH-edit rule exists**: in September 2026 a GA4 hotfix was applied directly on the VPS, causing repo/production drift and about two weeks of lost analytics data.
- VPS firewall (Hostinger managed ruleset accepting TCP 22/80/443 only), Fail2ban for SSH, on-demand malware scans *(unverified; server config, not in repo)*.
- Staging: `futuresolutionstestbed.eu`, see `docs/STAGING_DEPLOYMENT.md` and `scripts/prepare-staging.*` *(unverified)*.

## Marketing and analytics IDs (public identifiers, not secrets)

| Service | ID | Where in code |
|---|---|---|
| GA4 Measurement ID | `G-V9R1JJYYSG` | `lib/gtag.js`, `components/AnalyticsTracker.tsx`, `app/[locale]/layout.tsx` |
| GA4 Property ID | `properties/422468308` | `.agent/scripts` *(unverified)* |
| Meta Pixel (primary ad account) | `1054665503839276` | `app/[locale]/layout.tsx`, `components/FacebookPixel.tsx` |
| Meta Pixel (older) / `fb:app_id` | `1608105036460297` | `lib/fpixel.ts`, `app/[locale]/layout.tsx` (both pixels are initialised) |
| Meta Ad Account | `act_2424973274198583` | *(unverified)* |
| GA4 service account | `zagroda-ga4-reader@gen-lang-client-0459745068.iam.gserviceaccount.com` | `.agent/scripts/.env` *(unverified)* |

- GA4 pull script: `.agent/scripts/ga4-pull.js` in this repo (the old notes pointed to `f:\New Alpaca Site\ZAPnew2\.agent\scripts\ga4-pull.js`, which also exists). Meta data: CSV export from Ads Manager, or `.agent/scripts/meta-ads-pull.js`.

## Environment variable names (values live only in `.env` / GitHub Secrets)

`ADMIN_EMAIL`, `BEDS25_API_KEY`, `BEDS25_BASE_URL`, `CERTIFICATE_PUBLIC_URL`, `CERTIFICATE_STORAGE_PATH`, `CONTACT_EMAIL`, `CRON_SECRET`, `EMAIL_FROM`, `HOSTINGER_WEBHOOK_SECRET`, `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (build arg), `NODE_ENVIRONMENT`, `SMTP_HOST`, `SMTP_PASS`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `STEF_LOG_KEY`, `STEF_LOG_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `VOUCHER_STORAGE_PATH`, `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`. CI secrets: `VPS_IP`, `SSH_PRIVATE_KEY`, `STEF_LOG_KEY`. There is no `.env.example` yet (README refers to a missing `.env.local.example`).

## Gotchas

- **i18n**: every translation change touches all 5 `messages/*.json` files in the same commit; grep the build log for `MISSING_MESSAGE`. Privacy page (`app/[locale]/privacy/page.tsx`) calls `renderItems()` on every section and expects `title`, `content`, `items`; keep structure identical across locales.
- **Never edit on the VPS**: see Deployment.
- **Known refactor debt**: `components/AdoptionPageContent.tsx` (~23 KB), `components/CampaignLandingPage.tsx` (~19 KB), `components/VoucherPurchaseFlow.tsx` (~17 KB).

## Key files

| File | Purpose |
|---|---|
| `lib/zoho.ts` | Zoho CRM API client |
| `lib/email-service.ts` | Nodemailer email sending |
| `lib/certificate-generator.ts` | Adoption certificate PDF |
| `lib/voucher-generator.ts` / `lib/voucher-utils.ts` | Voucher PDF / validation |
| `app/api/booking/*` | Availability, rooms, intent, cancel, voucher (via Beds25) |
| `app/api/stripe/webhook/route.ts` | Stripe webhook (signature-verified) |
| `components/AdoptionPageContent.tsx` / `VoucherPurchaseFlow.tsx` / `CampaignLandingPage.tsx` | Main conversion UIs |
| `middleware.ts` | i18n routing + Facebook crawler handling |
| `docker-compose.yml` / `Dockerfile` | Container config (host 3001 → 3000) |
| `.github/workflows/deploy.yml` / `drift-check.yml` | Deploy + daily drift check |
| `scripts/deploy-vps.sh` | Server-side deploy, smoke tests, GA4/Clarity verification |
| `scripts/daily-kpi-report.ts` | KPI report (posts to Stef) |

## Cross-project links

- Roadmap: `docs/roadmap.md` (release order R0 → R0.5 → R1 → R2/R3/R4 → R5; last updated 2026-06-08).
- Beds25: `F:\Git Hub Projects\Beds25\` — booking admin and API this site depends on.
- Master plan: `c:\Users\jan\.gemini\antigravity\CONTEXT.md`. Marketing research: "Alpaca Farm Marketing Strategy" NotebookLM notebook. Referral traffic from IzeraJizera.
