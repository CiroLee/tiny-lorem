# Helper

提供一些辅助函数，用于数据转换或专项输出。

## elements

随机返回数组中指定数量的元素。

| 名称  | 类型   | 必填 | 默认值 | 描述                    |
| ----- | ------ | ---- | ------ | ----------------------- |
| array | T[]    | 是   |        | 源数组                  |
| num   | number | 否   | 1      | 返回元素的数量，默认为1 |

返回类型: T

```ts
lorem.helper.elements<number>([1, 2, 3, 4]); // 3
lorem.helper.elements<number>([1, 2, 3, 4], 2); // [1, 4]
```

## weightElements

根据权重随机返回数组中的元素。

| 名称         | 类型                           | 必填 | 默认值 | 描述                    |
| ------------ | ------------------------------ | ---- | ------ | ----------------------- |
| array        | T[]                            | 是   |        | 源数组                  |
| weightParams | { weight: number; value: T }[] | 是   |        | 权重参数                |
| num          | number                         | 否   | 1      | 返回元素的数量，默认为1 |

返回类型: T

```ts
// 随机返回一个数字，返回1的概率为80%
lorem.helper.weightElements([1, 2, 3, 4, 5, 6], [{ weight: 0.8, value: 1 }]); // 1
```

## boolean

随机生成一个 boolean 值。

返回类型: boolean

```ts
lorem.helper.boolean(); // false
```

## falsy

随机生成一个假值。如: `0, null, undefined, false, '', false`。

```ts
lorem.helper.falsy(); // null
```
