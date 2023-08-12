import { createTheme } from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation';

const theme = createTheme({
  components: {
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#6153e7',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          textTransform: 'capitalize',
          '&.Mui-selected': {
            color: '#6153e7',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#6153e7',
        },
      },
    },
    MuiTabPanel: {
      styleOverrides: { root: { paddingLeft: 0 } },
    },
  },
});

export { theme };
