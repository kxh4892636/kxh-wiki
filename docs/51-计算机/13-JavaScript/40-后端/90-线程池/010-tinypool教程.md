---
id: 9c895f07-2e9d-412d-b755-ed5716a96c97
---

# tinypool 教程

## 基础

##### tinypool

- 线程池库；

##### 安装

```bash
pnpm add tinypool
```

## 基本使用

### 默认导出

##### 主函数定义

- 文件路径使用 URL()；
- 文件路径使用 file 格式；
  - import.meta.url；
  - 手动拼接；

```typescript
import Tinypool from "tinypool";

const pool = new Tinypool({
  // The URL must be a file:// URL
  filename: new URL("./worker.js", import.meta.url).href,
});

const result = await pool.run({ a: 4, b: 6 });
console.log(result); // Prints 10
```

##### 工作函数定义

- 函数参数使用一个 object 定义；

```typescript
export default ({ a, b }) => {
  return a + b;
};
```

### 命名导出

##### 主函数定义

```typescript
import Tinypool from "tinypool";

const pool = new Tinypool({
  // The URL must be a file:// URL
  filename: new URL("./worker.js", import.meta.url).href,
});

const result = await pool.run({ a: 4, b: 6 }, { name: "add" });
console.log(result); // Prints 10
```

##### 工作函数定义

```typescript
export function add({ a, b }) {
  return a + b;
}

export function multiply({ a, b }) {
  return a * b;
}
```

### typescript

##### 主函数定义

```typescript
import Tinypool from "tinypool";

const pool = new Tinypool({
  // The URL must be a file:// URL
  filename: new URL("./worker.ts", import.meta.url).href,
  // ESM config
  execArgv: [
    "--loader",
    "ts-node/esm",
    "--experimental-specifier-resolution=node",
  ],
});

const result = await pool.run({ a: 4, b: 6 }, { name: "add" });
console.log(result); // Prints 10
```

##### 工作函数定义

```typescript
export function add({ a, b }) {
  return a + b;
}

export function multiply({ a, b }) {
  return a * b;
}
```

## 最佳实践

### js/ts 公用一套代码

```typescript
import path from "path";
import { Tinypool } from "tinypool";

// Whether it is ts
const isTS = path.extname(import.meta.url) === ".ts";

export const createPool = (filePath: string) => {
  if (isTS) {
    // Transform to file format
    return new Tinypool({
      filename: new URL("file://" + filePath).href,
      execArgv: [
        "--loader",
        "ts-node/esm",
        "--experimental-specifier-resolution=node",
      ],
    });
  }

  // Modify the file path and transform to file format
  const fileName = path.basename(filePath, ".ts");
  const dirName = path
    .dirname(filePath)
    .replace(process.cwd() + "/src", process.cwd() + "/dist");
  const jsFilePath = path.join(dirName, fileName) + ".js";
  return new Tinypool({
    filename: new URL("file://" + jsFilePath).href,
  });
};
```
