/* eslint-disable no-unused-vars */
import { isRangeTuple, isInt, isBigIntRangeTuple } from '@src/utils/validator';
import { randomInteger } from '@src/utils/utils';
import { fillDecimal } from '@src/utils/utils';
import { TEXT_ERROR_MAP, MAX_NUMBER } from './constant';
import type { INumberOptions, IRange, IBigRange } from '@src/types/lorem.types';
export default class RandomNumber {
  /**
   * @desc return a random integer
   * @param range [min, max] format array
   */
  int(range?: IRange): number {
    let min = 0;
    let max = 0;
    if (range && !isRangeTuple(range)) {
      throw new Error(`int: ${TEXT_ERROR_MAP.invalidRange}`);
    } else if (range && isRangeTuple(range)) {
      min = range[0];
      max = range[1];
    } else if (!range) {
      min = -MAX_NUMBER;
      max = MAX_NUMBER;
    }
    return randomInteger([min, max]);
  }
  /**
   * @desc return a random integer by digit
   * @param digit digits of integer
   * @param positive return a negative integer is set false, default is true
   */
  intBy(digit: number, positive = true): number {
    if (digit <= 0 || !isInt(digit)) {
      throw new Error('digit must be a positive integer');
    }
    let num = '';
    for (let i = 0; i < digit; i++) {
      if (i === 0 && digit === 1) {
        num = randomInteger([0, 9]).toString();
      } else if (i === 0 && digit !== 1) {
        num = randomInteger([1, 9]).toString();
      } else {
        num += randomInteger([0, 9]).toString();
      }
    }
    return positive ? Number(num) : 0 - Number(num);
  }
  /**
   * @desc return a random float number
   * @param options.range [min, max] format array
   * @param options.fixed decimal precision.it must be an positive integer and less than 20
   */
  float<T extends string | number>(options?: INumberOptions): T;
  float(options?: INumberOptions): string | number {
    let fixed = 4;
    let min = 0;
    let max = 0;
    if (options?.fixed && (options.fixed < 0 || options.fixed > 20 || !isInt(options.fixed))) {
      throw new Error(`float: fixed must be an int that larger than 0 and less than 20`);
    } else if (options?.fixed && options?.fixed > 0 && options.fixed <= 20 && isInt(options?.fixed)) {
      fixed = options.fixed;
    }
    if (options?.range && !isRangeTuple(options?.range)) {
      throw new Error(`float: range is [${options.range[0]}, ${options.range[1]}], ${TEXT_ERROR_MAP.invalidRange}`);
    } else if (options?.range && isRangeTuple(options?.range)) {
      min = options.range[0];
      max = options.range[1];
    }

    const _fixed = 10 ** fixed;
    if (!options?.range) {
      max = MAX_NUMBER / _fixed;
      min = -max;
    }
    const integer = this.int([min * _fixed, max * _fixed]);
    const floatVal = Number((integer / _fixed).toFixed(fixed));
    return options?.format === 'string' ? fillDecimal(floatVal, fixed) : floatVal;
  }
  bigInt(range?: IBigRange): bigint {
    let min = 0;
    let max = 0;
    console.log('sss', range);

    if (range && !isBigIntRangeTuple(range)) {
      throw new Error(`bigInt: ${TEXT_ERROR_MAP.invalidBigRange}`);
    } else if (range && isBigIntRangeTuple(range)) {
      min = Number(range[0]);
      max = Number(range[1]);
    } else if (!range) {
      min = -MAX_NUMBER;
      max = MAX_NUMBER;
    }
    const int = randomInteger([min, max]);
    return BigInt(int);
  }
}
