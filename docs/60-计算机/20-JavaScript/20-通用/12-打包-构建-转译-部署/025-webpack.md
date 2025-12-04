---
id: aebb24b3-6792-4955-82cc-0ea283f00442
---

# webpack

## 构建过程

- 初始化;
  - 根据配置文件和 shell 语句读取参数;
  - 初始化 plugin 和 loader;
- 编译构建流程;
  - 从入口文件出发, 串行执行 module, 使用 loader 翻译 module;
  - 找到依赖该 module 的 module, 递归进行编译构建;
  - 如果定义了若干 plugin, 在对应生命周期拓展 Webpack 行为;
- 输出: 对于比那以后的 module 进行合并处理, 形成 chunk, 输出到文件系统;

## loader 和 plugin

### loader

##### 基础

- 对于模块进行转换, 在加载模块时处理文件;
- 将非 js 文件转换为 js 文件;

##### 配置方式

- 配置文件定义;
- 内联方式: import 显示指定;
- cli: shell 命令指定;

##### 特性

- 链式调用;
- 在 loader 处理结果之后继续处理;

##### 常见的 loader

- style-loader: css 添加到内联 style 中;
- css-loader: 允许 css 通过 require 引入;
- less-loader;
- sass-loader;
- postcss-loader;
- url-loader;
- html-minify-loader;
- babel-loader;

### plugin

##### 基础

- 运行在 webpack 的生命周期的钩子之中;
- 拓展 webpack 的行为;

##### 配置方式

- 配置文件定义;
- 内联方式: import 显示指定;
- cli: shell 命令指定;

##### 常见的 plugin

- clean-webpack-plugin: 自动清理构建目录;
- mini-css-extract-plugin: 单独提取 css 至一个文件中;
- BabelMinifyWebpackPlugin: 使用 babel-minify 进行压缩;
- CopyWebpackPlugin: 将文件或目录复制到构建目录;
- DefinePlugin: 编译时创建全局对象;

### loader 和 plugin 的不同

- loader;
  - 文件夹加载器, 对于文件进行处理, 打包到指定文件中;
  - 运行在文件打包之前;
- plugin;
  - 拓展 webpack 功能, 解决 loader 无法实现的行为;
  - 在 WebPack 整个生命周期运行;
    - WebPack 基于订阅者模式实现事件机制, plugin 通过监听事件, 修改 WebPack 输出, 拓展其行为;
