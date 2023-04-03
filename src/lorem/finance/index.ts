import Helper from '../helper';
import Texts from '../texts';
import RandomNumber from '../number';
import { fillDecimal } from '@src/utils/utils';
import type { IAmountOptions } from '@src/types/lorem.types';

const randomNumber = new RandomNumber();
const helper = new Helper();
const texts = new Texts();
const IssuerMap = {
  visa: 4,
  amex: [34, 37],
  jcb: 35,
  mastercard: [51, 52, 53, 54, 55],
  unionpay: 62,
};

type Issuer = keyof typeof IssuerMap;

const getIssuer = (issuer?: Issuer): string => {
  const val = issuer ? IssuerMap[issuer] : '';
  if (typeof val === 'number') return val.toString();
  if (Array.isArray(val)) return helper.elements<number>(val).toString();
  return '';
};
export default class Finance {
  /**
   * @desc return a random bank card number
   * @param issuer band card issuer
   */
  bankCardNumber(issuer?: Issuer): string {
    const issuerNum = getIssuer(issuer);
    const rest = texts.string({ range: [13 - issuerNum.length, 19 - issuerNum.length], source: '0123456789' });
    return issuerNum + rest;
  }
  /**
   * @desc return a random amount
   * @param options.symbol [optional] currency symbo
   * @param options.range [optional] range of amount
   * @param options.fixed [optional] number of decimal places for the amount. default is 2
   * @param options.isFormat [optional] if set true, will use toLocaleString() to format
   */
  amount(options?: IAmountOptions): string {
    const symbol = options?.symbol || '';
    const fixed = options?.fixed ?? 2;
    const num = fixed
      ? randomNumber.float<string>({
          ...options,
          fixed,
        })
      : randomNumber.int(options?.range);

    const result = symbol + (options?.isFormat ? num.toLocaleString() : num);
    return options?.fixed ? fillDecimal(result, options.fixed) : result;
  }
}
