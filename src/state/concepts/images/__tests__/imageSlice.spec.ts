import { denormalize, normalize } from 'normalizr';
import {
  fromPairs,
  groupBy,
  keys,
  pipe,
  reject,
  toPairs,
  without,
} from 'ramda';

import { fetchImagesResponse } from '@/state/concepts/images/__mocks__/fetchImagesResponse';
import * as constants from '@/state/concepts/images/constants';
import reducers, * as imagesSlice from '@/state/concepts/images/imageSlice';

import {
  arrayOfFavoritedImagesSchema,
  arrayOfImagesSchema,
  favoritedImageSchema,
  imageSchema,
} from '../schema';
import { IAddImagesPayload, IImagesState } from '../types';

describe('Image slice', () => {
  const images = groupBy(
    ({ favorited }: { favorited: boolean }) =>
      favorited ? 'favorited' : 'recentlyAdded',
    fetchImagesResponse,
  );

  describe('Actions', () => {
    it('fetchImagesAction()', () => {
      const expectedAction = {
        type: constants.FETCH_IMAGES,
        payload: undefined,
      };

      expect(imagesSlice.fetchImagesAction()).toStrictEqual(expectedAction);
    });
  });

  describe('Selectors', () => {
    it('selectedImageIdSelector returns selectedImageId data', () => {
      const state = {
        images: {
          selectedImageId: fetchImagesResponse[0].id,
        },
      } as any;

      expect(imagesSlice.selectedImageIdSelector(state)).toEqual(
        fetchImagesResponse[0].id,
      );
    });

    it('selectedImageSelector returns recently selected image data', () => {
      const state = {
        images: {
          selectedImage: fetchImagesResponse[0].id,
          recentlyAddedImages: {
            byId: normalize(images.recentlyAdded, arrayOfImagesSchema),
          },
        },
      } as any;

      const expected = denormalize(state.images.selectedImage, imageSchema, {
        images: state.images.recentlyAddedImages.byId,
      });

      expect(imagesSlice.selectedImageSelector(state)).toEqual(expected);
    });

    it('selectedFavoritedImageSelector returns favorited selected image data', () => {
      const state = {
        images: {
          selectedImage: fetchImagesResponse[0].id,
          favoritedImages: {
            byId: normalize(images.favorited, arrayOfFavoritedImagesSchema),
          },
        },
      } as any;

      const expected = denormalize(
        state.images.selectedImage,
        favoritedImageSchema,
        {
          images: state.images.favoritedImages.byId,
        },
      );

      expect(imagesSlice.selectedFavoritedImageSelector(state)).toEqual(
        expected,
      );
    });

    it('imagesSelector returns recent added images', () => {
      const state = {
        images: {
          recentlyAddedImages: {
            byId: normalize(images.recentlyAdded, arrayOfImagesSchema),
          },
        },
      } as any;

      const expected = denormalize(
        keys(state.images.recentlyAddedImages.byId),
        arrayOfImagesSchema,
        {
          images: state.images.recentlyAddedImages.byId,
        },
      );

      expect(imagesSlice.imagesSelector(state)).toEqual(expected);
    });

    it('favoritedImagesSelector returns favorited images', () => {
      const state = {
        images: {
          favoritedImages: {
            byId: normalize(images.favorited, arrayOfFavoritedImagesSchema),
          },
        },
      } as any;

      const expected = denormalize(
        keys(state.images.favoritedImages.byId),
        arrayOfFavoritedImagesSchema,
        {
          favoritedImages: state.images.favoritedImages.byId,
        },
      );

      expect(imagesSlice.favoritedImagesSelector(state)).toEqual(expected);
    });

    it('isFavoritedImageSelector returns bool is image favorited or recent added', () => {
      const state = {
        images: {
          selectedImageId: fetchImagesResponse[0].id,
          favoritedImages: {
            byId: normalize(images.favorited, arrayOfFavoritedImagesSchema),
          },
        },
      } as any;

      expect(imagesSlice.isFavoritedImageSelector(state)).toEqual(false);
    });
  });

  describe('Reducers', () => {
    const initialState: IImagesState = {
      byId: {},
      allIds: [],
    };

    describe('recentlyAddedImages', () => {
      it('returns initial state', () => {
        expect(
          reducers(undefined, { type: undefined }).recentlyAddedImages,
        ).toEqual(initialState);
      });

      it('should handle addImages', () => {
        const payload = normalize(
          images.recentlyAdded,
          arrayOfImagesSchema,
        ) as IAddImagesPayload;

        expect(
          reducers(undefined, imagesSlice.addImages(payload))
            .recentlyAddedImages,
        ).toEqual({
          byId: payload.entities.images,
          allIds: keys(payload.entities.images),
        });
      });

      it('should handle addImage', () => {
        const payload = fetchImagesResponse[0];

        expect(
          reducers(undefined, imagesSlice.addImage(payload))
            .recentlyAddedImages,
        ).toEqual({
          byId: {
            [payload.id]: payload,
          },
          allIds: [payload.id],
        });
      });

      it('should handle removeImage', () => {
        const { entities } = normalize(
          images.recentlyAdded,
          arrayOfImagesSchema,
        ) as IAddImagesPayload;

        const state = {
          selectedImageId: null,
          favoritedImages: initialState,
          recentlyAddedImages: {
            byId: entities,
            allIds: keys(entities),
          },
        };

        expect(
          reducers(state, imagesSlice.removeImage(keys(entities)[0]))
            .recentlyAddedImages,
        ).toEqual({
          byId: pipe(
            toPairs,
            reject(([, entity]) => entity.id === keys(entities)[0]),
            fromPairs,
          )(state.recentlyAddedImages.byId),
          allIds: without(
            [keys(entities)[0]],
            state.recentlyAddedImages.allIds,
          ),
        });
      });
    });

    describe('favoritedImages', () => {
      it('returns initial state', () => {
        expect(
          reducers(undefined, { type: undefined }).favoritedImages,
        ).toEqual(initialState);
      });

      it('should handle addFavoritedImages', () => {
        const payload = normalize(
          images.favorited,
          arrayOfFavoritedImagesSchema,
        ) as IAddImagesPayload;

        expect(
          reducers(undefined, imagesSlice.addFavoritedImages(payload))
            .favoritedImages,
        ).toEqual({
          byId: payload.entities.favoritedImages,
          allIds: keys(payload.entities.favoritedImages),
        });
      });

      it('should handle addFavoriteImage', () => {
        const payload = fetchImagesResponse[0];

        expect(
          reducers(undefined, imagesSlice.addFavoriteImage(payload))
            .favoritedImages,
        ).toEqual({
          byId: {
            [payload.id]: payload,
          },
          allIds: [payload.id],
        });
      });

      it('should handle removeFavoriteImage', () => {
        const { entities } = normalize(
          images.favorited,
          arrayOfFavoritedImagesSchema,
        ) as IAddImagesPayload;

        const state = {
          selectedImageId: null,
          recentlyAddedImages: initialState,
          favoritedImages: {
            byId: entities,
            allIds: keys(entities),
          },
        };

        expect(
          reducers(state, imagesSlice.removeFavoriteImage(keys(entities)[0]))
            .favoritedImages,
        ).toEqual({
          byId: pipe(
            toPairs,
            reject(([, entity]) => entity.id === keys(entities)[0]),
            fromPairs,
          )(state.favoritedImages.byId),
          allIds: without([keys(entities)[0]], state.favoritedImages.allIds),
        });
      });
    });

    describe('selectedImageSlice', () => {
      it('returns initial state', () => {
        expect(
          reducers(undefined, { type: undefined }).selectedImageId,
        ).toBeNull();
      });

      it('should handle setSelectedImage', () => {
        const expectedMock = '1';

        expect(
          reducers(undefined, imagesSlice.setSelectedImage(expectedMock))
            .selectedImageId,
        ).toEqual(expectedMock);
      });

      it('should handle clearSelectedImage', () => {
        expect(
          reducers(
            {
              selectedImageId: '1',
              recentlyAddedImages: initialState,
              favoritedImages: initialState,
            },
            imagesSlice.clearSelectedImage(),
          ).selectedImageId,
        ).toBeNull();
      });
    });
  });
});
