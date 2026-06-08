import { AnimalsPageContent } from '@/components/AnimalsPageContent'
import type { Metadata } from 'next';

interface AnimalsPageProps {
  params: { locale: string }
}

const metaByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Our Animals — Alpacas, Goats & Dogs | Zagroda Alpakoterapii',
    description: 'Meet the animals at Zagroda Alpakoterapii. Our gentle alpacas, playful goats, and loyal farm dogs are waiting to greet you. Each has their own unique personality.',
  },
  pl: {
    title: 'Nasze Zwierzęta — Alpaki, Kozy i Psy | Zagroda Alpakoterapii',
    description: 'Poznaj zwierzęta w Zagrodzie Alpakoterapii. Nasze łagodne alpaki, wesołe kozy i wierne psy farmowe czekają na Ciebie.',
  },
  de: {
    title: 'Unsere Tiere — Alpakas, Ziegen & Hunde | Zagroda Alpakoterapii',
    description: 'Lernen Sie die Tiere der Zagroda Alpakoterapii kennen. Unsere sanften Alpakas, verspielten Ziegen und treuen Hofhunde freuen sich auf Sie.',
  },
  cs: {
    title: 'Naše Zvířata — Alpaky, Kozy a Psi | Zagroda Alpakoterapii',
    description: 'Seznamte se se zvířaty na Zagroda Alpakoterapii. Naše jemné alpaky, hravé kozy a věrní farmářští psi se na vás těší.',
  },
  nl: {
    title: 'Onze Dieren — Alpaca\'s, Geiten & Honden | Zagroda Alpakoterapii',
    description: 'Maak kennis met de dieren van Zagroda Alpakoterapii. Onze zachte alpaca\'s, speelse geiten en trouwe boerderijhonden wachten op je.',
  },
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pl' }, { locale: 'de' }, { locale: 'cs' }, { locale: 'nl' }]
}

export function generateMetadata({ params: { locale } }: AnimalsPageProps): Metadata {
  const meta = metaByLocale[locale] || metaByLocale.en;
  const url = `https://zagrodaalpakoterapii.com/${locale}/animals`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: {
        en: 'https://zagrodaalpakoterapii.com/en/animals',
        pl: 'https://zagrodaalpakoterapii.com/pl/animals',
        de: 'https://zagrodaalpakoterapii.com/de/animals',
        cs: 'https://zagrodaalpakoterapii.com/cs/animals',
        nl: 'https://zagrodaalpakoterapii.com/nl/animals',
      },
    },
  }
}

export default function AnimalsPage({ params }: AnimalsPageProps) {
  return <AnimalsPageContent locale={params.locale} />
}