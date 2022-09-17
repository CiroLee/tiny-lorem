import Texts from '../texts';
import { ALPHABET } from '../texts/constant';
import { randomInteger } from '@src/utils/utils';
const texts = new Texts();
const numberStr: string = '0123456789';

export default class Unique {
  /**
   * @desc return a random Chinese vehicle registration mark
   */
  vrm() {
    const abbr = '京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领';
    const alphabet = ALPHABET.filter((item) => item !== 'i' && item !== 'o')
      .join('')
      .toUpperCase(); // exclude I, O
    const trailTag = '挂学警港澳';
    const body = texts.string({ range: [4, 5], source: alphabet + numberStr });

    return (
      texts.string({ range: 1, source: abbr }) +
      texts.string({ range: 1, source: alphabet }) +
      (body.length > 4 ? body : body + texts.string({ range: 1, source: trailTag }))
    );
  }
  /**
   * @desc return a random vehicle identification number
   */
  vin(): string {
    const upperAlphabet = ALPHABET.join('').toUpperCase().replace(/i|o|q/gi, '');
    const wmi = texts.string({ range: 3, source: `123469${upperAlphabet}` });
    const vds =
      texts.string({ range: 2, source: upperAlphabet }) +
      randomInteger([10, 99]) +
      texts.string({ range: 1, source: upperAlphabet }) +
      texts.string({ range: 1, source: numberStr + 'X' });
    const vis =
      texts.string({ range: 1, source: upperAlphabet.replace(/u|z/gi, '') + numberStr.slice(1) }) +
      texts.string({ range: 1, source: upperAlphabet }) +
      texts.string({ range: 6, source: numberStr });

    return wmi + vds + vis;
  }
}
