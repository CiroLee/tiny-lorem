/* eslint-disable no-unused-vars */
import { randomElement } from '@src/utils/utils';
export default class Helper {
  /**
   * @desc return (a) random element(s) of the array.
   * @param array target array
   * @param num [optional] default is 1, return one element of the array.
   * if num > 1, will return random `num` elements of the array;
   * @returns
   */
  elements<T, U extends Array<any>>(array: T, num?: number): U;
  elements<T, U extends string | number | null>(array: T, num?: number): U;
  elements<T, U>(array: T, num = 1): U | U[] {
    if (!Array.isArray(array)) {
      throw new Error('helper.elements: array must be an array');
    }
    if (num > array.length) {
      throw new Error('num must be less than or equal to array length');
    }
    if (num > 1) {
      const result: U[] = [];
      for (let i = 0; i < num; i++) {
        result.push(randomElement(array));
      }
      return result;
    }
    return randomElement(array);
  }
  /**
   * @desc return a random boolean
   */
  boolean(): boolean {
    return randomElement([true, false]);
  }
}
