import * as routes from '@/api/apiRoutes';
import endpoint from '@/utils/endpoint';

import * as constants from './constants';

export const fetchImagesEndpoint = endpoint(
  constants.FETCH_IMAGES,
  'GET',
  routes.imagesRoute,
);
