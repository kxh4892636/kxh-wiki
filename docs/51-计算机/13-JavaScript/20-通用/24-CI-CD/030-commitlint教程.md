# commitlint 教程

## 基础

##### commitlint

- git commit 风格检查；

##### 安装

```bash
pnpm add --save-dev @commitlint/cli @commitlint/config-conventional
```

##### 配置

```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.cjs
```

##### 搭配 husky 添加 hook

- [[010_husky教程]]；

## 规范

##### 结构

```json
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
```

##### 类型

- 使用小写；
  - build：构建系统或外部依赖的修改；
  - chore：构建流程 /ci 的修改；
  - docs：文档修改；
  - feat：新功能；
  - fix：修复 bug；
  - perf：性能优化；
  - refactor：重构；
  - revert：回退代码；
  - style：代码风格修改；
  - test：测试；
