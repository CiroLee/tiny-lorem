import Develop from '@src/lorem/develop';
const develop = new Develop();
// let shatMock: jest.SpyInstance;
describe('develop', () => {
  test('gitCommitSha', () => {
    const result = develop.gitCommitSha();
    expect(result.length).toBe(40);
  });
  test('gitCommitShortSha', () => {
    const result = develop.gitCommitShortSha();
    expect(result.length).toBe(7);
  });
  test('gitBranch', () => {
    const result = develop.gitBranch();
    expect(result.includes('/')).toBeTruthy();
  });
  test('version', () => {
    const result = develop.version();
    expect(result).toMatch(/^[0-9]+\.[0-9]+\.[0-9]+$/);
  });
  test('password: at specific length, default strength', () => {
    const result = develop.password(8); // default strength is medium
    expect(result).toHaveLength(8);
  });
  test('password: at specified strength', () => {
    const result = develop.password(10, 'high');
    expect(result).toHaveLength(10);
    expect(result).toMatch(/^[a-zA-Z0-9!@#$%^&*()_+~`|}{[\]:;?><,./=-]+$/);
  });
  test('password: invalid strength', () => {
    expect(() => develop.password(10, 'invalid' as any)).toThrowError();
  });
  test('md5', () => {
    const md5 = develop.md5();
    expect(md5).toHaveLength(32);
    expect(md5).toMatch(/^[0-9a-f]+$/);
  });
});
