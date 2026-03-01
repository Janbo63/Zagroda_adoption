import { unstable_setRequestLocale } from 'next-intl/server';
import { HomeContent } from '@/components/HomeContent';
import { JsonLd } from '@/components/JsonLd';
import { farmSchema } from '@/lib/schema';

type Props = {
  params: { locale: string }
};

export default function HomePage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <JsonLd data={farmSchema} />
      <HomeContent locale={locale} />
    </>
  );
}
