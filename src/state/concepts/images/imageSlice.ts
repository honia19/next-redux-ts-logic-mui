import {
  combineReducers,
  createAction,
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import produce from 'immer';
import { denormalize } from 'normalizr';
import { uniq, keys, without, pipe, toPairs, reject, fromPairs } from 'ramda';

import { IImageDetail } from '@/components/ImageDetail/types';
import { RootState } from '@/state/store/types';
import { IImageItem } from '@/types/images';
import isPresent from '@/utils/isPresent';

import * as constants from './constants';
import {
  arrayOfFavoritedImagesSchema,
  arrayOfImagesSchema,
  imageSchema,
  favoritedImageSchema,
} from './schema';
import { IAddImagesPayload, IImage, IImagesState } from './types';

const initialState: IImagesState = {
  byId: {},
  allIds: [],
};

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImages: (state, action: PayloadAction<IAddImagesPayload>) => {
      const { entities } = action.payload;

      return produce(state, (draftState) => {
        draftState.byId = Object.assign(draftState.byId, entities.images);
        draftState.allIds = uniq([
          ...draftState.allIds,
          ...keys(entities.images),
        ]);
      });
    },
    addImage: (state, action: PayloadAction<IImageDetail['selectedImage']>) => {
      const { id } = action.payload;

      return produce(state, (draftState) => {
        draftState.byId = Object.assign(draftState.byId, {
          [id]: action.payload,
        });
        draftState.allIds.push(id);
      });
    },
    removeImage: (state, action: PayloadAction<string>) => {
      return produce(state, (draftState) => {
        draftState.byId = pipe(
          toPairs,
          reject(([, entity]) => entity.id === action.payload),
          fromPairs,
        )(draftState.byId) as unknown as Record<string, IImage>;
        draftState.allIds = without([action.payload], draftState.allIds);
      });
    },
  },
});

export const favoritedImagesSlice = createSlice({
  name: 'favoritedImages',
  initialState,
  reducers: {
    addFavoritedImages: (state, action: PayloadAction<IAddImagesPayload>) => {
      const { entities } = action.payload;

      return produce(state, (draftState) => {
        draftState.byId = Object.assign(
          draftState.byId,
          entities.favoritedImages,
        );
        draftState.allIds = uniq([
          ...draftState.allIds,
          ...keys(entities.favoritedImages),
        ]);
      });
    },
    addFavoriteImage: (
      state,
      action: PayloadAction<IImageDetail['selectedImage']>,
    ) => {
      const { id } = action.payload;

      return produce(state, (draftState) => {
        draftState.byId = Object.assign(draftState.byId, {
          [id]: action.payload,
        });
        draftState.allIds.push(id);
      });
    },
    removeFavoriteImage: (state, action: PayloadAction<string>) => {
      return produce(state, (draftState) => {
        draftState.byId = pipe(
          toPairs,
          reject(([, entity]) => entity.id === action.payload),
          fromPairs,
        )(draftState.byId) as unknown as Record<string, IImage>;
        draftState.allIds = without([action.payload], draftState.allIds);
      });
    },
  },
});

export const selectedImageSlice = createSlice({
  name: 'selectedImageId',
  initialState: null as string | null,
  reducers: {
    setSelectedImage: (_, action: PayloadAction<string>) => action.payload,
    clearSelectedImage: () => null,
  },
});

// actionCreators
export const { addImages, addImage, removeImage } = imagesSlice.actions;
export const { addFavoritedImages, addFavoriteImage, removeFavoriteImage } =
  favoritedImagesSlice.actions;
export const { setSelectedImage, clearSelectedImage } =
  selectedImageSlice.actions;
export const fetchImagesAction = createAction(constants.FETCH_IMAGES);

//selectors
const selectImagesByIdSelector = (state: RootState) =>
  state.images.recentlyAddedImages.byId;
const selectFavoritedImagesByIdSelector = (state: RootState) =>
  state.images.favoritedImages.byId;
export const selectedImageIdSelector = (state: RootState) =>
  state.images.selectedImageId;
export const selectedImageSelector = createDraftSafeSelector(
  selectedImageIdSelector,
  selectImagesByIdSelector,
  (imageById, imageIds) =>
    denormalize(imageById, imageSchema, { images: imageIds }),
);
export const selectedFavoritedImageSelector = createDraftSafeSelector(
  selectedImageIdSelector,
  selectFavoritedImagesByIdSelector,
  (imageById, imageIds) =>
    denormalize(imageById, favoritedImageSchema, {
      favoritedImages: imageIds,
    }),
);
export const imagesSelector = createDraftSafeSelector(
  selectImagesByIdSelector,
  (imagesById) =>
    denormalize(keys(imagesById), arrayOfImagesSchema, { images: imagesById }),
);
export const favoritedImagesSelector = createDraftSafeSelector(
  selectFavoritedImagesByIdSelector,
  (imagesById) =>
    denormalize(keys(imagesById), arrayOfFavoritedImagesSchema, {
      favoritedImages: imagesById,
    }),
);
export const isFavoritedImageSelector = createDraftSafeSelector(
  selectedImageIdSelector,
  favoritedImagesSelector,
  (selectedImageId, favoritedImages) =>
    isPresent(
      favoritedImages.find(({ id }: IImageItem) => id === selectedImageId),
    ),
);

export default combineReducers({
  recentlyAddedImages: imagesSlice.reducer,
  favoritedImages: favoritedImagesSlice.reducer,
  selectedImageId: selectedImageSlice.reducer,
});
