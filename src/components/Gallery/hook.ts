'use client';

import { useEffect, useMemo } from 'react';

import { useAppDispatch } from '@/hooks/app/useAppDispatch';
import { useAppSelector } from '@/hooks/app/useAppSelector';
import useSelectImage from '@/hooks/images/useSelectImage';
import { fetchImagesEndpoint } from '@/state/concepts/images/endpoints';
import {
  imagesSelector,
  fetchImagesAction,
  favoritedImagesSelector,
} from '@/state/concepts/images/imageSlice';
import { loadingSelector } from '@/state/data/dataSlice';
import { Tab } from '@/types/tabs';

import { ITab } from './types';

const useContainer = ({ tab }: ITab) => {
  const dispatch = useAppDispatch();
  const { handleSelectImage } = useSelectImage();

  const recentImages = useAppSelector(imagesSelector);
  const favoritedImages = useAppSelector(favoritedImagesSelector);
  const isLoading = useAppSelector((state) =>
    loadingSelector(state, fetchImagesEndpoint.endpoint)
  );
  const images = useMemo(
    () => (tab === Tab.RECENT ? recentImages : favoritedImages),
    [tab, recentImages, favoritedImages]
  );
  const isLoaded = useMemo(() => isLoading === false, [isLoading]);

  useEffect(() => {
    if (!images.length) {
      dispatch(fetchImagesAction());
    }
  }, [dispatch, images]);

  return { images, isLoaded, handleSelectImage };
};

export default useContainer;
