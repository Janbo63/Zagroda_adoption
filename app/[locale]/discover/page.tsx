import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { DiscoverPageContent } from '@/components/DiscoverPageContent';
import { JsonLd } from '@/components/JsonLd';
import { discoverSchema, farmSchema, generateDiscoverFaqSchema } from '@/lib/schema';

// Force static optimization & caching for benchmark performance (TTFB < 200ms)
export const revalidate = 86400; // 24 hours static caching

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

export default async function DiscoverPage({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'discover' });

    const localizedFaqs = [
        { question: t('faqs.q1'), answer: t('faqs.a1') },
        { question: t('faqs.q2'), answer: t('faqs.a2') },
        { question: t('faqs.q3'), answer: t('faqs.a3') },
    ];

    const faqSchema = generateDiscoverFaqSchema(localizedFaqs);

    return (
        <>
            <JsonLd data={discoverSchema} />
            <JsonLd data={farmSchema} />
            <JsonLd data={faqSchema} />
            <DiscoverPageContent locale={locale} />
        </>
    );
}
