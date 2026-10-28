---
project: zagroda-website
sub_business: "3. Zagroda Alpakoterapii (10,000 PLN/mo Target)"
project_type: Product
stage: Build
status: green
owner: Robin
goal: "Drive 10,000 PLN/mo net farm income for Dorota Fura via direct bookings, Living Website monthly bulletin (Pilot #1), Slow-Tourism PR, Corporate Staycations (ex-AlpAIka), vouchers, and alpaca adoptions"
last_updated: 2026-10-28
last_action: "2026-10-28 — Fixed foreign-currency (CZK/EUR/GBP) Stripe webhook PLN normalization, added Admin+Guest booking confirmation emails + SMTP env vars, capped room occupancy at max 3 guests (min 1 adult) across UI/i18n/API, and corrected Michal Zitnan's booking data across Zoho/Beds25/Beds24"
next_action: "Plan and execute controlled detachment of Beds24 and direct Booking.com connection to Beds25; next week (w/c 2 Nov): Slow-Tourism PR pitch & Christmas Voucher / Living Bulletin #1"
next_owner: Jan
next_due: 2026-11-04
waiting_on: "Ready for Step 4 architectural review: detaching Beds24 and reattaching Booking.com directly"
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
- **Urgent Security Fix Pending Approval:** `app/api/webhooks/hostinger-mail/route.ts` has a hard-coded fallback for `HOSTINGER_WEBHOOK_SECRET` and accepts requests with no token.
- **CI / Ops Gaps:** Add CI gate (`lint` + `typecheck` + `build`), `/api/health`, and shared `stef-logger`.

## Next Actions
1. **Jan & Robin:** Rotate `HOSTINGER_WEBHOOK_SECRET` and deploy strict token check on `hostinger-mail` webhook.
2. **Jan & Dorota:** Sign off and dispatch the Slow-Tourism PR release + downstairs helper listing.
3. **Jan & Robin:** Connect the Zoho Semi-Automated Monthly Sprint approval feed from `ai-citation-monitor`.
