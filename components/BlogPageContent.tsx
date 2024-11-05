'use client'

import { useTranslations } from 'next-intl';

interface BlogPageContentProps {
  locale: string;
}

export function BlogPageContent({ locale: _locale }: BlogPageContentProps) {
  const t = useTranslations('Blog');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      {/* Add your blog content here */}
    </div>
  );
} 