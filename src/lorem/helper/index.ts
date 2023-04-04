/* eslint-disable no-unused-vars */
import { randomElement } from '@src/utils/utils';
import { IFalsy } from '@src/types/lorem.types';
export default class Helper {
  /**
   * @desc return (a) random element(s) of the array.
   * @param array target array
   * @param num [optional] default is 1, return one element of the array.
   * if num > 1, will return random `num` elements of the array;
   * @returns
   */
  elements<T extends Array<unknown>>(array: Array<unknown>, num?: number): T;
  elements<T extends Exclude<any, Array<unknown>>>(array: Array<unknown>, num?: number): T;
  elements<T>(array: Array<unknown>, num = 1): T | T[] {
    if (!Array.isArray(array)) {
      throw new Error('elements: array must be an array');
    }
    if (num > 1) {
      const result: T[] = [];
      for (let i = 0; i < num; i++) {
        result.push(randomElement(array) as T);
      }
      return result;
    }
    return randomElement(array) as T;
  }
  /**
   * @desc return a random boolean
   */
  boolean(): boolean {
    return randomElement([true, false]);
  }
  /**
   * @desc return a random a false value. such as 0, null, undefined, '', NaN and false
   */
  falsy(): IFalsy {
    return this.elements<IFalsy>([0, null, undefined, '', false, NaN]);
  }
}
