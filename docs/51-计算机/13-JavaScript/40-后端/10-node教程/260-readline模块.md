---
id: bd98186f-4745-4f96-8576-517c5b8c1176
---

# Readline

## 创建

- 继承于 EventEmitter；

```typescript
import { stdin as input, stdout as output } from "process";

const ac = new AbortController();
const signal = ac.signal;

// readline.createInterface(options)
const rl = readline.createInterface({
  input: process.stdin, // Readable Stream
  output: process.stdout, // Writable Stream
  signal, // AbortSignal
});
```

## 事件

```typescript
// 调用 rl.close() 触发
// input 触发 end 事件后触发
// 接受 SIGINT 信号触发
rl.on("close", (input) => {
  console.log(`Received: ${input}`);
});

// input 流每接受一次 \r\n 后触发
// input 流读取最后一行触发
rl.on("line", (input) => {
  console.log(`Received: ${input}`);
});

// history array 改变触发
rl.on("history", (history) => {
  console.log(`Received: ${history}`);
});

// input 暂停后触发
// 接受 SIGCONT 信号触发
rl.on("pause", () => {
  console.log("Readline paused.");
});

// input 恢复后触发
rl.on("resume", () => {
  console.log("Readline resumed.");
});

// 接受 SIGINT 信号触发 (Ctrl + C)
rl.on("SIGINT", () => {
  rl.question("Are you sure you want to exit? ", (answer) => {
    if (answer.match(/^y(es)?$/i)) rl.pause();
  });
});

// 接受 SIGTSTP 信号触发 (Ctrl + Z)
rl.on("SIGTSTP", () => {
  // This will override SIGTSTP and prevent the program from going to the
  // background.
  console.log("Caught SIGTSTP.");
});

// 接受 SIGTSTP 信号后重新移至前台触发
rl.on("SIGCONT", () => {
  // `prompt` will automatically resume the stream
  rl.prompt();
});
```

## 方法

```typescript
// 结束实例, 触发 close 事件
rl.close();

// 暂停 input, 触发 pause 事件
rl.pause();

// rl.prompt([preserveCursor])
// 写入 output 的新行, 为用户提供输入, 并恢复 input

// rl.question(query[, options], callback)
// 将 query 作为 output 输出
// 用户输入作为 input 并作为 callback 的第一个参数
const ac = new AbortController();
const signal = ac.signal;

rl.question("What is your favorite food? ", { signal }, (answer) => {
  console.log(`Oh, so your favorite food is ${answer}`);
});
signal.addEventListener(
  "abort",
  () => {
    console.log("The food question timed out");
  },
  { once: true }
);
setTimeout(() => ac.abort(), 10000);

// 恢复 input, 触发 resume 事件
rl.resume();

// rl.setPrompt(prompt)
// 调用 rl.prompt() 时自动将 prompt 写入 output

// rl.getPrompt()
// 返回 rl.prompt() 当前使用的提示

// rl.write(data[, key])
// 写入 data 至 output
// key 模拟指定键符, 提供 ctrl/meta/shift
rl.write("Delete this!");
// 模拟 ctrl + c
rl.write(null, { ctrl: true, name: "u" });
```

## 迭代

- line 为 input 的一行；
- loop 中调用 break，throw，return 自动调用 rl.close()；
- 性能弱于 line 事件；

```typescript
// rl[Symbol.asyncIterator]();
async function processLineByLine() {
  const rl = readline.createInterface({
    // ...
  });

  for await (const line of rl) {
  }
}
```
