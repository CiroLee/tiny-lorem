import Texts from '@src/lorem/texts';
const textsInstance = new Texts();
let mockCalcRandomLength: jest.SpyInstance;
let mockCname: jest.SpyInstance;
let mockEname: jest.SpyInstance;

describe('Texts', () => {
  beforeEach(() => {
    mockCalcRandomLength = jest.spyOn(Texts.prototype as any, 'calcRandomLength');
    mockCname = jest.spyOn(Texts.prototype as any, 'cname');
    mockEname = jest.spyOn(Texts.prototype as any, 'ename');
  });
  test('letter, default language is cn', () => {
    const letter = textsInstance.letter();
    expect(letter).toMatch(/[\u4e00-\u9fa5]+/g);
  });
  test('letter, language is en', () => {
    const letter = textsInstance.letter('en');
    expect(letter).toMatch(/[a-z]/);
  });
  test('word, range is [2, 4]', () => {
    const result = textsInstance.word({ range: [2, 4] });
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.length).toBeLessThanOrEqual(4);
    expect(result).toMatch(/[\u4e00-\u9fa5]+/g);
    expect(mockCalcRandomLength).toHaveBeenCalled();
  });
  test('word, range is [-1, 2]', () => {
    expect(() => {
      textsInstance.word({ range: [-1, 2] });
    }).toThrowError();
  });
  test('sentence, language is en', () => {
    const result = textsInstance.sentence({ range: [2, 4], language: 'en' });
    const numOfWords = result.split(' ').length;
    expect(numOfWords).toBeGreaterThanOrEqual(2);
    expect(numOfWords).toBeLessThanOrEqual(4);
    expect(result).toMatch(/[a-z]/g);
    expect(mockCalcRandomLength).toHaveBeenCalled();
  });
  test('sentence, language is cn', () => {
    const result = textsInstance.sentence({ range: [2, 4], language: 'cn' });
    const numOfWords = result.split(/\uff0c/).length;

    expect(numOfWords).toBeGreaterThanOrEqual(2);
    expect(numOfWords).toBeLessThanOrEqual(4);
    expect(result).toMatch(/[\u4e00-\u9fa5]+/g);
    expect(mockCalcRandomLength).toHaveBeenCalled();
  });
  test('paragraph', () => {
    const result = textsInstance.paragraph({ range: [2, 4], language: 'en' });
    const numOfSentences = result.split('.').length - 1;

    expect(numOfSentences).toBeGreaterThanOrEqual(2);
    expect(numOfSentences).toBeLessThanOrEqual(4);
    expect(result).toMatch(/[a-z]/g);
    expect(mockCalcRandomLength).toHaveBeenCalled();
  });
  test('name, language is cn', () => {
    const result = textsInstance.name();
    expect(mockCname).toHaveBeenCalled();
    expect(result).toMatch(/[\u4e00-\u9fa5]+/g);
  });
  test('name, language is en', () => {
    const result = textsInstance.name('en');
    expect(mockEname).toHaveBeenCalled();
    expect(result).toMatch(/[a-z]/g);
  });
  test('name, language is en, upper is true', () => {
    const result = textsInstance.name('en', true);
    expect(mockEname).toHaveBeenCalled();
    const firstLetter = result.charAt(0);
    const rest = result.slice(1);

    expect(firstLetter).toBe(firstLetter.toUpperCase());
    expect(rest).toMatch(/[a-z]/g);
  });
  test('string', () => {
    const result = textsInstance.string();
    expect(mockCalcRandomLength).toHaveBeenCalled();
    expect(typeof result).toBe('string');
  });
});
