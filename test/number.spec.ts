import RandomNumber from '@src/lorem/number';
import { isInt } from '@src/utils/validator';
import type { IRange, INumberOptions } from '@src/types/lorem.types';

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
          } as INumberOptions);
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
          } as INumberOptions);
        }).toThrowError();
      });
    });
    test('float, options satisfies, it will pass', () => {
      const options: INumberOptions = {
        range: [10, 20],
        fixed: 6,
      };
      const result = numberInstance.float(options);
      expect(result).toBeGreaterThan(10);
      expect(result).toBeLessThan(20);
      expect(isInt(result as number)).toBeFalsy;
    });
    test('float, no options, will use defaults, it will pass', () => {
      const result = numberInstance.float();
      expect(isInt(result as number)).toBeFalsy;
    });
  });
});
