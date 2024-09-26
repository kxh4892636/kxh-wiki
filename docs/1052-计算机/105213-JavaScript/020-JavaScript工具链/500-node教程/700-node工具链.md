---
id: b0fcaad6-5c63-4925-b936-fc2263bdf560
---
# node 工具链

## execa

### 安装

```bash
npm install execa
```

### 回调接口

```typescript
import { execa } from "execa";
// 除名字不一样, 其余与 spawn 一模一样
const cp = execa("echo", ["unicorns"]);
// ...
```

### promise 接口

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

### 命令行

```typescript
import { $ } from "execa";

const branch = await $`git branch --show-current`;
```

## node-fetch

### 安装

```bash
pnpm add node-fetch
```

### 基本使用

- 同 fetch;

### stream 相关

#### 基础

- node-fetch 中 body 与 fetch 不同;
- 为 Readable stream;

#### 读取 body

```typescript
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import fetch from "node-fetch";

const streamPipeline = promisify(pipeline);
const response = await fetch(
  "https://github.githubassets.com/images/modules/logos_page/Octocat.png"
);
await streamPipeline(response.body, createWriteStream("./octocat.png"));
```

#### 写入 body

##### Blob

```typescript
import fetch, {
  Blob,
  blobFrom,
  blobFromSync,
  File,
  fileFrom,
  fileFromSync,
} from "node-fetch";

const mimetype = "text/plain";
const blob = fileFromSync("./input.txt", mimetype);
const url = "https://httpbin.org/post";
const response = await fetch(url, { method: "POST", body: blob });
const data = await response.json();
```

##### File

```typescript
import fetch, { FormData, File, fileFrom } from "node-fetch";

const httpbin = "https://httpbin.org/post";
const formData = new FormData();
const binary = new Uint8Array([97, 98, 99]);
const abc = new File([binary], "abc.txt", { type: "text/plain" });
formData.set("greeting", "Hello, world!");
formData.set("file-upload", abc, "new name.txt");

const response = await fetch(httpbin, { method: "POST", body: formData });
const data = await response.json();
```

### 差异

- res.body 为 Readable stream;
- 仅支持 text()/json()/blob()/arraybuffer()/buffer();
- 没有实现服务器端 cookie 状态管理;
- 无法使用 bodyUsed;

## cfork

### 安装

```typescript
pnpm add cfork --save-dev
```

### 基础使用

```typescript
const cfork = require("cfork");
const util = require("util");

cfork({
  exec: "/your/app/worker.js",
})
  .on("fork", (worker) => {
    console.warn(
      "[%s] [worker:%d] new worker start",
      Date(),
      worker.process.pid
    );
  })
  .on("disconnect", (worker) => {
    console.warn(
      "[%s] [master:%s] wroker:%s disconnect, exitedAfterDisconnect: %s, state: %s.",
      Date(),
      process.pid,
      worker.process.pid,
      worker.exitedAfterDisconnect,
      worker.state
    );
  })
  .on("exit", (worker, code, signal) => {
    const exitCode = worker.process.exitCode;
    const err = new Error(
      util.format(
        "worker %s died (code: %s, signal: %s, exitedAfterDisconnect: %s, state: %s)",
        worker.process.pid,
        exitCode,
        signal,
        worker.exitedAfterDisconnect,
        worker.state
      )
    );
    err.name = "WorkerDiedError";
    console.error(
      "[%s] [master:%s] wroker exit: %s",
      Date(),
      process.pid,
      err.stack
    );
  })
  // if you do not listen to this event
  // cfork will output this message to stderr
  .on("unexpectedExit", (worker, code, signal) => {
    // logger what you want
  })
  // emit when reach refork times limit
  .on("reachReforkLimit", () => {
    // do what you want
  });

// if you do not listen to this event
// cfork will listen it and output the error message to stderr
process.on("uncaughtException", (err) => {
  // do what you want
});
```

### 选项

- exec : exec file path;
- slaves : slave process config;
- args : exec arguments;
- count : fork worker nums, default is os.cpus().length;
- refork : refork when worker disconnect or unexpected exit, default is true;
- limit: limit refork times within the duration, default is 60;
- duration: default is 60000, one minute (so, the refork times < limit / duration);
- autoCoverage: auto fork with istanbul when running_under_istanbul env set, default is false;
- env: attach some environment variable key-value pairs to the worker / slave process, default to an empty object;
- windowsHide: Hide the forked processes console window that would normally be created on Windows systems, default to false;
- serialization: Specify the kind of serialization used for sending messages between processes. Possible values are 'json' and 'advanced'. See Advanced serialization for child_process for more details. Default: false;
