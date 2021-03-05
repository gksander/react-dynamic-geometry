export const sqrt = Math.sqrt;
export const square = (x: number): number => Math.pow(x, 2);
export const abs = Math.abs;

export const round = ({
  num,
  numDecimals = 0,
  truncator = Math.round,
}: {
  num: number;
  numDecimals?: number;
  truncator?: (x: number) => number;
}) => {
  return truncator(num * Math.pow(10, numDecimals)) / Math.pow(10, numDecimals);
};
