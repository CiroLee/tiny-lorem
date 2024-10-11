# Unique

随机生成唯一值信息。

## vrm

随机生成一个中国大陆车牌号码。

返回类型: string

```ts
lorem.unique.vrm(); // 鲁LXB2AQ
lorem.unique.vrm(); // 贵E2XB8挂
```

## vin

随机生成一个车辆识别码。

返回类型: string

```ts
lorem.unique.vin(); // ZPBRU74E8ED341611
```

## id

随机生成中国大陆身份证(二代)号码。

返回类型: string

```ts
lorem.unique.id(); // 387218270302124269
```

## uuid

随机生成一个 uuid。

返回类型: string

```ts
lorem.internet.uuid(); // 276f8b52-c752-48c8-afb0-22a43e6d6d4b
```

## nanoid

随机生成一个 nanoid。  
返回类型: string

| 名称 | 类型   | 必填 | 默认值 | 描述             |
| ---- | ------ | ---- | ------ | ---------------- |
| size | number | 否   | 21     | nanoid字符串长度 |

```ts
lorem.unique.nanoid(); // kO1iTmwi2OdaYGhd1ezmJ
```
