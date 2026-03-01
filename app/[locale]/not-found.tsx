'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();

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
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-gray-500">This page could not be found.</p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition"
        >
          Go to homepage
        </a>
      </div>
    </div>
  );
}