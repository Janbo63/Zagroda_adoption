# Zagroda Alpakoterapii Website — Project Brief

## One-Liner
> Customer-facing website for Zagroda Alpakoterapii alpaca therapy farm.

## Business Case
**Why does this exist?** Primary revenue channel — direct bookings bypass OTA commissions (Booking.com and Airbnb take 15-18%).
**Who benefits?** Guests (streamlined direct booking & experience discovery), Jan (margin preservation & direct revenue), farm staff (centralized guest communication & management).
**Revenue model**: Direct revenue via Stripe payments (accommodation bookings, alpaca adoption sponsorships, and gift vouchers).

## Value Proposition
The direct digital storefront for Poland's premier alpaca therapy farm. Combines multi-language localized booking (PL, EN, DE, CS, NL) with instant Stripe payments, automated PDF voucher/certificate generation, and direct injection into the master PMS. By converting visitors directly rather than through third-party platforms, it preserves 15-18% margins per reservation.

## Strategic Alignment
- **Theme**: 🏠 Hospitality & Tourism (see [objectives.md](file:///F:/Senior%20Management/objectives.md))
- **Priority Tier**: 🔴 Tier 1 — Revenue Infrastructure (see [portfolio-decisions.md](file:///F:/Senior%20Management/portfolio-decisions.md))
- **Dependencies**: Beds24 (master PMS), Beds25 (admin engine), Zoho CRM (contacts/adoptions), Stripe (payments)

## Targets & KPIs

### Q4 2026
| Metric | Baseline | Target | How to Measure |
|---|---|---|---|
| Direct bookings/month | ~10 | 20 | Beds24 API: bookings where `source=WEBSITE` |
| Direct booking revenue/month | ~5,000 PLN | 10,000 PLN | Stripe dashboard + Beds24 revenue reports |
| Website conversion rate | Establish baseline | +20% from baseline | GA4: sessions → booking-started → booking-confirmed funnel |
| i18n coverage | ~70% (PL/EN complete; DE/CS/NL partial) | 100% across all 5 locales | Build-time `MISSING_MESSAGE` count = 0 |

### 12-Month Vision
The dominant direct booking channel for Zagroda Alpakoterapii, reducing OTA dependency to <50% of total bookings while scaling alpaca adoption sponsorships and seasonal voucher sales across Central Europe.

## Cost & Resources
- **Infrastructure**: Docker on Hostinger VPS port 3000/3001 behind Caddy reverse proxy; domains: `zagrodaalpakoterapii.com` (production) and `futuresolutionstestbed.eu` (staging)
- **Monthly cost estimate**: ~$15/month Hostinger VPS share + Stripe transaction fees (2.9% + 1.25 PLN)
- **Agent time**: Daily (content updates, SEO/AEO optimization, booking flow UX refinements, i18n synchronization)

## Dependencies
- **Master PMS**: Beds24 API v2 (`POST /bookings` with `source: WEBSITE`) per Booking Triad Contract in [contracts.md](file:///F:/Senior%20Management/contracts.md).
- **Admin & Validation**: [Beds25](file:///F:/Git%20Hub%20Projects/Beds25/) provides room availability verification, pricing calculation, and voucher code validation.
- **Enterprise CRM**: Zoho CRM API v6 receives customer contact records, adoption sponsorships, and voucher records per Zoho Contract in [contracts.md](file:///F:/Senior%20Management/contracts.md).
- **Payments**: Stripe API handles checkout sessions, webhooks, and payment confirmations.
- **Monitoring**: Centralized error logging sent to Stef Dashboard (`POST https://stef.futuresolutionsai.com/api/logs`) per Error Logging Contract in [contracts.md](file:///F:/Senior%20Management/contracts.md).
- **Referral Traffic**: Fed by [IzeraJizera](file:///F:/Git%20Hub%20Projects/IzeraJizera/) regional tourism guide.

## Current Status
- **Last active**: 2026-09-02 (chore: staging deployment trigger)
- **Next milestone**: Complete 100% i18n coverage across all 5 locales (zero `MISSING_MESSAGE` errors) and activate live direct room booking flow.

## Exit Criteria
Would never shut down — this IS the business. Would only rebuild on a different platform if tech stack requirements drastically change.
