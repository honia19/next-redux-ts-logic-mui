/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  env: {
    API_HOST: process.env.API_HOST,
  },
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
