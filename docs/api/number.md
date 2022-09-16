# Number

生成随机的整数，浮点数。

## int

随机生成一个整数。

| 名称  | 类型             | 必填 | 默认值 | 描述                        |
| ----- | ---------------- | ---- | ------ | --------------------------- |
| range | [number, number] | 否   |        | 整数取值范围。极值为 2^53。 |

返回类型: number

```ts
lorem.number.int([10, 100]); // 76
lorem.number.int(); // 4605922351451868
```

## float

生成随机浮点数。

| 名称   | 类型               | 必填 | 默认值 | 描述                                                  |
| ------ | ------------------ | ---- | ------ | ----------------------------------------------------- |
| \<T>   | string\|number     |      |        | 显式指明返回值类型                                    |
| range  | [number, number]   | 否   |        | 浮点数取值范围。                                      |
| fixed  | number             | 否   | 4      | 浮点数精度。默认保留 4 位小数。fixed 必须为**正整数** |
| format | 'string'\|'number' | 否   |        | 返回浮点数的类型。支持 string 和 number。             |

返回类型: string | number

```ts
lorem.number.float<number>(); // -87450087922.4952
lorem.number.float<number>({range: [1, 100, fixed: 2 ]}); // 5.34
lorem.number.float<string>({range: [1, 100], fixed: 2, format: 'string'}); // '46.50'
```

::: tip Note

浮点数可能出现末尾小数是 0 的情况，javascript 中，number 类型会省略末位为 0 的数字，这可能会引起误解(并不会影响计算精度)， 因此可以设置`format = string`，返回 string 类型，可保留末位是 0 的浮点数格式。

:::
