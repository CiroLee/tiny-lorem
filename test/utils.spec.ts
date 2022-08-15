import * as utils from '@src/utils/utils';
import { isInt } from '@src/utils/validator';
import type { IRange, IFloatNumOptions } from '@src/types/lorem';

describe('utils', () => {
  test('randomInteger, range is [3, 1], and it will throw error', () => {
    const range: IRange = [3, 1];
    // 验证抛出错误
    expect(() => {
      utils.randomInteger(range);
    }).toThrowError();
  });

  test('randomInteger, range is [-Infinify, 10], and it will throw error', () => {
    const range: IRange = [-Infinity, 10];
    expect(() => {
      utils.randomInteger(range);
    }).toThrowError();
  });
  test('randomInteger, range is [-10, 10], it will pass', () => {
    const range: IRange = [-10, 10];
    const result = utils.randomInteger(range);
    expect(result).toBeGreaterThanOrEqual(-10);
    expect(result).toBeLessThanOrEqual(10);
  });

  test('fillDecimal', () => {
    expect(utils.fillDecimal(1, 4)).toBe('1.0000');
  });
  describe('randomFloat', () => {
    test('randomFloat, options.range not satisfies', () => {
      const options = {
        fixed: 1,
      };
      [
        [10, 1],
        [1, Infinity],
      ].forEach((item) => {
        expect(() => {
          jest.mock('isRangeTuple', () => false);
          utils.randomFloat({
            ...options,
            range: item,
          } as IFloatNumOptions);
        }).toThrowError();
      });
    });
    test('randomFloat, options.fixed not satisfies', () => {
      const options = {
        range: [1, 10],
      };
      [30, -1, 1.2].forEach((item) => {
        expect(() => {
          jest.mock('isInt', () => false);
          utils.randomFloat({
            ...options,
            fixed: item,
          } as IFloatNumOptions);
        }).toThrowError();
      });
    });
    test('randomFloat, options satisfies, it will pass', () => {
      const options: IFloatNumOptions = {
        range: [10, 20],
        fixed: 6,
      };
      const result = utils.randomFloat(options);
      expect(result).toBeGreaterThan(10);
      expect(result).toBeLessThan(20);
      expect(isInt(result)).toBeFalsy;
    });
    test('randomFloat, no options, will use defaults, it will pass', () => {
      const result = utils.randomFloat();
      expect(isInt(result)).toBeFalsy;
    });
  });
});
