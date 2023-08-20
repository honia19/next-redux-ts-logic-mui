import React from 'react';

import { Tab } from '@/types/tabs';
import { render, screen } from '@/utils/test-utils';

import GalleryComponent from '../component';
import useContainer from '../hook';

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
  isLoaded: false,
  handleSelectImage: jest.fn(() => jest.fn()),
  images: [],
};

jest.mock('@/state/concepts/images/imageSlice', () => ({
  ...jest.requireActual('@/state/concepts/images/imageSlice'),
  selectedImageIdSelector: jest.fn(() => null),
}));

jest.mock('../hook', () => jest.fn(() => mockedHook));

describe('GalleryComponent component', () => {
  it('should render correctly Spinner when isLoaded is false', () => {
    render(<GalleryComponent tab={Tab.RECENT} />);

    const progressBar = screen.getByRole('progressbar');

    expect(progressBar).toHaveClass(
      'MuiCircularProgress-root MuiCircularProgress-indeterminate MuiCircularProgress-colorPrimary',
    );
  });

  it('should render correctly images', () => {
    (useContainer as unknown as jest.Mock).mockReturnValueOnce({
      ...mockedHook,
      isLoaded: true,
      images: [mockImage],
    });

    render(<GalleryComponent tab={Tab.RECENT} />);

    expect(screen.queryByRole('progressbar')).toBeNull();

    screen.getByTestId(`image-btn-${mockImage.id}`);
  });
});
