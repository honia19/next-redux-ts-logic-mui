import React from 'react';

import { render, screen } from '@/utils/test-utils';

import { StyledCustomButton } from '../styled';

describe('<StyledCustomButton />', () => {
  it('should render correct by default styles', () => {
    render(<StyledCustomButton>Custom Button</StyledCustomButton>);

    const renderedButton = screen.getByText('Custom Button');

    expect(renderedButton).toHaveStyle({
      color: '#000000',
      width: '165px',
      height: '20px',
    });
  });

  it('should render correct styles with props', () => {
    render(
      <StyledCustomButton
        width={'100px'}
        height={'10px'}
        fontSize={10}
        fontWeight={400}
        backgroundColor="#ffffff"
        borderColor="#000000"
        customColor="blue"
      >
        Custom Button
      </StyledCustomButton>,
    );

    const renderedButton = screen.getByText('Custom Button');

    expect(renderedButton).toHaveStyle({
      'font-size': '10px',
      'font-weight': '400',
      height: '10px',
      width: '100px',
    });
  });
});
