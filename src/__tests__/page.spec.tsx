import React from 'react';

import { render, screen } from '@/utils/test-utils';

import RootComponent from '../app/page';

jest.mock('@/state/concepts/images/imageSlice', () => ({
  ...jest.requireActual('@/state/concepts/images/imageSlice'),
  imagesSelector: jest.fn(() => []),
  selectedImageSelector: jest.fn(() => null),
  selectedFavoritedImageSelector: jest.fn(() => null),
  favoritedImagesSelector: jest.fn(() => []),
  isFavoritedImageSelector: jest.fn(() => false),
  selectedImageIdSelector: jest.fn(() => null),
}));

jest.mock('@/state/data/dataSlice', () => ({
  ...jest.requireActual('@/state/data/dataSlice'),
  loadingSelector: jest.fn(() => false),
}));

describe('RootPage render', () => {
  it('should render correctly', () => {
    render(<RootComponent />);

    screen.getByText('Photos');
    screen.getByLabelText('Recently Added');
    screen.getByLabelText('Favorited');
  });
});
