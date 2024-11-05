const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  trailingSlash: false,
  poweredByHeader: false,
  generateBuildId: () => 'build',
  experimental: {
    isrMemoryCacheSize: 0,
    serverActions: false
  }
};

module.exports = withNextIntl(nextConfig);