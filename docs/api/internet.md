# Internet

随机生成网络相关内容。包含 ip，url，email，手机号和 uuid 等。

## ipv4

随机生成一个 ipv4 地址。

返回类型: string

```ts
lorem.internet.ipv4(); // 101.74.177.8
```

## ipv6

随机生成一个 ipv6 地址。

返回类型: string

```ts
lorem.internet.ipv6(); // 1f2c:3ff1:4016:7734:e014:fa37:becd:e726
```

## url

随机生成一个 url 地址。

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| sub | boolean\|number | 否 | false | 子目录层级。设置为 true，则随机生成 1~4 层子目录。设置具体数值，则生成指定层子目录(最大 10 层)。缺省或设置为 false， 不生成子目录。 |
| protocol | string | 否 |  | 网络协议。可自定义网络协议。缺省则随机生成常用网络协议。 |
| suffix | string | 否 |  | 域名后缀(如.com, .org, .com.cn 等)。注意：**域名后缀需要包含点号**。 |
| subLevel | string | 否 |  | 子域名层级。默认为 1~3 层。 |

返回类型: string

```ts
lorem.internet.url(); // news://34.s.et
lorem.internet.url({ sub: true, protocol: 'https' }); // https://xoefumbzt.hk.cn/kccg
lorem.internet.url({ sub: 2, protocol: 'https' }); // https://ajaph9sy.g3ei.d2xj9og8p.idv
lorem.internet.url({ protocol: 'https', subLevel: 1 }); // https://t51.aero
lorem.internet.url({ protocol: 'https', subLevel: 1, suffix: '.com.cn' }); // https://lpr.com.cn
```

## email

随机生成一个邮箱。

返回类型: string

```ts
lorem.internet.email(); // mL4eMhRy/@inbox.com
```

## mobile

随机生成一个 11 位手机号。

| 名称   | 类型    | 必填 | 默认值 | 描述             |
| ------ | ------- | ---- | ------ | ---------------- |
| hidden | boolean | 否   | false  | 是否隐藏中间四位 |

返回类型: string

```ts
lorem.internet.mobile(); // 18658112949
lorem.internet.mobile(true); // 132****6003
```

## uuid

随机生成一个 uuid。

返回类型: string

```ts
lorem.internet.uuid(); // 276f8b52-c752-48c8-afb0-22a43e6d6d4b
```

## landline

随机生成一个中国大陆固定电话号码。

返回类型: string

```ts
lorem.internet.landline(); // 0718-35113386
```
