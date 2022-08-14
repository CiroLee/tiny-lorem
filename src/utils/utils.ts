import { IRange } from '@src/types/lorem';
import { isRangeTuple } from './validator';
const TEXT_ERROR_MAP = {
  invalidRange: 'elements of range should be positive integer and the first should be less than or equal to the second',
};
// 在[min, max]范围内生成随机正整数
export const randomInteger = (range: IRange): number => {
  if (!isRangeTuple(range)) {
    throw new Error(`[randomInteger]: ${TEXT_ERROR_MAP.invalidRange}`);
  }
  const min = Math.floor(range[0]);
  const max = Math.floor(range[1]);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
