'use client';

import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';

import store from '@/state/store';
import { theme } from '@/theme';

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};
