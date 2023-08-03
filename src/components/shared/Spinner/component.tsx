import CircularProgress from '@mui/material/CircularProgress';
import clsx from 'clsx';
import React, { memo } from 'react';

import ISpinner from './types';

const Spinner = ({
  containerClassName,
  className,
  disableShrink = true,
  size = 200,
}: ISpinner) => (
  <div className={clsx('custom-progress-container', containerClassName)}>
    <CircularProgress
      disableShrink={disableShrink}
      size={size}
      className={className}
    />
  </div>
);

export default memo(Spinner);
