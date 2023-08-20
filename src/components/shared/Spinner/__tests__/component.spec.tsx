import React from 'react';

import { render, screen } from '@/utils/test-utils';

import Spinner from '../component';

describe('Spinner component', () => {
  it('should render correctly', () => {
    render(<Spinner />);

    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).toHaveClass(
      'MuiCircularProgress-root MuiCircularProgress-indeterminate MuiCircularProgress-colorPrimary',
    );
  });

  it('should render correctly with className', () => {
    render(<Spinner className="className" />);

    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).toHaveClass(
      'MuiCircularProgress-root MuiCircularProgress-indeterminate MuiCircularProgress-colorPrimary className',
    );
  });
});
