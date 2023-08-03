'use client';

import { Provider } from 'react-redux';

import store from '@/state/store';

export const Providers = ({ children }: React.PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};
