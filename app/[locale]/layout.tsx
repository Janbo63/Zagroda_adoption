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
        {/* Facebook App ID */}
        <meta property="fb:app_id" content="1608105036460297" />
        
        {/* Basic Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zagrodaalpakoterapii.com" />
        <meta property="og:title" content="Zagroda Alpakoterapii" />
        <meta property="og:description" content="Odkryj terapeutyczną moc alpak i natury w naszej zagrodzie" />
        <meta property="og:image" content="https://zagrodaalpakoterapii.com/images/hero-banner.png" />
        <meta property="og:image:alt" content="Alpaki w Zagrodzie Alpakoterapii" />
        
        {/* Additional Open Graph Meta Tags */}
        <meta property="og:locale" content={locale} />
        <meta property="og:site_name" content="Zagroda Alpakoterapii" />
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
  }
}