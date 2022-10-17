# Finance

随机生成金融相关数据

## bankCardNumber

随机生成一个银行卡号。

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| issuer | string | 否 |  | 银行卡发卡机构。支持常见发卡机构: visa, amex(美国运通), jcb(日本信用卡株式会社), mastercard(万事达), unionpay(中国银联) |

返回类型: string

```ts
lorem.finance.bankCardNumber(); // 224237632675171
lorem.finance.bankCardNumber('visa'); // 40299297434197151
```

## amount

随机生成一个金额。

| 名称     | 类型             | 必填 | 默认值 | 描述                                                                |
| -------- | ---------------- | ---- | ------ | ------------------------------------------------------------------- |
| symbol   | string           | 否   | ''     | 货币符号                                                            |
| range    | [number, number] | 否   |        | 金额范围                                                            |
| fixed    | number           | 否   | 2      | 金额小数位精度                                                      |
| isFormat | boolean          | 否   | false  | 是否格式化金额。如果设置为 true, 将使用`toLocaleString()`进行格式化 |

返回类型: string

```ts
lorem.finance.amount({ range: [1, 300] }); // 84.68
lorem.finance.amount({ range: [10000, 100000], fixed: 3, isFormat: true, symbol: '$' });
// $61,336.919
```
