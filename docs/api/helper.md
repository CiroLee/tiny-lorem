# Helper

提供一些辅助函数，用于数据转换或专项输出。     

## elements

随机返回数组中指定数量的元素。

| 名称    | 类型     | 必填  | 默认值 | 描述                                                                |
| ----- | ------ | --- | --- | ----------------------------------------------------------------- |
| array |   \<T>   | 是   |     | 源数组                                                               |
| num   | number | 否   | 1   | 随机元素的数量。如果num = 1， 则返回一个元素，num > 1 && num ≤ array.length时，返回一个数组。 |

```ts
lorem.helper.elements([1, 2, 3, 4]); // 3
lorem.helper.elements([1, 2, 3, 4], 2); // [1, 4]
```

## boolean

随机生成一个boolean值。    

```ts
lorem.helper.boolean(); // false
```


