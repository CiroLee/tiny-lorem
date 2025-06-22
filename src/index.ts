/* eslint-disable no-unused-vars */
import Texts from './lorem/texts';
import RandomNumber from './lorem/number';
import RandomDate from './lorem/date';
import Address from './lorem/address';
import Internet from './lorem/internet';
import Color from './lorem/color';
import RandomImage from './lorem/image';
import Helper from './lorem/helper';
import Unique from './lorem/unique';
import Finance from './lorem/finance';
import Develop from './lorem/develop';
import { isInt, isValidNumber } from './utils/validator';

type IMultiCallback<T> = (lo: TinyLorem, index: number) => T;
type IJsonCallback<T> = (lo: TinyLorem) => T;
class TinyLorem {
  readonly texts = new Texts();
  readonly number = new RandomNumber();
  readonly date = new RandomDate();
  readonly address = new Address();
  readonly internet = new Internet();
  readonly color = new Color();
  readonly image = new RandomImage();
  readonly helper = new Helper();
  readonly unique = new Unique();
  readonly finance = new Finance();
  readonly develop = new Develop();
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

    return new Array(num).fill(undefined).map((_, index) => {
      if (typeof schema !== 'function') {
        throw Error('schema must be a function');
      }
      return schema(this, index);
    });
  }

  /**
   * @desc return a JSON structure. usually, it is used to generate
   * complex structured data
   * @param callback callback function
   */
  json<T>(callback: IJsonCallback<T>) {
    return callback(this);
  }
}
export * from './types/lorem.types';
export default TinyLorem;
