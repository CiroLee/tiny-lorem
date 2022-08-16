import RandomNumber from '@src/lorem/number';
import { MAX_NUMBER } from '@src/lorem/number/constant';
import { isInt } from '@src/utils/validator';
import type { IRange, IFloatNumOptions, INumberOptions } from '@src/types/lorem.types';

const numberInstance = new RandomNumber();
describe('numberInstance', () => {
  test('int, range is [3, 1], and it will throw error', () => {
    const range: IRange = [3, 1];
    // 验证抛出错误
    expect(() => {
      numberInstance.int(range);
    }).toThrowError();
  });

  test('int, range is [-Infinify, 10], and it will throw error', () => {
    const range: IRange = [-Infinity, 10];
    expect(() => {
      numberInstance.int(range);
    }).toThrowError();
  });
  test('int, range is [-10, 10], it will pass', () => {
    const range: IRange = [-10, 10];
    const result = numberInstance.int(range);
    expect(result).toBeGreaterThanOrEqual(-10);
    expect(result).toBeLessThanOrEqual(10);
  });
  describe('float', () => {
    test('float, options.range not satisfies', () => {
      const options = {
        fixed: 1,
      };
      [
        [10, 1],
        [1, Infinity],
      ].forEach((item) => {
        expect(() => {
          jest.mock('isRangeTuple', () => false);
          numberInstance.float({
            ...options,
            range: item,
          } as IFloatNumOptions);
        }).toThrowError();
      });
    });
    test('float, options.fixed not satisfies', () => {
      const options = {
        range: [1, 10],
      };
      [30, -1, 1.2].forEach((item) => {
        expect(() => {
          jest.mock('isInt', () => false);
          numberInstance.float({
            ...options,
            fixed: item,
          } as IFloatNumOptions);
        }).toThrowError();
      });
    });
    test('float, options satisfies, it will pass', () => {
      const options: IFloatNumOptions = {
        range: [10, 20],
        fixed: 6,
      };
      const result = numberInstance.float(options);
      expect(result).toBeGreaterThan(10);
      expect(result).toBeLessThan(20);
      expect(isInt(result)).toBeFalsy;
    });
    test('float, no options, will use defaults, it will pass', () => {
      const result = numberInstance.float();
      expect(isInt(result)).toBeFalsy;
    });
  });
  describe('number', () => {
    test('no params, use default, and it will pass', () => {
      const result = numberInstance.number();

      expect(result).toBeGreaterThanOrEqual(-MAX_NUMBER);
      expect(result).toBeLessThanOrEqual(MAX_NUMBER);
    });
    test('fixed is 2, will round to two decimal places', () => {
      const options: INumberOptions = {
        range: [1, 10],
        fixed: 2,
      };
      const result = numberInstance.number(options) as number;
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
      expect(isInt(result)).toBeFalsy;
    });
    test('format is string, will return a string-like number', () => {
      const result = numberInstance.number({ format: 'string' });
      expect(typeof result).toBe('string');
    });
  });
});
