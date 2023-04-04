import RandomNumber from '@src/lorem/number';
import { isInt } from '@src/utils/validator';
import { MAX_NUMBER } from '@src/lorem/number/constant';
import type { INumberOptions, IRange } from '@src/types/lorem.types';
import { IBigRange } from 'lib';

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
  describe('intBy', () => {
    test('intBy: digit <= 0', () => {
      expect(() => {
        numberInstance.intBy(0);
      }).toThrowError();
    });
    test('intBy: digit = 1', () => {
      const result = numberInstance.intBy(1);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(9);
    });
    test('intBy: digit > 2', () => {
      const result = numberInstance.intBy(2);
      expect(result).toBeGreaterThanOrEqual(10);
      expect(result).toBeLessThanOrEqual(99);
    });
    test('intBy: positive param', () => {
      const r1 = numberInstance.intBy(2);
      const r2 = numberInstance.intBy(2, false);
      expect(r1).toBeGreaterThan(0);
      expect(r2).toBeLessThan(0);
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
  describe('bigint', () => {
    test('bigint: range is not satisfies', () => {
      const ranges = [
        [1, 10],
        [BigInt(100), BigInt(10)],
        [BigInt(1), Infinity],
      ];
      ranges.forEach((item) => {
        expect(() => {
          numberInstance.bigInt(item as IBigRange);
        }).toThrowError();
      });
    });
    test('bigInt, no params', () => {
      const result = numberInstance.bigInt();
      expect(result).toBeGreaterThanOrEqual(BigInt(-MAX_NUMBER));
      expect(result).toBeLessThanOrEqual(BigInt(MAX_NUMBER));
    });
    test('bigInt, range is valid', () => {
      const result = numberInstance.bigInt([BigInt(1), BigInt(10)]);
      expect(result).toBeGreaterThanOrEqual(BigInt(BigInt(1)));
      expect(result).toBeLessThanOrEqual(BigInt(10));
    });
  });
});
