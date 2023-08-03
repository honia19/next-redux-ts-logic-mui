import Axios from 'axios';
import { stringify } from 'qs';

import { API_HOST } from './apiRoutes';

const httpClient = Axios.create({
  baseURL: `${API_HOST}`,
  paramsSerializer: (params) => stringify(params, { arrayFormat: 'brackets' }),
});

export { httpClient };
