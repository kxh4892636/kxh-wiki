# process 模块

## 事件

```typescript
import process from "process";

// exit 前
process.on("beforeExit", (code) => {
  console.log("Process beforeExit event with code: ", code);
});

// 事件循环结束
// process.exit() 调用后
process.on("exit", (code) => {
  console.log("Process exit event with code: ", code);
});

// 关闭其 IPC 通道
process.on("disconnect", () => {
  //
});

// 其 IPC 通道发送信息
process.on("message", (message) => {
  //
});

// promise 被拒绝且使用 catch()
process.on("rejectionHandled", (promise) => {
  unhandledRejections.delete(promise);
});

// promise 被拒绝且没有使用 catch()
process.on("unhandledRejection", (reason, promise) => {
  unhandledRejections.set(promise, reason);
});

// node 发出警告
process.on("warning", (warning) => {
  console.warn(warning.name); // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack); // Print the stack trace
});

// 一个 Worker 创建后
process.on("worker", (message) => {
  //
});

// 各种信号
process.on("SIGINT", (message) => {
  //
});
```

## 属性

```typescript
process.arch; // 处理器架构
process.argv; // 进程接收参数, 第一个为 node 路径, 第二个为 js 文件路径, 其余为额外命令行参数
process.argv0; // node 路径
process.execPath; // node 路径
process.execArgv; // node 执行参数
process.channel; // IPC 通道
process.config; // js 配置
process.connected; // IPC 通道状态
process.env; // 环境变量
process.exitCode; // 退出代码
process.pid; // 进程 id
process.platform // 系统表示
process.ppid // 父进程 id
```

## 方法

```typescript
// 立刻退出进程
// Worker 中不可用
process.abort();

// IPC 保持事件循环
process.channel.ref();
// IPC 不保持事件循环
process.channel.unref();

// 当前 node 进程的工作目录
process.cwd();
// 改变 node 进程的工作目录
process.chdir(directory);

// process.cpuUsage([previousValue])
// 当前进程用户和 CPU 占用时间
const startUsage = cpuUsage(); // { user: 38579, system: 6986 }

// process.memoryUsage()
// 当前进程的内存使用
console.log(memoryUsage());
// Prints:
// {
//  rss: 4935680,
//  heapTotal: 1826816,
//  heapUsed: 650472,
//  external: 49879,
//  arrayBuffers: 9386
// }

// 结束 IPC 通道
process.disconnect();

// process.exit([code])
// 退出进程, 0 为正常退出
exit(1);

// process.emitWarning(warning[, options])
// 触发 warning 事件
emitWarning("Something happened!", {
  code: "MY_WARNING",
  detail: "This is some additional information",
});
// Emits:
// (node:56338) [MY_WARNING] Warning: Something happened!
// This is some additional information

// 用户 id
process.getuid();
// 有效的用户 id
process.geteuid();

// 进程组 id
process.getgid();
// 有效的进程组 id
process.getegid();

// process.kill(pid[, signal])
// 杀死指定进程
kill(process.pid, "SIGHUP");

// 高精度实时时间, 纳秒为单位
process.hrtime.bigint();

// process.nextTick(callback[, ...args])
// 当前事件循环后, 下一个事件循环前, 执行回调
console.log("start");
nextTick(() => {
  console.log("nextTick callback");
});
console.log("scheduled");
// Output:
// start
// scheduled
// nextTick callback
```
