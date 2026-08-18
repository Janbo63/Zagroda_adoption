/**
 * Schema.org JSON-LD generators for Zagroda Alpakoterapii.
 * Use these in page.tsx files as <JsonLd data={...} />.
 *
 * Key schemas:
 *  - farmSchema        → LocalBusiness + TouristAttraction (home page)
 *  - accommodationSchema → LodgingBusiness (stay page)
 *  - attractionsSchema → TouristAttraction list (discover page)
 */

const BASE_URL = 'https://zagrodaalpakoterapii.com';
const LOGO = `${BASE_URL}/images/zagrodanewlogo.png`;

/** Core business schema — used everywhere */
export const farmSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TouristAttraction', 'FarmStay'],
    name: 'Zagroda Alpakoterapii',
    alternateName: 'Alpaca Farm Karkonosze',
    url: BASE_URL,
    logo: LOGO,
    image: [
        `${BASE_URL}/images/Alpacas/Elvis.jpg`,
        `${BASE_URL}/images/Rooms/Garden-1.jpg`,
        `${BASE_URL}/images/activities/alpaca-walks.jpg`,
    ],
    description:
        'A unique alpaca therapy farm in the Karkonosze mountains, Poland. Family-friendly stays, alpaca walks, and outdoor experiences for all ages.',
    address: {
        '@type': 'PostalAddress',
        streetAddress: '24 Orłowice',
        addressLocality: 'Mirsk',
        postalCode: '59-630',
        addressCountry: 'PL',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 50.9568,
        longitude: 15.3856,
    },
    telephone: '+48695545330',
    email: 'admin@zagrodaalpakoterapii.com',
    openingHours: 'Mo-Su 08:00-20:00',
    priceRange: '$$',
    currenciesAccepted: 'PLN',
    paymentAccepted: 'Cash, Credit Card',
    amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Alpaca Walks', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Family Friendly', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Pet Friendly', value: false },
        { '@type': 'LocationFeatureSpecification', name: 'Outdoor Activities', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Kid Friendly', value: true },
    ],
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '47',
        bestRating: '5',
    },
    sameAs: [
        'https://www.facebook.com/zagrodaalpakoterapii',
        'https://www.instagram.com/zagrodaalpako',
        'https://maps.app.goo.gl/zagrodaalpakoterapii',
        'https://www.booking.com/hotel/pl/zagroda-alpakoterapii.html',
    ],
};

/** Lodging / Stay page schema */
export const accommodationSchema = {
    '@context': 'https://schema.org',
    '@type': 'BedAndBreakfast',
    name: 'Zagroda Alpakoterapii — Alpaca Farm Stay',
    url: `${BASE_URL}/stay`,
    image: [
        `${BASE_URL}/images/Rooms/Garden-1.jpg`,
        `${BASE_URL}/images/Rooms/Jungle-1.jpg`,
    ],
    description:
        'Sleep on a working alpaca farm deep in the Karkonosze mountains. Two unique rooms with included alpaca experience from 493 PLN / ~€115.',
    address: {
        '@type': 'PostalAddress',
        streetAddress: '24 Orłowice',
        addressLocality: 'Mirsk',
        postalCode: '59-630',
        addressCountry: 'PL',
    },
    priceRange: '493–999 PLN',
    telephone: '+48695545330',
    checkinTime: '15:00',
    checkoutTime: '11:00',
    amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Alpaca Experience Included', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Private Bathroom', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Garden Access', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Mountain Views', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Family Rooms', value: true },
    ],
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '47',
        bestRating: '5',
    },
};

/** Discover / Area Guide page schema */
export const discoverSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: 'Karkonosze Region — Alpaca Farm & Local Attractions',
    url: `${BASE_URL}/discover`,
    description:
        'Family-friendly region in the Polish Sudeten mountains. Alpaca farm, national park hiking, waterfalls, castles, and the Izerski Tourist Package.',
    image: `${BASE_URL}/images/Alpacas/Suri.jpg`,
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 50.9568,
        longitude: 15.3856,
    },
    includesAttraction: [
        { '@type': 'TouristAttraction', name: 'Karkonosze National Park', geo: { '@type': 'GeoCoordinates', latitude: 50.7714, longitude: 15.5394 } },
        { '@type': 'TouristAttraction', name: 'Kamieńczyk Waterfall', geo: { '@type': 'GeoCoordinates', latitude: 50.8283, longitude: 15.5072 } },
        { '@type': 'TouristAttraction', name: 'Castle Czocha', geo: { '@type': 'GeoCoordinates', latitude: 51.0697, longitude: 15.2636 } },
        { '@type': 'TouristAttraction', name: 'Krobica Silver Mine', url: 'https://stacjakultury.swieradowzdroj.pl/izerska_laka/izerski-pakiet-turystyczny/' },
        { '@type': 'TouristAttraction', name: 'Śnieżka Summit (1602m)', geo: { '@type': 'GeoCoordinates', latitude: 50.7363, longitude: 15.7393 } },
        { '@type': 'TouristAttraction', name: 'Liberec, Czech Republic', geo: { '@type': 'GeoCoordinates', latitude: 50.7671, longitude: 15.0562 } },
        { '@type': 'TouristAttraction', name: 'Świeradów-Zdrój Spa', geo: { '@type': 'GeoCoordinates', latitude: 50.9019, longitude: 15.3273 } },
    ],
};

/** FAQPage schema for Discover page targeting AI search queries */
export const discoverFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What are the best things to do near Świeradów-Zdrój?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Top activities include visiting Zagroda Alpakoterapii for alpaca walks and therapy sessions (in Orłowice, just 10-15 min drive from Świeradów-Zdrój), relaxing at Świeradów thermal baths, hiking to the Sky Walk observation tower, exploring Castle Czocha, and visiting the Krobica Silver Mine.',
            },
        },
        {
            '@type': 'Question',
            name: 'What family activities are near Szklarska Poręba?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Families love visiting Zagroda Alpakoterapii (25 min drive from Szklarska Poręba) for guided alpaca walks, therapy sessions, and mountain cottage stays. Other family activities include the Szklarska Poręba waterfall hike, Karkonosze National Park trails, and the glass-making museum.',
            },
        },
        {
            '@type': 'Question',
            name: 'What can you visit in the Izera Mountains?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The Izera Mountains offer hiking trails, cross-country skiing, the Świeradów Sky Walk tower, and unique experiences like Zagroda Alpakoterapii — an alpaca therapy farm with mountain cottage accommodation in Orłowice near Świeradów-Zdrój / Mirsk.',
            },
        },
    ],
};

/** BreadcrumbList schema — call with page-specific items */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/** FAQPage schema — pass array of {question, answer} pairs */
export function faqSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

/** Service schema for alpaca therapy */
export const therapyServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Alpaca-Assisted Therapy (Alpakoterapia)',
    description: 'Therapeutic interaction sessions with gentle alpacas for children aged 3+ and adults. Helps reduce stress, anxiety, and promotes emotional well-being through guided animal contact.',
    provider: {
        '@type': 'LocalBusiness',
        name: 'Zagroda Alpakoterapii',
        url: 'https://zagrodaalpakoterapii.com',
    },
    serviceType: 'Animal-Assisted Therapy',
    areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: { '@type': 'GeoCoordinates', latitude: 50.9568, longitude: 15.3856 },
        geoRadius: '50000',
    },
    offers: {
        '@type': 'Offer',
        priceCurrency: 'PLN',
        price: '150',
        description: 'Per person for a guided alpaca therapy session',
    },
};
