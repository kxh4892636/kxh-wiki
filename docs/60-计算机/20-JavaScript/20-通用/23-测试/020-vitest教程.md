---
id: 1fd423c5-f32a-425a-b94e-a660b7e895f1
---

# vitest

## 基础

### 安装

```bash
pnpm add -D vitest
```

## 工作区

### 工作区配置文件

- vitest.workspace.ts；

```typescript
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  'packages/*/vitest.config.{e2e,unit}.ts'
  {
    test: {
      name: "happy-dom",
      root: "./shared_tests",
      environment: "happy-dom",
      setupFiles: ["./setup.happy-dom.ts"],
    },
  },
  {
    test: {
      name: "node",
      root: "./shared_tests",
      environment: "node",
      setupFiles: ["./setup.node.ts"],
    },
  },
]);
```

### 项目配置文件

- 同 vitest.config.ts；
- 工作区项目不支持所有配置属性；
- 使用 defineProject 方法；

```typescript
import { defineProject } from "vitest/config";

export default defineProject({
  test: {
    environment: "jsdom",
    // "reporters" is not supported in a project config,
    // so it will show an error
    reporters: ["json"],
  },
});
```

### 运行测试

```bash
# 所有项目
pnpm run test
# 指定项目
pnpm run test --project e2e --project unit
```

## 命令行

### 基础命令

```bash
# 启动测试, 开发模式进入 watch 模式, ci 进入 run 模式
# 使用正则表达式匹配文件
vitest foobar

# 单次运行
vitest run

# 监听文件变化, 变化一次运行一次
vitest watch

# 运行基准测试
vitest bench
```

### 命令行选项

- [命令行选项](https://vitest.dev/guide/cli.html#options)；

## 覆盖测试

### 运行覆盖测试

- 使用 `--coverage` 标识；

```bash
vitest run --coverage
```

### 配置覆盖测试

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      reporter: ["text", "json", "html"],
      // ...
    },
  },
});
```

## 快照测试

### 运行快照测试

- 使用 `toMatchSnapshot()` API；
- 第一次执行快照测试，保存快照至指定位置；

```typescript
import { expect, it } from "vitest";

it("toUpperCase", () => {
  const result = toUpperCase("foobar");
  expect(result).toMatchSnapshot();
});
```

### 内联快照

- 使用 `toMatchInlineSnapshot()` API；
- 将快照文件存储在测试文件中；

```typescript
import { expect, it } from "vitest";

it("toUpperCase", () => {
  const result = toUpperCase("foobar");
  expect(result).toMatchInlineSnapshot();
});
```

### 更新快照

- 使用 `--update` 标识；

```typescript
vitest --update
```

## Mocking

- 模拟测试中某模块结果；
- 我一般不用，略；

## 报告器

- 不同格式显示测试结果；

```typescript
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    reporters: ["verbose"],
  },
});
```

## 测试 API

### test

##### 基础

- 定义一次测试；

```typescript
import { expect, test } from "vitest";

test("should work as expected", () => {
  expect(Math.sqrt(4)).toBe(2);
});
```

##### 跳过测试

- 跳过测试但不删除；

```typescript
import { assert, test } from "vitest";

test.skip("skipped test", () => {
  // Test skipped, no error
  assert.equal(Math.sqrt(4), 3);
});
```

### bench

##### 基础

- 性能基准测试；

```typescript
import { bench } from "vitest";

bench(
  "normal sorting",
  () => {
    const x = [1, 5, 4, 2, 3];
    x.sort((a, b) => {
      return a - b;
    });
  },
  { time: 1000 }
);
```

##### 跳过测试

- 跳过测试但不删除；

```typescript
import { bench } from "vitest";

bench.skip("normal sorting", () => {
  const x = [1, 5, 4, 2, 3];
  x.sort((a, b) => {
    return a - b;
  });
});
```

### describe

##### 基础

- test 或 bench 的抽象；

```typescript
import { expect, test, describe } from "vitest";
import { sum } from "./sum";

describe("Test the Route class", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

##### 跳过测试

- 跳过测试但不删除；

```typescript
import { expect, test, describe } from "vitest";
import { sum } from "./sum";

describe.skip("Test the Route class", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

### 预先设置

##### 重复设置

```typescript
// 每次执行前运行
beforeEach(() => {
  initializeCityDatabase();
});

// 每次执行后运行
afterEach(() => {
  clearCityDatabase();
});
```

##### 一次性设置

```typescript
// 所有测试执行前运行一次
beforeAll(() => {
  return initializeCityDatabase();
});

// 所有测试执行后运行一次
afterAll(() => {
  return clearCityDatabase();
});
```

##### 作用域

```typescript
// 应用于所有测试
beforeEach(() => {
  return initializeCityDatabase();
});

describe("matching cities to foods", () => {
  // 只应用于该 describe
  beforeEach(() => {
    return initializeFoodDatabase();
  });
});
```

## 断言

### 软断言

- 断言失败是不会终止测试；
- 而是标记该测试为失败，继续进行其余测试；

```typescript
import { expect, test } from "vitest";

test("expect.soft test", () => {
  expect.soft(1 + 1).toBe(3); // mark the test as fail and continue
  expect.soft(1 + 2).toBe(4); // mark the test as fail and continue
});
```

### 取反

```typescript
import { expect, test } from "vitest";
const input = Math.sqrt(16);
expect(input).not.to.equal(2); // chai API
expect(input).not.toBe(2); // jest API
```

### 相等

```typescript
// 比较原子类型或引用是否相等
test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});

// 比较浮点数类型
test("decimals are rounded to 5 after the point", () => {
  // 0.2 + 0.1 is 0.30000 | "000000000004" removed
  expect(0.2 + 0.1).toBeCloseTo(0.3, 5);
  // nothing from 0.30000000000000004 is removed
  expect(0.2 + 0.1).not.toBeCloseTo(0.3, 50);
});

// 比较对象结构是否相等
// 忽略 undefined 属性
test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

// 严格比较对象结构是否相等
// 检查 undefined 属性, 数组稀疏性, 对象类型
test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toStrictEqual({ one: 1, two: 2 });
});
```

### 布尔判断

```typescript
class A {}
test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).toBeUndefined();
  expect(n).toBeTruthy();
  expect(n).toBeFalsy();
  expect(n).toBeNaN();
  expect(n).toBeTypeOf();
  expect(new A()).toBeInstanceOf(A);
});
```

### 数字

```typescript
test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);
});
```

### 数组

```typescript
const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];

test("the shopping list has milk on it", () => {
  expect(shoppingList).toContain("milk");
  expect(new Set(shoppingList)).toContain("milk");
  // toContain 的 Equal 版本
  expect(new Set(shoppingList)).toContainEqual("milk");
});
```

### 属性

```typescript
import { expect, test } from "vitest";

test("toHaveLength", () => {
  // 是否具有 .length 属性
  expect([1, 2, 3]).toHaveLength(3);
  // 是否具有 isActive 属性
  expect(invoice).toHaveProperty("isActive");
});
```

### 正则表达式

```typescript
import { expect, test } from "vitest";

test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});
```

### 异常

```typescript
import { expect, test } from "vitest";

function compileAndroidCode() {
  throw new Error("you are using the wrong JDK!");
}

// 使用箭头函数包裹
test("compiling android goes as expected", () => {
  expect(() => compileAndroidCode()).toThrowError();
  expect(() => compileAndroidCode()).toThrowError(Error);
});
```

### 快照

- [[#快照测试]]；

### 异步

```typescript
import { expect, test } from "vitest";

test("the data is peanut butter", () => {
  return expect(fetchData()).resolves.toBe("peanut butter");
});

test("the fetch fails with an error", () => {
  return expect(fetchData()).rejects.toMatch("error");
});
```

## 测试环境

### 常见测试环境

- node：默认环境；
- jsdom：使用 jsdom 模拟浏览器环境；
- happy-dom：使用 happy-dom 模拟浏览器环境；
- edge-runtime：模拟 vercel edge 环境；

### 配置测试环境

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineProject({
  test: {
    environment: "jsdom",
  },
});
```

## 调试

### vitest

```json
{
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Current Test File",
      "autoAttachChildProcesses": true,
      "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
      "program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",
      "args": ["run", "${relativeFile}"],
      "smartStep": true,
      "console": "integratedTerminal"
    }
  ]
}
```

## 配置

### 配置文件

- vitest.config.ts；

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // ...
  },
});
```

### 配置选项

- [配置选项](https://vitest.dev/config/)；

```typescript
import path from "path";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
    include: ["**/src/**/*.test.ts"],
    coverage: {
      include: ["**/src/**"],
      exclude: [
        ...configDefaults.coverage.exclude!,
        "**/type/**",
        "**/index.ts",
      ],
    },
  },
});
```
