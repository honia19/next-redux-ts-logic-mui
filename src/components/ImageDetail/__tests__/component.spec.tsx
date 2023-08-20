import React from 'react';

import { render, screen } from '@/utils/test-utils';

import ImageDetailComponent from '../component';

const mockImage = {
  id: '1',
  url: 'https://some-url/images/0.jpg',
  filename: 'tennessee_female_rubber.jpg',
  description:
    'Laboriosam eligendi inventore officia nemo. Quisquam explicabo voluptatem. Illo laborum facilis.',
  uploadedBy: 'Ms. Jimmie Cole',
  createdAt: '2017-07-15T08:23:20.462Z',
  updatedAt: '2022-12-16T12:41:33.736Z',
  dimensions: {
    height: 4800,
    width: 3200,
  },
  resolution: {
    height: 72,
    width: 72,
  },
  sizeInBytes: 4812732,
  sharedWith: [],
  favorited: true,
};

const mockedHook = {
  toggleFavoriteImage: jest.fn(() => jest.fn()),
  isFavoriteSelectedImage: false,
  handleRemoveFavoriteImage: jest.fn(() => jest.fn()),
  handleCloseDetailImage: jest.fn(),
};

jest.mock('@/state/concepts/images/imageSlice', () => ({
  ...jest.requireActual('@/state/concepts/images/imageSlice'),
  selectedImageIdSelector: jest.fn(() => '1'),
}));

jest.mock('../hook', () => jest.fn(() => mockedHook));

describe('ImageDetailComponent component', () => {
  it('should render defaultProps', () => {
    render(
      <ImageDetailComponent
        src={mockImage.url}
        fileName={mockImage.filename}
        size={mockImage.sizeInBytes}
        selectedImage={mockImage}
      />,
    );

    screen.getByText('Ms. Jimmie Cole');
    screen.getByText('July 15, 2017');
    screen.getByText('December 16, 2022');
    screen.getByText('3200 x 4800');
    screen.getByText('72 x 72');
    screen.getByText(`${mockImage.description}`);
    screen.getByText('Close');
    screen.getByText('Delete');
  });

  it('should render when description is empty', () => {
    render(
      <ImageDetailComponent
        src={mockImage.url}
        fileName={mockImage.filename}
        size={mockImage.sizeInBytes}
        selectedImage={{ ...mockImage, description: undefined }}
      />,
    );

    screen.getByText('Ms. Jimmie Cole');
    screen.getByText('July 15, 2017');
    screen.getByText('December 16, 2022');
    screen.getByText('3200 x 4800');
    screen.getByText('72 x 72');
    screen.getByText('N/a');
    screen.getByText('Close');
    screen.getByText('Delete');
  });
});
