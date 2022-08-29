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
  test('array, throw error', () => {
    expect(() => {
      lorem.array('10' as unknown as number, () => {});
    }).toThrowError();
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
