---
id: 1b056aeb-b161-4d0a-8675-e6a74c6953dd
---

# jsdoc 教程

## jsdoc 基础

##### jsdoc

- 用于 js 的 API 文档生成器；
- 使用特殊的 JSDoc 标签自动生成文档；

##### 安装 jsdoc

```bash
npm instal jsdoc -g
```

##### 添加注释

```typescript
/** This is a description of the foo function. */
function foo() {}
```

## 块级标签

##### @async

- @async：表示函数是异步的；

##### @author

- @author name\> [\<emailAddress]：表示作者信息；

##### @callback

- @callback namepath：创建一个回调函数类型；

##### @copyright

- @copyright some copyright text：表示版权信息；

##### @default

- @default [some value]：表示默认值；

##### @description

- @description some description：描述信息；

##### @example

- @example：展示例子，其后注释显示为代码；

##### @exports

- @exports moduleName：表示输出模块；

##### @file

- @file descriptionOfFile：文件描述信息；

##### @function

- @function [functionName]：表示为函数；

##### @module

- `@module [[{type\>}] \<moduleName]`：表示为模块；

##### @param

- `@param [type\>]  [\<description]`：表示函数参数；

```typescript
// 带有属性的参数
/**
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */
Project.prototype.assign = function (employee) {
  // ...
};
// 可选参数
/**
 * @param {string} [somebody] - Somebody's name.
 */
function sayHello(somebody) {
  // ...
}
// 可选参数和默认值
/**
 * @param {string} [somebody=John Doe] - Somebody's name.
 */
function sayHello(somebody) {
  // ...
}
// 多种类型
/**
 * @param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names.
 */
function sayHello(somebody) {
  //...
}
// 任何类型
/**
 * @param {*} somebody - Whatever you want.
 */
function sayHello(somebody) {
  // ...
}
// 任意数量的参数
/**
 * Returns the sum of all numbers passed to the function.
 * @param {...number} num - A positive or negative number.
 */
function sum(num) {
  //...
}
// 回调参数
/**
 * @callback requestCallback
 * @param {number} responseCode
 * @param {string} responseMessage
 */
/**
 * @param {requestCallback} cb - The callback that handles the response.
 */
function doSomethingAsynchronously(cb) {
  // code
}
```

##### @readonly

- @readonly：表示只读；

##### @return

- `@return [{type}] [description]`：表示函数返回值；

##### @version

- @version version：表示版本信息；

## 模板

### 通用

```json
{
  "文件注释": {
    "prefix": "fileHeader",
    "body": [
      "/*",
      "* @file: $1",
      "* @Author: $2",
      "* @Date: $3",
      "* @LastEditors: $2",
      "* @LastEditTime: $3",
      "*",
      "* Copyright (c) $4 by $2, All Rights Reserved.",
      "*/"
    ],
    "description": "文件注释"
  }
}
```

### react + ts

```json
{
  "组件注释": {
    "prefix": "component_comments",
    "body": [
      "/**",
      "* @description $1",
      "* @module $2",
      "* @author $3",
      "* @param $4",
      "* @export module: $2"
    ],
    "description": "创建组件注释"
  },

  "函数注释": {
    "prefix": "function_comments",
    "body": ["/**", "* @description $1", "* @autor $3", "* @param $4"],
    "description": "创建函数注释"
  }
}
```
