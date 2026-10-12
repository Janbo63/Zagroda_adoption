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
    '/workation',
    '/discover',
    '/adopt',
    '/vouchers',
    '/contact',
    '/romantic-getaway',
    '/family-farm-stay',
    '/welkom',
    '/privacy',
    '/terms',
];

const CS_ONLY_PAGES = [
    '/vylet',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    for (const page of PUBLIC_PAGES) {
        for (const locale of LOCALES) {
            entries.push({
                url: `${BASE_URL}/${locale}${page}`,
                lastModified: new Date(),
                changeFrequency: page === '' ? 'weekly' : 'monthly',
                priority: page === '' ? 1.0 : (page === '/stay' || page === '/romantic-getaway' || page === '/family-farm-stay') ? 0.9 : 0.7,
            });
        }
    }

    for (const page of CS_ONLY_PAGES) {
        entries.push({
            url: `${BASE_URL}/cs${page}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        });
    }

    return entries;
}
