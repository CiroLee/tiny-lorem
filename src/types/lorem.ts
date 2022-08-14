export type IRange = [number, number];
export type ITextsLanguage = 'en' | 'cn';

export interface ITextsFuncProps {
  range?: number | IRange;
  language?: ITextsLanguage;
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
