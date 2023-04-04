# Date

随机生成一个日期。包含标准日期，时间戳，星期和月份。

## dateTime

随机生成一个标准日期。

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| \<T> | string\|Date |  | string | 数据返回类型 |
| from | Date\|number \|string | 否 | 1970-01-01T00:00:00.000Z | 日期起始时间。 |
| to | Date\|number \|string | 否 | 2999-12-12T23:59:59.999Z | 日期截止时间。 |
| format | string \| false | 否 | yyyy-mm-dd HH:MM:SS | 日期格式。如果设置为 false， 则按照当前使用环境返回`Date`类型时间。 |

返回类型: string | Date

```ts
lorem.date.dateTime(); // 2403-08-15 00:51:37
lorem.date.dateTime({
  from: '2022-1-1',
  to: '2024-12-12',
  format: 'yyyy/mm/dd',
}); // 2023/06/14

lorem.date.dateTime({
  from: '2022-1-1',
  to: '2024-12-12',
  format: 'yyyy年mm月dd日 HH时MM分SS秒',
}); // 2023年06月14日 12时52分42秒

lorem.date.dateTime({ format: false }); // 2022-02-12T23:00:10.004Z
```

## timestamp

随机生成一个时间戳。

| 名称 | 类型                  | 必填 | 默认值                   | 描述             |
| ---- | --------------------- | ---- | ------------------------ | ---------------- |
| from | Date\|number\|string  | 否   | 1970-01-01T00:00:00.000Z | 时间戳起始时间。 |
| to   | Date\| number\|string | 否   | 2999-12-12T23:59:59.999Z | 时间戳截止时间。 |
| ms   | boolean               | 否   | false                    | 是否显示毫秒     |

返回类型: number

```ts
lorem.date.timestamp(); // 28533656672
lorem.date.timestamp({
  from: '2022-1-1',
  to: '2024-12-12',
  ms: true,
}); // 1681397130280
```

## week

随机生成一个星期。

| 名称     | 类型       | 必填 | 默认值 | 描述                                       |
| -------- | ---------- | ---- | ------ | ------------------------------------------ |
| language | 'cn'\|'en' | 否   | cn     | 使用的语言。                               |
| abbr     | boolean    | 否   | false  | 星期是否使用简写。**仅在使用英文时有效**。 |

返回类型: string

```ts
lorem.date.week(); // 五
lorem.date.week({ language: 'en' }); // Friday
lorem.date.week({ language: 'en', abbr: true }); // Fri.
```

## month

随机生成一个月份。

| 名称     | 类型       | 必填 | 默认值 | 描述                                       |
| -------- | ---------- | ---- | ------ | ------------------------------------------ |
| language | 'cn'\|'en' | 否   | cn     | 使用的语言。                               |
| abbr     | boolean    | 否   | false  | 月份是否使用简写。仅在使用英文时有效\*\*。 |

返回类型: string

```ts
lorem.date.month(); // 十二月
lorem.date.month({ language: 'en' }); // December
lorem.date.month({ language: 'en', abbr: true }); // Feb.
```
