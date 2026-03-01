import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { FacebookBridgePage } from '@/components/FacebookBridgePage';

export function generateStaticParams() {
    return [
        { locale: 'nl' },
        { locale: 'en' },
        { locale: 'pl' },
        { locale: 'de' },
        { locale: 'cs' },
    ];
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'welkom' });
    return {
        title: t('meta.title'),
        description: t('meta.description'),
        openGraph: {
            title: t('meta.title'),
            description: t('meta.description'),
            images: ['/images/Alpacas/Elvis.jpg'],
            type: 'website',
        },
    };
}

export default function WelkomPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    return <FacebookBridgePage locale={locale} />;
}
