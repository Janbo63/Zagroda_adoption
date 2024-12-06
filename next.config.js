const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['futuresolutionstestbed.eu'],
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