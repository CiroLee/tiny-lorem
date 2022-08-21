export type IRange = [number, number];
export type ILanguage = 'en' | 'cn';

export interface ITextsFuncOptions {
  range?: number | IRange;
  language?: ILanguage;
}

export interface ITextsStringOptions {
  range?: number | IRange;
  source?: string;
}

export interface INumberOptions {
  range?: IRange;
  fixed?: number;
  format?: 'number' | 'string';
}

export interface IWeekAndMonthOptions {
  language?: ILanguage;
  abbr?: boolean;
}

export interface IDateOptions {
  from?: number | Date | string;
  to?: number | Date | string;
  format?: string | false;
}

export interface ITimestampOptions {
  from?: number | Date | string;
  to?: number | Date | string;
  ms?: boolean;
}

export interface IUrlOptions {
  sub?: boolean | number;
  protocol?: string;
}
// configs
export interface ITextsConfig {
  language?: ILanguage;
  baseNum?: number;
  cnCharacters?: string[];
  enNames?: string[];
}
