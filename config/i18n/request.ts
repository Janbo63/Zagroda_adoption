// Basic next-intl configuration
export default function getRequestConfig() {
  return {
    locales: ['en', 'pl'],
    defaultLocale: 'pl',
    messages: {
      // The messages will be loaded automatically from your messages directory
    }
  }
} 