import type { IRange } from '@src/types/lorem';

export const isValidNumber = (num: unknown): boolean => Number.isFinite(num);

/**
 * @desc check whether the range satisfies [min, max](min ≥ 0, max ≥ 0, max ≥ min).It's a strict mode
 */
export const isPositiveRangeTuple = (range: IRange): boolean => {
  if (!Array.isArray(range)) return false;
  else {
    const errorConds = [range[0] < 0, range[1] < 0, range[0] > range[1], !range.every(isValidNumber)];
    return !errorConds.some(Boolean);
  }
};
/**
 * @desc check whether the range satisfies [min, max](max ≥ min)
 */
export const isRangeTuple = (range: IRange): boolean => {
  if (!Array.isArray(range)) return false;
  else {
    const errorConds = [range[0] > range[1], !range.every(isValidNumber)];
    return !errorConds.some(Boolean);
  }
};
/**
 * @desc check num is int number. include 0
 */
export const isInt = (num: number): boolean => {
  if (!isValidNumber(num)) return false;
  return parseInt(String(num), 10) === num;
};
