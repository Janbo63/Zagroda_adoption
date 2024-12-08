import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['pl', 'en', 'de', 'cs'],
  defaultLocale: 'pl',
  localeDetection: false
});

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
};