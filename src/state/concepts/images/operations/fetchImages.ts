import { AxiosInstance } from 'axios';
import { normalize } from 'normalizr';
import { groupBy } from 'ramda';
import { createLogic } from 'redux-logic';

import { dataApiRequest, dataApiFetched } from '@/state/data/dataSlice';

import * as constants from '../constants';
import { fetchImagesEndpoint } from '../endpoints';
import { addFavoritedImages, addImages } from '../imageSlice';
import { arrayOfImagesSchema, arrayOfFavoritedImagesSchema } from '../schema';

const fetchImages = createLogic({
  type: constants.FETCH_IMAGES,
  latest: true,

  async process({ httpClient }: { httpClient: AxiosInstance }, dispatch, done) {
    const { url, endpoint } = fetchImagesEndpoint;

    try {
      dispatch(dataApiRequest({ endpoint }));

      const { data } = await httpClient.get(url);
      const images = groupBy(
        ({ favorited }: { favorited: boolean }) =>
          favorited ? 'favorited' : 'recentlyAdded',
        data
      );

      dispatch(addImages(normalize(images.recentlyAdded, arrayOfImagesSchema)));
      dispatch(
        addFavoritedImages(
          normalize(images.favorited, arrayOfFavoritedImagesSchema)
        )
      );
      dispatch(dataApiFetched({ endpoint }));
    } catch {
      dispatch(dataApiFetched({ endpoint }));
    }
    done();
  },
});

export default fetchImages;
