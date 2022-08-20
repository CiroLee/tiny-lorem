import Texts from '../texts';
import { randomInteger, randomElement } from '@src/utils/utils';
import { PROTOCOL, DOMAINS, EMAIL_SUFFIX, MESH_NUMS } from './constant';
import type { IUrlOptions, IRange } from '@src/types/lorem.types';

const texts = new Texts();
export default class Internet {
  private randomElementsWithNum<T>(array: T[], num: number): T[] {
    if (num > 1) {
      const result: T[] = [];
      for (let i = 0; i < num; i++) {
        result.push(randomElement<T>(array));
      }
      return result;
    }
    return [randomElement<T>(array)];
  }
  private subDirecttory(sub?: IRange | number | boolean) {
    let result = '';
    if (typeof sub === 'number' && sub > 0) {
      const _sub = sub > 10 ? 10 : sub;
      for (let i = 0; i < _sub; i++) {
        result += `/${texts.word({ language: 'en', range: [1, 6] })}`;
      }
    } else if (typeof sub === 'boolean' && sub) {
      const len = randomInteger([1, 4]);
      for (let i = 0; i < len; i++) {
        result += `/${texts.word({ language: 'en', range: [1, 6] })}`;
      }
    }

    return result;
  }
  /**
   * @desc return a random uuid
   */
  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const random = (Math.random() * 16) | 0;
      const val = c === 'x' ? random : (random & 0x3) | 0x8;
      return val.toString(16);
    });
  }
  /**
   * @desc return a random an ipv4
   */
  ipv4(): string {
    let ip = '';
    for (let i = 0; i < 4; i = i + 1) {
      ip += Math.floor(Math.random() * 256) + '.';
    }
    return ip.replace(/\.$/g, '');
  }
  /**
   * @desc return a random an ipv6
   */
  ipv6() {
    const result: string[] = [];
    const hashArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    for (let i = 0; i < 8; i++) {
      const elements = this.randomElementsWithNum(hashArray, 4);
      result.push(elements.join(''));
    }

    return result.join(':');
  }
  /**
   * @desc return a random url string
   * @param options.protocol [optional] protocol of the url
   * @param options.sub [optional] The number of url subdirectories, only type=url is valid,
   * default is false, and no subdirectories are generated. sub=true, randomly generate 1~4
   * layers of subdirectories, when sub ≥ 0, generate a specified number of subdirectories, up to 10 layers
   */
  url(options?: IUrlOptions): string {
    const protocol = options?.protocol || PROTOCOL[randomInteger([0, PROTOCOL.length - 1])];
    const key = randomElement(Object.keys(DOMAINS));
    const tld = randomElement(DOMAINS[key as keyof typeof DOMAINS]);
    const name = texts.word({ language: 'en' });
    const subDirect = this.subDirecttory(options?.sub);

    return `${protocol}://${name}.${tld}${subDirect}`;
  }
  email() {
    const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const name = texts.string({ source: alphabet });
    const emailSuffix = randomElement(EMAIL_SUFFIX);

    return `${name}/${emailSuffix}`;
  }
  /**
   * @desc return a random a 11-digit mobile phone number
   * @param hidden [optional] whether to ide the middle four digits
   */
  mobile(hidden?: boolean): string {
    const part = randomElement(MESH_NUMS);
    const strInt = (digit: number) => {
      let str = '';
      for (let i = 0; i < digit; i++) {
        str += `${randomInteger([0, 9])}`;
      }
      return str;
    };

    return hidden ? `${part}****${strInt(4)}` : `${part}${strInt(4)}${strInt(4)}`;
  }
}
