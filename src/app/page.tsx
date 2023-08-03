import { Inter } from 'next/font/google';

import MainContent from '@/components/MainContent';

const inter = Inter({ subsets: ['latin'] });

const MainPage = () => {
  return <MainContent />;
};

export default MainPage;
