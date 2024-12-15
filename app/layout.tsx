'use client';

import { useEffect } from 'react';
import './globals.css';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Load the Google Analytics script
    const script1 = document.createElement('script');
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-V9R1JJYYSG';
    script1.async = true;
    document.head.appendChild(script1);

    script1.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      
      gtag('js', new Date());
      gtag('config', 'G-V9R1JJYYSG', {
        debug_mode: true,
        page_path: window.location.pathname,
        page_location: window.location.href,
        cookie_domain: '.zagrodaalpakoterapii.com', // This will work for both www and non-www
        transport_url: 'https://www.google-analytics.com',
        allow_google_signals: true,
        allow_ad_personalization_signals: true
      });

      // Log for debugging
      console.log('[GA Debug] Initialized with path:', window.location.pathname);
      console.log('[GA Debug] Current URL:', window.location.href);
      console.log('[GA Debug] Sending pageview event');
      
      // Explicitly send a pageview
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    };

    // Cleanup function
    return () => {
      if (document.head.contains(script1)) {
        document.head.removeChild(script1);
      }
    };
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}