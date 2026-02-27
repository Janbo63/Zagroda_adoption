import { redirect } from 'next/navigation';

interface AccommodationPageProps {
  params: { locale: string };
}

export function generateStaticParams() {
  return [
    { locale: 'pl' },
    { locale: 'en' },
    { locale: 'nl' },
    { locale: 'de' },
    { locale: 'cs' },
  ];
}

export default function AccommodationPage({ params: { locale } }: AccommodationPageProps) {
  redirect(`/${locale}/stay`);
}
