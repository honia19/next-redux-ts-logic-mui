import { assocPath, dissocPath, mergeDeepRight } from 'ramda';

import reducer, * as dataSlice from '@/state/data/dataSlice';
import type { DataState, DataStateMeta } from '@/state/data/types';
import { RootState } from '@/state/store/types';
import type { NormalizedResponse } from '@/types/json-api/normalized';
import { JsonApiLinksPagination, JsonApiResource } from '@/types/json-api/raw';

describe('Data slice', () => {
  describe('Selectors', () => {
    const endpoint1 = '/endpoint-1';
    const endpoint2 = '/endpoint-2';
    const endpoint3 = '/endpoint-3';
    const links1: JsonApiLinksPagination = {
      last: { href: 'http://blah/?page=2', meta: { page: 4 } },
    } as any;
    const links2: JsonApiLinksPagination = {
      last: 'http://blah/?page=3',
    } as any;
    const data: JsonApiResource[] = [{ id: 'id-0', type: 'type' }];
    const meta = { total: 5 };
    const state = {
      data: {
        meta: {
          [endpoint1]: { loading: true, links: links1, data, meta },
          [endpoint2]: { loading: false, links: links2 },
        },
      } as DataStateMeta,
    } as RootState;

    it('loadingSelector()', () => {
      expect(dataSlice.loadingSelector(state, endpoint1)).toBe(true);
      expect(dataSlice.loadingSelector(state, endpoint2)).toBe(false);
      expect(dataSlice.loadingSelector(state, endpoint3)).toBeUndefined();
    });

    it('linksSelector()', () => {
      expect(dataSlice.linksSelector(state, endpoint1)).toBe(links1);
      expect(dataSlice.linksSelector(state, endpoint2)).toBe(links2);
      expect(dataSlice.linksSelector(state, endpoint3)).toBeUndefined();
    });

    it('endpointMetaSelector()', () => {
      expect(dataSlice.endpointMetaSelector(state, endpoint1)).toBe(meta);
      expect(dataSlice.endpointMetaSelector(state, endpoint2)).toEqual({});
    });

    it('totalCountSelector()', () => {
      expect(dataSlice.totalCountSelector(state, endpoint1)).toBe(5);
      expect(dataSlice.totalCountSelector(state, endpoint2)).toBeUndefined();
    });

    it('pageCountSelector()', () => {
      expect(dataSlice.pageCountSelector(state, endpoint1)).toBe(4);
      expect(dataSlice.pageCountSelector(state, endpoint2)).toBe(3);
      expect(
        dataSlice.pageCountSelector(
          dissocPath(
            ['data', 'meta', endpoint1, 'links', 'last', 'meta'],
            state
          ),
          endpoint1
        )
      ).toBe(2);
      expect(
        dataSlice.pageCountSelector(
          assocPath(['data', 'meta', endpoint1, 'links', 'last'], '55', state),
          endpoint1
        )
      ).toBeUndefined();
      expect(dataSlice.pageCountSelector(state, endpoint3)).toBeUndefined();
    });
  });

  describe('Reducer', () => {
    const endpoint = '/endpoint';
    const initialState: DataState = { meta: {} };
    const loadingState: DataStateMeta = {
      meta: {
        [endpoint]: {
          loading: true,
        },
      },
    };
    const loadedState: DataStateMeta = {
      meta: {
        [endpoint]: {
          loading: false,
        },
      },
    };
    const response: NormalizedResponse = {
      type: {
        '1': { id: '1', type: 'type', attributes: {} },
        '2': { id: '2', type: 'type', attributes: {} },
      },
    };

    it('should return initial state', () => {
      expect(reducer(undefined, { type: 'unknown' } as any)).toStrictEqual(
        initialState
      );
    });

    it('should handle dataApiRequest()', () => {
      expect(
        reducer(initialState, dataSlice.dataApiRequest({ endpoint }))
      ).toStrictEqual(loadingState);
    });

    it('should handle dataApiSuccess()', () => {
      const successState = mergeDeepRight(response, loadedState);

      expect(
        reducer(
          loadingState as DataState,
          dataSlice.dataApiSuccess({ endpoint, response })
        )
      ).toStrictEqual(successState);
    });

    it('should handle dataApiSuccess() without response', () => {
      expect(
        reducer(
          loadingState as DataState,
          dataSlice.dataApiSuccess({ endpoint })
        )
      ).toStrictEqual(loadedState);
    });

    it('should handle dataApiFailure()', () => {
      expect(
        reducer(
          loadedState as DataState,
          dataSlice.dataApiFailure({ endpoint })
        )
      ).toStrictEqual(loadedState);
    });

    it('should handle dataDelete()', () => {
      const state = mergeDeepRight(response, loadedState) as DataState;
      const expectedState = mergeDeepRight(
        { type: { '2': response.type['2'] } },
        loadedState
      );

      expect(
        reducer(state, dataSlice.dataDelete({ kind: 'type', ids: ['1'] }))
      ).toStrictEqual(expectedState);
    });
  });
});
