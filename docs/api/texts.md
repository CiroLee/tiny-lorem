# Texts

随机生成字, 词, 句子, 段落, 名字和字符串。

## letter

随机生成一个字。

| 名称       | 类型           | 必填  | 默认值               | 描述     |
| -------- | ------------ | --- | ----------------- | ------ |
| language | 'cn'\|'en' | 否   | this.language(cn) | 返回字的语言 |

```ts
lorem.texts.letter(); // 汉
lorem.texts.letter('cn'); // 字
lorem.texts.letter('en'); // a
```

## word

随机生成一个词。

| 名称       | 类型                         | 必填  | 默认值                 | 描述                                                                                                                           |
|:-------- | -------------------------- | --- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| range    | number\|[number, number] | 否   | `[1, this.baseNum]` | 组成词的字的数量。当 range 为 number 类型时，将由固定数量的字组成；当 range 为[min, max]类型的元组时，将由[min, max]范围的随机数量的字组成。省略该参数或为假值时，将由配置参数 baseNum 决定字的数量。 |
| language | 'cn' \| 'en'               | 否   | this.language(cn)   | 语言。                                                                                                                          |

```ts
lorem.texts.word(); // 兴渡饶笨舒
lorem.texts.word({ range: [2, 8] }); // 渣匙兔
lorem.texts.word({ range: 2 }); // 揪添
lorem.texts.word({language: 'en', [2, 8]});  // dtfslp
```

## sentence

随机返回一个句子。

| 名称       | 类型                         | 必填  | 默认值                 | 描述                                                                                                                            |
|:-------- | -------------------------- | --- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| range    | number\|[number, number] | 否   | `[1, this.baseNum]` | 组成句子的词的数量。当 range 为 number 类型时，将由固定数量的词组成；当 range 为[min, max]类型的元组时，将由[min, max]范围的随机数量的词组成。省略该参数或为假值时，将由配置参数 baseNum 决定词的数量。 |
| language | 'cn'\|'en'               | 否   | this.language(cn)   | 语言。                                                                                                                           |

```ts
lorem.texts.sentence(); // 本扣特朗井介孤捆陆。
lorem.texts.sentence({ range: 2 }); // 任月，迫初宰贸阻皂骆。
lorm.texts.sentence({ range: [2, 4], language: 'en' }); // Gwblju jei gecwzq.
```

## paragraph

随机返回一个段落。

| 名称       | 类型                         | 必填  | 默认值                 | 描述                                                                                                                                |
| -------- | -------------------------- | --- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| range    | number\|[number, number] | 否   | `[1, this.baseNum]` | 组成段落的句子的数量。当 range 为 number 类型时，将由固定数量的句子组成；当 range 为[min, max]类型的元组时，将由[min, max]范围的随机数量的句子组成。省略该参数或为假值时，将由配置参数 baseNum 决定句子的数量。 |
| language | 'cn'\|'en'               | 否   | this.language(cn)   | 语言。                                                                                                                               |

```ts
lorem.texts.paragraph(); // 胖葬脚，擦，舌那碍花域亚耐，岔几洒筝皂显堪拥李芬。
lorem.texts.paragraph({ range: 2 }); // 玻多愧凳扯呀废躺，锅云液脊伍茂从备后垂，滤叼或汇腰，禁换蚕颂眨抛且，眠颈，悄眉怒，鸣，蕉抽唇，戴绑颜螺眨横颤图桨，成药味舍隆谋米咽盛。秤七冲宅丢荷炒秩柏张，豪七毙弦。
lorem.texts.paragraph({ range: [1, 4], language: 'en' }); // Nyhvf cjrzmwp khax qqmggipgrt ecbj ihi.Zu usxyeca ilq tb shsd gz gmckevmqsv gdq.Yp.Sph nsrjogsjm cowxirbxi nbcz.
```

## name

随机返回一个名字。

| 名称       | 类型           | 必填  | 默认值               | 描述        |
| -------- | ------------ | --- | ----------------- | --------- |
| language | 'cn'\|'en' | 否   | this.language(cn) | 返回名字的语言   |
| upper    | boolean      | 否   | false             | 英文名称首字母大写 |

```ts
lorem.texts.name(); // 展恽
lorem.texts.name('en', true); // Bobby
```

## string

随机返回一个字符串

| 名称     | 类型                         | 必填  | 默认值               | 描述                                                                                                                           |
| ------ | -------------------------- | --- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| range  | number\|[number, number] | 否   | [1, this.baseNum] | 返回字符串的长度。当 range 为 number 类型时，返回指定长度的字符串；当 range 为[min, max]类型的元组时，将由[min, max]范围的随机数决定字符串长度，省略该参数或为假值时，将由配置参数 baseNum 决定长度。 |
| source | string                     | 否   |                   | 可自定义字符串源。                                                                                                                    |

```ts
lorem.texts.string(); // vn)b$Wb
lorem.texts.string({ range: 8 }); // H#KM}kJr
lorem.texts.string({ range: 4, source: '0123abc' }); // 020a
```

## config

参数配置。配置后可使用链式调用方式使用其他函数。

| 名称       | 类型           | 必填  | 默认值 | 描述   |
| -------- | ------------ | --- | --- | ---- |
| language | 'cn'\|'en' | 否   | cn  | 默认语言 |
| baseNum  | number       | 否   | 10  | 随机基数 |

```ts
lorem.texts.config({ language: 'en' }).word(); // dbra
```
