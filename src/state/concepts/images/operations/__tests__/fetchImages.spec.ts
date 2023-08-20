import assert from 'assert';
import { AxiosInstance } from 'axios';
import { normalize } from 'normalizr';
import { groupBy } from 'ramda';

import { fetchImagesResponse } from '@/state/concepts/images/__mocks__/fetchImagesResponse';
import {
  addImages,
  addFavoritedImages,
} from '@/state/concepts/images/imageSlice';
import { dataApiFetched, dataApiRequest } from '@/state/data/dataSlice';

import { fetchImagesEndpoint } from '../../endpoints';
import {
  arrayOfImagesSchema,
  arrayOfFavoritedImagesSchema,
} from '../../schema';
import fetchImages from '../fetchImages';

describe('fetchImages', () => {
  const { url, endpoint } = fetchImagesEndpoint;
  const images = groupBy(
    ({ favorited }: { favorited: boolean }) =>
      favorited ? 'favorited' : 'recentlyAdded',
    fetchImagesResponse,
  );
  const dispatch = jest.fn();
  const done = jest.fn();

  let httpClient: AxiosInstance;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('success', () => {
    beforeEach(() => {
      httpClient = {
        get: jest.fn().mockResolvedValue({ data: fetchImagesResponse }),
      } as unknown as AxiosInstance;
      assert(fetchImages.process);
      fetchImages.process({ httpClient } as never, dispatch, done);
    });

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(4);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        addImages(normalize(images.recentlyAdded, arrayOfImagesSchema)),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        addFavoritedImages(
          normalize(images.favorited, arrayOfFavoritedImagesSchema),
        ),
      );
      expect(dispatch).toHaveBeenNthCalledWith(4, dataApiFetched({ endpoint }));
    });
  });

  describe('failure', () => {
    beforeEach(() => {
      httpClient = {
        get: jest.fn().mockRejectedValue('test error'),
      } as unknown as AxiosInstance;
      assert(fetchImages.process);
      fetchImages.process({ httpClient } as never, dispatch, done);
    });

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));
      expect(dispatch).toHaveBeenNthCalledWith(2, dataApiFetched({ endpoint }));
    });
  });
});
