import type { IRange, IFloatNumOptions } from '@src/types/lorem';
import { isInt, isRangeTuple } from './validator';

export const TEXT_ERROR_MAP = {
  invalidRange: 'the first element of the array should be less than or equal to the second',
  invalidPositiveRange:
    'elements of range should be positive integer and the first should be less than or equal to the second',
};
export const MAX_NUMBER = 9007199254740992; // js中可以精确表示的最大整数2^53

// Generate random positive integers in the range [min, max]
export const randomInteger = (range: IRange): number => {
  if (!isRangeTuple(range)) {
    throw new Error(`[randomInteger]: ${TEXT_ERROR_MAP.invalidRange}`);
  }
  const min = Math.floor(range[0]);
  const max = Math.floor(range[1]);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
/**
 * @desc Generate random float number
 * @param options.range [min, max] format array, optional
 * @param options.fixed precision of float number. four decimal places by default.
 * if fixed exist, it must be an int that larger than 0 and less than 100.
 */
export const randomFloat = (options?: IFloatNumOptions): number => {
  let fixed = 4;
  let min = 0;
  let max = 0;
  if (options?.fixed && (options.fixed < 0 || options.fixed > 20 || !isInt(options.fixed))) {
    throw new Error(`fixed is ${options.fixed}, it must be an int that larger than 0 and less than 20`);
  } else if (options?.fixed && options?.fixed > 0 && options.fixed <= 20 && isInt(options?.fixed)) {
    fixed = options.fixed;
  }
  if (options?.range && !isRangeTuple(options?.range)) {
    throw new Error(`range is [${options.range[0]}, ${options.range[1]}], ${TEXT_ERROR_MAP.invalidRange}`);
  } else if (options?.range && isRangeTuple(options?.range)) {
    min = options.range[0];
    max = options.range[1];
  }

  const _fixed = 10 ** fixed;
  if (!options?.range) {
    max = MAX_NUMBER / _fixed;
    min = -max;
  }
  const integer = randomInteger([min * _fixed, max * _fixed]);
  console.log(fixed);

  return Number((integer / _fixed).toFixed(fixed));
};
/**
 * @desc padding floating point digits
 * @param num number
 * @param fixed decimal precision
 * @examples fillDecimal(2,34, 3) // '2,430'
 */
export const fillDecimal = (num: number | string, fixed: number): string => {
  const [int, decimal = ''] = num.toString().split('.');
  const _fixed = Math.floor(fixed);

  return `${int}.${decimal}${'0'.repeat(_fixed - decimal.length)}`;
};
