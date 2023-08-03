/** @type {import('next').NextConfig} */
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
};

module.exports = nextConfig;
