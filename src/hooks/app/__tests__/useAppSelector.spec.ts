import { useAppSelector } from '@/hooks/app/useAppSelector';

describe('useAppSelector()', () => {
  it('should calls return value from selector', () => {
    const testSelector = () => 'test';

    expect(useAppSelector(testSelector)).toEqual('test');
  });
});
