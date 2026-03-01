import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { StayPageContent } from '@/components/StayPageContent';
import { JsonLd } from '@/components/JsonLd';
import { accommodationSchema, farmSchema } from '@/lib/schema';

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
        openGraph: {
            title: t('meta.title'),
            description: t('meta.description'),
            images: ['/images/Rooms/Garden-1.jpg'],
            type: 'website',
        },
    };
}

export default function StayPage({ params: { locale } }: { params: { locale: string } }) {
    return (
        <>
            <JsonLd data={accommodationSchema} />
            <JsonLd data={farmSchema} />
            <StayPageContent locale={locale} />
        </>
    );
}
