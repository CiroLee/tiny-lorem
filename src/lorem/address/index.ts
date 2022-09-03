/* eslint-disable no-unused-vars */
import Helper from '../helper';
import RandomNumber from '../number';
import { ADDRESS_DICT } from './constant';
import type { IAddressItem } from './types';
const helper = new Helper();
const randomNumber = new RandomNumber();

export default class Address {
  private provinceObj(): IAddressItem {
    const provinces = Object.values(ADDRESS_DICT).map((item) => ({
      code: item.code,
      name: item.name,
    }));
    return helper.elements<IAddressItem[], IAddressItem>(provinces);
  }
  private cityObj(provinceCode: string): IAddressItem {
    const citiesObj = ADDRESS_DICT[provinceCode].cities;
    const cities = Object.values(citiesObj).map((item) => ({
      code: item.code,
      name: item.name,
    }));
    return helper.elements<IAddressItem[], IAddressItem>(cities);
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

    return helper.elements<IAddressItem[], IAddressItem>(counties);
  }
  /**
   * @desc return a random Chinese province
   */
  province(): string {
    return this.provinceObj().name;
  }
  /**
   * @desc return a random Chinese city
   * @param parent set true, returns the province and city it belongs to,
   */
  city(parent?: boolean): string {
    const province = this.provinceObj();
    const city = this.cityObj(province.code);
    return parent ? `${province.name} ${city.name}` : city.name;
  }
  /**
   * @desc return a random county
   * @param parent set true, returns the province and city it belongs to,
   * set 1 or 2, returns the corresponding parent (1: city, 2: province and city)
   * @examples
   * county(); // 青海省 玉树藏族自治州 杂多县
   * county(1) // 青海省 玉树藏族自治州
   */
  county(parent?: boolean | number): string {
    const province = this.provinceObj();
    const city = this.cityObj(province.code);
    const county = this.countyObj(province.code, city.code);
    switch (parent) {
      case 2:
      case true:
        return `${province.name} ${city.name} ${county.name}`;
      case 1:
        return `${city.name} ${county.name}`;
      default:
        return county.name;
    }
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
