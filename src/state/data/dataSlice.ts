import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '@/state/store/types';

import { DataState, DataApiRequestAction } from './types';

const initialState: DataState = {
  meta: {},
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    dataApiRequest: (state, action: PayloadAction<DataApiRequestAction>) => {
      const { endpoint } = action.payload;

      state.meta[endpoint] = { loading: true };
    },

    dataApiFetched: (state, action: PayloadAction<DataApiRequestAction>) => {
      const { endpoint } = action.payload;

      state.meta[endpoint] = { loading: false };
    },
  },
});

//actonCreators
export const { dataApiRequest, dataApiFetched } = dataSlice.actions;

//selectors
const metaSelector = (state: RootState) => state.data.meta;

export const loadingSelector = createDraftSafeSelector(
  metaSelector,
  (_: RootState, endpoint: string) => endpoint,
  (meta, endpoint) => meta[endpoint] && meta[endpoint].loading
);

export default dataSlice.reducer;
