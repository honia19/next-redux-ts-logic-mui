import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';

import store from '@/state/store';
import { theme } from '@/theme';

import { RenderProviderType } from './types';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};

const MAP_PROVIDERS = {
  redux: ReduxProvider,
};

const customRender = (
  ui: ReactElement,
  options?: { wrapperType?: RenderProviderType }
) => {
  const { wrapperType = 'redux', ...restOptions } = options || {};
  return render(ui, { wrapper: MAP_PROVIDERS[wrapperType], ...restOptions });
};

// eslint-disable-next-line import/export
export * from '@testing-library/react';
// eslint-disable-next-line import/export
export { customRender as render };
