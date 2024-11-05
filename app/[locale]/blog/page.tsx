import { unstable_setRequestLocale } from 'next-intl/server';
import { BlogPageContent } from '@/components/BlogPageContent';

export default function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  
  return <BlogPageContent locale={locale} />;
}