import Helper from '@src/lorem/helper';
const helper = new Helper();

describe('helper', () => {
  test('elements, throw error', () => {
    expect(() => {
      helper.elements({ a: 1 } as unknown as Array<any>);
    }).toThrow();
  });
  test('elements num = 1', () => {
    const array = [1, 2, 3];
    const result = helper.elements<number>(array);
    expect(array.includes(result)).toBeTruthy();
  });
  test('helper, num > 1', () => {
    const array = [1, 2, 3];
    const result = helper.elements<number[]>(array, 2);
    result.forEach((item) => {
      expect(array.includes(item)).toBeTruthy();
    });
  });
  test('elements, num > array length', () => {
    const array = [1, 2, 3];
    const result = [...new Set(helper.elements(array, 6))];
    expect(result.length).toBeLessThanOrEqual(array.length);
  });
  test('boolean', () => {
    const result = helper.boolean();
    expect(typeof result).toBe('boolean');
  });
  test('falsy', () => {
    const result = helper.falsy();
    expect(result).toBeFalsy();
  });
});
