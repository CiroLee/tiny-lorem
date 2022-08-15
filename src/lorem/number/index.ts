import type { INumberOptions } from '@src/types/lorem';
import { MAX_NUMBER, randomFloat, fillDecimal, randomInteger } from '@src/utils/utils';
/**
 * @desc return a random integer or float number
 * @param options.range [min, max] range array of generated random numbers
 * @param options.fixed decimal precision. fixed must be an integer greater than 0
 * @param options.fotmat the format of returned data. srting | number
 */
export default function number(options?: INumberOptions): number | string {
  if (options?.fixed) {
    const num = randomFloat({ range: options.range, fixed: options.fixed });
    return options.format === 'string' ? fillDecimal(num, options.fixed) : num;
  }

  const num = randomInteger(options?.range ?? [-MAX_NUMBER, MAX_NUMBER]);
  return options?.format === 'string' ? `${num}` : num;
}
