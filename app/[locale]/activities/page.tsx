import {unstable_setRequestLocale} from 'next-intl/server';
import { ActivitiesContent } from '@/components/ActivitiesContent';
import type { Metadata } from 'next';

type Props = {
  params: {locale: string}
};

// ISR - Activities listing
export const revalidate = 60

const metaByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Activities — Alpaca Walks, Farm Tours & Therapy Sessions | Zagroda',
    description: 'Guided alpaca walks, meet-and-greet sessions, and private farm tours in the Karkonosze Mountains. Autumn activities include hiking in fall colors and mushroom foraging. Suitable for families with children aged 3+.',
  },
  pl: {
    title: 'Atrakcje — Spacery z Alpakami, Alpakoterapia | Zagroda Alpakoterapii',
    description: 'Spacery z alpakami, jesienne wędrówki, grzybobranie i prywatne wycieczki po farmie w Karkonoszach i Górach Izerskich. Idealne na jesienny weekend dla rodzin z dziećmi od 3 lat.',
  },
  de: {
    title: 'Aktivitäten — Alpaka-Spaziergänge, Hofführungen & Therapie | Zagroda',
    description: 'Geführte Alpaka-Spaziergänge, Herbstwanderungen und private Hofführungen im Riesengebirge. Geeignet für Familien mit Kindern ab 3 Jahren.',
  },
  cs: {
    title: 'Aktivity — Procházky s Alpakami, Prohlídky Farmy | Zagroda',
    description: 'Podzimní procházky s alpakami s průvodcem, houbaření a soukromé prohlídky farmy v Krkonoších. Vhodné pro rodiny s dětmi od 3 let.',
  },
  nl: {
    title: 'Activiteiten — Alpacawandelingen, Rondleidingen & Therapie | Zagroda',
    description: 'Begeleide alpacawandelingen, herfstwandelingen en privé-rondleidingen op de boerderij in het Reuzengebergte. Geschikt voor gezinnen met kinderen vanaf 3 jaar.',
  },
};

export default function ActivitiesPage({params: {locale}}: Props) {
  unstable_setRequestLocale(locale);

  return (
    <div className="container mx-auto">
      <ActivitiesContent locale={locale} />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pl' }, { locale: 'de' }, { locale: 'cs' }, { locale: 'nl' }];
}

export async function generateMetadata({params: {locale}}: Props): Promise<Metadata> {
  const meta = metaByLocale[locale] || metaByLocale.en;
  const url = `https://zagrodaalpakoterapii.com/${locale}/activities`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: {
        en: 'https://zagrodaalpakoterapii.com/en/activities',
        pl: 'https://zagrodaalpakoterapii.com/pl/activities',
        de: 'https://zagrodaalpakoterapii.com/de/activities',
        cs: 'https://zagrodaalpakoterapii.com/cs/activities',
        nl: 'https://zagrodaalpakoterapii.com/nl/activities',
      },
    },
  };
}
