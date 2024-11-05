import {unstable_setRequestLocale} from 'next-intl/server';
import { ActivitiesContent } from '@/components/ActivitiesContent';

type Props = {
  params: {locale: string}
};

// ISR - Activities listing
export const revalidate = 60

export default function ActivitiesPage({params: {locale}}: Props) {
  unstable_setRequestLocale(locale);

  return (
    <div className="container mx-auto">
      <ActivitiesContent locale={locale} />
    </div>
  );
}

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'pl'}];
}

export async function generateMetadata({params: {locale}}: Props) {
  return {
    title: `Activities - ${locale.toUpperCase()}`,
    description: `Our activities - ${locale.toUpperCase()} version`
  };
}
