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
    const result = utils.dateFormat(new Date(1660660487000), 'yyy-dd');
    expect(result).toBe('yyy-16');
  });
  test('randomInteger, range is [3, 1], and it will throw error', () => {
    const range: IRange = [3, 1];
    // 验证抛出错误
    expect(() => {
      utils.randomInteger(range);
    }).toThrow();
  });
  test('randomInteger, range is [-Infinify, 10], and it will throw error', () => {
    const range: IRange = [-Infinity, 10];
    expect(() => {
      utils.randomInteger(range);
    }).toThrow();
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

describe('buildQueryString', () => {
  it('should return empty string for empty object', () => {
    expect(utils.buildQueryString({})).toBe('');
  });

  it('should handle string values', () => {
    expect(utils.buildQueryString({ a: '1' })).toBe('?a=1');
    expect(utils.buildQueryString({ name: 'John Doe' })).toBe('?name=John%20Doe');
    expect(utils.buildQueryString({ query: 'test&value' })).toBe('?query=test%26value');
  });

  it('should handle boolean values', () => {
    expect(utils.buildQueryString({ active: true })).toBe('?active');
    expect(utils.buildQueryString({ active: false })).toBe('');
    expect(utils.buildQueryString({ a: true, b: false, c: true })).toBe('?a&c');
  });

  it('should handle number values', () => {
    expect(utils.buildQueryString({ page: 1 })).toBe('?page=1');
    expect(utils.buildQueryString({ id: 123 })).toBe('?id=123');
  });

  it('should ignore undefined and null values', () => {
    expect(utils.buildQueryString({ a: '1', b: undefined })).toBe('?a=1');
    expect(utils.buildQueryString({ a: null, b: '2' })).toBe('?b=2');
    expect(utils.buildQueryString({ a: undefined, b: null })).toBe('');
  });

  it('should handle mixed value types', () => {
    expect(
      utils.buildQueryString({
        a: '1',
        b: true,
        c: false,
        d: 'hello',
        e: 123,
        f: undefined,
        g: null,
        h: true,
      }),
    ).toBe('?a=1&b&d=hello&e=123&h');
  });

  it('should handle special characters', () => {
    expect(utils.buildQueryString({ q: 'test=value' })).toBe('?q=test%3Dvalue');
    expect(utils.buildQueryString({ param: 'a/b' })).toBe('?param=a%2Fb');
    expect(utils.buildQueryString({ space: 'a b' })).toBe('?space=a%20b');
  });

  it('should handle multiple parameters', () => {
    expect(utils.buildQueryString({ a: '1', b: '2', c: '3' })).toBe('?a=1&b=2&c=3');
    expect(utils.buildQueryString({ a: true, b: '2', c: false })).toBe('?a&b=2');
  });

  it('should handle empty string values', () => {
    expect(utils.buildQueryString({ a: '' })).toBe('?a=');
  });

  it('should handle object values by converting to string', () => {
    expect(utils.buildQueryString({ obj: { a: 1 } })).toBe('?obj=%5Bobject%20Object%5D');
  });
});
