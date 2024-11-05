import { unstable_setRequestLocale } from 'next-intl/server';
import { BlogPageContent } from '@/components/BlogPageContent';

export const dynamic = 'force-dynamic'

export default function BlogPage() {
  unstable_setRequestLocale('en');
  
  return <BlogPageContent locale='en' />;
}