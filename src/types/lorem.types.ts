import { IMAGETYPES } from '@src/utils/constants';
export type IRange = [number, number];
export type IBigRange = [bigint, bigint];
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
  suffix?: string;
  domainLevel?: number;
}

export interface IImagePlaceholderOptions {
  width?: number;
  height?: number;
  text?: string;
  bgColor?: string;
  fontColor?: string;
}

export type IFalsy = number | null | undefined | string | boolean;

export interface IAmountOptions {
  symbol?: string;
  range?: IRange;
  fixed?: number;
  isFormat?: boolean;
}
export interface IImagePicsumOptions {
  width?: number;
  height?: number;
  grayscale?: boolean;
  blur?: number;
}

export type TypicalImageType = keyof typeof IMAGETYPES;
export interface IImageClassifyOptions {
  type: TypicalImageType;
  width?: number;
  height?: number;
  lock?: boolean;
}
