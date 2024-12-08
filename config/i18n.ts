import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'pl', 'de', 'cs'] as const;
export const defaultLocale = 'en' as const;
export const localePrefix = 'as-needed'; // or 'always' if you prefer

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default
}));