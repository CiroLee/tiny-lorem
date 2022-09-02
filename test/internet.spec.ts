import Internet from '@src/lorem/internet';
const internetInstance = new Internet();
let subDirecttoryMock: jest.SpyInstance;

describe('internet', () => {
  beforeEach(() => {
    subDirecttoryMock = jest.spyOn(Internet.prototype as any, 'subDirecttory');
  });
  test('uuid', () => {
    const result = internetInstance.uuid();
    expect(result.length).toBe(36);
  });
  test('ipv4', () => {
    const result = internetInstance.ipv4();
    expect(result.split('.').length).toBe(4);
  });
  test('ipv6', () => {
    const result = internetInstance.ipv6();
    expect(result.split(':').length).toBe(8);
  });
  test('url, level is float, throw error', () => {
    expect(() => {
      internetInstance.url({ subLevel: 1.2 });
    }).toThrowError();
  });
  test('url, level is less than 0, throw error', () => {
    expect(() => {
      internetInstance.url({ subLevel: -1 });
    }).toThrowError();
  });
  test('url, level is 0, throw error', () => {
    expect(() => {
      internetInstance.url({ subLevel: 0 });
    }).toThrowError();
  });
  test('url, protocol is http', () => {
    const url = internetInstance.url({ protocol: 'http' });
    expect(url).toMatch(/^http/);
    expect(subDirecttoryMock).toHaveBeenCalled();
  });
  test('subDirecttory, sub is true, subDirect length belong to [1, 4]', () => {
    const url = internetInstance.url({ sub: true });
    expect(url.replace(/\/\//g, '').split('/').length).toBeGreaterThanOrEqual(2);
    expect(url.replace(/\/\//g, '').split('/').length).toBeLessThanOrEqual(5);
  });
  test('subDirecttory, sub is 2', () => {
    const url = internetInstance.url({ sub: 2 });
    expect(url.replace(/\/\//g, '').split('/').length).toBe(3);
  });
  test('subDirecttory, sub greeter than 10', () => {
    const url = internetInstance.url({ sub: 12 });
    expect(url.replace(/\/\//g, '').split('/').length).toBe(11);
  });
  test('email', () => {
    const result = internetInstance.email();
    expect(result.includes('@')).toBeTruthy;
  });
  test('mobile, hidden is true', () => {
    const result = internetInstance.mobile(true);
    let num = 0;
    for (let i = 0; i < result.length; i++) {
      if (result[i] === '*') {
        num++;
      }
    }

    expect(num).toBe(4);
  });
  test('landline', () => {
    const result = internetInstance.landline();
    expect(result.includes('-')).toBeTruthy();
  });
});
