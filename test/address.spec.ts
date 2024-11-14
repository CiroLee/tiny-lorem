import Address from '@src/lorem/address';
import RandomNumber from '@src/lorem/number';
const addressInstance = new Address();
let provinceObjMock: jest.SpyInstance;
let cityObjMock: jest.SpyInstance;
let countyObjMock: jest.SpyInstance;
let degToDmsMock: jest.SpyInstance;

describe('Address', () => {
  beforeEach(() => {
    provinceObjMock = jest.spyOn(Address.prototype as any, 'provinceObj');
    cityObjMock = jest.spyOn(Address.prototype as any, 'cityObj');
    countyObjMock = jest.spyOn(Address.prototype as any, 'countyObj');
    degToDmsMock = jest.spyOn(Address.prototype as any, 'degToDms');
  });
  test('province', () => {
    expect(addressInstance.province()).toBeTruthy();
    expect(provinceObjMock).toHaveBeenCalled();
  });
  test('city', () => {
    expect(addressInstance.city()).toBeTruthy();
    expect(cityObjMock).toHaveBeenCalled();
  });
  test('city, parent is true', () => {
    const result = addressInstance.city(true);
    expect(result.includes(' ')).toBeTruthy();
  });

  test('city, parent is true, gap is false', () => {
    const result = addressInstance.city(true, false);
    expect(result.includes(' ')).toBeFalsy();
  });
  test('county', () => {
    expect(addressInstance.county().length).toBeGreaterThanOrEqual(0);
    expect(countyObjMock).toHaveBeenCalled();
  });
  test('county parent is true, return full address', () => {
    const county = addressInstance.county(true);
    expect(county.split(' ').length).toBe(3);
    expect(countyObjMock).toHaveBeenCalled();
    expect(provinceObjMock).toHaveBeenCalled();
    expect(cityObjMock).toHaveBeenCalled();
  });
  test('county parent is 1', () => {
    const county = addressInstance.county(1);
    expect(county.split(' ').length).toBe(2);
  });
  test('county parent is 2, return full address', () => {
    const county = addressInstance.county(2);
    expect(county.split(' ').length).toBe(3);
  });
  test('county gap is false', () => {
    const county = addressInstance.county(true, false);
    expect(county.includes(' ')).toBeFalsy();
  });
  test('zipCode', () => {
    const zip = addressInstance.zipCode();
    expect(typeof zip).toBe('string');
    expect(zip.length).toBe(6);
  });
  test('longAndLat, dms type', () => {
    const mockFloat = jest.spyOn(RandomNumber.prototype as any, 'float').mockReturnValue(23);
    const arr = addressInstance.longAndLat('dms');
    expect(arr).toEqual(['23°0′0.00″', '23°0′0.00″']);
    expect(degToDmsMock).toHaveBeenCalledWith(23);
    expect(mockFloat).toHaveBeenCalled();
  });
  test('longAndLat, dms type, degToDms return negative', () => {
    const mockFloat = jest.spyOn(RandomNumber.prototype as any, 'float').mockReturnValue(-23);
    const arr = addressInstance.longAndLat('dms');
    expect(arr).toEqual(['-23°0′0.00″', '-23°0′0.00″']);
    expect(degToDmsMock).toHaveBeenCalledWith(-23);
    expect(mockFloat).toHaveBeenCalled();
  });
  test('longAndLat, deg type', () => {
    const mockFloat = jest.spyOn(RandomNumber.prototype as any, 'float').mockReturnValue(23);
    const arr = addressInstance.longAndLat();
    expect(arr).toEqual(['23°', '23°']);
    expect(mockFloat).toHaveBeenCalled();
  });
  test('road test', () => {
    const result = addressInstance.road();
    expect(result.length).toBeGreaterThanOrEqual(0);
  });
  test('full address, default params', () => {
    const result = addressInstance.full();
    expect(result.length).toBeGreaterThanOrEqual(0);
    expect(result.includes(' ')).toBeTruthy();
  });
  test('full address, gap is false', () => {
    const result = addressInstance.full(false);
    expect(result.includes(' ')).toBeFalsy();
  });
  test('full address, tail is true', () => {
    const result = addressInstance.full(true, true);
    expect(result.endsWith('号')).toBeTruthy();
  });
  test('full address, custom tail string', () => {
    const result = addressInstance.full(true, '室');
    expect(result.endsWith('室')).toBeTruthy();
  });
});
