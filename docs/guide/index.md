---
layout: doc
---

# 快速上手    

## 概述
`tiny-lorem`是一个使用typescript编写的现代javascript库, 拥有完善的类型提示, 用于生成模拟数据。可用于**浏览器**和**node**环境。    

## 安装    
pnpm   
```shell
npm insstall tiny-lorem
```

yarn  
```shell
yarn insstall tiny-lorem
```

npm   
```shell
npm insstall tiny-lorem
```

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
