import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Check } from 'lucide-react';

interface AccommodationPageProps {
  params: { locale: string };
}

export function generateStaticParams() {
  return [
    { locale: 'pl' },
    { locale: 'en' },
    { locale: 'nl' },
    { locale: 'de' },
    { locale: 'cs' },
  ];
}

export async function generateMetadata({ params: { locale } }: AccommodationPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'stay' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function AccommodationPage({ params: { locale } }: AccommodationPageProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'stay' });

  // Fixed URL: no tab character, with lang + UTM params
  // Fallback to English for Beds24 if Dutch is not configured on their end yet
  const beds24Lang = locale === 'nl' ? 'en' : locale;
  const beds24Url = `https://beds24.com/booking2.php?propid=98031&referer=iFrame&lang=${beds24Lang}&utm_source=website&utm_medium=booking_cta&utm_campaign=direct`;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8 mt-16 max-w-5xl">

        {/* ── Price & teaser callout ─────────────────────────────── */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {t('rooms.garden.name')} &amp; {t('rooms.jungle.name')}
              </h1>
              <p className="text-emerald-700 text-lg font-semibold">
                {t('rooms.garden.price')}
                <span className="text-sm text-emerald-600 font-normal ml-2">
                  {t('rooms.garden.priceSub')}
                </span>
              </p>
            </div>
            <Link
              href={`/${locale}/stay`}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              {t('hero.cta')} →
            </Link>
          </div>

          {/* What's included */}
          <div className="mt-4 pt-4 border-t border-emerald-200">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {(t.raw('rooms.garden.included') as string[]).map((item, i) => (
                <li key={i} className="flex items-center gap-1.5 text-sm text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── "See the full experience" link ────────────────────── */}
        <p className="text-center text-gray-500 text-sm mb-6">
          <Link href={`/${locale}/stay`} className="text-emerald-600 hover:underline font-medium">
            ← {t('hero.badge')} — {t('experience.title')} →
          </Link>
        </p>

        {/* ── Beds24 booking iframe ──────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <iframe
            src={beds24Url}
            width="100%"
            height="800"
            style={{ border: 'none', maxWidth: '100%', overflow: 'auto' }}
            title="Booking System"
          />
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          📞 +48 695 545 330 · {t('booking.note')}
        </p>
      </div>
    </div>
  );
}
