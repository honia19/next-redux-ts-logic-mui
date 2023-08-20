import { act, renderHook } from '@testing-library/react';

import {
  selectedImageSelector,
  clearSelectedImage,
  selectedFavoritedImageSelector,
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
  selectedImageSelector: jest.fn(() => mockImage),
  selectedImageIdSelector: jest.fn(() => '1'),
  selectedFavoritedImageSelector: jest.fn(() => null),
}));

const event = new Event('event');

describe('MainContent useContainer hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('selectedOptionImage', () => {
    it('should return recent image value when selectedImageSelector return data', () => {
      const { result } = renderHook(useContainer);

      expect(result.current.selectedImage).toStrictEqual(mockImage);
    });

    it('should return favorited image value when selectedImageSelector is null and selectedFavoritedImageSelector return data', () => {
      const favImagesMock = {
        ...mockImage,
        id: '2',
      };

      (selectedImageSelector as unknown as jest.Mock).mockReturnValueOnce(null);
      (
        selectedFavoritedImageSelector as unknown as jest.Mock
      ).mockReturnValueOnce(favImagesMock);
      const { result } = renderHook(useContainer);

      expect(result.current.selectedImage).toStrictEqual(favImagesMock);
    });

    it('should return null when selectedImageSelector is null and selectedFavoritedImageSelector is null', () => {
      (selectedImageSelector as unknown as jest.Mock).mockReturnValueOnce(null);
      (
        selectedFavoritedImageSelector as unknown as jest.Mock
      ).mockReturnValueOnce(null);

      const { result } = renderHook(useContainer);

      expect(result.current.selectedImage).toBeNull();
    });
  });

  describe('handleTabChange', () => {
    it('should dispatch with clearSelectedImage and call setTab', () => {
      const { result } = renderHook(useContainer);

      act(() => {
        result.current.handleTabChange(
          event as unknown as React.SyntheticEvent,
          Tab.FAVORITE,
        );
      });

      expect(dispatch).toHaveBeenCalledWith(clearSelectedImage());
      expect(result.current.tab).toBe(Tab.FAVORITE);
    });
  });
});
