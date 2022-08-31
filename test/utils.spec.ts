import * as utils from '@src/utils/utils';
import { IRange } from '@src/types/lorem.types';
describe('utils', () => {
  test('fillDecimal', () => {
    expect(utils.fillDecimal(1, 4)).toBe('1.0000');
  });
  test('dateFormat, use default params, format is yyyy/mm/dd', () => {
    const result = utils.dateFormat(1660660487000, 'yyyy/mm/dd');
    expect(result).toBe('2022/08/16');
  });
  test('dateFormat, use default params, invalid format', () => {
    expect(() => {
      utils.dateFormat(new Date(1660660487000), 'yyy-dd');
    }).toThrowError();
  });
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
  test('randomElement', () => {
    const array = [1, 2, 3];
    const result = utils.randomElement(array);
    expect(array).toEqual(expect.arrayContaining([result]));
  });
});
