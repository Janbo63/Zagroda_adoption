'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const GA_ID = 'G-V9R1JJYYSG';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the initial page load because app/[locale]/layout.tsx inline script
    // executes on first paint and dispatches the initial page_view.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const queryString = searchParams?.toString();
      const url = pathname + (queryString ? `?${queryString}` : '');
      window.gtag('config', GA_ID, {
        page_path: url,
        page_location: window.location.href,
      });
    }

    // Also dispatch pageview to Meta Pixel on SPA route change
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [pathname, searchParams]);

  return null;
}

export default AnalyticsTracker;
