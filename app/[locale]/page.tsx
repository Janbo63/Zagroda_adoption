import {unstable_setRequestLocale} from 'next-intl/server';
import { HomeContent } from '@/components/HomeContent';

type Props = {
  params: {locale: string}
};

export default function HomePage({params: {locale}}: Props) {
  unstable_setRequestLocale(locale);
  
  return (
    <HomeContent locale={locale} />
  );
}