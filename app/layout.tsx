'use client';

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
const GOOGLE_ADS_CONVERSION = 'AW-1028380046/Mf3MCP-q__sbEI6rr-oD';
// ──────────────────────────────────────────────────────────────────────

// Helper: call from any WhatsApp / booking button click
export function trackGoogleAdsConversion() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_CONVERSION,
      value: 100.0,
      currency: 'PLN',
    });
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FacebookPixel />
        {/* GA4, Clarity, and Zoho PageSense scripts are in app/[locale]/layout.tsx <head> */}
        {children}
      </body>
    </html>
  );
}