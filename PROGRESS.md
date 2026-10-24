# Zagroda Alpakoterapii Website — Progress hand-off

Updated 2026-10-24 by Antigravity agent (Robin). **Rewrite this file; do not append.** Keep it ≤ 40 lines.

## Current state

- In production on Hostinger via Docker Compose (host port 3001 → 3000), `zagrodaalpakoterapii.com`. I did not check it live this session.
- Latest work (Oct 2026): SEO/AEO (JSON-LD entity, Czech day-trip page, `llms.txt`), Stef key from env only, Stripe→Zoho adoption fixes, multi-currency booking.
- Old notes disagreed with the code in five places: port registry says 3000 but compose publishes 3001; Meta Pixel `1054665503839276` is primary and `1608105036460297` is also loaded; roadmap lists admin dashboards live but `app/[locale]/admin/*` folders are empty; GA4 script exists in this repo; README points to a missing `.env.local.example`.
- **Security finding**: `app/api/webhooks/hostinger-mail/route.ts` has a hard-coded fallback for `HOSTINGER_WEBHOOK_SECRET` and accepts requests with no token. Not changed (docs-only session).
- Uncommitted, not mine: `src/` (LivingShopWindow), `public/certificates/`, `public/images/press/`.

## Definition of Done gaps

- CI deploys on push to `main` as `root` **without** lint, typecheck or tests.
- No `typecheck` or `test` script; no `.env.example`.
- No shared `stef-logger` (inline `fetch` calls instead); no `GET /api/health`.
- Admin/internal routes: none protected by middleware (no NextAuth); confirm none are live.

## Active work

| Item | Status | Note |
|---|---|---|
| 100% i18n coverage (zero `MISSING_MESSAGE`) | open (from project brief) | not re-checked |
| Room booking flow live (roadmap R1) | open | not re-checked |

## Open decisions for Jan

- Rotate the Hostinger webhook secret and remove the hard-coded fallback, then require a valid token. Recommendation: yes, urgent.
- Port registry: record 3001 for this site (or change compose to 3000)? Recommendation: update registry to 3001.
- Approve a CI gate (lint + typecheck + build) before deploy, plus `/api/health` and `stef-logger`. Recommendation: yes.

## Next action

1. Fix the hostinger-mail webhook auth (after Jan approves the secret rotation).
