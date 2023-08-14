import isPresent from '../isPresent';

describe('isPresent()', () => {
  it('should return false with an empty array', () => {
    expect(isPresent([])).toBe(false);
  });

  it('should return false with an filled array', () => {
    expect(isPresent([1])).toBe(true);
  });

  it('should return false with an empty object', () => {
    expect(isPresent({})).toBe(false);
  });

  it('should return false with an filled object', () => {
    expect(isPresent({ test: true })).toBe(true);
  });
});
