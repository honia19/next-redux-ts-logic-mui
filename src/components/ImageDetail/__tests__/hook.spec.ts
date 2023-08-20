import { act, renderHook } from '@testing-library/react';

import {
  clearSelectedImage,
  removeImage,
  isFavoritedImageSelector,
  removeFavoriteImage,
  addImage,
  addFavoriteImage,
} from '@/state/concepts/images/imageSlice';

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
  isFavoritedImageSelector: jest.fn(() => false),
}));

describe('ImageDetail useContainer hook', () => {
  describe('handleCloseDetailImage()', () => {
    it('should dispatches clearSelectedImage', () => {
      const { result } = renderHook(useContainer);

      act(() => {
        result.current.handleCloseDetailImage();
      });

      expect(dispatch).toHaveBeenCalledWith(clearSelectedImage());
    });
  });

  describe('handleRemoveFavoriteImage()', () => {
    it('should dispatches removeImage', () => {
      const { result } = renderHook(useContainer);

      act(() => {
        result.current.handleRemoveFavoriteImage('1')();
      });

      expect(dispatch).toHaveBeenCalledWith(removeImage('1'));
    });

    it('should dispatches removeFavoriteImage when image is favorited', () => {
      (isFavoritedImageSelector as unknown as jest.Mock).mockReturnValueOnce(
        true,
      );
      const { result } = renderHook(useContainer);

      act(() => {
        result.current.handleRemoveFavoriteImage('1')();
      });

      expect(dispatch).toHaveBeenCalledWith(removeFavoriteImage('1'));
    });
  });

  describe('toggleFavoriteImage()', () => {
    it('should dispatches removeImage, addFavoriteImage', () => {
      const { result } = renderHook(useContainer);

      act(() => {
        result.current.toggleFavoriteImage(mockImage)();
      });

      expect(dispatch).toHaveBeenCalledWith(addFavoriteImage(mockImage));
      expect(dispatch).toHaveBeenCalledWith(removeImage(mockImage.id));
    });

    it('should dispatches removeFavoriteImage, addImage  when image is favorited', () => {
      (isFavoritedImageSelector as unknown as jest.Mock).mockReturnValueOnce(
        true,
      );
      const { result } = renderHook(useContainer);

      act(() => {
        result.current.toggleFavoriteImage(mockImage)();
      });

      expect(dispatch).toHaveBeenCalledWith(removeFavoriteImage(mockImage.id));
      expect(dispatch).toHaveBeenCalledWith(addImage(mockImage));
    });
  });
});
