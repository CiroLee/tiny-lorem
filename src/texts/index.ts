import type { ITextsConfig, ITextsLanguage, ITextsFuncProps, IRange } from '@src/types/lorem';
import { CN_CHARACTERS, ALPHABET, CN_LASTNAMES, EN_NAMES, CHARACTERS } from './constant';
import { isValidNumber } from '@src/utils/validator';
import { randomInteger } from '@src/utils/utils';
export default class Texts {
  private language: ITextsLanguage;
  private baseNum: number;
  private zhCharacters: string[];
  private maxZhCharactersLength: number;
  constructor(config?: ITextsConfig) {
    this.baseNum = config?.baseNum || 10;
    this.language = config?.lang || 'cn';
    this.zhCharacters = config?.cnCharacters || CN_CHARACTERS;
    this.maxZhCharactersLength = this.zhCharacters.length - 1;
  }
  private calcRandomLength(range?: number | IRange): number {
    if (isValidNumber(range) || !range) {
      return range ? Math.floor(range as number) : randomInteger([1, this.baseNum]);
    }
    return randomInteger(range as IRange);
  }
  /**
   * @desc return a random letter or a Chinese charactor
   * @param language receive English(en) or Chinese(cn) language. default is cn
   */
  letter(language: ITextsLanguage = this.language): string {
    return language === 'cn'
      ? this.zhCharacters[randomInteger([0, this.maxZhCharactersLength])]
      : ALPHABET[randomInteger([0, ALPHABET.length - 1])];
  }
  /**
   * @desc return a random word
   * @param options.language receive English(en) or Chinese(cn) language. default is cn
   * @param options.range number or [min, max] format array. It defines the number of characters that make up a word
   */
  word(options?: ITextsFuncProps) {
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
  sentence(options?: ITextsFuncProps) {
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
  paragraph(options?: ITextsFuncProps) {
    const len = this.calcRandomLength(options?.range);
    let str = '';
    for (let i = 0; i < len; i++) {
      str += this.sentence({ language: options?.language, range: this.calcRandomLength() });
    }

    return str;
  }
  // Chinese name
  private cname() {
    let name = '';
    const lastName = CN_LASTNAMES[randomInteger([0, CN_LASTNAMES.length - 1])];
    if (lastName.length < 3) {
      name = this.word({ language: 'cn', range: [1, 2] }) + lastName;
    } else {
      name = this.word({ language: 'cn', range: [1, 3] });
    }

    return name;
  }
  // English name
  private ename(upper?: boolean) {
    const name = EN_NAMES[randomInteger([0, EN_NAMES.length - 1])];
    return upper ? name.replace(/^\S/, (L) => L.toUpperCase()) : name;
  }
  /**
   * @desc return a random English name or Chinese name
   * @param language en(English) | Chinese(cn)
   * @param upper whether to capitalize the first letter, only useful for English name
   * @returns
   */
  name(language: ITextsLanguage = this.language, upper?: boolean) {
    return language === 'cn' ? this.cname() : this.ename(upper);
  }
  string(range: number | IRange = 6) {
    const len = this.calcRandomLength(range);
    let str = '';
    for (let i = 0; i < len; i++) {
      str += CHARACTERS[randomInteger([0, CHARACTERS.length - 1])];
    }

    return str;
  }
}
