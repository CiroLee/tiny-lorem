import Unique from '@src/lorem/unique';
const unique = new Unique();
describe('unique', () => {
  test('vrm, width trail tag', () => {
    const result = unique.vrm();
    expect(result.length).toBe(7);
  });
  test('vin', () => {
    const result = unique.vin();
    expect(result.length).toBe(17);
  });
});
