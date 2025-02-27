---
id: 39a1815b-725a-429c-9304-597cfb80bce3
---

# console 模块

##### 创建 Console

```typescript
// new Console(options)
import { Console } from "console";
import * as fs from "fs";

const output = fs.createWriteStream("./stdout.log");
const errorOutput = fs.createWriteStream("./stderr.log");
const logger = new Console({
  stdout: output, // <stream.Writable>
  stderr: errorOutput, // <stream.Writable>
  ignoreErrors: true, // 是否忽略错误
  colorMode: true, // 是否启动颜色支持
  groupIndentation: 2, // 默认缩进
});
const count = 5;
logger.log("count: %d", count);
```

##### 断言

```typescript
// console.assert(value[, ...message])
// value 为 false 时输出, 若不存在 value, 输出 Assertion failed

console.assert(true, "does nothing");
console.assert(false, "Whoops %s work", "didn't");
// Assertion failed: Whoops didn't work
console.assert();
// Assertion failed
```

##### 清空 TTY

```typescript
// console.clear()
// 若 stdout 为 TTY, 清空, 反之该方法无效
```

##### 输出次数

```typescript
// console.count([label])
// 记录 label 被调用的次数, label 默认为 default
> console.count()
default: 1
undefined
> console.count('default')
default: 2
undefined
> console.count('abc')
abc: 1
undefined
> console.count('xyz')
xyz: 1
undefined
> console.count('abc')
abc: 2
undefined
> console.count()
default: 3
undefined
>

// console.countReset([label])
// 重置 label 被调用的次数
```

##### 记录

```typescript
// console.log([data][, ...args])
// 输出至 stdout
const count = 5;
console.log("count: %d", count);
// Prints: count: 5, to stdout
console.log("count:", count);
// Prints: count: 5, to stdout

// console.debug(data[, ...args])
// console.log() 的别名

// console.info([data][, ...args])
// console.log() 的别名

// console.dir(obj[, options])
// 使用 util.inspect() 对 obj 进行格式化输出
```

##### 错误

```typescript
// console.error([data][, ...args])
// 输出错误信息至 stderr
const code = 5;
console.error("error #%d", code);
// Prints: error #5, to stderr
console.error("error", code);
// Prints: error 5, to stderr

// console.warn([data][, ...args])
// console.error() 的别名

// console.trace([message][, ...args])
// 输出 stack trace 形式的错误信息至 stderr
console.trace("Show me");
// Prints: (stack trace will vary based on where trace is called)
//  Trace: Show me
//    at repl:2:9
//    at REPLServer.defaultEval (repl.js:248:27)
//    at bound (domain.js:287:14)
//    at REPLServer.runBound [as eval] (domain.js:300:12)
//    at REPLServer.<anonymous> (repl.js:412:12)
//    at emitOne (events.js:82:20)
//    at REPLServer.emit (events.js:169:7)
//    at REPLServer.Interface._onLine (readline.js:210:10)
//    at REPLServer.Interface._line (readline.js:549:8)
//    at REPLServer.Interface._ttyWrite (readline.js:826:14)
```

##### 表格

```typescript
// console.table(tabularData[, properties])
// 表格形式输出
// These can't be parsed as tabular data
console.table(Symbol());
// Symbol()

console.table(undefined);
// undefined

console.table([
  { a: 1, b: "Y" },
  { a: "Z", b: 2 },
]);
// ┌─────────┬─────┬─────┐
// │ (index) │  a  │  b  │
// ├─────────┼─────┼─────┤
// │    0    │  1  │ 'Y' │
// │    1    │ 'Z' │  2  │
// └─────────┴─────┴─────┘

console.table(
  [
    { a: 1, b: "Y" },
    { a: "Z", b: 2 },
  ],
  ["a"]
);
// ┌─────────┬─────┐
// │ (index) │  a  │
// ├─────────┼─────┤
// │    0    │  1  │
// │    1    │ 'Z' │
// └─────────┴─────┘
```

##### 时间

```typescript
// console.time([label])
// 启动一个计时器, label 默认为 default

// console.timeEnd([label])
// 终止 console.time([label]) 创建的启动器, 并打印时间间隔, label 默认为 default
console.time("bunch-of-stuff");
// Do a bunch of stuff.
console.timeEnd("bunch-of-stuff");
// Prints: bunch-of-stuff: 225.438ms

// console.timeLog([label][, ...data])
// 基于console.time([label]) 创建的启动器, 打印时间间隔, label 默认为 default
console.time("process");
const value = expensiveProcess1(); // Returns 42
console.timeLog("process", value);
// Prints "process: 365.227ms 42".
doExpensiveProcess2(value);
console.timeEnd("process");
```
