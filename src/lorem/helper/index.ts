import { randomElement } from '@src/utils/utils';
export default class Helper {
  /**
   * @desc return (a) random element(s) of the array.
   * @param array target array
   * @param num [optional] default is 1, return one element of the array.
   * if num > 1, will return random `num` elements of the array;
   * @returns
   */
  elements<T, U = T>(array: (T & U)[], num = 1): U | U[] {
    if (num > array.length) {
      throw new Error('num must be less than or equal to array length');
    }
    if (num > 1) {
      const result = [];
      for (let i = 0; i < num; i++) {
        result.push(randomElement<U>(array));
      }
      return result;
    }
    return randomElement<U>(array);
  }
  /**
   * @desc return a random boolean
   */
  boolean(): boolean {
    return randomElement([true, false]);
  }
}
