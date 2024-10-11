# Image

随机生成图片。包含纯色占位图和真实照片。

::: tip

占位图来自：[https://dummyimage.com](https://dummyimage.com)

真实图片来自：[https://picsum.photos](https://picsum.photos)

分类图片来自：[https://loremflickr.com](https://loremflickr.com)

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

返回类型: string

```ts
lorem.image.pcisum(); // https://picsum.photos/746/975
lorem.image.picsum({ width: 100 }); // https://picsum.photos/100/100
lorem.image.picsum({ grayscale: true, blur: 2 }); // https://picsum.photos/958/676?grayscale&blur=2
```

## classify

随机返回一张分类图片(如果设置了 type)

```ts
export type TypicalImageType =
  | 'animals'
  | 'business'
  | 'city'
  | 'fashion'
  | 'food'
  | 'nature'
  | 'nightlife'
  | 'people'
  | 'sports'
  | 'technics'
  | 'transport';
```

| 名称   | 类型             | 必填 | 默认值 | 描述                                                  |
| ------ | ---------------- | ---- | ------ | ----------------------------------------------------- |
| type   | TypicalImageType | 是   |        | 图片种类。缺省或是不支持的种类， 将随机返回一张图片   |
| width  | number           | 否   |        | 图片宽度。缺省则随机生成[320, 1024]之间整数作为宽度。 |
| height | number           | 否   |        | 图片高度。缺省则随机生成[320, 1024]之间整数作为高度。 |
| lock   | boolean          | 否   | false  | 设置 lock 为 true，将始终返回同一张图片               |

返回类型: string

```ts
lorem.image.classify({ type: 'animals', width: 100 }); // https://loremflickr.com/100/100/animals
lorem.image.classify({ type: lorem.IMAGETYPES.avatar, width: 100 }); // https://loremflickr.com/100/100/avatar
lorem.image.classify({ type: lorem.IMAGETYPES.avatar, width: 100, lock: true }); // https://loremflickr.com/100/100/avatar?lock=89323
```
