# Zagroda Alpakoterapii — zagrodaalpakoterapii.com

Customer-facing website for the alpaca therapy farm. Features animal profiles, activities, accommodation, alpaca adoption with Stripe payments, gift vouchers with PDF generation, blog, and marketing campaigns.

## Tech Stack

- **Framework**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Radix UI + Framer Motion
- **i18n**: `next-intl` — Polish (default), English, German, Czech, Dutch
- **Payments**: Stripe (adoption sponsorships, voucher purchases)
- **CRM**: Zoho CRM (contacts, records)
- **Email**: Nodemailer (confirmations, certificates)
- **PDF**: pdfkit (adoption certificates, voucher PDFs)
- **Analytics**: Facebook Pixel + Google Tag Manager

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Stripe and Zoho keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — default language is Polish (`/pl/`).

## Deployment

**Production**: Docker Compose on Hostinger VPS (port 3001), auto-deployed via GitHub Actions on push to `main`.

```bash
# Manual Docker deployment
docker-compose up --build -d
```

See [docs/STAGING_DEPLOYMENT.md](docs/STAGING_DEPLOYMENT.md) for staging setup.

## Project Structure

```
app/
  [locale]/        # Locale-based routing (pl, en, de, cs, nl)
    about/         # About the farm
    accommodation/ # Room listings
    activities/    # Farm activities
    adopt/         # Alpaca adoption program
    animals/       # Animal profiles
    blog/          # Blog posts
    contact/       # Contact form
    vouchers/      # Gift voucher shop
  api/             # API routes (Stripe, certificates, posts)
components/        # React components
lib/               # Business logic (Zoho, email, PDF generation)
messages/          # i18n translation files (pl, en, de, cs, nl)
public/            # Static assets and images
```
