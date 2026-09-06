'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, X, Tag } from 'lucide-react';

interface Props {
  locale: string;
}

const bannerTexts: Record<string, { badge: string; text: string; code: string; cta: string }> = {
  pl: {
    badge: '🍂 Jesienna Promocja',
    text: 'Zyskaj 10% rabatu na rezerwacje i pobyty we wrześniu i październiku!',
    code: 'Kod: Autumn2026',
    cta: 'Zarezerwuj pobyt →',
  },
  cs: {
    badge: '🍂 Podzimní akce',
    text: 'Získejte 10% slevu na pobyty v září a říjnu!',
    code: 'Kód: Podzim2026',
    cta: 'Rezervovat pobyt →',
  },
  en: {
    badge: '🍂 Autumn Special',
    text: 'Get 10% OFF all September & October stays and visits!',
    code: 'Code: Autumn2026',
    cta: 'Book Your Stay →',
  },
  de: {
    badge: '🍂 Herbst-Special',
    text: 'Erhalten Sie 10% Rabatt auf Buchungen im September und Oktober!',
    code: 'Code: Autumn2026',
    cta: 'Jetzt buchen →',
  },
  nl: {
    badge: '🍂 Herfstactie',
    text: 'Ontvang 10% korting op verblijven in september en oktober!',
    code: 'Code: Autumn2026',
    cta: 'Nu boeken →',
  },
};

export function AutumnPromoBanner({ locale }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user dismissed the banner this session
    const isDismissed = sessionStorage.getItem('autumn_promo_dismissed_2026');
    if (!isDismissed) {
      setVisible(true);
      // Track banner impression in GA4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'view_promotion', {
          creative_name: 'autumn_banner_2026',
          promotion_name: 'Autumn Special 10%',
          promo_code: 'Autumn2026',
          location_id: locale || 'pl',
        });
      }
    }
  }, [locale]);

  const handleCtaClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'select_promotion', {
        creative_name: 'autumn_banner_2026',
        promotion_name: 'Autumn Special 10%',
        promo_code: 'Autumn2026',
        location_id: locale || 'pl',
      });
      window.gtag('event', 'promo_banner_click', {
        promo_code: 'Autumn2026',
        locale: locale || 'pl',
        destination: 'stay_booking'
      });
    }
  };

  const handleInfoClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'promo_banner_info_click', {
        promo_code: 'Autumn2026',
        locale: locale || 'pl',
        destination: 'jesien_page'
      });
    }
  };

  const handleDismiss = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'dismiss_promotion', {
        creative_name: 'autumn_banner_2026',
        location_id: locale || 'pl',
      });
    }
    sessionStorage.setItem('autumn_promo_dismissed_2026', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  const content = bannerTexts[locale] || bannerTexts.en;

  return (
    <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-emerald-800 text-white shadow-md relative z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
        
        {/* Left / Center: Promo message */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1 justify-center sm:justify-start">
          <Link
            href={`/${locale}/jesien`}
            onClick={handleInfoClick}
            className="inline-flex items-center gap-1 bg-amber-950/70 border border-amber-400/40 text-amber-200 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider hover:bg-amber-900/80 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {content.badge}
          </Link>
          
          <Link
            href={`/${locale}/jesien`}
            onClick={handleInfoClick}
            className="font-medium text-stone-100 hidden md:inline hover:text-amber-200 transition-colors"
          >
            {content.text}
          </Link>
          
          <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-mono font-bold px-2.5 py-0.5 rounded-md">
            <Tag className="w-3.5 h-3.5 text-amber-200" />
            {content.code}
          </span>

          <Link
            href={`/${locale}/stay?code=Autumn2026`}
            onClick={handleCtaClick}
            className="inline-flex items-center font-bold text-amber-200 hover:text-white underline underline-offset-4 hover:no-underline transition-colors ml-1"
          >
            {content.cta}
          </Link>
        </div>

        {/* Right: Dismiss button */}
        <button
          onClick={handleDismiss}
          className="text-stone-200 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors flex-shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
