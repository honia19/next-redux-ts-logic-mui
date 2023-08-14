import convertSize, { Unit } from '../convertSize';

describe('convertSize()', () => {
  it('should convert bytes to the specified unit', () => {
    expect(convertSize(1024, Unit.Kilobytes)).toBe('1.0 KB');
    expect(convertSize(1048576, Unit.Megabytes)).toBe('1.0 MB');
    expect(convertSize(1073741824, Unit.Gigabytes)).toBe('1.0 GB');
    expect(convertSize(1099511627776, Unit.Terabytes)).toBe('1.0 TB');

    expect(convertSize(2048, Unit.Kilobytes)).toBe('2.0 KB');
    expect(convertSize(2097152, Unit.Megabytes)).toBe('2.0 MB');
    expect(convertSize(2147483648, Unit.Gigabytes)).toBe('2.0 GB');
    expect(convertSize(2199023255552, Unit.Terabytes)).toBe('2.0 TB');
  });

  it('should handle zero bytes', () => {
    expect(convertSize(0, Unit.Bytes)).toBe('0.0 B');
    expect(convertSize(0, Unit.Kilobytes)).toBe('0.0 KB');
    expect(convertSize(0, Unit.Megabytes)).toBe('0.0 MB');
    expect(convertSize(0, Unit.Gigabytes)).toBe('0.0 GB');
    expect(convertSize(0, Unit.Terabytes)).toBe('0.0 TB');
  });

  it('should return the same unit for bytes', () => {
    expect(convertSize(512, Unit.Bytes)).toBe('512.0 B');
  });

  it('should round to one decimal place', () => {
    expect(convertSize(1536, Unit.Kilobytes)).toBe('1.5 KB');
    expect(convertSize(1572864, Unit.Megabytes)).toBe('1.5 MB');
  });
});
