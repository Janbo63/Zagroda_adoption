import { MetadataRoute } from 'next';

const BASE_URL = 'https://zagrodaalpakoterapii.com';
const LOCALES = ['en', 'pl', 'nl', 'de', 'cs'];

const PUBLIC_PAGES = [
    '',           // homepage
    '/animals',
    '/animals/alpacas',
    '/animals/goats',
    '/animals/dogs',
    '/activities',
    '/stay',
    '/discover',
    '/adopt',
    '/vouchers',
    '/contact',
    '/blog',
    '/welkom',
    '/privacy',
    '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    for (const page of PUBLIC_PAGES) {
        for (const locale of LOCALES) {
            entries.push({
                url: `${BASE_URL}/${locale}${page}`,
                lastModified: new Date(),
                changeFrequency: page === '' ? 'weekly' : 'monthly',
                priority: page === '' ? 1.0 : page === '/stay' ? 0.9 : 0.7,
            });
        }
    }

    return entries;
}
