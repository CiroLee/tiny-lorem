import Texts from '../texts';
import RandomDate from '../date';
import Helper from '../helper';
import { ALPHABET } from '../texts/constant';
import { randomInteger } from '@src/utils/utils';
const texts = new Texts();
const randomDate = new RandomDate();
const helper = new Helper();
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
    const body = helper.boolean()
      ? texts.string({ range: 4, source: alphabet + numberStr }) + texts.string({ range: 1, source: trailTag })
      : texts.string({ range: 5, source: alphabet + numberStr });

    return texts.string({ range: 1, source: abbr }) + texts.string({ range: 1, source: alphabet }) + body;
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
  id() {
    const pcNum = randomInteger([100000, 999999]);
    const date = randomDate.dateTime({ from: '1970/1/1', to: '2999/12/12', format: 'yyyy/mm/dd' }).replaceAll('/', '');
    const trailNum = helper.boolean()
      ? texts.string({ range: 4, source: numberStr })
      : texts.string({ range: 3, source: numberStr }) + 'x';

    return pcNum + date + trailNum;
  }
}
