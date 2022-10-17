import Internet from '@src/lorem/internet';
const internet = new Internet();
let subDirecttoryMock: jest.SpyInstance;

describe('internet', () => {
  beforeEach(() => {
    subDirecttoryMock = jest.spyOn(Internet.prototype as any, 'subDirecttory');
  });
  test('uuid', () => {
    const result = internet.uuid();
    expect(result.length).toBe(36);
  });
  test('ipv4', () => {
    const result = internet.ipv4();
    expect(result.split('.').length).toBe(4);
  });
  test('ipv6', () => {
    const result = internet.ipv6();
    expect(result.split(':').length).toBe(8);
  });
  test('domain', () => {
    const result = internet.domain();
    expect(result.split('.').length).toBe(2);
  });
  test('domain, level is float, throw error', () => {
    expect(() => {
      internet.domain(1.2);
    }).toThrowError();
  });
  test('domain, level is less than 0, throw error', () => {
    expect(() => {
      internet.domain(-1);
    }).toThrowError();
  });
  test('domain, level is 0, throw error', () => {
    expect(() => {
      internet.domain(0);
    }).toThrowError();
  });
  test('url, level is float, throw error', () => {
    expect(() => {
      internet.url({ subLevel: 1.2 });
    }).toThrowError();
  });
  test('url, level is less than 0, throw error', () => {
    expect(() => {
      internet.url({ subLevel: -1 });
    }).toThrowError();
  });
  test('url, level is 0, throw error', () => {
    expect(() => {
      internet.url({ subLevel: 0 });
    }).toThrowError();
  });
  test('url, protocol is http', () => {
    const url = internet.url({ protocol: 'http' });
    expect(url).toMatch(/^http/);
    expect(subDirecttoryMock).toHaveBeenCalled();
  });
  test('subDirecttory, sub is true, subDirect length belong to [1, 4]', () => {
    const url = internet.url({ sub: true });
    expect(url.replace(/\/\//g, '').split('/').length).toBeGreaterThanOrEqual(2);
    expect(url.replace(/\/\//g, '').split('/').length).toBeLessThanOrEqual(5);
  });
  test('subDirecttory, sub is 2', () => {
    const url = internet.url({ sub: 2 });
    expect(url.replace(/\/\//g, '').split('/').length).toBe(3);
  });
  test('subDirecttory, sub greeter than 10', () => {
    const url = internet.url({ sub: 12 });
    expect(url.replace(/\/\//g, '').split('/').length).toBe(11);
  });
  test('email', () => {
    const result = internet.email();
    expect(result.includes('@')).toBeTruthy;
  });
  test('mobile, hidden is true', () => {
    const result = internet.mobile(true);
    let num = 0;
    for (let i = 0; i < result.length; i++) {
      if (result[i] === '*') {
        num++;
      }
    }

    expect(num).toBe(4);
  });
  test('landline', () => {
    const result = internet.landline();
    expect(result.includes('-')).toBeTruthy();
  });
  test('tld', () => {
    expect(typeof internet.tld()).toBe('string');
  });
  test('httpStatusCode', () => {
    const code = internet.httpStatusCode();
    expect(code).toBeTruthy();
  });
  test('httpStatusCode, width right type', () => {
    const code = internet.httpStatusCode('clientError');
    expect(code).toBeGreaterThanOrEqual(400);
  });
  test('httpMethod', () => {
    const method = internet.httpMethod();
    expect(method.toUpperCase()).toBe(method);
  });
});
