import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { WorkationPageContent } from '@/components/WorkationPageContent';
import { JsonLd } from '@/components/JsonLd';
import { accommodationSchema, farmSchema } from '@/lib/schema';

export async function generateStaticParams() {
    return [
        { locale: 'pl' },
        { locale: 'en' },
        { locale: 'nl' },
        { locale: 'de' },
        { locale: 'cs' },
    ];
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'workation' });
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

export default function WorkationPage({ params: { locale } }: { params: { locale: string } }) {
    return (
        <>
            <JsonLd data={accommodationSchema} />
            <JsonLd data={farmSchema} />
            <WorkationPageContent locale={locale} />
        </>
    );
}
