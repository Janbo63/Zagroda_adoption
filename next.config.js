const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['localhost', '127.0.0.1', 'futuresolutionstestbed.eu'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'futuresolutionstestbed.eu'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1'
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
    }
  }
};

module.exports = withNextIntl(nextConfig);