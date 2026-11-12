# D3 — Zagroda Alpakoterapii Hub (Farm, Slow-Tourism PR & Staycations) — Chronological Audit Timeline (`D3`)

> **Auto-Synced**: `2026-11-12 03:00 CET` by `python "F:\Senior Management\tooling\portfolio.py"`
> **Master Source**: [`F:\Senior Management\TIMELINE.md`](file:///F:/Senior%20Management/TIMELINE.md) & [`ops-action-register.md`](file:///F:/Senior%20Management/ops-action-register.md)
> **Agent Memory Rule**: Read `AGENTS.md` → `PROGRESS.md` → `TIMELINE.md` before proposing any action so historical decisions, freezes, and sent emails are never forgotten or repeated.

## 📌 Current `PROGRESS.md` Status Snapshot
- **Last Updated**: `2026-11-11`
- **Last Antigravity Conversation**: `—` (Add `last_conversation_id` to `PROGRESS.md`)
- **Last Action**: 2026-11-11 — Commercial Pace Audit (Zoho CRM + Stripe Live): Uncovered 28-day commercial booking drought (last paid booking 2026-10-14; Nov commercial stays = 1,265 PLN / 6,000 PLN target [21%]; Dec winter peak book = 0 PLN / 10,000 PLN target); flipped status to RED to drive immediate voucher deploy & winter campaign urgency
- **Next Action**: **URGENT REVENUE ACTION: (1) Get Dorota Fura's sign-off TODAY/Thu 12.11 & deploy 07.11 Christmas Gift Vouchers + Living Bulletin #1 + hostinger-mail secret fix; (2) Launch Pre-Christmas Voucher & Dec Winter Weekend campaign (past-guest WhatsApp/email list + ROI-capped Meta offer <=50 PLN CPA); (3) Send TVP3 Wrocław PR follow-up (by Sat 14.11)** (`Jan`, due `2026-11-12`)
- **Waiting On**: Dorota Fura sign-off to deploy Christmas Vouchers & Living Bulletin #1 (by Thu 12.11) + launch of Pre-Christmas / Dec Winter booking campaign

---

## ⏱️ 1. Chronological Event, Decision & Filing Log

| Date & Time (CET) | Direction | Code | Actors (From → To) | Document / Ref ID | Outcome & Next Due Date |
|---|---|---|---|---|---|
| `2026-10-19 09:11` | `OUTBOUND` | `D3.2 / COM-05` | `marketing@zagrodaalpakoterapii.com → Regional Media` | *Oaza spokoju w Orłowicach* | Slow-Tourism pitch sent; TVP3 Wrocław (Daniela Stadniczenko) replied `19.10 11:54` · **Next Due: `2026-11-02` (Week 2)** |
| `2026-10-26 18:00` | `MILESTONE` | `D4.2` | `Jan Fura / Kelly → Zagroda Guest Rooms` | [zagroda-room-qr-cards.html](file:///F:/Git%20Hub%20Projects/IzeraJizera/public/print/zagroda-room-qr-cards.html) | Completed & printed 4-language Walkers AI Concierge QR code cards · **Status: Completed** |
| `2026-11-06 10:00` | `MILESTONE` | `D3.1` | `Jan -> zagroda-website` | [PROGRESS.md](file:///F:/Git Hub Projects/Zagroda_adoption/PROGRESS.md) | Morning Briefing: Scheduled Zagroda Week 2 push (Living Bulletin #1 + Christmas Vouchers + TVP3 Slow-Tourism PR follow-up with Dorota Fura) for Weekend Sprint (Sat 07.11 / Sun 08.11) so Friday 06.11 stays 100% focused on Court de Padel (11:00 CET) and Patrick / Leonardo Guesthouse · **Next Due: `2026-11-07`** |
| `2026-11-08 10:00` | `MILESTONE` | `D4.1` | `Jan -> izerajizera` | [PROGRESS.md](file:///F:/Git Hub Projects/IzeraJizera/PROGRESS.md) | Added deterministic Windows Chrome/Edge Booking.com `.html` room importer (`src/lib/booking-com-html-parser.ts` + `src/components/stay/BookingComHtmlImportButton.tsx`) inside `QuickOnboardingMatrix.tsx` (445 lines <= 450 ceiling, 4-locale PL/EN/DE/CS). Parses `b_rooms_available_and_soldout` + `hprt-table` rows from saved Windows `.html` files (verified on real Zagroda page `tests/fixtures/booking-com/zagroda-windows-chrome.html`: hotelId `4861113`, room `486111302` `Apartment with Mountain View`, `30 m²`, `3` guests, `1 extra-large double bed + 1 sofa bed`, `425.5 PLN/night` -> `362 PLN` Direct / `426 PLN` Booking.com, blank `.ics`) and explicitly rejects Apple `.webarchive`/`.pdf` files. Self-test v2.1 19/19 PASS against https://izerajizera.com. · **Next Due: `2026-11-10`** |
| `2026-11-09 10:00` | `MILESTONE` | `D4.1` | `Jan -> izerajizera` | [PROGRESS.md](file:///F:/Git Hub Projects/IzeraJizera/PROGRESS.md) | Released Sprint D4-S02 (`v2.2.0-staging`) to `https://staging.izerajizera.com` (branch `develop`, Port 3801) keeping production `main` untouched until Jan & Ambassador daily release sign-off: (1) De-biased the portal from single-property Zagroda copy to the multi-partner IzeraJizera Host Alliance across Homepage (`Verified Partner Stays Showcase`), Footer, AI Concierge (`/concierge?stay=<slug>`), and 3-Day Planner (`/plan?stay=<slug>`); (2) Built `src/lib/partner-basecamps.ts` + `src/data/partner-doorstep-walks.ts` with 2 stored Doorstep Walks (`0 km` car) per partner property (`Guesthouse Leonardo`, `Domki Górskie Sylwia`, `Willa Izerska`, `Zagroda Alpakoterapii`) and dynamic GPS drive-time calculation; (3) Added Dynamic Printable Partner Room QR Standees (`/[lang]/stay/qr-cards?stay=<slug>`); (4) Updated Partner & Ambassador Onboarding Manual to `v2.2` (`/print/IzeraJizera_Partner_Setup_Stripe_Manual.html`); and (5) Added the Zoho Sprints (`D4.1`) Ambassador Staging & Daily Release Decision Board (`/[lang]/stay/staging-sprint` and inside `/stay/admin` Help & Roadmap). · **Next Due: `2026-11-09`** |
| `2026-11-10 10:00` | `MILESTONE` | `D3.1` | `Jan -> zagroda-website` | [PROGRESS.md](file:///F:/Git Hub Projects/Zagroda_adoption/PROGRESS.md) | Verified that Living Bulletin #1, Christmas Gift Vouchers, winter-barn photos, 5-language translations, and the hostinger-mail webhook secret fix are already coded on disk (31 modified files from 07.11.2026) and ready for Dorota Fura's review before commit & deploy · **Next Due: `2026-11-12`** |
| `2026-11-11 10:00` | `MILESTONE` | `D3.1` | `Jan -> zagroda-website` | [PROGRESS.md](file:///F:/Git Hub Projects/Zagroda_adoption/PROGRESS.md) | Commercial Pace Audit (Zoho CRM + Stripe Live): Uncovered 28-day commercial booking drought (last paid booking 2026-10-14; Nov commercial stays = 1,265 PLN / 6,000 PLN target [21%]; Dec winter peak book = 0 PLN / 10,000 PLN target); flipped status to RED to drive immediate voucher deploy & winter campaign urgency · **Next Due: `2026-11-12`** |

---

## 📬 2. Outbound Comms & Waiting-On-Reply Ledger (`COM-xx`)

| ID | Code | Subject / Matter | Date Sent | Sent From Mailbox | Recipient(s) | Delivery / Reply Status | Next Action & Deadline |
|---|---|---|---|---|---|---|---|
| **`COM-05`** | **`[D3.2]`** | **Zagroda Slow-Tourism Media Pitch** *(Oaza spokoju w Orłowicach)* | `2026-10-19 09:11` | `marketing@zagrodaalpakoterapii.com` | Regional media list | 🟡 **TVP3 Wrocław replied (`19.10 11:54`, Daniela Stadniczenko)**; 5 addresses bounced | **Deferred to Week 2 (`w/c 2 Nov`)** per Nov Monthly Charter |
