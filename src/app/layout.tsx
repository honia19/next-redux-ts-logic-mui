import { Inter } from 'next/font/google';

import { Providers } from '@/lib/providers';

import './globals.css';
import '../../styles/application.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Images app',
  description: 'Portfolio for interview task',
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
