export type IRange = [number, number];
export type ILanguage = 'en' | 'cn';

export interface ITextsFuncOptions {
  range?: number | IRange;
  language?: ILanguage;
}

export interface IFloatNumOptions {
  range?: IRange;
  fixed?: number;
}

export interface INumberOptions extends IFloatNumOptions {
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
// configs
export interface ITextsConfig {
  lang?: ILanguage;
  baseNum?: number;
  cnCharacters?: string[];
  enNames?: string[];
}

export interface ILoremConfig {
  textsConfig?: ITextsConfig;
}
