import '../globals.css'
import { Inter } from 'next/font/google'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] })

const locales = ['en', 'pl', 'de', 'cs', 'nl'] as const;

const siteUrl = 'https://zagrodaalpakoterapii.com';

/** Localised meta titles and descriptions for the homepage / layout fallback */
const metaByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Zagroda Alpakoterapii — Alpaca Therapy Farm in the Karkonosze Mountains',
    description: 'Experience alpaca therapy, guided alpaca walks, and cosy farm stays in the Karkonosze Mountains, Poland. Family-friendly agritourism near Mirsk with mountain views.',
  },
  pl: {
    title: 'Zagroda Alpakoterapii — Alpakoterapia w Karkonoszach',
    description: 'Odkryj terapeutyczną moc alpak i natury w naszej zagrodzie. Alpakoterapia, spacery z alpakami i noclegi w Karkonoszach. Agroturystyka w Mirsku.',
  },
  de: {
    title: 'Zagroda Alpakoterapii — Alpaka-Therapie-Farm im Riesengebirge',
    description: 'Erleben Sie Alpaka-Therapie, geführte Alpaka-Spaziergänge und gemütliche Bauernhof-Übernachtungen im Riesengebirge, Polen. Familienfreundlicher Agrotourismus.',
  },
  cs: {
    title: 'Zagroda Alpakoterapii — Farma s alpakami v Krkonoších',
    description: 'Zažijte terapii s alpakami, vycházky s alpakami a útulné ubytování na farmě v Krkonoších v Polsku. Rodinný agroturismus u Mirsku.',
  },
  nl: {
    title: 'Zagroda Alpakoterapii — Alpacatherapie Boerderij in het Reuzengebergte',
    description: 'Ervaar alpacatherapie, begeleide alpacawandelingen en gezellige boerderijverblijven in het Reuzengebergte, Polen. Gezinsvriendelijk agrotoerisme.',
  },
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default
  } catch {
    notFound()
  }
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages(locale)

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LodgingBusiness', 'VacationRental', 'TouristAttraction'],
        '@id': 'https://zagrodaalpakoterapii.com/#property',
        name: 'Zagroda Alpakoterapii',
        alternateName: ['Alpaca Therapy Farm', 'Alpaka Farma Ubytování'],
        description:
          'Unique alpaca therapy farm and workation retreat in the Jizera and Karkonosze Mountains, Poland. 90 minutes from Prague, 2 hours from Wrocław. Offers farm stays, remote-work packages, alpaca therapy walks, and digital detox retreats. 100 Mbps fibre Wi-Fi tested for Zoom and video calls. Pet-friendly accommodation in four unique rooms: Garden Room, Jungle Room, Forest Apartment, and Caravan.',
        url: 'https://zagrodaalpakoterapii.com',
        telephone: '+48695545330',
        email: 'zagrodaalpakoterapii@gmail.com',
        image: [
          'https://zagrodaalpakoterapii.com/images/Rooms/Garden Room1.jpg',
          'https://zagrodaalpakoterapii.com/images/Rooms/Jungle Room 1.jpg',
          'https://zagrodaalpakoterapii.com/images/Rooms/apartment1.jpg',
          'https://zagrodaalpakoterapii.com/images/zagrodanewlogo.png',
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Orłowice 24',
          addressLocality: 'Mirsk',
          addressRegion: 'Lower Silesian Voivodeship',
          postalCode: '59-630',
          addressCountry: 'PL',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.9712,
          longitude: 15.3891,
        },
        hasMap: 'https://maps.google.com/?q=Zagroda+Alpakoterapii+Mirsk+Poland',
        priceRange: '$$',
        currenciesAccepted: 'PLN, EUR',
        paymentAccepted: 'Credit Card, Cash, Bank Transfer',
        checkinTime: '15:00',
        checkoutTime: '11:00',
        starRating: {
          '@type': 'Rating',
          ratingValue: '5',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '127',
          bestRating: '5',
          worstRating: '1',
        },
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'High-speed fibre internet (100 Mbps)', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Free parking', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Pet-friendly', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Kitchen facilities', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Dedicated work desk', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Espresso machine', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Mountain views', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Alpaca therapy sessions', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Alpaca walks', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Garden', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Heating', value: true },
        ],
        numberOfRooms: 4,
        petsAllowed: true,
        smokingAllowed: false,
        tourBookingPage: 'https://zagrodaalpakoterapii.com/en/workation',
        availableLanguage: [
          { '@type': 'Language', name: 'Polish' },
          { '@type': 'Language', name: 'English' },
          { '@type': 'Language', name: 'Czech' },
        ],
        knowsLanguage: ['pl', 'en', 'cs', 'de'],
        areaServed: [
          { '@type': 'City', name: 'Świeradów-Zdrój' },
          { '@type': 'City', name: 'Szklarska Poręba' },
          { '@type': 'City', name: 'Mirsk' },
          { '@type': 'AdministrativeArea', name: 'Izera Mountains' },
          { '@type': 'AdministrativeArea', name: 'Karkonosze' },
          { '@type': 'AdministrativeArea', name: 'Lower Silesia' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Experiences at Zagroda Alpakoterapii',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Alpaca Therapy Session' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Guided Alpaca Walk' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Farm Tour' } },
            { '@type': 'Offer', itemOffered: { '@type': 'LodgingReservation', name: 'Mountain Cottage Stay' } },
          ],
        },
        dateModified: '2026-08-21T00:00:00+02:00',
        datePublished: '2024-01-01T00:00:00+02:00',
        keywords:
          'alpaca farm, workation, remote work retreat, alpaca therapy, farm stay Poland, Karkonosze accommodation, Jizera Mountains retreat, digital nomad accommodation, pet friendly farm stay, nature retreat, Czech border Poland',
        sameAs: [
          'https://www.facebook.com/zagrodaalpakoterapii',
          'https://www.instagram.com/zagrodaalpakoterapii',
          'https://www.booking.com/hotel/pl/zagroda-alpakoterapii.html',
          'https://maps.google.com/?q=Zagroda+Alpakoterapii+Mirsk+Poland',
          'https://maps.app.goo.gl/zagrodaalpakoterapii',
          'https://www.tripadvisor.com/Search?q=Zagroda+Alpakoterapii',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://zagrodaalpakoterapii.com/#website',
        url: 'https://zagrodaalpakoterapii.com',
        name: 'Zagroda Alpakoterapii',
        inLanguage: ['pl', 'en', 'cs', 'de', 'nl'],
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://zagrodaalpakoterapii.com/en?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="fb:app_id" content="1608105036460297" />
        {/* Zoho Marketing Automation / PageSense Tracking Snippet */}
        <script src="https://cdn-eu.pagesense.io/js/20118320383/73dfb9b8e0844389945694883c358b1f.js" async />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar locale={locale} />
          <main className="flex-grow bg-gradient-to-br from-green-100 to-blue-100 pt-16">
            {children}
          </main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const meta = metaByLocale[locale] || metaByLocale.en;
  const pageUrl = `${siteUrl}/${locale}`;
  const image = `${siteUrl}/images/zagrodanewlogo.png`;

  // Build hreflang alternates for all locales
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${siteUrl}/${loc}`;
  }

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: pageUrl,
      siteName: 'Zagroda Alpakoterapii',
      images: [
        {
          url: image,
          width: 500,
          height: 500,
          alt: 'Zagroda Alpakoterapii Logo',
          type: 'image/png',
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [image],
      creator: '@zagrodaalpak',
      site: '@zagrodaalpak'
    },
    alternates: {
      canonical: pageUrl,
      languages,
    },
    other: {
      'fb:app_id': '1608105036460297',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
  }
}