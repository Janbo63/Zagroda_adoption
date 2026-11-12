---
project: zagroda-website
sub_business: "3. Zagroda Alpakoterapii (10,000 PLN/mo Target)"
project_type: Product
stage: Build
status: yellow
owner: Robin
goal: "Drive 10,000 PLN/mo net farm income for Dorota Fura via direct bookings, Living Website monthly bulletin (Pilot #1), Slow-Tourism PR, Corporate Staycations (ex-AlpAIka), vouchers, and alpaca adoptions"
last_updated: 2026-11-12
last_action: "2026-11-12 — Deployed 07.11 Christmas Gift Vouchers + Living Bulletin #1 (/llms.txt + /agent-catalog.json + SSR OfferCatalog JSON-LD) + WeTransfer digital master winter-barn & handmade alpaca wool mascot images + dynamic package-filtered benefit cards on /adopt + fail-closed hostinger-mail webhook fix live to zagrodaalpakoterapii.com"
next_action: "EXECUTE BY FRI 13.11: (1) Launch Pre-Christmas Voucher & Dec Winter Peak campaign (past-guest WhatsApp/email list in PL/EN/DE/CZ + ROI-capped Meta offer <=50 PLN CPA / 150 PLN kill-switch); (2) Send TVP3 Wrocław PR follow-up (by Sat 14.11)"
next_owner: Jan
next_due: 2026-11-13
waiting_on: "Launch of Pre-Christmas / Dec Winter booking campaign (past-guest WhatsApp/email + ROI-capped Meta offer <=50 PLN CPA) & TVP3 Wrocław follow-up"
live_url: https://zagrodaalpakoterapii.com
---

# Zagroda Alpakoterapii Hub — Progress Hand-off

> **Single Consolidated Workspace (25 Oct 2026):** All Zagroda work—Website, Living Bulletin (Pilot #1), Slow-Tourism PR & Marketing (`F:\Git Hub Projects\marketing` docs), and Corporate Mid-Week Staycations (`Family Staycation` / `AlpAIka`)—is now managed from this single project hub. `Beds25` runs silently as a background maintenance pipe.

## Current State & Active Workstreams
1. **Website & Living Bulletin (Pilot #1 for Zoho Semi-Auto Sprints):**
   - Production on Hostinger via Docker Compose (host port 3001 → 3000), `zagrodaalpakoterapii.com`.
   - Latest: JSON-LD entity, Czech day-trip page, `/llms.txt`, Stripe→Zoho adoption fixes, multi-currency booking.
   - Connected to `ai-citation-monitor` (`work/001_zoho_semi_auto_sprint_poc`) as Live Pilot #1 (`Zoho Account: 884394000002274001`, `Deal: 884394000002275001`).
2. **Slow-Tourism PR & Helper Exchange *(Consolidated from `marketing`)*:**
   - Guardrail: Zero blind paid Meta/Google ads.
   - Ready for sign-off: Polish/English slow-tourism media pitch featuring **Dorota Fura** & the herd (**Teddy, Elvis, Ricky, Micky, Freddy, Suri** + goats **Madonna, Baron, Nella, Lady Gaga**) + downstairs live-in helper exchange listing.
3. **Corporate Mid-Week Staycations & Vouchers *(Consolidated from `Family Staycation` / `AlpAIka`)*:**
   - Target: 4 mid-week (Mon–Thu) remote-work stays / wellness voucher bundles @ 2,500 PLN = 10,000 PLN. Validate with 3 warm SME contacts before adding new pages.

## Definition of Done & Security Gaps
- **Hostinger-Mail Webhook Fix Staged (`app/api/webhooks/hostinger-mail/route.ts`):** Removed hard-coded fallback and enforced fail-closed Bearer token check (`500` if `HOSTINGER_WEBHOOK_SECRET` unset, `401` if token missing or mismatched). Ready for live deploy + env var check on VPS.
- **CI / Ops Gaps:** Add CI gate (`lint` + `typecheck` + `build`), `/api/health`, and shared `stef-logger`.

## Next Actions
1. **Jan & Robin:** Rotate `HOSTINGER_WEBHOOK_SECRET` and deploy strict token check on `hostinger-mail` webhook.
2. **Jan & Dorota:** Sign off and dispatch the Slow-Tourism PR release + downstairs helper listing.
3. **Jan & Robin:** Connect the Zoho Semi-Automated Monthly Sprint approval feed from `ai-citation-monitor`.
