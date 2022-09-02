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
  test('county', () => {
    expect(addressInstance.county()).toBeTruthy();
    expect(countyObjMock).toHaveBeenCalled();
  });
  test('county parent is 1, return full address', () => {
    const county = addressInstance.county(true);
    expect(county.split(' ').length).toBe(3);
    expect(countyObjMock).toHaveBeenCalled();
    expect(provinceObjMock).toHaveBeenCalled();
    expect(cityObjMock).toHaveBeenCalled();
  });
  test('county parent is 1, return full address', () => {
    const county = addressInstance.county(1);
    expect(county.split(' ').length).toBe(2);
    expect(countyObjMock).toHaveBeenCalled();
    expect(provinceObjMock).toHaveBeenCalled();
    expect(cityObjMock).toHaveBeenCalled();
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
  test('longAndLat, deg type', () => {
    const mockFloat = jest.spyOn(RandomNumber.prototype as any, 'float').mockReturnValue(23);
    const arr = addressInstance.longAndLat();
    expect(arr).toEqual(['23°', '23°']);
    expect(mockFloat).toHaveBeenCalled();
  });
});
