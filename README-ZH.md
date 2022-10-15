<div align="center">
  <img src="https://img1.imgtp.com/2022/08/27/gZORCuUm.svg" style="width: 240px" alt="logo" />
  <h1>tiny-lorem</h1>
</div>

> 用于生成模拟数据的现代 JavaScript 工具库。拥有完善的类型提示。可用于浏览器环境和 node 环境。

[English](README.md) | [简体中文](README-ZH.md)

[![codecov](https://codecov.io/gh/cirolee/tiny-lorem/branch/main/graph/badge.svg)](https://codecov.io/gh/cirolee/tiny-lorem/branch/main) ![npm bundle size](https://img.shields.io/bundlephobia/min/tiny-lorem) ![GitHub release (release name instead of tag name)](https://img.shields.io/github/v/release/cirolee/tiny-lorem) ![GitHub](https://img.shields.io/github/license/cirolee/tiny-lorem)

## 案例

[![](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vitejs-vite-84xphd?file=index.html)

## 安装

pnpm

```shell
pnpm install tiny-lorem
```

yarn

```shell
yarn install tiny-lorem
```

npm

```shell
npm install tiny-lorem
```

## 使用

ESM(ESModule)

```ts
import TinyLorem from 'tiny-lorem';
const lorem = new TinyLorem();

lorem.texts.word(); // 汉
lorem.number.int(); // 123
```

CJS(CommonJs)

```ts
const TinyLorem = require('tiny-lorem').default;
const lorem = new TinyLorem();

lorem.texts.word(); // 汉
lorem.number.int(); // 123
```

## API 文档

[文档](https://ciro.club/tiny-lorem)

## Inspired by

[Mockjs](https://github.com/nuysoft/Mock)  
[faker-js](https://github.com/faker-js/faker)

## LICENSE

[MIT](LICENSE)
