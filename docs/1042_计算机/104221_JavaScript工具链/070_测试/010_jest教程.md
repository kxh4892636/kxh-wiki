---
id: bdb4ab4a-b483-488b-b565-b5a1301fe3d2
---

# jest

## 基础

##### 安装

```bash
pnpm add --save-dev jest
pnpm add --save-dev ts-jest
pnpm add --save-dev @types/jest
```

##### 基本命令

```bash
# 测试
npx jest src/
# 覆盖率测试
npx jest --coverage src/
```

## 匹配器

### 相等

```typescript
// 直接比较原始类型或引用
test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});

// 递归比较属性相等
// 忽略 undefined 属性
test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});
```

### 布尔判断

```typescript
class A {}
test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
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

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

### 正则表达式

```typescript
test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
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
});
```

### 异常

```typescript
function compileAndroidCode() {
  throw new Error("you are using the wrong JDK!");
}

// 使用箭头函数包裹
test("compiling android goes as expected", () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);
});
```

## 异步

### promise

```typescript
test("the data is peanut butter", () => {
  return fetchData().then((data) => {
    expect(data).toBe("peanut butter");
  });
});
```

### async/await

```typescript
test("the data is peanut butter", async () => {
  const data = await fetchData();
  expect(data).toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch("error");
  }
});
```

### .resolves / .rejects

```typescript
test("the data is peanut butter", () => {
  return expect(fetchData()).resolves.toBe("peanut butter");
});

test("the fetch fails with an error", () => {
  return expect(fetchData()).rejects.toMatch("error");
});
```

## 预先设置

### 重复设置

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

### 一次性设置

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

### 作用域

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

## 模拟函数

### 使用模拟函数

```typescript
// forEach.js
export function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

// forEach.test.js
const forEach = require("./forEach");
const mockCallback = jest.fn((x) => 42 + x);

test("forEach mock function", () => {
  forEach([0, 1], mockCallback);

  // The mock function was called twice
  expect(mockCallback.mock.calls).toHaveLength(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});
```

### .mock 属性

##### .mock 属性

- 存储函数的参数和返回值;

##### 常用属性

```typescript
// The function was called exactly once
expect(someMockFunction.mock.calls).toHaveLength(1);

// The first arg of the first call to the function was 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe("first arg");

// The second arg of the first call to the function was 'second arg'
expect(someMockFunction.mock.calls[0][1]).toBe("second arg");

// The return value of the first call to the function was 'return value'
expect(someMockFunction.mock.results[0].value).toBe("return value");

// The function was called with a certain `this` context: the `element` object.
expect(someMockFunction.mock.contexts[0]).toBe(element);

// This function was instantiated exactly twice
expect(someMockFunction.mock.instances.length).toBe(2);

// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
expect(someMockFunction.mock.instances[0].name).toBe("test");

// The first argument of the last call to the function was 'test'
expect(someMockFunction.mock.lastCall[0]).toBe("test");
```

### mock 返回值

```typescript
const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce("x").mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```

## 配置文件

##### node

```typescript
/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        isolatedModules: true,
        diagnostics: false,
      },
    ],
  },
};

export default config;
```

##### react

```typescript
/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        isolatedModules: true,
        diagnostics: false,
      },
    ],
  },
};

export default config;
```
