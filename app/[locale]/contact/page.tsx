import { unstable_setRequestLocale } from 'next-intl/server'
import { ContactPageContent } from '@/components/ContactPageContent'
import type { Metadata } from 'next';

interface ContactPageProps {
  params: { locale: string }
}

const metaByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Contact — Zagroda Alpakoterapii | Alpaca Farm in Karkonosze',
    description: 'Contact Zagroda Alpakoterapii. Phone: +48 695 545 330. Address: Orłowice 24, 59-630 Mirsk, Poland. Book alpaca walks, farm stays, and therapy sessions.',
  },
  pl: {
    title: 'Kontakt — Zagroda Alpakoterapii | Farma Alpak w Karkonoszach',
    description: 'Skontaktuj się z Zagrodą Alpakoterapii. Telefon: +48 695 545 330. Adres: Orłowice 24, 59-630 Mirsk. Zarezerwuj spacery z alpakami i noclegi.',
  },
  de: {
    title: 'Kontakt — Zagroda Alpakoterapii | Alpaka-Farm im Riesengebirge',
    description: 'Kontaktieren Sie Zagroda Alpakoterapii. Telefon: +48 695 545 330. Adresse: Orłowice 24, 59-630 Mirsk, Polen. Alpaka-Spaziergänge und Unterkünfte buchen.',
  },
  cs: {
    title: 'Kontakt — Zagroda Alpakoterapii | Farma Alpak v Krkonoších',
    description: 'Kontaktujte Zagroda Alpakoterapii. Telefon: +48 695 545 330. Adresa: Orłowice 24, 59-630 Mirsk, Polsko. Rezervujte procházky s alpakami a ubytování.',
  },
  nl: {
    title: 'Contact — Zagroda Alpakoterapii | Alpacaboerderij in het Reuzengebergte',
    description: 'Neem contact op met Zagroda Alpakoterapii. Telefoon: +48 695 545 330. Adres: Orłowice 24, 59-630 Mirsk, Polen. Boek alpacawandelingen en verblijven.',
  },
};

export default function ContactPage({ params }: ContactPageProps) {
  unstable_setRequestLocale(params.locale)
  
  return <ContactPageContent locale={params.locale} />
}

export function generateMetadata({ params: { locale } }: ContactPageProps): Metadata {
  const meta = metaByLocale[locale] || metaByLocale.en;
  const url = `https://zagrodaalpakoterapii.com/${locale}/contact`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: {
        en: 'https://zagrodaalpakoterapii.com/en/contact',
        pl: 'https://zagrodaalpakoterapii.com/pl/contact',
        de: 'https://zagrodaalpakoterapii.com/de/contact',
        cs: 'https://zagrodaalpakoterapii.com/cs/contact',
        nl: 'https://zagrodaalpakoterapii.com/nl/contact',
      },
    },
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pl' }, { locale: 'de' }, { locale: 'cs' }, { locale: 'nl' }]
}
