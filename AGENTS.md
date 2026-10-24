# Zagroda Alpakoterapii Website — zagrodaalpakoterapii.com

> Follows the FutureSolutions Project Standard v1.0 — `F:\Senior Management\standards\README.md`.
> Read `PROGRESS.md` next. Keep this file ≤ 80 lines; detail belongs in `README.md` or `docs/`.

## 1. What this is

Customer-facing website for the alpaca therapy farm: animals, activities, accommodation, alpaca adoption and gift vouchers (Stripe + PDF certificates), blog and campaign landing pages, in 5 languages. Serves guests and is the farm's direct-revenue channel.

## 2. Governance

- **Tier**: 1 — Revenue Infrastructure · **Autonomy**: Full Auto (commit, no push)
- **Owner persona**: Kelly (Marketing), Robin (Engineering)
- **Server / port / domain**: hostinger · host 3001 → container 3000 (`docker-compose.yml`; the port registry lists 3000, see PROGRESS) · `zagrodaalpakoterapii.com` (staging `futuresolutionstestbed.eu`, unverified) · Docker Compose service `web` in `/var/www/Zagroda_adoption`, deployed by CI over SSH as `root` (no PM2 process)

## 3. Run it

| Task | Command |
|---|---|
| Dev | `npm run dev` (Next default port 3000; no dev port registered) |
| Lint / typecheck / test | `npm run lint` · *(no typecheck script)* · *(no test script)* |
| Build | `npm run build` (runs `scripts/build-stall.js`, `next build`, `scripts/copy-public.js`) |
| Deploy | Push to `main` triggers `.github/workflows/deploy.yml` → `scripts/deploy-vps.sh` (drift check, Docker rebuild, smoke tests, GA4/Clarity check). Push only with Jan's approval. |

## 4. Where to look

1. `PROGRESS.md` — current state, DoD gaps, open decisions, next action
2. `docs/architecture-notes.md` — architecture, analytics IDs, env var names, gotchas, key files
3. `docs/roadmap.md` — release plan (single source of truth for planned features) · `project-brief.md` — business case and KPIs · `README.md` — setup
4. Key files: `lib/zoho.ts` (Zoho client) · `lib/email-service.ts` (Nodemailer) · `lib/certificate-generator.ts` + `lib/voucher-generator.ts` (PDFs) · `app/api/stripe/webhook/route.ts` · `app/api/booking/*` (Beds25 calls) · `middleware.ts` (i18n + Facebook crawler) · `app/[locale]/layout.tsx` (GA4, Meta Pixel, Clarity)

## 5. Contracts this repo is bound by

In `F:\Senior Management\contracts.md`: Booking Triad (Beds24 is master; site injects bookings with source `WEBSITE`, never two-way sync) · Deployment · i18n · Error Logging · Zoho CRM · Port Hygiene · PROGRESS.md reporting.

## 6. Project-specific rules and gotchas

- **Never edit files on the VPS.** All changes go git → push → GitHub Actions. `deploy-vps.sh` reverts server-side edits and `drift-check.yml` (daily 05:00 UTC) alerts Stef on drift.
- **i18n**: every translation change touches all 5 files in `messages/` (`pl`, `en`, `de`, `cs`, `nl`) in the same commit. After changes run `npm run build` and grep for `MISSING_MESSAGE` (the build succeeds even with missing keys).
- Keep translation structure identical across locales (e.g. privacy page `renderItems()` expects `title`, `content`, `items` in every section).
- Deploy smoke test fails if `G-V9R1JJYYSG` or Microsoft Clarity disappears from `/pl` HTML, or if `<html>/<head>/<body>` appear more than once.
- Prisma is installed but the schema has no models (data lives in Zoho CRM). Do not add models without a decision.

## 7. Definition of Done

Every change meets `F:\Senior Management\standards\definition-of-done.md`. Before finishing a session: rewrite `PROGRESS.md`.
