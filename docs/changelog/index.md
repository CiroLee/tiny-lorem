# CHANGELOG

## 2022-09-24

bugfix:

- 修复在部分前端框架下 module 报错问题(`module is not defined`)

## 2022-09-16

优化:  
`helper.elements`泛型优化  
新增:

- 新增`unique.vrm`函数
- 新增`unique.vin`函数
- 新增`unique.id`函数
- 新增`internet.tld`函数

## 2022-09-04

新增:

- `address.zipCode`函数，生成邮政编码
- `address.longAndLat`函数，生成经纬度
- `helper.falsy`函数，生成 falsy 值
- `internet.landline`函数，生成固定电话号码

常规优化

## 2022-09-01

正式版 v0.0.2 内容优化：

- 优化`texts.name`函数中文名来源。
- 优化`helper.array`函数类型返回判断
- 优化单元测试

## 2022-08-30

versionv0.0.14-beta  
feat:

- 增加批量生成数据函数`array`, `json`

fix:

- 修复 texts.name 函数入参有误的问题。

## 2022-08-27

第一个测试版本发布 v0.0.1beta 包含一下新功能:

- Texts
- Number
- Internet
- Image
- Date
- Color
- Address
- Helper
