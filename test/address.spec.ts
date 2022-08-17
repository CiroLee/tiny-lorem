import Address from '@src/lorem/address';
const addressInstance = new Address();
let provinceObjMock: jest.SpyInstance;
let cityObjMock: jest.SpyInstance;
let districtObjMock: jest.SpyInstance;
describe('Address', () => {
  beforeEach(() => {
    provinceObjMock = jest.spyOn(Address.prototype as any, 'provinceObj');
    cityObjMock = jest.spyOn(Address.prototype as any, 'cityObj');
    districtObjMock = jest.spyOn(Address.prototype as any, 'districtObj');
  });
  test('province', () => {
    expect(addressInstance.province()).toBeTruthy();
    expect(provinceObjMock).toHaveBeenCalled();
  });
  test('city', () => {
    expect(addressInstance.city()).toBeTruthy();
    expect(cityObjMock).toHaveBeenCalled();
  });
  test('district', () => {
    expect(addressInstance.district()).toBeTruthy();
    expect(districtObjMock).toHaveBeenCalled();
  });
  test('district parent is 1, return full address', () => {
    const district = addressInstance.district(true);
    expect(district.split(' ').length).toBe(3);
    expect(districtObjMock).toHaveBeenCalled();
    expect(provinceObjMock).toHaveBeenCalled();
    expect(cityObjMock).toHaveBeenCalled();
  });
  test('district parent is 1, return full address', () => {
    const district = addressInstance.district(1);
    expect(district.split(' ').length).toBe(2);
    expect(districtObjMock).toHaveBeenCalled();
    expect(provinceObjMock).toHaveBeenCalled();
    expect(cityObjMock).toHaveBeenCalled();
  });
});
