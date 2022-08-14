import * as validator from '@src/utils/validator';
import { IRange } from '@src/types/lorem';
describe('valdiator test', () => {
  test('isValidNumber', () => {
    const num1 = 1;
    const num2 = '1';
    const num3 = NaN;
    const num4 = Infinity;

    expect(validator.isValidNumber(num1)).toBeTruthy;
    expect(validator.isValidNumber(num2)).toBeFalsy;
    expect(validator.isValidNumber(num3)).toBeFalsy;
    expect(validator.isValidNumber(num4)).toBeFalsy;
  });

  test('isRangeTuple', () => {
    const arr1: IRange = [1, 2];
    const arr2: IRange = [1, 0];
    const arr3: IRange = [-2, 1];
    const arr4 = {};
    const arr5: IRange = [1, Infinity];

    expect(validator.isRangeTuple(arr1)).toBeTruthy;
    expect(validator.isRangeTuple(arr2)).toBeFalsy;
    expect(validator.isRangeTuple(arr3)).toBeFalsy;
    expect(validator.isRangeTuple(arr4 as IRange)).toBeFalsy;
    expect(validator.isRangeTuple(arr5)).toBeFalsy;
  });
});
