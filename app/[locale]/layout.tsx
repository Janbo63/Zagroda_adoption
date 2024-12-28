import '../globals.css'
import { Inter } from 'next/font/google'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] })

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
  return [{ locale: 'en' }, { locale: 'pl' }, { locale: 'de' }, { locale: 'cs' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const messages = await getMessages(params.locale)
  const url = 'https://zagrodaalpakoterapii.com'
  const title = 'Zagroda Alpakoterapii'
  const description = 'Odkryj terapeutyczną moc alpak i natury w naszej zagrodzie'
  const image = `${url}/images/hero-banner.png`
  
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
          width: 1200,
          height: 630,
          alt: 'Alpaki w Zagrodzie Alpakoterapii',
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