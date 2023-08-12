/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  formats: ['image/avif', 'image/webp'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'agencyanalytics-api.vercel.app',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
