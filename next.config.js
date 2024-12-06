const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    disableStaticImages: true,
    minimumCacheTTL: 0,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    formats: ['image/jpeg', 'image/png'],
    domains: ['futuresolutionstestbed.eu', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'futuresolutionstestbed.eu'
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/**/*'
      ]
    },
    outputFileTracingIncludes: {
      '/**': [
        'public/**/*'
      ]
    }
  }
};

module.exports = withNextIntl(nextConfig);