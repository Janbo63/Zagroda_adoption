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
  
  return {
    title: messages.common.title,
    description: messages.common.description,
    openGraph: {
      title: 'Zagroda Alpakoterapii',
      description: 'Odkryj terapeutyczną moc alpak i natury w naszej zagrodzie',
      url: 'https://zagrodaalpakoterapii.com',
      siteName: 'Zagroda Alpakoterapii',
      images: [
        {
          url: 'https://zagrodaalpakoterapii.com/images/hero-banner.png',
          alt: 'Alpaki w Zagrodzie Alpakoterapii',
        },
      ],
      locale: params.locale,
      type: 'website',
    },
    other: {
      'fb:app_id': '1608105036460297',
    },
  }
}