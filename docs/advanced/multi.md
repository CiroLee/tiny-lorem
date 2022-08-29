# 批量生成数据

`tiny-lorem`提供两个批量方法。`array`函数(用于生成数组结构数据)和`json`高阶函数(可以生成任意结构的高阶函数)。     



```ts
type IMultiCallback<T> = (lo: TinyLorem) => T;
```

## array

生成指定数量的数据。

| 名称     | 类型             | 必填  | 默认值 | 描述                                 |
| ------ | -------------- | --- | --- | ---------------------------------- |
| num    | number         | 是   |     | 生成数据的数量                            |
| schema | IMultiCallback | 是   |     | 生成array数据的回调函数。函数会自动注入TinyLorem实例。 |

```ts
lorem.array(2, (l) => {
    return {
    name: l.text.name(),
    age: l.number.int([10, 50])
}
});
// [ { name: '衬苑', age: 45 }, { name: '附犬肥', age: 40 } ]

// 数量随机
lorem.array(lorem.number.int([1, 4]), (l) => {
    return {
    name: l.text.name(),
    age: l.number.int([10, 50])
}
});
// result
[
  { name: '胖柯', age: 44 },
  { name: '丘鹿却', age: 38 },
  { name: '厘乓五', age: 29 }
]
```

## json

生成自定义格式json数据。当需要生成复杂结构的数据时，该函数会更有用。      

| 名称       | 类型             | 必填  | 默认值 | 描述                                |
| -------- | -------------- | --- | --- | --------------------------------- |
| callback | IMultiCallback | 是   |     | 生成json数据的回调函数。函数会自动注入TinyLorem实例。 |

```ts
lorem.json((lo) => {
    return {
      name: lo.texts.name(),
      age: lo.number.int([10, 50]),
      ability: lorem.helper.elements(['vue', 'react', 'html'], 2),
      toies: lo.array(2, () => {
        return {
          name: lo.texts.name(),
          price: `$${lo.number.float({ range: [100, 1000], fixed: 2 })}`,
        };
      }),
    };
  })

// result
{
  name: '青晏',
  age: 12,
  ability: [ 'html', 'html' ],
  toies: [ 
    { name: '用肥', price: '$998.39' }, 
    { name: '被星', price: '$449.7' } 
  ]
}
```