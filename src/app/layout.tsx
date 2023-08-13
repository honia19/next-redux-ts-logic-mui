import { Inter } from 'next/font/google';

import { Providers } from '@/lib/providers';

import FaviconAndroid from '../../public/images/Metadata/android-chrome-192x192.png';
import FaviconApple from '../../public/images/Metadata/apple-touch-icon.png';
import FaviconSmall from '../../public/images/Metadata/favicon-16x16.png';
import FaviconMedium from '../../public/images/Metadata/favicon-32x32.png';
import Favicon from '../../public/images/Metadata/favicon.ico';

import './globals.css';
import '../../styles/application.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Images app',
  description: 'Portfolio for interview task',
  icons: [
    {
      rel: 'icon',
      url: Favicon.src,
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: FaviconMedium.src,
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: FaviconSmall.src,
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: FaviconApple.src,
    },
    {
      rel: 'icon',
      sizes: '192x192',
      url: FaviconAndroid.src,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
