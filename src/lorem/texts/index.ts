import { TEXT_ERROR_MAP } from '../number/constant';
import Helper from '../helper';
import { CN_CHARACTERS, ALPHABET, COMMOM_CN_NAMES, EN_NAMES, CHARACTERS } from './constant';
import { isValidNumber, isPositiveRangeTuple } from '@src/utils/validator';
import { randomInteger } from '@src/utils/utils';
import type { ITextsConfig, ILanguage, ITextsFuncOptions, IRange, ITextsStringOptions } from '@src/types/lorem.types';

const helper = new Helper();

export default class Texts {
  private language: ILanguage = 'cn';
  private baseNum: number = 10;
  private zhCharacters: string[] = CN_CHARACTERS;
  config(config: ITextsConfig) {
    this.language = config?.language || 'cn';
    this.baseNum = config?.baseNum || 10;
    return this;
  }
  private calcRandomLength(range?: number | IRange): number {
    if (isValidNumber(range) || !range) {
      return range ? Math.floor(range as number) : randomInteger([1, this.baseNum]);
    }
    // elements of range must be positive integer or zero
    if (!isPositiveRangeTuple(range as IRange)) {
      throw new Error(`calcRandomLength: ${TEXT_ERROR_MAP.invalidPositiveRange}`);
    }
    return randomInteger(range as IRange);
  }
  /**
   * @desc return a random letter or a Chinese charactor
   * @param language receive English(en) or Chinese(cn) language. default is cn
   */
  letter(language: ILanguage = this.language): string {
    return language === 'cn'
      ? helper.elements<string[], string>(this.zhCharacters)
      : helper.elements<string[], string>(ALPHABET);
  }
  /**
   * @desc return a random word
   * @param options.language receive English(en) or Chinese(cn) language. default is cn
   * @param options.range number or [min, max] format array. It defines the number of characters that make up a word
   */
  word(options?: ITextsFuncOptions): string {
    const len = this.calcRandomLength(options?.range);
    let str = '';
    for (let i = 0; i < len; i++) {
      str += this.letter(options?.language);
    }

    return str;
  }
  /**
   * @desc return a random sentence
   * @param options.language receive English(en) or Chinese(cn) language. default is cn
   * @param options.range number or [min, max] format array. It defines the number of words that make up a sentence
   */
  sentence(options?: ITextsFuncOptions): string {
    const len = this.calcRandomLength(options?.range);
    let str = '';
    for (let i = 0; i < len; i++) {
      if (options?.language === 'en') {
        const wordAount = randomInteger([2, this.baseNum]);
        str += `${this.word({ range: wordAount, language: options?.language })} `;
      } else {
        const wordAount = randomInteger([1, this.baseNum]);
        str += `${this.word({ range: wordAount, language: options?.language })}\uff0c`;
      }
    }

    return options?.language === 'en'
      ? str.replace(/^\S/, (L) => L.toUpperCase()).trim() + '.'
      : str.replace(/\uff0c$/g, '。');
  }
  /**
   * @desc return a random paragraph
   * @param options.language receive English(en) or Chinese(cn) language. default is cn
   * @param options.range number or [min, max] format array. It defines the number of sentences that make up a paragraph
   */
  paragraph(options?: ITextsFuncOptions): string {
    const len = this.calcRandomLength(options?.range);
    let str = '';
    for (let i = 0; i < len; i++) {
      str += this.sentence({ language: options?.language, range: this.calcRandomLength() });
    }

    return str;
  }
  // Chinese name
  private cname(): string {
    return helper.elements<string[], string>(COMMOM_CN_NAMES);
  }
  // English name
  private ename(upper?: boolean): string {
    const name = EN_NAMES[randomInteger([0, EN_NAMES.length - 1])];
    return upper ? name.replace(/^\S/, (L) => L.toUpperCase()) : name;
  }
  /**
   * @desc return a random English name or Chinese name
   * @param language en(English) | Chinese(cn)
   * @param upper whether to capitalize the first letter, only useful for English name
   * @returns
   */
  name(language: ILanguage = this.language, upper?: boolean): string {
    return language === 'cn' ? this.cname() : this.ename(upper);
  }
  /**
   *
   * @param options.range [optional]  number or [min, max] format array. it defines the length of the returned string
   * @param options.source [optional] the source of string. You can customize
   */
  string(options?: ITextsStringOptions): string {
    const char = options?.source || CHARACTERS;
    const len = this.calcRandomLength(options?.range);
    let str = '';
    for (let i = 0; i < len; i++) {
      str += char[randomInteger([0, char.length - 1])];
    }

    return str;
  }
}
