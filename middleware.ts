import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config/i18n';

export default createMiddleware({
  locales: ['en', 'pl'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: false
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};