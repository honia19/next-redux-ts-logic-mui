import React from 'react';

import { render, screen } from '@/utils/test-utils';

import ImageComponent from '../component';

const mockImage = {
  id: '1',
  src: 'https://some-url/images/0.jpg',
  fileName: 'tennessee_female_rubber.jpg',
  alt: 'tennessee_female_rubber.jpg',
  size: 4812732,
  width: 100,
  height: 200,
  onSelectImage: jest.fn(),
  onToggleFavorite: jest.fn(),
};

const mockedHook = {
  selectedImageId: '1',
};

jest.mock('@/state/concepts/images/imageSlice', () => ({
  ...jest.requireActual('@/state/concepts/images/imageSlice'),
  selectedImageIdSelector: jest.fn(() => null),
}));

jest.mock('../hook', () => jest.fn(() => mockedHook));

describe('ImageComponent component', () => {
  it('should render correctly Image component by default', () => {
    const { baseElement } = render(<ImageComponent {...mockImage} />);

    const buttonImage = screen.getByTestId(`image-btn-${mockImage.id}`);
    const image = baseElement.querySelector('.custom-image');

    expect(image).toHaveClass('custom-image-selected');
    expect(image).not.toHaveClass('custom-image-full');
    expect(buttonImage).not.toHaveClass('m-auto');
    expect(screen.queryByTestId('FavoriteIcon')).toBeNull();
    expect(screen.queryByTestId('FavoriteBorderIcon')).toBeNull();
  });

  it('should render correctly Image component when isShowFavorite is true', () => {
    const { baseElement } = render(
      <ImageComponent {...{ ...mockImage, isShowFavorite: true }} />,
    );

    const buttonImage = screen.getByTestId(`image-btn-${mockImage.id}`);
    const image = baseElement.querySelector('.custom-image');

    expect(image).not.toHaveClass('custom-image-selected');
    expect(image).toHaveClass('custom-image-full');
    expect(buttonImage).toHaveClass('m-auto');
    screen.getByTestId('FavoriteBorderIcon');
    expect(screen.queryByTestId('FavoriteIcon')).toBeNull();
  });

  it('should render correctly Image component when isShowFavorite and isFavorite are true', () => {
    const { baseElement } = render(
      <ImageComponent
        {...{ ...mockImage, isShowFavorite: true, isFavorite: true }}
      />,
    );

    const buttonImage = screen.getByTestId(`image-btn-${mockImage.id}`);
    const image = baseElement.querySelector('.custom-image');

    expect(image).not.toHaveClass('custom-image-selected');
    expect(image).toHaveClass('custom-image-full');
    expect(buttonImage).toHaveClass('m-auto');
    expect(screen.queryByTestId('FavoriteBorderIcon')).toBeNull();
    screen.getByTestId('FavoriteIcon');
  });
});
