/**
 * Schema.org JSON-LD generators for Zagroda Alpakoterapii.
 *
 * ONE business entity (`PROPERTY_ID`) is emitted site-wide from app/[locale]/layout.tsx
 * via buildSiteGraph(). Page-level schemas must reference it by @id, never redefine it —
 * duplicated entities with conflicting facts are what search/AI engines discard.
 *
 * Every fact below must be traceable to site copy (messages/*.json) or a verified source.
 * Do NOT add review counts, star ratings or amenities without a primary source.
 *
 *  - buildSiteGraph(locale) → LodgingBusiness + TouristAttraction + WebSite (all pages)
 *  - discoverSchema         → TouristDestination (discover page)
 */

const BASE_URL = 'https://zagrodaalpakoterapii.com';
const LOGO = `${BASE_URL}/images/zagrodanewlogo.png`;

export const PROPERTY_ID = `${BASE_URL}/#property`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

// Source: OpenStreetMap POI "Zagroda Alpakoterapii" (way 397435660), tourism=guest_house, Orłowice 24.
export const FARM_GEO = { '@type': 'GeoCoordinates', latitude: 50.9265386, longitude: 15.3518507 } as const;

const ADDRESS = {
    '@type': 'PostalAddress',
    streetAddress: 'Orłowice 24',
    addressLocality: 'Mirsk',
    addressRegion: 'dolnośląskie',
    postalCode: '59-630',
    addressCountry: 'PL',
} as const;

const amenity = (name: string) => ({ '@type': 'LocationFeatureSpecification', name, value: true });

/** Room data mirrors messages/en.json → stay.rooms.* (capacity strings). */
const ROOMS = [
    { id: 'garden', type: 'HotelRoom', name: 'Garden Room', maxOccupancy: 3, image: 'Rooms/Garden Room1.jpg', extras: ['Private bathroom'] },
    { id: 'jungle', type: 'HotelRoom', name: 'Jungle Room', maxOccupancy: 3, image: 'Rooms/Jungle Room 1.jpg', extras: ['Private bathroom'] },
    { id: 'forest', type: 'Apartment', name: 'Forest Apartment', maxOccupancy: 4, image: 'Rooms/apartment1.jpg', extras: ['Own cooking area', 'View onto the alpaca garden'] },
];

const DESCRIPTION: Record<string, string> = {
    pl: 'Zagroda Alpakoterapii to farma alpak z pokojami gościnnymi w Orłowicach koło Świeradowa-Zdroju, w Górach Izerskich (Dolny Śląsk), blisko granicy z Czechami. Goście nocują w Pokoju Ogrodowym, Pokoju Dżunglowym lub Leśnym Apartamencie z aneksem kuchennym i mogą wziąć udział w spacerach z alpakami, karmieniu alpak oraz sesjach alpakoterapii. Wieczory przy kominku, widok na góry z ogrodu, światłowodowe Wi-Fi 100 Mb/s.',
    en: 'Zagroda Alpakoterapii is an alpaca therapy farm with guest rooms in Orłowice near Świeradów-Zdrój, in the Izera Mountains (Lower Silesia, Poland), close to the Czech border. Guests stay in the Garden Room, the Jungle Room or the self-catering Forest Apartment and can join alpaca walks, alpaca feeding and alpaca therapy sessions. Evenings by the fireplace, mountain views from the garden, and 100 Mbps fibre Wi-Fi.',
    // Room names match messages/{cs,de,nl}.json → stay.rooms.*.name
    cs: 'Zagroda Alpakoterapii je alpačí farma s ubytováním v Orłowicích nedaleko lázní Świeradów-Zdrój v polské části Jizerských hor (Dolní Slezsko), kousek od české hranice. Hosté bydlí v Zahradním pokoji, Džunglovém pokoji nebo v Lesním apartmánu s vlastní kuchyňkou a mohou se zapojit do procházek s alpakami, krmení alpak a alpakoterapie. Večery u krbu, výhled na hory ze zahrady a optické Wi-Fi 100 Mb/s.',
    de: 'Zagroda Alpakoterapii ist ein Alpaka-Therapiehof mit Gästezimmern in Orłowice bei Świeradów-Zdrój im Isergebirge (Niederschlesien, Polen), nahe der tschechischen Grenze. Gäste wohnen im Gartenzimmer, im Dschungelzimmer oder im Waldapartement mit eigener Küchenzeile und können an Alpakawanderungen, Alpakafütterungen und Alpakatherapie teilnehmen. Abende am Kamin, Bergblick vom Garten und 100 Mbit/s Glasfaser-WLAN.',
    nl: 'Zagroda Alpakoterapii is een alpacatherapieboerderij met gastenkamers in Orłowice bij Świeradów-Zdrój, in het Jizergebergte (Neder-Silezië, Polen), vlak bij de Tsjechische grens. Gasten verblijven in de Tuinkamer, de Junglekamer of het Bosappartement met eigen kookhoek en kunnen meedoen aan alpacawandelingen, het voeren van de alpaca\'s en alpacatherapie. Avonden bij de open haard, uitzicht op de bergen vanuit de tuin en 100 Mbps glasvezel-wifi.',
};

/** The single business entity. Locale only changes description language and booking URL. */
export function propertySchema(locale: string) {
    const stayUrl = `${BASE_URL}/${locale}/stay`;
    return {
        '@type': ['LodgingBusiness', 'TouristAttraction'],
        '@id': PROPERTY_ID,
        name: 'Zagroda Alpakoterapii',
        alternateName: 'Alpaca Therapy Farm',
        description: DESCRIPTION[locale] || DESCRIPTION.en,
        url: BASE_URL,
        logo: LOGO,
        image: [
            `${BASE_URL}/images/Alpacas/Micky.jpg`,
            `${BASE_URL}/images/Rooms/Garden Room1.jpg`,
            `${BASE_URL}/images/Rooms/apartment1.jpg`,
            `${BASE_URL}/images/activities/alpaca-walks.jpg`,
        ],
        telephone: '+48695545330',
        email: 'zagrodaalpakoterapii@gmail.com',
        address: ADDRESS,
        geo: FARM_GEO,
        hasMap: `https://www.google.com/maps/search/?api=1&query=${FARM_GEO.latitude},${FARM_GEO.longitude}`,
        priceRange: '$$',
        currenciesAccepted: 'PLN, CZK, EUR, GBP',
        paymentAccepted: 'Credit Card',
        numberOfRooms: ROOMS.length,
        // Confirmed by owner 2026-10-12
        checkinTime: '15:00',
        checkoutTime: '11:00',
        petsAllowed: 'Only by prior arrangement with the hosts',
        touristType: ['Families with children', 'Couples'],
        availableLanguage: [
            { '@type': 'Language', name: 'Polish', alternateName: 'pl' },
            { '@type': 'Language', name: 'English', alternateName: 'en' },
        ],
        amenityFeature: [
            amenity('Fireplace'),
            amenity('Mountain views'),
            amenity('Alpaca walks'),
            amenity('Alpaca feeding'),
            amenity('Alpaca therapy sessions'),
            amenity('Garden with alpacas'),
            amenity('Fibre Wi-Fi (100 Mbps)'),
            amenity('Family friendly'),
        ],
        containsPlace: ROOMS.map((r) => ({
            '@type': r.type,
            '@id': `${BASE_URL}/#room-${r.id}`,
            name: r.name,
            url: stayUrl,
            image: `${BASE_URL}/images/${r.image}`,
            occupancy: { '@type': 'QuantitativeValue', maxValue: r.maxOccupancy, unitText: 'guests' },
            amenityFeature: r.extras.map(amenity),
        })),
        potentialAction: {
            '@type': 'ReserveAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${stayUrl}#booking`,
                inLanguage: locale,
                actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'],
            },
            result: { '@type': 'LodgingReservation', name: 'Direct booking at Zagroda Alpakoterapii' },
        },
        sameAs: [
            'https://www.facebook.com/zagrodaalpakoterapii',
            'https://www.instagram.com/zagrodaalpako',
        ],
    };
}

/** Full site-wide graph — rendered once in app/[locale]/layout.tsx. */
export function buildSiteGraph(locale: string) {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            propertySchema(locale),
            {
                '@type': 'WebSite',
                '@id': WEBSITE_ID,
                url: BASE_URL,
                name: 'Zagroda Alpakoterapii',
                inLanguage: ['pl', 'en', 'cs', 'de', 'nl'],
                publisher: { '@id': PROPERTY_ID },
            },
        ],
    };
}

/** Discover / Area Guide page schema */
export const discoverSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: 'Izera & Karkonosze Mountains — Alpaca Farm & Local Attractions',
    url: `${BASE_URL}/discover`,
    description:
        'Family-friendly region in the Polish Sudeten mountains. Alpaca farm, national park hiking, waterfalls, castles, and the Izerski Tourist Package.',
    image: `${BASE_URL}/images/Alpacas/Suri.jpg`,
    geo: FARM_GEO,
    dateModified: '2026-10-12T00:00:00+02:00',
    includesAttraction: [
        { '@id': PROPERTY_ID },
        { '@type': 'TouristAttraction', name: 'Karkonosze National Park', geo: { '@type': 'GeoCoordinates', latitude: 50.7714, longitude: 15.5394 } },
        { '@type': 'TouristAttraction', name: 'Kamieńczyk Waterfall', geo: { '@type': 'GeoCoordinates', latitude: 50.8283, longitude: 15.5072 } },
        { '@type': 'TouristAttraction', name: 'Castle Czocha', geo: { '@type': 'GeoCoordinates', latitude: 51.0697, longitude: 15.2636 } },
        { '@type': 'TouristAttraction', name: 'Krobica Silver Mine', url: 'https://stacjakultury.swieradowzdroj.pl/izerska_laka/izerski-pakiet-turystyczny/' },
        { '@type': 'TouristAttraction', name: 'Śnieżka Summit (1602m)', geo: { '@type': 'GeoCoordinates', latitude: 50.7363, longitude: 15.7393 } },
        { '@type': 'TouristAttraction', name: 'Liberec, Czech Republic', geo: { '@type': 'GeoCoordinates', latitude: 50.7671, longitude: 15.0562 } },
        { '@type': 'TouristAttraction', name: 'Świeradów-Zdrój Spa', geo: { '@type': 'GeoCoordinates', latitude: 50.9019, longitude: 15.3273 } },
    ],
};

/** Dynamic FAQPage schema generator for localized Discover pages */
export function generateDiscoverFaqSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        dateModified: '2026-08-21T00:00:00+02:00',
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

/** Fallback static FAQPage schema */
export const discoverFaqSchema = generateDiscoverFaqSchema([
    {
        question: 'What are the best things to do near Świeradów-Zdrój?',
        answer: 'Top activities include visiting Zagroda Alpakoterapii for alpaca walks and therapy sessions (in Orłowice, just 5 min drive from Świeradów-Zdrój), relaxing at Świeradów thermal baths, hiking to the Sky Walk observation tower, exploring Castle Czocha, and visiting the Krobica Silver Mine.',
    },
    {
        question: 'What family activities are near Szklarska Poręba?',
        answer: 'Families love visiting Zagroda Alpakoterapii (25 min drive from Szklarska Poręba) for guided alpaca walks, therapy sessions, and mountain cottage stays. Other family activities include the Szklarska Poręba waterfall hike, Karkonosze National Park trails, and the glass-making museum.',
    },
    {
        question: 'What can you visit in the Izera Mountains?',
        answer: 'The Izera Mountains offer hiking trails, cross-country skiing, the Świeradów Sky Walk tower, and unique experiences like Zagroda Alpakoterapii — an alpaca therapy farm with mountain cottage accommodation in Orłowice near Świeradów-Zdrój / Mirsk.',
    },
]);

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
    provider: { '@id': PROPERTY_ID },
    serviceType: 'Animal-Assisted Therapy',
    areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: FARM_GEO,
        geoRadius: '50000',
    },
    offers: {
        '@type': 'Offer',
        priceCurrency: 'PLN',
        price: '150',
        description: 'Per person for a guided alpaca therapy session',
    },
};
