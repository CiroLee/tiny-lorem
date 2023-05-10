# CHANGELOG

## 2023-5-10

version 0.1.1  
新增:  
develop 模块

- `gitCommitSha`函数。
- `gitCommitShortSha`函数
- `gitBranch`函数
- `version`函数
- `md5`函数
- `password`函数

## 2023-4-5

version 0.1.0  
新增:

- `number.intBy`函数。

移除:

- 0.1.0 版本之后移除`text.config`函数。

修复&优化:

- (fix)`datetime`函数修改为`dateTime`
- (fix)修改`internet.url`函数的参数`subLevel`为`domainLevel`
- (opt)优化`helper.elements`函数参数泛型
- (otp)优化`date.dateTime`函数，支持更多自定义格式化样式

## 2022-12-26

新增：

- `image.classify`函数。支持图片分类

## 2022-12-8

优化：

- `color`相关函数参数优化 lengacy --> legacy

## 2022-10-18

新增：

- 新增`finance.bankCardNumber`函数
- 新增`finance.amount`函数
- 新增`internet.domain`函数
- 新增`internet.httpStatusCode`函数
- 新增`internet.httpMethod`函数

优化:

- 优化`internet.url`函数

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
