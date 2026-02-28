'use client';

import './globals.css';
import FacebookPixel from '@/components/FacebookPixel';
import Script from 'next/script';

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
  return (
    <html lang="en">
      <body>
        <FacebookPixel />

        {/* ── 1. Google Analytics (GA4) ── */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              
              // We use replace to ensure tracking matches www domain
              var currentUrl = window.location.href;
              var wwwUrl = currentUrl.replace('https://', 'https://www.');
              
              gtag('config', '${GA4_ID}', {
                page_path: window.location.pathname,
                page_location: wwwUrl,
                send_page_view: true
              });
            `,
          }}
        />

        {/* ── 2. Microsoft Clarity ── */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `,
          }}
        />

        {children}
      </body>
    </html>
  );
}