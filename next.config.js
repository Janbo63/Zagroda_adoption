const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      // Old /accommodation path → /stay (all locale variants + bare path)
      { source: '/accommodation', destination: '/en/stay', permanent: true },
      { source: '/pl/accommodation', destination: '/pl/stay', permanent: true },
      { source: '/de/accommodation', destination: '/de/stay', permanent: true },
      { source: '/cs/accommodation', destination: '/cs/stay', permanent: true },
      { source: '/nl/accommodation', destination: '/nl/stay', permanent: true },
      // Bare paths without locale → default to /en
      { source: '/stay', destination: '/en/stay', permanent: false },
      { source: '/discover', destination: '/en/discover', permanent: false },
      { source: '/activities', destination: '/en/activities', permanent: false },
      { source: '/animals', destination: '/en/animals', permanent: false },
      { source: '/contact', destination: '/en/contact', permanent: false },
      { source: '/adopt', destination: '/en/adopt', permanent: false },
      { source: '/vouchers', destination: '/en/vouchers', permanent: false },
      { source: '/blog', destination: '/en/blog', permanent: false },
      // Catch broken booking/hotel URLs (confirmed 404s blocking conversions)
      { source: '/booking', destination: '/pl/stay#booking', permanent: false },
      { source: '/:locale/booking', destination: '/:locale/stay#booking', permanent: false },
      { source: '/hotel', destination: '/pl/stay', permanent: false },
      { source: '/:locale/hotel', destination: '/:locale/stay', permanent: false },
      // Orphaned test route → real adoption page
      { source: '/:locale/adoptuj', destination: '/:locale/adopt', permanent: true },
      // Typo redirects found in GA4 analytics
      { source: '/:locale/welcom', destination: '/:locale/welkom', permanent: false },
      { source: '/:locale/welc', destination: '/:locale/welkom', permanent: false },
      { source: '/:locale/welkum', destination: '/:locale/welkom', permanent: false },
      { source: '/:locale/stay.', destination: '/:locale/stay', permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/campaigns/:path*.mp4',
        headers: [
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  }
  // CSP headers removed to avoid conflicts with Caddy server configuration
};

module.exports = withNextIntl(nextConfig);