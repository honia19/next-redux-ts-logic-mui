import Button from '@mui/material/Button';
import { styled, CSSObject } from '@mui/system';

import { IButton } from './types';

export const StyledCustomButton = styled(Button)<IButton>(
  ({
    width = '165px',
    height = '20px',
    fontSize = 16,
    fontWeight = 600,
    backgroundColor = 'transparent',
    borderColor = '#ffffff',
    customColor = '#000000',
  }): CSSObject => ({
    color: customColor,
    fontSize: `${fontSize}px`,
    fontStyle: 'normal',
    fontWeight,
    width,
    height,
    borderRadius: '4px',
    backgroundColor,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor,
    textTransform: 'capitalize',
  }),
);
