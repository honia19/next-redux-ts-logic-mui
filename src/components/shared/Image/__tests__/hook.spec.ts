import { renderHook } from '@testing-library/react';

import useContainer from '../hook';

jest.mock('@/state/concepts/images/imageSlice', () => ({
  ...jest.requireActual('@/state/concepts/images/imageSlice'),
  selectedImageIdSelector: jest.fn(() => '1'),
}));

describe('Image useContainer hook', () => {
  it('should return selectedImageId', () => {
    const { result } = renderHook(useContainer);

    expect(result.current.selectedImageId).toBe('1');
  });
});
