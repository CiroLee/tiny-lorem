import RandomNumber from '@src/lorem/number';
import { isInt } from '@src/utils/validator';
import { MAX_NUMBER } from '@src/lorem/number/constant';
import type { INumberOptions, IRange } from '@src/types/lorem.types';

const numberInstance = new RandomNumber();
describe('Number', () => {
  describe('int', () => {
    test('int, range is not satisfies', () => {
      const ranges = [
        [10, 1],
        [1, Infinity],
      ];
      ranges.forEach((item) => {
        expect(() => {
          jest.mock('isRangeTuple', () => false);
          numberInstance.int(item as IRange);
        }).toThrowError();
      });
    });
    test('int, no params', () => {
      const result = numberInstance.int();
      expect(result).toBeGreaterThanOrEqual(-MAX_NUMBER);
      expect(result).toBeLessThanOrEqual(MAX_NUMBER);
    });
    test('int, range is valid', () => {
      const result = numberInstance.int([1, 10]);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });
  });
  describe('float', () => {
    test('float, options.range is not satisfies', () => {
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
