import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { DiscoverPageContent } from '@/components/DiscoverPageContent';
import { JsonLd } from '@/components/JsonLd';
import { discoverSchema, farmSchema } from '@/lib/schema';

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
    const t = await getTranslations({ locale, namespace: 'discover' });
    return {
        title: t('meta.title'),
        description: t('meta.description'),
        openGraph: {
            title: t('meta.title'),
            description: t('meta.description'),
            images: ['/images/Alpacas/Suri.jpg'],
            type: 'website',
        },
    };
}

export default function DiscoverPage({ params: { locale } }: { params: { locale: string } }) {
    return (
        <>
            <JsonLd data={discoverSchema} />
            <JsonLd data={farmSchema} />
            <DiscoverPageContent locale={locale} />
        </>
    );
}
