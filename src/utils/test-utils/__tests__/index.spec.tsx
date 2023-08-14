import React from 'react';

import { render, screen } from '../index';

describe('Custom renderer', () => {
  it('should render correctly', () => {
    render(<span>Hello, World!</span>);

    screen.getByText('Hello, World!');
  });
});
