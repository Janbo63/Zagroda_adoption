import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { StayPageContent } from '@/components/StayPageContent';

// Generate static params for all supported locales
export async function generateStaticParams() {
    return [
        { locale: 'pl' },
        { locale: 'en' },
        { locale: 'nl' },
        { locale: 'de' },
        { locale: 'cs' },
    ];
}

// Dynamic metadata per locale
export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'stay' });
    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default function StayPage({ params: { locale } }: { params: { locale: string } }) {
    return <StayPageContent locale={locale} />;
}
