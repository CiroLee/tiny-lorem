# Address

随机生成一个中国的包含省、市、县(区)的地址。    

## province

随机生成一个省。    

```ts
lorem.address.province(); // 四川省
```

## city

随机生成一个市。    

| 名称     | 类型      | 必填  | 默认值   | 描述        |
| ------ | ------- | --- | ----- | --------- |
| parent | boolean | 否   | false | 实现显示所属的省份 |

```ts
lorem.address.city(); // 自贡市
lorem.address.city(true); // 江西省 九江市
```

## district

随机生成一个县(区)。     

| 名称     | 类型                | 必填  | 默认值   | 描述                                                                         |
| ------ | ----------------- | --- | ----- | -------------------------------------------------------------------------- |
| parent | boolean\|number | 否   | false | 是否显示所属父级省市。默认只显示县(区)。设置为true时，显示所属父级省市名称，即完成地址；也可设置为number，设置显示的层级数。最大为2层。 |

```ts
lorem.address.district(); // 利通区
lorem.address.district(1); // 赣州市 石城县
lorem.address.district(true); // 云南省 德宏傣族景颇族自治州 梁河县
```


