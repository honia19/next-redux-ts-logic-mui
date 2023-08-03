import { useCallback } from 'react';

import { setSelectedImage } from '@/state/concepts/images/imageSlice';

import { useAppDispatch } from '../app/useAppDispatch';

const useSelectImage = () => {
  const dispatch = useAppDispatch();

  const handleSelectImage = useCallback(
    (id: string) => () => {
      dispatch(setSelectedImage(id));
    },
    [dispatch]
  );

  return {
    handleSelectImage,
  };
};

export default useSelectImage;
