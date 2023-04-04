/* eslint-disable no-unused-vars */
import { WEEK_MAP, MONTH_MAP } from './constant';
import { DATETIME_MIN, DATETIME_MAX } from './constant';
import { dateFormat, randomInteger } from '@src/utils/utils';
import type { IWeekAndMonthOptions, IDateOptions, ITimestampOptions } from '@src/types/lorem.types';

export default class RandomDate {
  /**
   * @desc return a random date
   * @param options.from [optional] start of the date
   * @param options.to [optional] end of the date
   * @param options.format [optional] format of the date.
   * if set format = true, will not format the date and return Date type
   */
  dateTime<T extends string | Date = string>(options?: IDateOptions): T;
  dateTime(options?: IDateOptions): string | Date {
    const from = options?.from ? new Date(options.from).getTime() : DATETIME_MIN;
    const to = options?.to ? new Date(options.to).getTime() : DATETIME_MAX;
    const randomInt = randomInteger([from, to]);
    // if you don't need to format., please set format boolan type value: false
    if (typeof options?.format === 'boolean' && !options?.format) {
      return new Date(randomInt);
    } else {
      return dateFormat(new Date(randomInt), options?.format);
    }
  }
  /**
   * @desc return a random timestamp
   * @param options.from [optional] start of the timestamp
   * @param options.to [optional] end of the timestamp
   * @param options ms [optional] whether includes milliseconds
   */
  timestamp(options?: ITimestampOptions): string {
    const _timestamp = this.dateTime<Date>({ from: options?.from, to: options?.to, format: false }).getTime();
    return options?.ms ? `${_timestamp}` : `${Math.floor(_timestamp / 1000)}`;
  }
  /**
   * @desc return a random week
   * @param options.language [optional] receive English(en) or Chinese(cn) language. default is cn
   * @param options.abbr [optional] whether use abbreviation. only valid for English
   */
  week(options?: IWeekAndMonthOptions): string {
    const weekIndex = randomInteger([0, 6]);
    const weekVal = WEEK_MAP[weekIndex];
    if (options?.language === 'en') {
      return options?.abbr ? weekVal.en[1] : weekVal.en[0];
    }
    return weekVal.cn;
  }
  /**
   * @desc return a random month
   * @param options.language [optional] receive English(en) or Chinese(cn) language. default is cn
   * @param options.abbr [optional] whether use abbreviation. only valid for English
   */
  month(options?: IWeekAndMonthOptions): string {
    const monthIndex = randomInteger([0, 11]);
    const monthVal = MONTH_MAP[monthIndex];
    if (options?.language === 'en') {
      return options?.abbr ? monthVal.en[1] : monthVal.en[0];
    }
    return monthVal.cn;
  }
}
