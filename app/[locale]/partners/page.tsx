import { unstable_setRequestLocale } from 'next-intl/server';
import { PartnersPageContent } from '@/components/PartnersPageContent';
import type { Metadata } from 'next';

interface PartnersPageProps {
  params: { locale: string };
}

const metaByLocale: Record<string, { title: string; description: string }> = {
  pl: {
    title: 'Materiały dla Partnerów, Hoteli i Portali — Zagroda Alpakoterapii',
    description: 'Oficjalny pakiet medialny dla hoteli, pensjonatów i portali turystycznych. Pobierz gotowe opisy atrakcji w Górach Izerskich, zdjęcia wysokiej rozdzielczości i zamów darmowe ulotki na recepcję.',
  },
  cs: {
    title: 'Materiály pro hotely a turistické portály — Zagroda Alpakoterapii',
    description: 'Oficiální mediální balíček pro hotely, penziony a turistické portály v Jizerských horách. Stáhněte si popisy, fotografie ve vysokém rozlišení a objednejte si bezplatné letáky na recepci.',
  },
  en: {
    title: 'Media & Partner Kit for Hotels & Tourism Boards — Zagroda Alpakoterapii',
    description: 'Official media kit for hotels, guest houses, and regional tourism boards. Download ready-to-use attraction descriptions, high-res photos, and order free reception brochures.',
  },
  de: {
    title: 'Partner-Kit für Hotels & Tourismusportale — Zagroda Alpakoterapii',
    description: 'Offizielles Medienpaket für Hotels, Pensionen und Tourismusportale. Laden Sie Beschreibungen der Alpaka-Farm im Isergebirge, hochauflösende Fotos herunter und bestellen Sie kostenlose Flyer.',
  },
  nl: {
    title: 'Media & Partner Kit voor Hotels en Toerisme — Zagroda Alpakoterapii',
    description: 'Officieel mediapakket voor hotels en toeristische platforms. Download kant-en-klare beschrijvingen, foto’s in hoge resolutie en bestel gratis brochures voor de receptie.',
  },
};

export default function PartnersPage({ params }: PartnersPageProps) {
  unstable_setRequestLocale(params.locale);
  return <PartnersPageContent locale={params.locale} />;
}

export function generateMetadata({ params: { locale } }: PartnersPageProps): Metadata {
  const meta = metaByLocale[locale] || metaByLocale.pl;
  const url = `https://zagrodaalpakoterapii.com/${locale}/partners`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: {
        pl: 'https://zagrodaalpakoterapii.com/pl/partners',
        cs: 'https://zagrodaalpakoterapii.com/cs/partners',
        en: 'https://zagrodaalpakoterapii.com/en/partners',
        de: 'https://zagrodaalpakoterapii.com/de/partners',
        nl: 'https://zagrodaalpakoterapii.com/nl/partners',
      },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pl' }, { locale: 'de' }, { locale: 'cs' }, { locale: 'nl' }];
}
