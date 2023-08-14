export enum Unit {
  Bytes = 'B',
  Kilobytes = 'KB',
  Megabytes = 'MB',
  Gigabytes = 'GB',
  Terabytes = 'TB',
}

const convertSize = (bytes: number, unit: Unit): string => {
  const units = Object.values(Unit);
  const unitIndex = units.indexOf(unit);
  const size = bytes / Math.pow(1024, unitIndex);

  return size.toFixed(1) + ' ' + unit;
};

export default convertSize;
