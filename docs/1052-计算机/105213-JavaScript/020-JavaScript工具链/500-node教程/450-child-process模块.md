---
id: 7ab51c98-098c-429b-b626-a6dc8c4fc106
---

# child_process 模块

## 异步 API

##### child_process.exec()

```typescript
// child_process.exec(command[, options][, callback])
import { exec } from "child_process";

const controller = new AbortController();
const { signal } = controller;
exec(
  "cat *.js missing_file | wc -l",
  {
    cwd: process.cwd(), // 工作目录
    env: process.env, // 环境变量
    encoding: "utf8", // 编码
    shell: "/bin/sh", // shell
    signal: signal, // AbortController 标识
    timeout: 0, // 超时时间, 超时报错
    maxBuffer: 1024 * 1024, // 最大输出字节数, 超过报错
    killSignal: "SIGTERM",
    uid: 1,
    gid: 1,
    windowsHide: false, // 是否隐藏终端
  },
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  }
);

controller.abort();
```

##### child_process.execFile()

```typescript
// child_process.execFile(file[, args][, options][, callback])
// child_process.exec() 的不使用终端版本
import { execFile } from "child_process";

const controller = new AbortController();
const { signal } = controller;
const child = execFile(
  "node",
  ["--version"],
  {
    cwd: process.cwd(), // 工作目录
    env: process.env, // 环境变量
    encoding: "utf8", // 编码
    shell: "/bin/sh", // shell
    signal, // AbortController 标识
    timeout: 0, // 超时时间, 超时报错
    maxBuffer: 1024 * 1024, // 最大输出字节数, 超过报错
    killSignal: "SIGTERM",
    uid: 1,
    gid: 1,
    windowsHide: false, // 是否隐藏终端
  },
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  }
);

controller.abort();
```

##### child_process.fork()

```typescript
// child_process.fork(modulePath[, args][, options])
// child_process.spawn() 的特例
import { fork } from "child_process";

const controller = new AbortController();
const { signal } = controller;
const child = fork("./child.js", ["--version"], {
  cwd: process.cwd(), // 工作目录
  detached: false, // 是否与父进程分离
  env: process.env, // 环境变量
  execPath: "./child.js", // 创建子进程的可执行文件
  execArgv: process.execArgv, // 传递给可执行文件的参数列表
  gid: 1,
  signal, // AbortController 标识
  killSignal: "SIGTERM",
  silent: false, // 是否使用父进程的 stdin, stdout, stderr
  stdio: ["pipe", "pipe", "pipe"], // 依次设置 stdin, stdout, stderr
  uid: 1,
  timeout: 0, // 超时时间, 超时报错
});

controller.abort();
```

##### child_process.spawn()

```typescript
// child_process.spawn(command[, args][, options])
import { spawn } from "child_process";

const controller = new AbortController();
const { signal } = controller;
const child = spawn("./child.js", ["--version"], {
  cwd: process.cwd(), // 工作目录
  env: process.env, // 环境变量
  argv0: "./child.js", // 传递给 child_process 的第一个参数
  detached: false, // 是否与父进程分离
  stdio: ["pipe", "pipe", "pipe"], // 依次设置 stdin, stdout, stderr
  uid: 1,
  gid: 1,
  shell: false, // 是否使用终端
  windowsHide: false, // 是否隐藏终端
  signal, // AbortController 标识
  killSignal: "SIGTERM",
  timeout: 0, // 超时时间, 超时报错
});

controller.abort();
```

##### options.detached

- windows 启用 options.detached 使父进程和子进程分离;
  - 可以使父进程结束后, 子进程仍可运行;
- 非 windows 启用 options.detached 使父进程和子进程分离;
  - 可以使父进程结束后, 子进程或许仍可运行;
- 当 detached 为 true, 只有将 stdio 设置为与父进程不连接的 stdio 时;
- 可以保证父进程结束后, 子进程仍可运行;
- 否则父进程退出, 子进程不会后台运行;
- 与 childProcess.unref() 搭配使用;

```typescript
const { spawn } = require("node:child_process");
const subprocess = spawn(process.argv[0], ["child_program.js"], {
  detached: true,
  stdio: "ignore",
});
subprocess.unref();
```

##### options.stdio

- 常量;
  - 'pipe' (默认值): ['pipe', 'pipe', 'pipe'];
  - 'overlapped': ['overlapped', 'overlapped', 'overlapped'];
  - 'ignore': ['ignore', 'ignore', 'ignore'];
  - 'inherit': ['inherit', 'inherit', 'inherit'];
- pipe: 输出到父进程 stdio;
- overlapped: 同 pipe 但是输出到 file handler, 非 windows 等效于 pipe;
- ipc: 创建父进程和子进程的 IPC 通道;
- ignore: 忽略子进程的 fd;
- inherit: 等效于 process.stdin, process.stdout 和 process.stderr;
- stream: 某个 stream 实例;
- null/undefined: 使用默认值;

##### .bat 和 .cmd

- windows 中 .bat 和 .cmd 文件必须使用终端;
- 因此 execFile() 无法使用;

## ChildProcess

##### 事件

```typescript
const { spawn } = require("node:child_process");
const ls = spawn("ls", ["-lh", "/usr"]);

// 关闭所有的 stdio 后触发, 多个子进程可能使用同一个 stdio, 在 exit 事件后出发
ls.on("close", (code) => {
  console.log(`child process close all stdio with code ${code}`);
});

// 调用 subprocess.disconnect() 后触发
ls.on("disconnect", () => {
  console.log(`child process disconnect`);
});

// 无法执行, 报错, controller.abort() 后触发
ls.on("error", (err) => {
  console.log(err);
});

// 当前子进程结束后触发
ls.on("exit", (code) => {
  console.log(`child process exit with code ${code}`);
});

// 子进程调用 process.send() 触发
ls.on("message", (message) => {
  console.log(message);
});

// 子进程成功生成后触发
ls.on("spawn", () => {
  console.log("success");
});
```

##### 属性

```typescript
subprocess.channel; // IPC 通道
subprocess.connected; // subprocess.disconnect() 调用后位 false
subprocess.exitCode; // 子进程退出的 exit code
subprocess.killed; // subprocess.kill() 调用后为 true
subprocess.pid; // pid
subprocess.stderr; // Readable Stream, 子进程报错信息
subprocess.stdout; // Readable Stream, 子进程输出信息
subprocess.stdin; // Writable Stream, 子进程的输入信息
subprocess.stdio; // [stdin, stdout, stderr]
```

##### 方法

```typescript
subprocess.disconnect(); // 关闭父进程和子进程的 IPC 通道
subprocess.kill([signal]); // 杀死子进程

// subprocess.send(message[, sendHandle[, options]][, callback])
// 通过 IPC 通道发送信息, 触发 message 事件
// parent.js
const cp = require("node:child_process");
const n = cp.fork(`${__dirname}/sub.js`);
n.on("message", (m) => {
  console.log("PARENT got message:", m);
});
// 触发子进程 message 事件, 打印 CHILD got message: { hello: 'world' }
n.send({ hello: "world" });
// sub.js
process.on("message", (m) => {
  console.log("CHILD got message:", m);
});
// 触发父进程 message 事件, 打印 PARENT got message: { foo: 'bar', baz: null }
process.send({ foo: "bar", baz: NaN });

subprocess.ref(); // 恢复子进程的移除引用计数
subprocess.unref(); // 移除子进程的移除引用计数

// 一般情况父进程会等待子进程
// 使用 unref() 使父进程不等待子进程强制退出
// 要求子进程和父进程之间不能建立 IPC 通道, 即 stdio 设置为 ignore 或者与父进程不相关的 stdio
const { spawn } = require("node:child_process");
const subprocess = spawn(process.argv[0], ["child_program.js"], {
  detached: true,
  stdio: "ignore",
});
subprocess.unref();
```
