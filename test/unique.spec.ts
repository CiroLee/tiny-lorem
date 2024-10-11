import Unique from '@src/lorem/unique';
import Helper from '@src/lorem/helper';
const unique = new Unique();
describe('unique', () => {
  test('vrm, width trail tag', () => {
    const booleanMock = jest.spyOn(Helper.prototype, 'boolean').mockReturnValueOnce(true);
    const result = unique.vrm();
    expect(booleanMock).toHaveBeenCalled();
    expect('挂学警港澳'.includes(result.at(-1) as string)).toBeTruthy();
  });
  test('vrm, widthout trail tag', () => {
    const booleanMock = jest.spyOn(Helper.prototype, 'boolean').mockReturnValueOnce(false);
    const result = unique.vrm();
    expect(booleanMock).toHaveBeenCalled();
    expect('挂学警港澳'.includes(result.at(-1) as string)).toBeFalsy();
  });
  test('vin', () => {
    const result = unique.vin();
    expect(result.length).toBe(17);
  });
  test('id, with x trail', () => {
    const booleanMock = jest.spyOn(Helper.prototype, 'boolean').mockReturnValueOnce(false);
    const result = unique.id();
    expect(booleanMock).toHaveBeenCalled();
    expect(result.includes('x')).toBeTruthy();
  });
  test('id, without x trail', () => {
    const booleanMock = jest.spyOn(Helper.prototype, 'boolean').mockReturnValueOnce(true);
    const result = unique.id();
    expect(booleanMock).toHaveBeenCalled();
    expect(result.includes('x')).toBeFalsy();
  });
  test('uuid', () => {
    const result = unique.uuid();
    expect(result.length).toBe(36);
  });
  test('nanoid valid size, default is 21', () => {
    const result = unique.nanoid();
    expect(result.length).toBe(21);
  });
  test('nanoid valid size, 10', () => {
    const result = unique.nanoid(10);
    expect(result.length).toBe(10);
  });
  test('nanoid invalid size', () => {
    expect(() => {
      unique.nanoid(-10);
    }).toThrow();
  });
});
