import Address from '@src/lorem/address';
const addressInstance = new Address();
let provinceObjMock: jest.SpyInstance;
let cityObjMock: jest.SpyInstance;
let countyObjMock: jest.SpyInstance;
describe('Address', () => {
  beforeEach(() => {
    provinceObjMock = jest.spyOn(Address.prototype as any, 'provinceObj');
    cityObjMock = jest.spyOn(Address.prototype as any, 'cityObj');
    countyObjMock = jest.spyOn(Address.prototype as any, 'countyObj');
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
});
