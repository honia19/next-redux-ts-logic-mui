import React from 'react';

import Spinner from '@/shared/Spinner';
import { render, screen } from '@/utility/test-utils';

describe('Spinner component', () => {
  it('should render correctly', () => {
    render(<Spinner />);

    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).toHaveClass(
      'MuiCircularProgress-indeterminate MuiCircularProgress-colorPrimary custom-progress-container__progress custom-progress-container__progress--primary'
    );
  });
});
