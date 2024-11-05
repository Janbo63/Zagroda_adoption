import { unstable_setRequestLocale } from 'next-intl/server';
import { HomeContent } from '@/components/HomeContent';

interface HomePageProps {
  params: { locale: string }
}

export default function HomePage({ params }: HomePageProps) {
  unstable_setRequestLocale(params.locale);

  return (
    <div className="container mx-auto">
      <HomeContent locale={params.locale} />
    </div>
  );
}

export function generateMetadata({ params: { locale } }: HomePageProps) {
  return {
    title: `Home Page - ${locale.toUpperCase()}`,
    description: `Welcome to our website - ${locale.toUpperCase()} version`,
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pl' }];
}