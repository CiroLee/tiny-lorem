export interface IDict {
  code: string;
  name: string;
  cities: {
    [key: string]: {
      code: string;
      name: string;
      districts: { [key: string]: string };
    };
  };
}

export interface IAddressItem {
  code: string;
  name: string;
}
