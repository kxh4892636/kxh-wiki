---
id: 2ebf8cf7-32db-4456-bedd-2cf178a4f9d3
---

# pLimit 教程

##### pLimit

- promise 并发数量控制；

##### 安装

```typescript
pnpm add p-limit
```

##### 基础使用

```typescript
import pLimit from "p-limit";

// 限制并发数量, 默认为 infinity
const limit = pLimit(1);

const input = [
  limit(() => fetchSomething("foo")),
  limit(() => fetchSomething("bar")),
  limit(() => doSomething()),
];

const result = await Promise.all(input);
console.log(result);
```
