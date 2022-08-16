import * as utils from '@src/utils/utils';

describe('utils', () => {
  test('fillDecimal', () => {
    expect(utils.fillDecimal(1, 4)).toBe('1.0000');
  });
  test('dateFormat, use default params', () => {
    const result = utils.dateFormat(1660660487000);
    expect(result).toBe('2022-08-16 22:34:47');
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
});
