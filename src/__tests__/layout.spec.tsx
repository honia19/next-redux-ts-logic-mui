import React from 'react';

import { render, screen } from '@/utils/test-utils';

import RootLayout, { metadata } from '../app/layout';

describe('Layout render', () => {
  it('should render correctly', () => {
    render(<RootLayout>Hello, World!</RootLayout>);

    screen.getByText('Hello, World!');
  });
});

describe('Metadata', () => {
  it('should render correctly', () => {
    expect(metadata).toMatchSnapshot();
  });
});
