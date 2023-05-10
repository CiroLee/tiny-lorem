## Develop

随机生成开发相关数据。

## gitCommitSha

随机生成一个标准 git commit SHA。

返回类型: string

```ts
lorem.develop.gitCommitSha(); // 33bAcd1ccE1B8a1782C825C7CE85fC2A0aa86fa7
```

## gitCommitShortSha

随机生成一个短 git commit SHA

返回类型: string

```ts
lorem.develop.gitCommitShortSha(); // aB67E67
```

## gitBranch

随机生成一个 git 分支。

返回值: string

```ts
lorem.develop.gitBranch(); // docs/add-api-documentation
```

## version

随机生成一个版本号。

返回值: string

```ts
lorem.develop.version(); // 1.0.0
```

## md5

随机生成一个 md5 字符串。

返回类型: string

```ts
lorem.develop.md5(); // 9f86d081884c7d659a2feaa0c55ad015
```

## password

随机生成一个密码。支持不同强度和长度。

<!-- | 名称     | 类型   | 必填   | 默认值 | 描述     |
| -------- | ------ | ------ | ------ | -------- | ------ | -------- |
| length   | number | 是     |        | 密码长度 |
| strength | low    | medium | high   | 否       | medium | 密码强度 | -->

| 名称     | 类型                  | 必填 | 默认值 | 描述     |
| -------- | --------------------- | ---- | ------ | -------- |
| length   | number                | 是   |        | 密码长度 |
| strength | low \| medium \| high | 否   | medium | 密码强度 |

返回类型: string

```ts
lorem.develop.password(12); // pvljwcssbdbt
lorem.develop.password(12, 'low'); // zl22LdITIdcI
lorem.develop.password(12, 'high'); // yCH7LsmWQsA!
```
