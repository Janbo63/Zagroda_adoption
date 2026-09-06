'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Localized 404 content so Facebook ad visitors don't hit a dead end
const content: Record<string, { title: string; subtitle: string; cta: string; home: string }> = {
  pl: {
    title: 'Strona nie znaleziona',
    subtitle: 'Ta strona nie istnieje, ale nasze alpaki czekają na Ciebie!',
    cta: '🏡 Zarezerwuj Pobyt',
    home: 'Strona główna',
  },
  en: {
    title: 'Page Not Found',
    subtitle: 'This page doesn\'t exist, but our alpacas are waiting for you!',
    cta: '🏡 Book Your Stay',
    home: 'Homepage',
  },
  de: {
    title: 'Seite nicht gefunden',
    subtitle: 'Diese Seite existiert nicht, aber unsere Alpakas warten auf Sie!',
    cta: '🏡 Aufenthalt Buchen',
    home: 'Startseite',
  },
  cs: {
    title: 'Stránka nenalezena',
    subtitle: 'Tato stránka neexistuje, ale naše alpaky na vás čekají!',
    cta: '🏡 Rezervovat Pobyt',
    home: 'Domovská stránka',
  },
  nl: {
    title: 'Pagina niet gevonden',
    subtitle: 'Deze pagina bestaat niet, maar onze alpaca\'s wachten op je!',
    cta: '🏡 Boek je verblijf',
    home: 'Startpagina',
  },
};

export default function NotFound() {
  const pathname = usePathname();

  // Extract locale from pathname (e.g., /pl/booking → pl)
  const localeMatch = pathname?.match(/^\/(pl|en|de|cs|nl)/);
  const locale = localeMatch?.[1] || 'pl';
  const t = content[locale] || content.pl;

  useEffect(() => {
    // Fire a GA4 event with the exact path so we can find broken URLs
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_not_found', {
        page_path: pathname || window.location.pathname,
        page_url: window.location.href,
        referrer: document.referrer || '(direct)',
      });
    }
  }, [pathname]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🦙</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-2">{t.title}</p>
        <p className="text-gray-500 mb-8">{t.subtitle}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${locale}/stay`}
            className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors shadow-md text-lg"
          >
            {t.cta}
          </Link>
          <a
            href={`/${locale}`}
            className="inline-flex items-center justify-center bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition-colors font-medium"
          >
            {t.home}
          </a>
        </div>
      </div>
    </div>
  );
}