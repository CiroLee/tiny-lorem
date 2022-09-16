# Helper

提供一些辅助函数，用于数据转换或专项输出。

## elements

随机返回数组中指定数量的元素。

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| \<T> |  | 否 |  | T: 返回数据类型 |
| num | number | 否 | 1 | 随机元素的数量。如果 num = 1， 则返回一个元素，num > 1 && num ≤ array.length 时，返回一个数组。 |

返回类型: T

```ts
lorem.helper.elements<number>([1, 2, 3, 4]); // 3
lorem.helper.elements<number[]>([1, 2, 3, 4], 2); // [1, 4]
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
