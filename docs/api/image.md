# Image

随机生成图片。包含纯色占位图和真实照片。

::: tip

占位图来自：[https://dummyimage.com](https://dummyimage.com)

真实图片来自：[https://picsum.photos](https://picsum.photos)

:::

::: warning

分类图片函数`classify`由于[LoremFlickr](https://loremflickr.com/)接口限制，在0.1.6版本后已经废弃。

:::

## placeholder

随机生成一张纯色占位图。

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| width | number | 否 |  | 图片宽度。缺省则随机生成[320, 1024]之间整数作为宽度。 |
| height | number | 否 |  | 图片高度。缺省则随机生成[320, 1024]之间整数作为高度。 |
| text | string | 否 |  | 图片文本。 |
| bgColor | string | 否 |  | 图片背景色。支持 rgb \| rgba \| hsl \|hsla \| hex 格式颜色。注意：**颜色的透明度将被忽略**。省略该参数，则会随机生成一个颜色。 |
| fontColor | string | 否 |  | 图片背景色。支持 rgb \| rgba \| hsl \|hsla \| hex 格式颜色。注意：**颜色的透明度将被忽略**。省略该参数，则会根据背景色是否为深色， 生成浅色(#fff)文字或深色(#333)文字。 |

返回类型: string  
::: tip Note

如果`width`, `height` 只缺省一个， 则会生成一个同样的值(作为宽或高)。这在生成一个正方形的图片时非常有用。用法同样适用于`picsum`

:::

```ts
lorem.image.placeholder(); // https://dummyimage.com/564x692/c157ea
lorem.image.placeholder({ width: 100 }); // https://dummyimage.com/100x100/85ba73
lorem.image.placeholder({ text: 'image' }); // https://dummyimage.com/835x642/e2e3c4/333333&text=image
lorem.image.placeholder({ bgColor: '#333', text: 'image' }); // https://dummyimage.com/461x994/333/ffffff&text=image
lorem.image.placeholder({ bgColor: '#333', fontColor: 'hsl(153deg 47% 49%)', text: 'image' }); // https://dummyimage.com/871x445/333/42b883&text=image
```

## picsum

随机生成一张真实照片。

| 名称      | 类型    | 必填 | 默认值 | 描述                                                  |
| --------- | ------- | ---- | ------ | ----------------------------------------------------- |
| width     | number  | 否   |        | 图片宽度。缺省则随机生成[320, 1024]之间整数作为宽度。 |
| height    | number  | 否   |        | 图片高度。缺省则随机生成[320, 1024]之间整数作为高度。 |
| grayscale | boolean | 否   | false  | 图片是否灰阶。                                        |
| blur      | number  | 否   | 0      | 图片模糊度。数值在[0, 10]之间的整数。                 |
| random    | boolean | 否   | false  | random为true时，可以防止图片被缓存                    |

返回类型: string

```ts
lorem.image.pcisum(); // https://picsum.photos/746/975
lorem.image.pcisum({ random: true }); // https://picsum.photos/746/975?random=21343
lorem.image.picsum({ width: 100 }); // https://picsum.photos/100/100
lorem.image.picsum({ grayscale: true, blur: 2 }); // https://picsum.photos/958/676?grayscale&blur=2
```
