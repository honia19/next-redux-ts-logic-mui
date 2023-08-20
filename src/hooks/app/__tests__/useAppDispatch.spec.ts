import { useAppDispatch } from '@/hooks/app/useAppDispatch';

import { dispatch } from '../../../../__mocks__/react-redux';

describe('useAppDispatch()', () => {
  it('should calls useDispatch', () => {
    expect(useAppDispatch()).toEqual(dispatch);
  });
});
