'use client';

import { useEffect } from 'react';
import './globals.css';
import FacebookPixel from '@/components/FacebookPixel';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
  }
}

// ─── Analytics IDs ────────────────────────────────────────────────────
const GA4_ID = 'G-V9R1JJYYSG';
const CLARITY_ID = 'vlllu29qxu';
// ──────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // ── 1. Google Analytics (GA4) ──────────────────────────────────────
    const script1 = document.createElement('script');
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    script1.async = true;
    document.head.appendChild(script1);

    script1.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;

      const currentUrl = window.location.href;
      const wwwUrl = currentUrl.replace('https://', 'https://www.');
      const wwwPath = window.location.pathname;

      gtag('js', new Date());
      gtag('config', GA4_ID, {
        debug_mode: true,
        page_path: wwwPath,
        page_location: wwwUrl,
        send_page_view: true
      });

      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: wwwUrl,
        page_path: wwwPath
      });
    };

    // ── 2. Microsoft Clarity ───────────────────────────────────────────
    const clarityScript = document.createElement('script');
    clarityScript.async = true;
    clarityScript.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_ID}");
    `;
    document.head.appendChild(clarityScript);

    // ── Cleanup ────────────────────────────────────────────────────────
    return () => {
      if (document.head.contains(script1)) document.head.removeChild(script1);
      if (document.head.contains(clarityScript)) document.head.removeChild(clarityScript);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <FacebookPixel />
        {children}
      </body>
    </html>
  );
}