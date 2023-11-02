---
id: b6409bf7-4517-46a9-acea-fe3c5e2e0df3
---

# execa 教程

## execa 入门

##### 安装

```bash
npm install execa
```

## 回调接口

```typescript
import { execa } from "execa";
// 除名字不一样, 其余与 spawn 一模一样
const cp = execa("echo", ["unicorns"]);
// ...
```

## promise 接口

```typescript
import { execa } from "execa";
// 参数和 spawsn 一模一样
// stdout 正常输出
// stderr 异常输出
// exitCode 退出编码
// failed 是否运行失败
// timedOut 是否超时
// killed 是否被杀死
const { stdout, stderr, exitCode, failed, timedOut, killed } = await execa(
  "echo",
  ["unicorns"]
);
```

## 命令行

```typescript
import { $ } from "execa";

const branch = await $`git branch --show-current`;
```
