import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Function to check if the request is from Facebook's crawler
function isFacebookCrawler(userAgent: string) {
  return userAgent.includes('facebookexternalhit') || 
         userAgent.includes('Facebot');
}

const intlMiddleware = createMiddleware({
  locales: ['pl', 'en', 'de', 'cs'],
  defaultLocale: 'pl',
  localeDetection: false
});

export default async function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  
  // If it's Facebook's crawler and requesting the root URL, serve the Polish version directly
  if (isFacebookCrawler(userAgent) && request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/pl', request.url));
  }

  // For all other requests, use the regular intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
};