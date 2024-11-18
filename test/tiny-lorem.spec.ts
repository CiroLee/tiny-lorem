import TinyLorem from '../src';
const lorem = new TinyLorem();
interface IArrayDemo {
  name: string;
  age: number;
}
describe('tiny-lorem', () => {
  test('array, data is a callback function', () => {
    const result = lorem.array<IArrayDemo>(2, (lo: TinyLorem) => {
      return {
        name: lo.texts.name(),
        age: lo.number.int([10, 60]),
      };
    });
    expect(result.length).toBe(2);
  });
  test('array,  num is not a number', () => {
    expect(() => {
      lorem.array('10' as unknown as number, () => {});
    }).toThrowError();
  });
  test('array, schema is not a function', () => {
    expect(() => {
      lorem.array(10, {} as any);
    }).toThrowError();
  });
  test('array, use index params of callback', () => {
    const result = lorem.array<IArrayDemo>(2, (lo: TinyLorem, index: number) => {
      return {
        name: lo.texts.name(),
        age: index,
      };
    });

    expect(result.length).toBe(2);
    result.forEach((item, i) => {
      expect(item.age).toBe(i);
    });
  });
  test('json, complex data structure, could use mock function', () => {
    const result = lorem.json((lo) => {
      return {
        name: 'Jhon',
        age: lo.number.int([10, 100]),
        list: lo.array(lo.number.int([1, 10]), () => {
          return {
            name: lo.texts.name('cn'),
            age: lo.number.int([1, 10]),
          };
        }),
      };
    });

    expect(result.name).toBe('Jhon');
    expect(result.list.length).toBeGreaterThanOrEqual(1);
    expect(result.list.length).toBeLessThanOrEqual(10);
  });
});
