import Internet from '@src/lorem/internet';
const internetInstance = new Internet();
let randomElementMock: jest.SpyInstance;
let randomElementsWithNumMock: jest.SpyInstance;
let subDirecttoryMock: jest.SpyInstance;

describe('internet', () => {
  beforeEach(() => {
    randomElementsWithNumMock = jest.spyOn(Internet.prototype as any, 'randomElementsWithNum');
    randomElementMock = jest.spyOn(Internet.prototype as any, 'randomElement');
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
    randomElementMock.mockReturnValueOnce('1234');
    const result = internetInstance.ipv6();
    expect(result.split(':').length).toBe(8);
    expect(randomElementsWithNumMock).toHaveBeenCalled();
  });
  test('url, protocol is http', () => {
    const url = internetInstance.url({ protocol: 'http' });
    expect(url).toMatch(/^http/);
    expect(randomElementMock).toHaveBeenCalled();
    expect(subDirecttoryMock).toHaveBeenCalled();
  });
  test('email', () => {
    const result = internetInstance.email();
    expect(result.includes('@')).toBeTruthy;
    expect(randomElementMock).toHaveBeenCalled();
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
    expect(randomElementMock).toHaveBeenCalled();
  });
});
