import Helper from '@src/lorem/helper';
const helper = new Helper();

describe('helper', () => {
  test('elements, throw error', () => {
    expect(() => {
      helper.elements({ a: 1 });
    }).toThrowError();
  });
  test('elements num = 1', () => {
    const array = [1, 2, 3];
    const result = helper.elements<number[], number>(array);
    expect(array.includes(result)).toBeTruthy();
  });
  test('helper, num > 1', () => {
    const array = [1, 2, 3];
    const result = helper.elements(array, 2) as number[];
    result.forEach((item) => {
      expect(array.includes(item)).toBeTruthy();
    });
  });
  test('elements, num > array length', () => {
    const array = [1, 2, 3];
    expect(() => {
      helper.elements(array, 4);
    }).toThrowError();
  });
  test('boolean', () => {
    const result = helper.boolean();
    expect(typeof result).toBe('boolean');
  });
});
