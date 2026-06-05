import '../globals.css'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { BottomNav } from '@/components/layout/BottomNav'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server';

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

  const messages = await getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta property="fb:app_id" content="1608105036460297" />
      </head>
      <body className="font-body flex flex-col min-h-screen bg-warmWhite text-warmCharcoal">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar locale={locale} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer locale={locale} />
          <BottomNav locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pl' }, { locale: 'de' }, { locale: 'cs' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const messages = await getMessages(params.locale)
  const url = 'https://zagrodaalpakoterapii.com'
  const title = 'Zagroda Alpakoterapii'
  const description = 'Odkryj terapeutyczną moc alpak i natury w naszej zagrodzie'
  const image = `${url}/images/zagrodanewlogo.png`

  return {
    metadataBase: new URL(url),
    title,
    description,
    canonical: url,
    openGraph: {
      title,
      description,
      url,
      siteName: title,
      images: [
        {
          url: image,
          width: 500,
          height: 500,
          alt: 'Zagroda Alpakoterapii Logo',
          type: 'image/png',
        },
      ],
      locale: params.locale,
      type: 'website',
      appId: '1608105036460297',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@zagrodaalpak',
      site: '@zagrodaalpak'
    },
    alternates: {
      canonical: url,
      languages: {
        'en': `${url}/en`,
        'pl': `${url}/pl`,
        'de': `${url}/de`,
        'cs': `${url}/cs`,
        'nl': `${url}/nl`,
      },
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