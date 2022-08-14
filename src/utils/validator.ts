import type { IRange } from '@src/types/lorem';

export const isValidNumber = (num: unknown): boolean => Number.isFinite(num);

// check whether the range satisfies [min, max](min ≥ 0, max ≥ 0, max ≥ min)
export const isRangeTuple = (range: IRange): boolean => {
  if (!Array.isArray(range)) return false;
  else {
    const errorConds = [range[0] < 0, range[1] < 0, range[0] > range[1], !range.every(isValidNumber)];
    return !errorConds.some(Boolean);
  }
};
