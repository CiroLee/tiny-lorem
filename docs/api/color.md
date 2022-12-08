# Color

随机生成一个颜色。支持 hex，rgb，rgba，hsl 和 hsla 颜色。

## hex

随机生成一个十六进制颜色。

| 名称  | 类型    | 必填 | 默认值 | 描述                                                                      |
| ----- | ------- | ---- | ------ | ------------------------------------------------------------------------- |
| alpha | boolean | 否   | false  | 是否包含透明度。包含透明度的十六进制颜色为 8 位，最后两位表示透明度信息。 |

返回类型: string

```ts
lorem.color.hex(); // #1cfd03
lorem.color.hex(true); // #af13a4fc
```

## rgb

随机生成一个 rgb 颜色。

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| type | 'legacy'\|'modern' | 否 | legacy | 此项针对 css 中 rgb 颜色的格式。legacy 为传统写法，颜色值之间由逗号分隔：rgb(255, 255, 255)；modren 为现代写法，颜色值之间由空格分隔：rgb(255 255 255)。 |

返回类型: string

```ts
lorem.color.rgb(); // rgb(222, 20, 98)
lorem.color.rgb('modern'); // rgb(234 52 138)
```

## rgba

随机生成一个 rgba 颜色。

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| type | 'legacy'\|'modern' | 否 | legacy | 此项针对 css 中 rgba 颜色的格式。legacy 为传统写法，颜色值之间由逗号分隔：rgba(255, 255, 255, 0.1)；modren 为现代写法，颜色值之间由空格分隔：rgb(255 255 255 / 10%)。 |

返回类型: string

```ts
lorem.color.rgba(); // rgb(170, 218, 107, 0.78)
lorem.color.rgba('modern'); // rgb(47 170 163 / 51%)
```

## hsl

随机生成一个 hsl 颜色。

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| type | 'legacy'\|'modern' | 否 | legacy | 此项针对 css 中 hsl 颜色的格式。legacy 为传统写法，颜色值之间由逗号分隔：hsl(255, 23%, 10%)；modren 为现代写法，颜色值之间由空格分隔：hsl(255 23% 10%)。 |

返回类型: string

```ts
lorem.color.hsl(); // hsl(234, 21%, 46%)
lorem.color.hsl('modern'); // hsl(102 20% 6%)
```

## hsla

随机生成一个 hsla 颜色。

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| type | 'legacy'\|'modern' | 否 | legacy | 此项针对 css 中 hsla 颜色的格式。legacy 为传统写法，颜色值之间由逗号分隔：hsla(255, 23%, 10%, 10%)；modren 为现代写法，颜色值之间由空格分隔：hsl(255 23% 10% / 10%)。 |

返回类型: string

```ts
lorem.color.hsla(); // hsl(84, 66%, 32%, 0.74)
lorem.color.hsla('modern'); // hsl(160 49% 1% / 52%)
```
