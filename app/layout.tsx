'use client';

import { useEffect } from 'react';
import './globals.css';

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
      // Initialize Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'G-V9R1JJYYSG', {
        debug_mode: true,
        page_path: window.location.pathname,
        page_location: window.location.href,
        cookie_domain: 'auto' // This allows GA to work across different domains
      });

      // Log for debugging
      console.log('[GA Debug] Initialized with path:', window.location.pathname);
      console.log('[GA Debug] Current URL:', window.location.href);
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