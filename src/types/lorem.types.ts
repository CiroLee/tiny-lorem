export type IRange = [number, number];
export type ITextsLanguage = 'en' | 'cn';

export interface ITextsFuncOptions {
  range?: number | IRange;
  language?: ITextsLanguage;
}

export interface IFloatNumOptions {
  range?: IRange;
  fixed?: number;
}

export interface INumberOptions extends IFloatNumOptions {
  format?: 'number' | 'string';
}

export interface ITextsConfig {
  lang?: ITextsLanguage;
  baseNum?: number;
  cnCharacters?: string[];
  enNames?: string[];
}

export interface ILoremConfig {
  textsConfig?: ITextsConfig;
}
