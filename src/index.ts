/* eslint-disable no-unused-vars */
import Texts from './lorem/texts';
import RandomNumber from './lorem/number';
import RandomDate from './lorem/date';
import Address from './lorem/address';
import Internet from './lorem/internet';
import Color from './lorem/color';
import RandomImage from './lorem/image';
import Helper from './lorem/helper';
import { isInt, isValidNumber } from './utils/validator';
type IMultiCallback<T> = (lo: TinyLorem) => T;
class TinyLorem {
  readonly texts = new Texts();
  readonly number = new RandomNumber();
  readonly date = new RandomDate();
  readonly address = new Address();
  readonly internet = new Internet();
  readonly color = new Color();
  readonly image = new RandomImage();
  readonly helper = new Helper();
  /**
   * @desc return an array-type lorem data;
   * @param num nums of lorem data
   * @param schema schema of lorem data, or a function that return a schema
   * @returns
   */
  array<T>(num: number, schema: IMultiCallback<T>): T[] {
    if (!isValidNumber(num) || num < 0 || !isInt(num as number)) {
      throw new Error(`array: num must be positive integer`);
    }

    return new Array(num).fill(undefined).map(() => {
      if (typeof schema === 'function') {
        return (schema as Function)(this);
      }
      return undefined;
    });
  }

  /**
   * @desc return a JSON structure. usually, it is used to generate
   * complex structured data
   * @param cb callback function
   */
  json<T>(callback: IMultiCallback<T>) {
    return callback(this);
  }
}
export * from './types/lorem.types';
export default TinyLorem;

const lorem = new TinyLorem();
console.log(
  lorem.json((lo) => {
    return {
      name: lo.texts.name(),
      age: lo.number.int([10, 50]),
      ability: lorem.helper.elements(['vue', 'react', 'html'], 2),
      toies: lo.array(2, () => {
        return {
          name: lo.texts.name(),
          price: `$${lo.number.float({ range: [100, 1000], fixed: 2 })}`,
        };
      }),
    };
  }),
);
