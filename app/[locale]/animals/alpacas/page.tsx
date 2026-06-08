// NO 'use client' here
import { AlpacasPageContent } from '@/components/AlpacasPageContent'

export function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: `Alpacas - ${params.locale.toUpperCase()}`,
    description: `Meet our friendly alpaca troop - ${params.locale.toUpperCase()} version`,
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pl' }, { locale: 'de' }, { locale: 'cs' }, { locale: 'nl' }];
}

export default function AlpacasPage({ params }: { params: { locale: string } }) {
  return <AlpacasPageContent locale={params.locale} />
}