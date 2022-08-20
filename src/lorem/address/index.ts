import { ADDRESS_DICT } from './constant';
import { randomInteger } from '@src/utils/utils';
import type { IAddressItem } from './types';

export default class Address {
  private provinceObj(): IAddressItem {
    const provinces = Object.values(ADDRESS_DICT).map((item) => ({
      code: item.code,
      name: item.name,
    }));
    const random = randomInteger([0, provinces.length - 1]);
    return provinces[random];
  }
  private cityObj(provinceCode: string): IAddressItem {
    const citiesObj = ADDRESS_DICT[provinceCode].cities;
    const cities = Object.values(citiesObj).map((item) => ({
      code: item.code,
      name: item.name,
    }));

    const random = randomInteger([0, cities.length - 1]);
    return cities[random];
  }
  private districtObj(provinceCode: string, cityCode: string): IAddressItem {
    const districtsObject = ADDRESS_DICT[provinceCode].cities[cityCode].districts;
    const districts = Object.entries(districtsObject).map(([key, value]) => ({
      code: key,
      name: value,
    }));
    // ps: 部分省市没有区
    if (!districts.length) {
      return { code: '', name: '' };
    }

    const random = randomInteger([0, districts.length - 1]);
    return districts[random];
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
   * @desc return a random district
   * @param parent set true, returns the province and city it belongs to,
   * set 1 or 2, returns the corresponding parent (1: city, 2: province and city)
   * @examples
   * district(); // 青海省 玉树藏族自治州 杂多县
   * district(1) // 青海省 玉树藏族自治州
   */
  district(parent?: boolean | number) {
    const province = this.provinceObj();
    const city = this.cityObj(province.code);
    const district = this.districtObj(province.code, city.code);
    switch (parent) {
      case 2:
      case true:
        return `${province.name} ${city.name} ${district.name}`;
      case 1:
        return `${city.name} ${district.name}`;
      default:
        return district.name;
    }
  }
}
