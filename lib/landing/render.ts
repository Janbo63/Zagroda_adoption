import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PROPERTY_ID } from '@/lib/schema';
import { withTokens, type LandingContent, type Tokens } from './types';

const BASE_URL = 'https://zagrodaalpakoterapii.com';
export const CLUSTER_LOCALES = ['pl', 'en', 'cs', 'de', 'nl'] as const;

/** Room names, prices and activity names straight from messages/<locale>.json. */
export async function buildTokens(locale: string): Promise<Tokens> {
    const stay = await getTranslations({ locale, namespace: 'stay' });
    const act = await getTranslations({ locale, namespace: 'activities' });
    return {
        gardenName: stay('rooms.garden.name'),
        jungleName: stay('rooms.jungle.name'),
        forestName: stay('rooms.forest.name'),
        gardenPrice: stay('rooms.garden.price'),
        gardenPriceSub: stay('rooms.garden.priceSub'),
        forestPrice: stay('rooms.forest.price'),
        forestPriceSub: stay('rooms.forest.priceSub'),
        meetName: act('meetthealpacas.name'),
        walkName: act('alpacawalks.name'),
    };
}

export async function resolveContent(content: LandingContent, locale: string): Promise<LandingContent> {
    return withTokens(content, await buildTokens(locale));
}

export function landingMetadata(c: LandingContent, locale: string, slug: string, locales: readonly string[]): Metadata {
    const url = `${BASE_URL}/${locale}/${slug}`;
    return {
        title: c.meta.title,
        description: c.meta.description,
        alternates: {
            canonical: url,
            languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}/${slug}`])),
        },
        openGraph: { title: c.meta.title, description: c.meta.description, url, images: [c.image.src], type: 'website' },
    };
}

/** FAQPage (answer capsules) + BreadcrumbList. References the site-wide business entity by @id. */
export function landingSchema(c: LandingContent, locale: string, slug: string) {
    const url = `${BASE_URL}/${locale}/${slug}`;
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'FAQPage',
                '@id': `${url}#faq`,
                url,
                inLanguage: locale,
                about: { '@id': PROPERTY_ID },
                mainEntity: c.capsules.map((cap) => ({
                    '@type': 'Question',
                    name: cap.q,
                    acceptedAnswer: { '@type': 'Answer', text: cap.a },
                })),
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Zagroda Alpakoterapii', item: `${BASE_URL}/${locale}` },
                    { '@type': 'ListItem', position: 2, name: c.breadcrumb, item: url },
                ],
            },
        ],
    };
}
