import reducer, * as dataSlice from '@/state/data/dataSlice';
import type { DataState, DataStateMeta } from '@/state/data/types';

describe('Data slice', () => {
  describe('Selectors', () => {
    const endpoint1 = '/endpoint-1';
    const endpoint2 = '/endpoint-2';
    const endpoint3 = '/endpoint-3';

    const state: DataStateMeta = {
      data: {
        meta: {
          [endpoint1]: { loading: true },
          [endpoint2]: { loading: false },
        },
      },
    };

    it('loadingSelector()', () => {
      expect(dataSlice.loadingSelector(state as any, endpoint1)).toBe(true);
      expect(dataSlice.loadingSelector(state as any, endpoint2)).toBe(false);
      expect(
        dataSlice.loadingSelector(state as any, endpoint3),
      ).toBeUndefined();
    });
  });

  describe('Reducer', () => {
    const endpoint = '/endpoint';
    const initialState: DataState = { meta: {} };
    const loadingState: DataState = {
      meta: {
        [endpoint]: {
          loading: true,
        },
      },
    };
    const loadedState: DataState = {
      meta: {
        [endpoint]: {
          loading: true,
        },
      },
    };

    const completedState: DataState = {
      meta: {
        [endpoint]: {
          loading: false,
        },
      },
    };

    it('should return initial state', () => {
      expect(reducer(undefined, { type: 'unknown' } as any)).toStrictEqual(
        initialState,
      );
    });

    it('should handle dataApiRequest()', () => {
      expect(
        reducer(initialState, dataSlice.dataApiRequest({ endpoint })),
      ).toStrictEqual(loadingState);
    });

    it('should handle dataApiFetched()', () => {
      expect(
        reducer(
          loadedState as DataState,
          dataSlice.dataApiFetched({ endpoint }),
        ),
      ).toStrictEqual(completedState);
    });
  });
});
