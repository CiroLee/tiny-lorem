import { isRangeTuple, isInt } from '@src/utils/validator';
import { randomInteger } from '@src/utils/utils';
import { fillDecimal } from '@src/utils/utils';
import { TEXT_ERROR_MAP, MAX_NUMBER } from './constant';
import type { INumberOptions, IRange } from '@src/types/lorem.types';
export default class RandomNumber {
  /**
   * @desc return a random integer
   * @param range [min, max] format array
   */
  int(range?: IRange): number {
    let min = 0;
    let max = 0;
    if (range && !isRangeTuple(range)) {
      throw new Error(`range is [${range[0]}, ${range[1]}], ${TEXT_ERROR_MAP.invalidRange}`);
    } else if (range && isRangeTuple(range)) {
      min = range[0];
      max = range[1];
    }
    if (!range) {
      min = -MAX_NUMBER;
      max = MAX_NUMBER;
    }
    return randomInteger([min, max]);
  }
  /**
   * @desc return a random float number
   * @param options.range [min, max] format array
   * @param options.fixed decimal precision.it must be an positive integer and less than 20
   */
  float(options?: INumberOptions): number | string {
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
    const integer = this.int([min * _fixed, max * _fixed]);
    const floatVal = Number((integer / _fixed).toFixed(fixed));
    return options?.format === 'string' ? fillDecimal(floatVal, fixed) : floatVal;
  }
}
