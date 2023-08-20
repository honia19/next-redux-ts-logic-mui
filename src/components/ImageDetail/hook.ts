'use client';

import { useCallback } from 'react';

import { useAppDispatch } from '@/hooks/app/useAppDispatch';
import { useAppSelector } from '@/hooks/app/useAppSelector';
import {
  addFavoriteImage,
  addImage,
  clearSelectedImage,
  isFavoritedImageSelector,
  removeFavoriteImage,
  removeImage,
} from '@/state/concepts/images/imageSlice';

import { IImageDetail } from './types';

const useContainer = () => {
  const isFavoriteSelectedImage = useAppSelector(isFavoritedImageSelector);
  const dispatch = useAppDispatch();

  const handleRemoveFavoriteImage = useCallback(
    (id: string) => () => {
      if (isFavoriteSelectedImage) {
        dispatch(removeFavoriteImage(id));
      } else {
        dispatch(removeImage(id));
      }
    },
    [isFavoriteSelectedImage, dispatch],
  );

  const handleCloseDetailImage = useCallback(() => {
    dispatch(clearSelectedImage());
  }, [dispatch]);

  const toggleFavoriteImage = useCallback(
    (selectedImage: IImageDetail['selectedImage']) => () => {
      if (isFavoriteSelectedImage) {
        dispatch(removeFavoriteImage(selectedImage.id));
        dispatch(addImage(selectedImage));
      } else {
        dispatch(addFavoriteImage(selectedImage));
        dispatch(removeImage(selectedImage.id));
      }

      dispatch(clearSelectedImage());
    },
    [isFavoriteSelectedImage, dispatch],
  );

  return {
    toggleFavoriteImage,
    isFavoriteSelectedImage,
    handleRemoveFavoriteImage,
    handleCloseDetailImage,
  };
};

export default useContainer;
