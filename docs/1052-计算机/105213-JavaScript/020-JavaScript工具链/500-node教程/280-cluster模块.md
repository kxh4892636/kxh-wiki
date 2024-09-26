---
id: 24c0860f-1833-48f1-82d0-5654f89a67ab
---

# cluster 模块

## cluster

### 属性

- cluster.isPrimary: 是否为主线程;
- cluster.workers: 当前所有的 worker, 主进程可用;
- cluster.isWorker: 是否为子线程;
- cluster.worker: 当前 worker, 子进程可用;

### 事件

- disconnect: 与 worker IPC 断开连接;
- fork: 新 worker 建立;
- exit: 任一 worker 退出进程;
- error: 当前 worker 报错;
- listening: 调用 listen() 触发;
- message: 接受子进程消息触发;
- online: 新 worker 运行触发;

### 方法

- cluster.disconnect([callback]): 关闭所有的 worker;
- cluster.fork([env]): 创建 worker;

## worker 对象

### 基础

- cluster.fork() 返回值;

### 属性

- id: worker 编号;
- process: worker 对应 process 对象;

### 事件

- cluster 对应事件的当前 worker 版本;
  - disconnect;
  - error;
  - exit;
  - listening;
  - message;
  - online;

### 方法

- worker.send(): 用于主进程中, 向对应当前 worker 发送消息, 触发子进程 message 事件;
- worker.disconnect(): 用于主进程中, 关闭当前 worker;
- worker.isConnected(): 用于主进程中, 当前 worker 是否存在 IPC;
- worker.isDead(): 用于主进程中, 当前 worker 是否终止;
- worker.kill([signal]): 用于主进程中, 立刻终止当前 worker;

## 最佳实践

### 守护进程

- 自带负载均衡器, 使用 Round-robin 算法;
- 使用 isPrimary 判断是否为主进程;
- 通过监听 exit 事件实现进程守护;
  - 子进程失效, 立刻 fork()

```typescript
import cluster from "cluster";
import http from "http";
import { availableParallelism } from "os";
import process from "node:process";

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end("hello world\n");
    })
    .listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```
