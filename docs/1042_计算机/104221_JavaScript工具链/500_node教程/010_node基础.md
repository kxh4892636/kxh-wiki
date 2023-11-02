---
id: 7e736772-2607-4572-a8d2-06deb6920806
---

# node 基础

## 基本概念

### 单线程

##### 主线程

- js 负责解释和执行代码的线程只有一个,
- 称为主线程;

##### 工作线程

- 浏览器或 node 存在其他线程;
- 处理 http, dom, IO 等;
- 统称为工作线程;

##### 意义

- js 使用单线程不必解决线程同步的问题;

### 同步和异步

##### 同步任务

- 在主线程排队执行的任务;
- 前一个任务结束才会执行下一个任务;

##### 异步任务

- 不进入主线程, 进入任务队列;
- 异步任务返回返回结果后, 在任务队列中顺序放置一个事件;
- 在主线程任务完成后;
- 从任务队列中顺序请求任务事件;
- 进入主线程执行;
- 不断反复以上步骤;

### 堵塞和非堵塞

##### 堵塞

```typescript
// 这是一个阻塞式函数, 将一个文件复制到另一个文件上, 假设耗时 1 分钟
// 1 分钟后才会返回结果
const copyBigFile = (src, dst) => {
  const result = copyFileSync(src, dst);
  return result;
};
console.log("start copying ... ");
copyBigFile("A.txt", "B.txt"); //这行程序将耗时1分钟
// 后续代码将在 1 分钟后才会执行
console.log("copy finished");
```

##### 非堵塞

```typescript
// 这是一个非阻塞式函数, 将一个文件复制到另一个文件上, 假设耗时 1 分钟
// 立刻返回结果
const copyBigFile = (src, dst) => {
  var result = copyFile(src, dst);
  return result;
};
console.log("start copying ... ");
copyBigFile("A.txt", "B.txt", () => {
  // 后续代码将在 1 分钟后才会执行
}); //这行程序将耗时1分钟
// 后续代码立刻执行
// 线程并没有堵塞, 可以进行其他操作
console.log("copy finished");
```

### 事件循环和任务队列

##### 事件循环

- js 创建一个循环, 每一次循环称作 tick;
- 每一次 tick 检查任务队列是否有待处理的事件;
- 即主线程反复从任务队列中请求事件并处理的过程;

##### 任务队列

- 任务队列又称消息队列;
- 异步任务完成 IO, DOM 等操作后;
- 便向任务队列中添加一个事件;

##### 事件循环的执行顺序

- 主线程代码执行完毕后才会执行事件循环;
- 若主线程中代码执行时间过长;
- 会堵塞事件循环的执行, 即异步任务的执行;

##### node 中的各种 sync 函数

- node 中的各种 sync 函数;
- 在主线程中执行;
- 因此会堵塞事件循环;

## 常用 API

### child_process

##### spawn 相关操作

```typescript
import { spawn } from "child_process";
// 使用 spawn 执行命令, 异步操作
// 第一个字符串参数指定命令, 第二个数组参数为命令参数, 不用打空格了
// 当然你也可以也在一个元素里自己打空格, 但保证单个参数中不能有空格, 要不就识别为两个参数了
const outputModel = spawn("cmd", [
  "/c",
  `cd ${path.dirname(modelPath)} && ${modelPath}`,
]);
const outputModel = spawn(`cd ${path.dirname(modelPath)} && ${modelPath}`, {
  shell: true, // 使用 shell 参数表明在系统默认终端中执行对应命令, 跨平台保持兼容性
  windowsHide: true, // 隐藏执行该命令出现的窗口
});
const pid = outputModel.pid; // 获取创建子进程的 pid

// on() 第一个参数为 stream.Readable
// 监听 stdout 正常输出
outputModel.stdout?.on("data", async (chunk) => {
  const content = chunk.toString(); // chunk 为 buffer 类型
  // ...
});
// 监听 stderr 异常输出
outputModel.stderr?.on("data", async (chunk) => {
  const content = chunk.toString(); // chunk 为 buffer 类型
  // ...
});

// 停止 spawn 创建的子进程
// 注意 kill() 只会停止创建的子进程本身, 如果子进程命令创建了新的子进程, 生成了一个子进程树, kill() 并不会删除整个子进程树
outputModel.kill();
```

##### 停止子进程树

```typescript
// 使用 windows 自带命令
// /f 表示强制停止, /t 表示结束 /pid 对应进程的进程树
spawn(`taskkill /f /t /pid ${type}`, { shell: true });
```

##### 事件一览

```typescript
const outputModel = spawn(`cd ${path.dirname(modelPath)} && ${modelPath}`, {
  shell: true,
});
// 子进程 stdio 流关闭
// 一定在 exit 之后, exit 触发但 close 不一定触发
// code 为子进程退出编码
outputModel.on("close", async (code) => {
  //...
});
// 子进程报错
// error 为报错信息
outputModel.on("error", async (error) => {
  //...
});
// 子进程结束
// code 为子进程退出编码
outputModel.on("exit", async (code) => {
  //...
});
```

### process

##### 停止指定进程

```typescript
process.kill(pid); // 停止指定进程
process.kill(-pid); // 停止 pid 对应进程的进程树
```

##### 退出当前 node 主进程

```typescript
process.exit(0); // 正常退出
process.exit(1); // 异常退出
```

##### 获取环境变量

```typescript
const foldPath = process.cwd(); // 获取当前工作目录
```

### fs

### path

##### path 相关操作

```typescript
// 获取 fileName 的后缀名
const extName = path.extname(fileName);
```
