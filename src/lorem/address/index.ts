/* eslint-disable no-unused-vars */
import Helper from '../helper';
import RandomNumber from '../number';
import Texts from '../texts';
import { ADDRESS_DICT } from './constant';
import type { IAddressItem } from './types';

const texts = new Texts();
const helper = new Helper();
const randomNumber = new RandomNumber();

const roadCnSuffix = ['路', '街', '巷', '道', '胡同', '广场'];

export default class Address {
  private provinceObj(): IAddressItem {
    const provinces = Object.values(ADDRESS_DICT).map((item) => ({
      code: item.code,
      name: item.name,
    }));
    return helper.elements<IAddressItem>(provinces);
  }
  private cityObj(provinceCode: string): IAddressItem {
    const citiesObj = ADDRESS_DICT[provinceCode].cities;
    const cities = Object.values(citiesObj).map((item) => ({
      code: item.code,
      name: item.name,
    }));
    return helper.elements<IAddressItem>(cities);
  }
  private countyObj(provinceCode: string, cityCode: string): IAddressItem {
    const countiesObj = ADDRESS_DICT[provinceCode].cities[cityCode].districts;
    const counties = Object.entries(countiesObj).map(([key, value]) => ({
      code: key,
      name: value,
    }));
    // ps: 部分省市没有区
    if (!counties.length) {
      return { code: '', name: '' };
    }

    return helper.elements<IAddressItem>(counties);
  }
  /**
   * @desc return a random Chinese province
   */
  province(): string {
    return this.provinceObj().name;
  }
  /**
   * @desc return a random Chinese city
   * @param parent set true, returns the province and city it belongs to
   * @param gap save the space between the province and city, default is true
   */
  city(parent?: boolean, gap = true): string {
    const province = this.provinceObj();
    const city = this.cityObj(province.code);
    const res = parent ? `${province.name} ${city.name}` : city.name;
    return gap ? res : res.replace(/\s/g, '');
  }
  /**
   * @desc return a random county
   * @param parent set true, returns the province and city it belongs to,
   * set 1 or 2, returns the corresponding parent (1: city, 2: province and city)
   * @param gap save the space between the province, city and county, default is true
   * @examples
   * county(); // 杂多县
   * county(true); // 青海省 玉树藏族自治州 杂多县
   * county(1) // 青海省 玉树藏族自治州
   */
  county(parent?: boolean | number, gap = true): string {
    const province = this.provinceObj();
    const city = this.cityObj(province.code);
    const county = this.countyObj(province.code, city.code);
    let res = '';
    switch (parent) {
      case 2:
      case true:
        res = `${province.name} ${city.name} ${county.name}`;
        break;
      case 1:
        res = `${city.name} ${county.name}`;
        break;
      default:
        res = county.name;
        break;
    }

    return gap ? res : res.replace(/\s/g, '');
  }
  /**
   * @desc return a random Chinese road name
   * @examples
   * road(); // 长安南路
   */
  road(): string {
    const roadName = texts.word({ range: [2, 4] });
    const suffix = helper.elements(roadCnSuffix);
    return roadName + suffix;
  }
  /**
   * @decs return a complete Chinese address, includes province, city, county, road and house number
   * @param gap save the space between words, default is true
   * @param tail
   * @returns
   */
  full(gap = true, tail?: string | boolean) {
    let _tail = '';
    if (tail === true) {
      _tail = '号';
    } else if (typeof tail === 'string') {
      _tail = tail;
    }
    const address = this.county(true, gap);
    const road = this.road();
    const houseNum = randomNumber.intBy(4, true) + _tail;
    const str = `${address} ${road} ${houseNum}`;
    return gap ? str : str.replace(/\s/g, '');
  }
  /**
   * @desc return a random a Chinese zip code
   */
  zipCode(): string {
    let zip = '';
    for (let i = 0; i < 6; i++) {
      zip += randomNumber.int([0, 9]);
    }
    return zip;
  }
  private degToDms(float: number) {
    const num = Math.abs(float);
    const deg = Math.floor(num);
    const minute = Math.floor((num - deg) * 60);
    const second = (((num - deg) * 60 - minute) * 60).toFixed(2);

    const dms = `${deg}°${minute}′${second}″`;
    return num === float ? dms : `-${dms}`;
  }
  /**
   * @desc random return a pair of longitude and latitude
   * @param format [optional]  the format of the returned data
   * support deg | dms(degree minute second)
   */
  longAndLat(format?: 'deg' | 'dms'): [string, string] {
    const longitude = randomNumber.float<number>({ range: [-180, 180] });
    const latitude = randomNumber.float<number>({ range: [-90, 90] });

    return format === 'dms' ? [this.degToDms(longitude), this.degToDms(latitude)] : [`${longitude}°`, `${latitude}°`];
  }
}
