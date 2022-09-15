# Address

随机生成一个中国的包含省、市、县(区)的地址。

## province

随机生成一个省。

返回类型: string

```ts
lorem.address.province(); // 四川省
```

## city

随机生成一个市。

| 名称   | 类型    | 必填 | 默认值 | 描述               |
| ------ | ------- | ---- | ------ | ------------------ |
| parent | boolean | 否   | false  | 实现显示所属的省份 |

返回类型: string

```ts
lorem.address.city(); // 自贡市
lorem.address.city(true); // 江西省 九江市
```

## county

随机生成一个县(区)。

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| parent | boolean\|number | 否 | false | 是否显示所属父级省市。默认只显示县(区)。设置为 true 时，显示所属父级省市名称，即完成地址；也可设置为 number，设置显示的层级数。最大为 2 层。 |

返回类型: string

```ts
lorem.address.county(); // 利通区
lorem.address.county(1); // 赣州市 石城县
lorem.address.county(true); // 云南省 德宏傣族景颇族自治州 梁河县
```

## zipCode

随机生成一个中国邮政编码。

返回类型: string

```ts
lorem.address.zipCode(); // 335263
```

## longAndLat

随机生成经纬度坐标对数组。

| 名称   | 类型         | 必填 | 默认值 | 描述                                                    |
| ------ | ------------ | ---- | ------ | ------------------------------------------------------- |
| format | 'deg'\|'dms' | 否   | deg    | 经纬度返回格式。支持 10 进制角度格式和度角分(dms)格式。 |

返回类型: string[]

::: tip

返回数据为一个 string 类型的数组。第一个元素为经度, 负数为西经，正数为东经； 第二个为纬度，整数为北纬，负数为南纬。

:::

```ts
lorem.address.longAndLat(); // [ '-165.4905°', '15.7667°' ]
lorem.address.longAndLat('dms'); // [ '-13°10′50.88″', '9°59′48.48″' ]
```
