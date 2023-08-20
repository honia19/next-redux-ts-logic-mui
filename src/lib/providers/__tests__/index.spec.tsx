import React from 'react';

import { render, screen } from '@/utils/test-utils';

import { Providers } from '../index';

describe('Providers renderer', () => {
  it('should render correctly', () => {
    render(<Providers>Hello, World!</Providers>);

    screen.getByText('Hello, World!');
  });
});
