import Texts from '../texts';
import Helper from '../helper';
import { randomInteger } from '@src/utils/utils';
import { PROTOCOL, DOMAINS, EMAIL_SUFFIX, MESH_NUMS, TEL_AREA_CODE, HTTP_STATUS_CODE } from './constant';
import type { IUrlOptions, IRange } from '@src/types/lorem.types';
import { isInt } from '@src/utils/validator';

type IHttpStatusCode = keyof typeof HTTP_STATUS_CODE;

const texts = new Texts();
const helper = new Helper();
export default class Internet {
  private subDirectory(sub?: IRange | number | boolean) {
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
  ipv6(): string {
    const result: string[] = [];
    const hashArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    for (let i = 0; i < 8; i++) {
      const elements = helper.elements<string[]>(hashArray, 4);
      result.push(elements.join(''));
    }

    return result.join(':');
  }
  /**
   * @desc return a random top-level-domain
   */
  tld(): string {
    const key = helper.elements<string>(Object.keys(DOMAINS));
    return helper.elements<string>(DOMAINS[key as keyof typeof DOMAINS]);
  }
  /**
   * @desc return a random domain name
   * @param level [optional] level of subdomain.default is 1
   */
  domain(level = 1): string {
    if (level === 0 || (level && (!isInt(level) || level < 0))) {
      throw new Error(`url: level must be a positive integer`);
    }
    let name = '';
    const source = '0123456789abcdefghijklmnopqrstuvwxyz-';
    for (let i = 0; i < level; i++) {
      name += texts.string({ range: [1, 10], source }).replace(/^-|-$/g, texts.letter('en')) + '.';
    }
    return name.replace(/.$/g, '') + this.tld();
  }
  /**
   * @desc return a random url string
   * @param options.protocol [optional] protocol of the url
   * @param options.sub [optional] The number of url subdirectories.
   * default is false, no subdirectories. sub=true, randomly generate 1~4 layers of subdirectories.
   * if sub ≥ 0, generate a specified number of subdirectories, up to 10 layers
   * @param options.domainLevel [optional] level of domain. default is [1, 3];
   * @param options.suffix suffix of domain. such as .com, .org
   */
  url(options?: IUrlOptions): string {
    const domainLevel = options?.domainLevel;
    if (domainLevel === 0 || (domainLevel && (!isInt(domainLevel) || domainLevel < 0))) {
      throw new Error(`url: domainLevel must be a positive integer`);
    }
    const protocol = options?.protocol || helper.elements(PROTOCOL);
    const tld = options?.suffix || this.tld();
    const subDirect = this.subDirectory(options?.sub);
    const level = domainLevel || randomInteger([1, 3]);
    const prefix = this.domain(level);
    return `${protocol}://${prefix.slice(0, prefix.lastIndexOf('.'))}${tld}${subDirect}`;
  }
  /**
   * @desc return a random email
   */
  email() {
    const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const name = texts.string({ source: alphabet });
    const emailSuffix = helper.elements<string>(EMAIL_SUFFIX);

    return `${name}/${emailSuffix}`;
  }
  /**
   * @desc return a random a 11-digit mobile phone number
   * @param hidden [optional] whether to ide the middle four digits
   */
  mobile(hidden?: boolean): string {
    const part = helper.elements<number>(MESH_NUMS);
    const strInt = (digit: number) => {
      let str = '';
      for (let i = 0; i < digit; i++) {
        str += `${randomInteger([0, 9])}`;
      }
      return str;
    };

    return hidden ? `${part}****${strInt(4)}` : `${part}${strInt(8)}`;
  }
  httpStatusCode(type?: IHttpStatusCode): number {
    let codeValue: number[] = [];
    if (type) {
      codeValue = HTTP_STATUS_CODE[type] || [];
    } else {
      codeValue = helper.elements(Object.values(HTTP_STATUS_CODE));
    }

    return helper.elements<number>(codeValue);
  }
  /**
   * @desc return a random http request method
   */
  httpMethod(): string {
    const methods = ['GET', 'POST', 'HEAD', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'];
    return helper.elements<string>(methods);
  }
  /**
   * @desc return a random Chinese mainland landline number
   */
  landline(): string {
    const phoneNum = helper.boolean() ? randomInteger([0, 9999999]) : randomInteger([0, 99999999]);
    return `${helper.elements(TEL_AREA_CODE)}-${phoneNum}`;
  }
}
