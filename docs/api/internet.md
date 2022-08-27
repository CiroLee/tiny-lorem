# Internet

随机生成网络相关内容。包含ip，url，email，手机号和uuid等。      

## ipv4

随机生成一个ipv4地址。    

```ts
lorem.internet.ipv4(); // 101.74.177.8
```

## ipv6

随机生成一个ipv6地址。    

```ts
lorem.internet.ipv6(); // 1f2c:3ff1:4016:7734:e014:fa37:becd:e726
```

## url

随机生成一个url地址。     

| 名称       | 类型                | 必填  | 默认值 | 描述                                                                      |
| -------- | ----------------- | --- | --- | ----------------------------------------------------------------------- |
| sub      | boolean\|number | 否   |  false   | 子目录层级。设置为true，则随机生成1~4层子目录。设置具体数值，则生成指定层子目录(最大10层)。缺省或设置为false， 不生成子目录。 |
| protocol | string            | 否   |     | 网络协议。可自定义网络协议。缺省则随机生成常用网络协议。                                            |

```ts
lorem.internet.url(); // http://ovxuxfvb.jx.cn
lorem.internet.url({ sub: true, protocol: 'https'}); // https://xoefumbzt.hk.cn/kccg
lorem.internet.url({ sub: 2, protocol: 'https' }); // https://toexaw.info/g/nc
```

## email

随机生成一个邮箱。     

```ts
lorem.internet.email(); // mL4eMhRy/@inbox.com
```

## mobile

随机生成一个11位手机号。    

| 名称     | 类型      | 必填  | 默认值   | 描述       |
| ------ | ------- | --- | ----- | -------- |
| hidden | boolean | 否   | false | 是否隐藏中间四位 |

```ts
lorem.internet.mobile(); // 18658112949
lorem.internet.mobile(true); // 132****6003
```

## uuid

随机生成一个uuid。     

```ts
lorem.internet.uuid(); // 276f8b52-c752-48c8-afb0-22a43e6d6d4b
```
