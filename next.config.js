const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  assetPrefix: '',
  images: {
    unoptimized: true,
    domains: ['futuresolutionstestbed.eu']
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