import { IRange } from '@src/types/lorem.types';
import { isRangeTuple } from './validator';

export const TEXT_ERROR_MAP = {
  invalidRange: 'the first element of the array should be less than or equal to the second',
  invalidPositiveRange:
    'elements of range should be positive integer and the first should be less than or equal to the second',
};
export const randomInteger = (range: IRange): number => {
  if (!isRangeTuple(range)) {
    throw new Error(`randomInteger: ${TEXT_ERROR_MAP.invalidRange}`);
  }
  const min = Math.floor(range[0]);
  const max = Math.floor(range[1]);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomElement = <T>(array: T[]): T => {
  const random = randomInteger([0, array.length - 1]);
  return array[random];
};

export const fillDecimal = (num: number | string, fixed: number): string => {
  const [int, decimal = ''] = num.toString().split('.');
  const _fixed = Math.floor(fixed);

  return `${int}.${decimal}${'0'.repeat(_fixed - decimal.length)}`;
};

export const dateFormat = (date: Date | number | string, format?: string): string => {
  const _date = date instanceof Date ? date : new Date(date);
  const _format = format || 'yyyy-mm-dd HH:MM:SS';
  const o = {
    yyyy: _date.getFullYear(),
    mm: ('0' + (_date.getMonth() + 1)).slice(-2),
    dd: ('0' + _date.getDate()).slice(-2),
    HH: ('0' + _date.getHours()).slice(-2),
    MM: ('0' + _date.getMinutes()).slice(-2),
    SS: ('0' + _date.getSeconds()).slice(-2),
  };

  return _format
    .replace(/yyyy/g, `${o.yyyy}`)
    .replace(/mm/g, `${o.mm}`)
    .replace(/dd/g, `${o.dd}`)
    .replace(/HH/g, `${o.HH}`)
    .replace(/MM/g, `${o.MM}`)
    .replace(/SS/g, `${o.SS}`);
};

export function buildQueryString(params: Record<string, any>): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (typeof value === 'boolean') {
      if (value) {
        parts.push(key); // 布尔true只添加key
      }
    } else {
      parts.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  return parts.length ? `?${parts.join('&')}` : '';
}

// 输出: ?a=1&b&d=hello%20world&g=123
