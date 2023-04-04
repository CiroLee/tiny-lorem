import RandomDate from '@src/lorem/date';
import { DATETIME_MIN, DATETIME_MAX, WEEK_MAP, MONTH_MAP } from '@src/lorem/date/constant';
const dateInstance = new RandomDate();

describe('RandomDate', () => {
  test('date, no param, use default', () => {
    const result = new Date(dateInstance.dateTime()).getTime();
    expect(result).toBeGreaterThanOrEqual(DATETIME_MIN);
    expect(result).toBeLessThanOrEqual(DATETIME_MAX);
  });
  test('date, format is false, and return Date-type date', () => {
    const result = dateInstance.dateTime<Date>({ from: '1999-1-1', to: '2022-12-12', format: false });
    expect(result instanceof Date).toBeTruthy();
  });
  test('date, set format', () => {
    const result = dateInstance.dateTime({ from: '1999-1-1', to: '2022-12-12', format: 'yyyy/mm/dd' });
    expect(typeof result).toBe('string');
  });
  test('timestamp, fix to second', () => {
    const result = dateInstance.timestamp();
    expect(new Date(Number(result) * 1000).getMilliseconds()).toBeFalsy;
  });
  test('timestamp, fix to millisecond', () => {
    const result = dateInstance.timestamp({ ms: true });
    expect(new Date(Number(result)).getMilliseconds()).toBeGreaterThanOrEqual(0);
  });
  test('week, no param, use default', () => {
    const result = dateInstance.week();
    const cnWeekMap = WEEK_MAP.map((item) => item.cn);
    expect(cnWeekMap).toEqual(expect.arrayContaining([result]));
  });
  test('week, language is English and abbr = true', () => {
    const result = dateInstance.week({ language: 'en', abbr: true });
    const enWeekMap = WEEK_MAP.map((item) => item.en[1]);
    expect(enWeekMap).toEqual(expect.arrayContaining([result]));
  });
  test('week, language is English and abbr = false', () => {
    const result = dateInstance.week({ language: 'en', abbr: false });
    const enWeekMap = WEEK_MAP.map((item) => item.en[0]);
    expect(enWeekMap).toEqual(expect.arrayContaining([result]));
  });
  test('month, no param, use default', () => {
    const result = dateInstance.month();
    const cnMonthMap = MONTH_MAP.map((item) => item.cn);
    expect(cnMonthMap).toEqual(expect.arrayContaining([result]));
  });
  test('week, language is English and abbr = true', () => {
    const result = dateInstance.month({ language: 'en', abbr: true });
    const enMonthMap = MONTH_MAP.map((item) => item.en[1]);
    expect(enMonthMap).toEqual(expect.arrayContaining([result]));
  });
  test('week, language is English and abbr = false', () => {
    const result = dateInstance.month({ language: 'en', abbr: false });
    const enMonthMap = MONTH_MAP.map((item) => item.en[0]);
    expect(enMonthMap).toEqual(expect.arrayContaining([result]));
  });
});
