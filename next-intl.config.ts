export const defaultLocale = 'pl';
export const locales = ['pl', 'en', 'de', 'cs'] as const;

export type Locale = (typeof locales)[number];