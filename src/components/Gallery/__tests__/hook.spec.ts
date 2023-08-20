import { act, renderHook } from '@testing-library/react';

import {
  setSelectedImage,
  fetchImagesAction,
  favoritedImagesSelector,
} from '@/state/concepts/images/imageSlice';
import { Tab } from '@/types/tabs';

import { dispatch } from '../../../../__mocks__/react-redux';
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

jest.mock('@/state/concepts/images/imageSlice', () => ({
  ...jest.requireActual('@/state/concepts/images/imageSlice'),
  imagesSelector: jest.fn(() => []),
  favoritedImagesSelector: jest.fn(() => []),
}));

jest.mock('@/state/data/dataSlice', () => ({
  ...jest.requireActual('@/state/data/dataSlice'),
  loadingSelector: jest.fn(() => false),
}));

describe('Gallery useContainer hook', () => {
  describe('useEffect()', () => {
    it('should not dispatches fetchImagesAction when images are not present', () => {
      renderHook(() => useContainer({ tab: Tab.RECENT }));

      expect(dispatch).toHaveBeenCalledWith(fetchImagesAction());
    });

    it('should dispatches fetchImagesAction when images are present', () => {
      (favoritedImagesSelector as unknown as jest.Mock).mockReturnValueOnce([
        mockImage,
      ]);
      renderHook(() => useContainer({ tab: Tab.FAVORITE }));

      expect(dispatch).toHaveBeenCalledWith(fetchImagesAction());
    });
  });

  describe('handleSelectImage()', () => {
    it('should dispatches setSelectedImage with id', () => {
      const { result } = renderHook(() => useContainer({ tab: Tab.RECENT }));

      act(() => {
        result.current.handleSelectImage('1')();
      });

      expect(dispatch).toHaveBeenCalledWith(setSelectedImage('1'));
    });
  });
});
