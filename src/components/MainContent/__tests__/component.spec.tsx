import React from 'react';

import { Tab } from '@/types/tabs';
import { render, screen } from '@/utils/test-utils';

import MainContentComponent from '../component';
import useContainer from '../hook';

const mockedHook = {
  selectedImage: null,
  handleTabChange: jest.fn(),
  tab: Tab.RECENT,
};

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

jest.mock('@/state/concepts/images/imageSlice', () => ({
  ...jest.requireActual('@/state/concepts/images/imageSlice'),
  imagesSelector: jest.fn(() => [mockImage]),
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

jest.mock('../hook', () => jest.fn(() => mockedHook));

describe('MainContentComponent component', () => {
  it('should render correctly by default when image is not selected', () => {
    const { baseElement } = render(<MainContentComponent />);

    expect(baseElement.querySelector('.bg-grey-snow')).toHaveClass(
      'min-w-full',
    );

    expect(screen.queryByText('Information')).toBeNull();
    expect(screen.queryByText('Description')).toBeNull();
  });

  it('should render correctly when selectedImage is present', () => {
    (useContainer as unknown as jest.Mock).mockReturnValueOnce({
      ...mockedHook,
      selectedImage: mockImage,
    });

    const { baseElement } = render(<MainContentComponent />);

    expect(baseElement.querySelector('.bg-grey-snow')).not.toHaveClass(
      'min-w-full',
    );
    expect(baseElement.querySelector('.bg-grey-snow')).toHaveClass(
      'w-3/4 md:w-3/5 lg:w-2/3',
    );

    screen.getByText('Information');
    screen.getByText('Description');
  });
});
