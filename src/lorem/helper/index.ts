/* eslint-disable no-unused-vars */
import { randomElement } from '@src/utils/utils';
import { IFalsy } from '@src/types/lorem.types';
export default class Helper {
  /**
   * Returns a random boolean value (true or false)
   * @returns A random boolean value
   */
  boolean(): boolean {
    return randomElement([true, false]);
  }
  /**
   * Returns a random falsy value from common JavaScript falsy values
   * Possible values: 0, null, undefined, '', false, NaN
   * @returns A random falsy value
   */
  falsy(): IFalsy {
    return this.elements([0, null, undefined, '', false, NaN]);
  }
  /**
   * Returns one or more random elements from the provided array
   * @param array The source array to select elements from
   * @param num Optional. Number of elements to return. Default is 1.
   * When num > 1, returns an array of random elements
   * @returns A single element or array of random elements from the source array
   */
  elements<T>(array: T[], num?: 1): T;
  elements<T>(array: T[], num: number): T[];
  elements<T>(array: T[], num = 1): T | T[] {
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
    return randomElement(array);
  }

  /**
   * Returns one or more elements from an array based on weighted probability
   * @param arr The source array to select elements from
   * @param weightParams Array of weight configuration objects
   * @param weightParams.weight Probability weight for the element (must be between 0 and 1)
   * @param weightParams.value The element to assign weight to
   * @param num Optional. Number of elements to return. Default is 1.
   * @returns A single element or array of elements selected based on weighted probability
   */
  weightElements<T>(arr: T[], weightParams: { weight: number; value: T }[]): T;
  weightElements<T>(arr: T[], weightParams: { weight: number; value: T }[], num?: number): T[];
  weightElements<T>(arr: T[], weightParams: { weight: number; value: T }[], num: number = 1): T | T[] {
    // Validate weight parameters
    for (const param of weightParams) {
      if (param.weight < 0 || param.weight > 1) {
        throw new Error('Weight must be between 0 and 1');
      }

      // Ensure specified value exists in the array
      if (!arr.includes(param.value)) {
        throw new Error('Specified value is not in the array');
      }
    }

    const result: T[] = [];

    for (let i = 0; i < num; i++) {
      // Generate random number to determine which element to select
      const random = Math.random();

      // Calculate cumulative weights
      let cumulativeWeight = 0;
      for (const param of weightParams) {
        cumulativeWeight += param.weight;
        if (random < cumulativeWeight) {
          result.push(param.value);
          break;
        }
      }

      // If random number exceeds all weights, select from remaining elements
      if (result.length <= i) {
        const weightedValues = weightParams.map((param) => param.value);
        const otherElements = arr.filter((item) => !weightedValues.includes(item));

        // If no remaining elements, randomly select from weighted parameters
        if (otherElements.length === 0) {
          const randomIndex = Math.floor(Math.random() * weightParams.length);
          result.push(weightParams[randomIndex].value);
        } else {
          const randomIndex = Math.floor(Math.random() * otherElements.length);
          result.push(otherElements[randomIndex]);
        }
      }
    }

    return num === 1 ? result[0] : result;
  }
}
