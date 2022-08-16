import type { IFloatNumOptions, IRange, INumberOptions } from '@src/types/lorem.types';
import { isRangeTuple, isInt } from '@src/utils/validator';
import { fillDecimal } from '@src/utils/utils';
import { TEXT_ERROR_MAP, MAX_NUMBER } from './constant';
export default class RandomNumber {
  int(range: IRange): number {
    if (!isRangeTuple(range)) {
      throw new Error(`[randomInteger]: ${TEXT_ERROR_MAP.invalidRange}`);
    }
    const min = Math.floor(range[0]);
    const max = Math.floor(range[1]);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  float(options?: IFloatNumOptions): number {
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
    return Number((integer / _fixed).toFixed(fixed));
  }
  /**
   * @desc return a random integer or float number
   * @param options.range [min, max] range array of generated random numbers
   * @param options.fixed decimal precision. fixed must be an integer greater than 0
   * @param options.fotmat the format of returned data. srting | number
   */
  number(options?: INumberOptions): number | string {
    if (options?.fixed) {
      const num = this.float({ range: options.range, fixed: options.fixed });
      return options.format === 'string' ? fillDecimal(num, options.fixed) : num;
    }

    const num = this.int(options?.range ?? [-MAX_NUMBER, MAX_NUMBER]);
    return options?.format === 'string' ? `${num}` : num;
  }
}
