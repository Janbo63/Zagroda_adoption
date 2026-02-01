import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Function to check if the request is from Facebook's crawler
function isFacebookCrawler(userAgent: string) {
  return userAgent.includes('facebookexternalhit') ||
    userAgent.includes('Facebot');
}

const intlMiddleware = createMiddleware({
  locales: ['pl', 'en', 'de', 'cs', 'nl'],
  defaultLocale: 'pl',
  localeDetection: false
});

export default async function middleware(request: NextRequest) {
  // Don't redirect messenger-webhook or stripe checkout api requests
  if (request.nextUrl.pathname === '/messenger-webhook' ||
    request.nextUrl.pathname.includes('/api/checkout') ||
    request.nextUrl.pathname.includes('/api/adoption/record')) {
    return NextResponse.next();
  }

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
    '/((?!api|_next|_vercel|.*\\..*|messenger-webhook).*)',
  ]
};