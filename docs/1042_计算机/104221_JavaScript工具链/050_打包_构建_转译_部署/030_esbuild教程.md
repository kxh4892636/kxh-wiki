# esbuild 教程

## 基础

##### 安装

```bash
pnpm add esbuild --save-dev
```

## 命令

##### 命令行形式

```json
{
  "scripts": {
    "build": "esbuild app.jsx --bundle --outfile=out.js"
  }
}
```

##### 配置文件形式

```javascript
// esbuild.config.js
import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["app.jsx"],
  bundle: true,
  outfile: "out.js",
});

{
  "scripts": {
    "build": "node ./esbuild.config.js"
  }
}
```

## 打包

### 打包环境

##### 浏览器

- 默认为浏览器环境;

```bash
esbuild app.jsx --bundle --minify --sourcemap
```

##### node

- 使用 platform 指定 node 环境;

```bash
esbuild app.js --bundle --platform=node
```

## 配置文件

##### node

```javascript
/* eslint-disable no-dupe-keys */
import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/main.ts"], // 入口文件
  bundle: true, // 打包依赖
  platform: "node", // node 环境
  outdir: "dist", // 输入目录
  sourcemap: true, // 使用 sourcemap
  format: "esm", // 转换为 esm 格式
  minify: true, // 最小化
  target: "esnext", // 输出 es 版本
  // 解决 cjs 模块转换至 esm 模块的各种冲突
  banner: {
    js: `
        import path from 'path';
        import { fileURLToPath } from 'url';
        import { createRequire as topLevelCreateRequire } from 'module';
        const require = topLevelCreateRequire(import.meta.url);
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        `,
  },
});
```

## 疑难杂症

##### "Dynamic require of "os" is not supported"

- 设置配置文件中的 banner;
