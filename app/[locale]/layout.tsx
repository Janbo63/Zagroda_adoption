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

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="fb:app_id" content="1608105036460297" />
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