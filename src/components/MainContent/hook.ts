import { useCallback, useMemo, useState } from 'react';

import { useAppDispatch } from '@/hooks/app/useAppDispatch';
import { useAppSelector } from '@/hooks/app/useAppSelector';
import {
  selectedImageSelector,
  clearSelectedImage,
  selectedFavoritedImageSelector,
} from '@/state/concepts/images/imageSlice';
import { IImage } from '@/state/concepts/images/types';
import { Tab } from '@/types/tabs';

function useContainer() {
  const [tab, setTab] = useState<Tab>(Tab.RECENT);

  const dispatch = useAppDispatch();
  const selectedRecentImage: IImage = useAppSelector(selectedImageSelector);
  const selectedFavoritedImage: IImage = useAppSelector(
    selectedFavoritedImageSelector,
  );

  const selectedOptionImage = useMemo(
    () => selectedRecentImage || selectedFavoritedImage,
    [selectedRecentImage, selectedFavoritedImage],
  );

  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newValue: Tab) => {
      if (selectedOptionImage) {
        dispatch(clearSelectedImage());
      }

      setTab(newValue);
    },
    [setTab, selectedOptionImage, dispatch],
  );

  return {
    selectedImage: selectedOptionImage,
    handleTabChange,
    tab,
  };
}

export default useContainer;
