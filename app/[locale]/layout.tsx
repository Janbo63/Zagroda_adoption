import '../globals.css'
import { Inter } from 'next/font/google'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { AutumnPromoBanner } from '@/components/AutumnPromoBanner'
import { WhatsAppFloatingButton } from '@/components/WhatsAppFloatingButton'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { Suspense } from 'react';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { buildSiteGraph } from '@/lib/schema';

const inter = Inter({ subsets: ['latin'] })

const locales = ['en', 'pl', 'de', 'cs', 'nl'] as const;

const siteUrl = 'https://zagrodaalpakoterapii.com';

/** Localised meta titles and descriptions for the homepage / layout fallback */
const metaByLocale: Record<string, { title: string; description: string }> = {
  pl: {
    title: 'Zagroda Alpakoterapii | Spotkania z Alpakami i Alpakoterapia Świeradów-Zdrój (Góry Izerskie)',
    description: 'Odwiedź nasze łagodne stado alpak i minikózek w Orłowicach (5 min od Świeradowa-Zdroju, Góry Izerskie). Relaksująca alpakoterapia, karmienie z ręki i kryta stodoła w każdą pogodę.',
  },
  cs: {
    title: 'Zagroda Alpakoterapii | Setkání s alpakami a farma v Jizerských horách (Frýdlant / Świeradów)',
    description: 'Kouzelná farma s alpakami a minikózami v Orłowicích (jen 25 min z Frýdlantu a 45 min z Liberce). Osobní krmení z ruky, rodinná alpakoterapie a krytá stodoła i za deště.',
  },
  en: {
    title: 'Zagroda Alpakoterapii | Alpaca Therapy Farm near Świeradów-Zdrój (Jizera Mountains)',
    description: 'Experience gentle alpaca encounters, relaxing therapy sessions, and mini goats near Świeradów-Zdrój in the Jizera Mountains. Family-friendly all-weather farm.',
  },
  de: {
    title: 'Zagroda Alpakoterapii | Alpakas & Alpakatherapie Bad Flinsberg (Isergebirge)',
    description: 'Besuchen Sie unsere sanften Alpakas und Zwergziegen in Orłowice (5 Min von Bad Flinsberg / Świeradów-Zdrój im Isergebirge). Alpakatherapie, Fütterung aus der Hand & wetterfeste Scheune.',
  },
  nl: {
    title: 'Zagroda Alpakoterapii | Alpacaboerderij & Alpacatherapie bij Świeradów-Zdrój (Isergebergte)',
    description: 'Bezoek onze vriendelijke alpaca\'s en minigeitjes nabij Świeradów-Zdrój in het Isergebergte. Rustgevende alpacatherapie en gezinsvriendelijke boerderijbezoeken.',
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

  // Single site-wide business entity — see lib/schema.ts
  const schemaJsonLd = buildSiteGraph(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="fb:app_id" content="1608105036460297" />
        {/* Zoho Marketing Automation / PageSense Tracking Snippet */}
        <script src="https://cdn-eu.pagesense.io/js/20118320383/73dfb9b8e0844389945694883c358b1f.js" async />

        {/* ── Google Analytics (GA4) + Google Ads ── */}
        {/* Plain <script> in <head> ensures GA4 fires on first paint, not after React hydration */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-V9R1JJYYSG" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());

              // Only suppress for selenium/puppeteer bots
              var isBotSuppressed = false;
              try { isBotSuppressed = navigator.webdriver; } catch(e){}
              if (isBotSuppressed) {
                console.log('[Analytics] Suppressed for automated headless agent');
              } else {
                // Check for internal tester flag (?internal=1 or stored) or debug mode (?debug=1)
                var isDebug = false;
                try {
                  var params = new URLSearchParams(window.location.search);
                  if (params.get('internal') === '1' || params.get('test_mode') === '1' || params.get('admin') === '1') {
                    localStorage.setItem('fs_internal_tester', 'true');
                  }
                  if (params.get('debug') === '1') {
                    isDebug = true;
                  }
                } catch(e){}

                var isInternal = false;
                try {
                  isInternal = localStorage.getItem('fs_internal_tester') === 'true';
                } catch(e){}

                if (isInternal) {
                  gtag('set', 'user_properties', { traffic_type: 'internal' });
                }

                var configOptions = {
                  page_path: window.location.pathname,
                  page_location: window.location.href
                };
                if (isDebug) {
                  configOptions.debug_mode = true;
                }

                gtag('config', 'G-V9R1JJYYSG', configOptions);

                // Google Ads conversion tracking
                gtag('config', 'AW-1028380046');

                // ── AI Referrer Detection ──
                (function() {
                  var defined = {
                    'chatgpt.com':'ChatGPT','chat.openai.com':'ChatGPT',
                    'perplexity.ai':'Perplexity','claude.ai':'Claude',
                    'gemini.google.com':'Gemini','bard.google.com':'Gemini',
                    'copilot.microsoft.com':'Copilot','bing.com/chat':'Copilot',
                    'meta.ai':'MetaAI','you.com':'YouAI','phind.com':'Phind',
                    'poe.com':'Poe','huggingface.co/chat':'HuggingChat',
                    'deepseek.com':'DeepSeek'
                  };
                  var ref = document.referrer || '';
                  var aiSource = null;
                  for (var domain in defined) {
                    if (ref.indexOf(domain) !== -1) { aiSource = defined[domain]; break; }
                  }
                  if (aiSource) {
                    gtag('event', 'ai_referral', {
                      ai_engine: aiSource, referrer_url: ref,
                      landing_page: window.location.pathname
                    });
                    gtag('set', 'user_properties', {
                      ai_referred: 'true', ai_engine: aiSource
                    });
                  }
                })();
              }
            `,
          }}
        />

        {/* ── Microsoft Clarity ── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "vlllu29qxu");
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />

        {/* ── Meta Pixel (Tracking both primary ad account pixel + legacy pixel) ── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1054665503839276');
              fbq('init', '1608105036460297');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1054665503839276&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AutumnPromoBanner locale={locale} />
          <Navbar locale={locale} />
          <main className="flex-grow bg-gradient-to-br from-green-100 to-blue-100 pt-16">
            {children}
          </main>
          <Footer locale={locale} />
          <WhatsAppFloatingButton locale={locale} />
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