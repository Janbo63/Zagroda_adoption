'use client';

import { useEffect } from 'react';

import './globals.css';
import FacebookPixel from '@/components/FacebookPixel';
import { Navbar } from '@/components/layout/Navbar';
import { AlpacaGuide } from '@/components/ai/AlpacaGuide';
import { Inter, Nunito } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });

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

      // Convert non-www URL to www URL for GA
      const currentUrl = window.location.href;
      const wwwUrl = currentUrl.replace('https://', 'https://www.');
      const wwwPath = window.location.pathname;

      gtag('js', new Date());
      gtag('config', 'G-V9R1JJYYSG', {
        debug_mode: true,
        page_path: wwwPath,
        page_location: wwwUrl,
        send_page_view: true
      });

      // Log for debugging
      console.log('[GA Debug] Original URL:', currentUrl);
      console.log('[GA Debug] Modified URL for GA:', wwwUrl);
      console.log('[GA Debug] Path:', wwwPath);
      console.log('[GA Debug] Sending pageview event');

      // Explicitly send a pageview with www URL
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: wwwUrl,
        page_path: wwwPath
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
      <body className={`${inter.variable} ${nunito.variable} font-sans`}>
        <FacebookPixel />
        <Navbar />
        {children}
        <AlpacaGuide />
      </body>
    </html>
  );
}