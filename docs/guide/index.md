---
layout: doc
---

# 快速上手

## 概述

`tiny-lorem`是一个使用 typescript 编写的现代 javascript 库, 拥有完善的类型提示, 用于生成模拟数据。可用于**浏览器**和**node**环境。

## 安装

:::code-group

```sh [pnpm]
pnpm add tiny-lorem
```

```sh [yarn]
yarn add tiny-lorem
```

```sh [npm]
npm install tiny-lorem
```

:::

## 使用

ESM(esModule)

```ts
import TinyLorem from 'tiny-lorem';
const lorem = new TinyLorem();

// 随机返回一个中文词
lorem.texts.word();
```

CJS(CommonJs)

```ts
const TinyLorem = require('tiny-lorem');
const lorem = new TinyLorem();

// 随机返回一个中文词
lorem.texts.word();
```
