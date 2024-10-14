# Address

随机生成地址相关内容。

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
| gap    | boolean | 否   | true   | 是否显示分隔符     |

返回类型: string

```ts
lorem.address.city(); // 自贡市
lorem.address.city(true); // 江西省 九江市
lorem.address.city(true, false); // 江西省九江市
```

## county

随机生成一个县(区)。

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| parent | boolean\|number | 否 | false | 是否显示所属父级省市。默认只显示县(区)。设置为 true 时，显示所属父级省市名称，即完成地址；也可设置为 number，设置显示的层级数。最大为 2 层。 |
| gap | boolean | 否 | true | 是否显示分隔符 |

返回类型: string

```ts
lorem.address.county(); // 利通区
lorem.address.county(1); // 赣州市 石城县
lorem.address.county(true); // 云南省 德宏傣族景颇族自治州 梁河县
lorem.address.county(true, false); // 云南省德宏傣族景颇族自治州梁河县
```

## road

随机生成一个中文街道名称。

返回类型: string

```ts
lorem.address.road(); // 永安路
```

## full

随机生成一完整的个中文地址。包含省、市、区、街道、门牌号。

| 名称 | 类型            | 必填 | 默认值 | 描述                                                   |
| ---- | --------------- | ---- | ------ | ------------------------------------------------------ |
| gap  | boolean         | 否   | true   | 是否显示分隔符                                         |
| tail | boolean\|string | 否   | false  | 门牌号尾缀，设置为`true`显示为“号”，可自定义其他字符串 |

```ts
lorem.address.full(); // 湖北省 武汉市 江夏区光谷大道 1425
lorem.address.full(false); // 湖北省武汉市江夏区光谷大道1425
lorem.address.full(false, true); // 湖北省武汉市江夏区光谷大道1425号
lorem.address.full(false, '室'); // 湖北省武汉市江夏区光谷大道1425室
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
