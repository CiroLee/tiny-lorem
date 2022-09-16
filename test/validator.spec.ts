import * as validator from '@src/utils/validator';
import { IRange, IBigRange } from '@src/types/lorem.types';
describe('valdiator test', () => {
  test('isValidNumber', () => {
    const num1 = 1;
    const num2 = '1';
    const num3 = NaN;
    const num4 = Infinity;

    expect(validator.isValidNumber(num1)).toBeTruthy();
    expect(validator.isValidNumber(num2)).toBeFalsy;
    expect(validator.isValidNumber(num3)).toBeFalsy;
    expect(validator.isValidNumber(num4)).toBeFalsy;
  });

  test('isPositiveRangeTuple', () => {
    const arr1: IRange = [1, 2];
    const arr2: IRange = [1, 0];
    const arr3: IRange = [-2, 1];
    const arr4 = {};
    const arr5: IRange = [1, Infinity];

    expect(validator.isPositiveRangeTuple(arr1)).toBeTruthy();
    expect(validator.isPositiveRangeTuple(arr2)).toBeFalsy();
    expect(validator.isPositiveRangeTuple(arr3)).toBeFalsy();
    expect(validator.isPositiveRangeTuple(arr4 as IRange)).toBeFalsy();
    expect(validator.isPositiveRangeTuple(arr5)).toBeFalsy();
  });

  test('isRangeTuple', () => {
    const arr1: IRange = [1, 2];
    const arr2: IRange = [-2, -1];
    const arr3: IRange = [1, 0];
    const arr4 = {};
    const arr5: IRange = [1, Infinity];

    expect(validator.isRangeTuple(arr1)).toBeTruthy();
    expect(validator.isRangeTuple(arr2)).toBeTruthy();
    expect(validator.isRangeTuple(arr3)).toBeFalsy;
    expect(validator.isRangeTuple(arr4 as IRange)).toBeFalsy;
    expect(validator.isRangeTuple(arr5)).toBeFalsy;
  });

  test('isInt', () => {
    const num1 = 1;
    const num2 = -1;
    const num3 = Infinity;
    const num4 = '1';
    const num5 = 1.2;

    expect(validator.isInt(num1)).toBeTruthy();
    expect(validator.isInt(num2)).toBeTruthy();
    expect(validator.isInt(num3)).toBeFalsy;
    expect(validator.isInt(num4 as unknown as number)).toBeFalsy;
    expect(validator.isInt(num5)).toBeFalsy;
  });
  test('isBigIntRangeTuple', () => {
    const arr1: IBigRange = [BigInt(1), BigInt(10)];
    const arr2 = [1, 10];
    const arr3: IBigRange = [BigInt(10), BigInt(1)];
    const arr4 = [BigInt(1), Infinity];
    const arr5 = {};

    expect(validator.isBigIntRangeTuple(arr1)).toBeTruthy();
    expect(validator.isBigIntRangeTuple(arr2 as unknown as IBigRange)).toBeFalsy();
    expect(validator.isBigIntRangeTuple(arr3)).toBeFalsy();
    expect(validator.isBigIntRangeTuple(arr4 as IBigRange)).toBeFalsy();
    expect(validator.isBigIntRangeTuple(arr5 as IBigRange)).toBeFalsy();
  });
});
