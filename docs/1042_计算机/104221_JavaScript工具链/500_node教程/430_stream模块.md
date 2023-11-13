---
id: b832dd6e-a42c-4cbd-aa40-e595fa232aa0
---

# stream 模块

## 基础

##### 类型

- Writable: 可以写入数据的流;
- Readable: 可以读取数据的流;
- Duplex: 既可以写入又可以读取数据的流;
- Transform: 可以在写入和读取数据时修改或转换数据的流;

##### 传输数据

- 所有的 stream 传输 string 或者 buffer;

##### highWaterMark

- highWaterMark 指定流的最大缓冲字节数

##### 作用

- 各种模块中的各种流基于该模块封装;
- 除非自定义流, 一般不使用该模块;
- 着重于理解流的机制和概念;

## stream.Writable

##### 使用 Writable stream 的模块

- HTTP requests;
- HTTP responses;
- fs write streams;
- zlib streams;
- crypto streams;
- TCP sockets;
- child process stdin;
- process.stdout, process.stderr;

##### 事件

```typescript
// 流关闭触发
writer.on("close", () => {
  //
});

// 流恢复写入数据触发
writer.on("drain", () => {
  //
});

// 流报错触发
writer.on("error", () => {
  //
});

// 使用 writer.end() 后触发
writer.on("finish", () => {
  console.log("All writes are now complete.");
});

// 使用 reader.pipe() 后触发
writer.on("pipe", (src) => {
  console.log("Something is piping into the writer.");
});

// 使用 reader.unpipe() 后触发
writer.on("unpipe", () => {
  console.log("Something has stopped piping into the writer.");
});
```

##### 属性

```typescript
writable.closed; // close 事件后为 true
writable.destroyed; // writable.destroy() 后为 true
writable.writable; // 调用 writable.write() 是否安全
writable.writableEnded; // writable.end() 为 true
writable.writableCorked; // writable.uncork() 需要执行的次数
writable.errored; // writable.destroy() 携带 err 后为 true
writable.writableFinished; // finish 事件后为 true
writable.writableLength; // 队列中准备写入的字节数量
writable.writableHighWaterMark; // Writable 的 highWaterMark
writable.writableNeedDrain; // drain 事件或 stream 的 buffer 已满后为 true
```

##### 方法

```typescript
// writable.write(chunk[, encoding][, callback])
// 向 Writable 中写入数据
stream.write("some ");
stream.write("data ");
stream.end("end");

// writable.cork()
// 强制接下来写入数据缓冲到内存中, 直至调用 writable.uncork() 方法, 用于大量且数据小的 buffer 的情况, 最好搭配 writable._writev() 使用, 否则对于吞吐量不利

// writable.uncork()
// 释放 writable.cork() 缓冲的数据
// writable.uncork() 和 writable.cork() 的调用次数必须一致
stream.cork();
stream.write("some ");
stream.cork();
stream.write("data ");
process.nextTick(() => {
  stream.uncork();
  // The data will not be flushed until uncork() is called a second time.
  stream.uncork();
});

// writable.destroy([error])
// 摧毁写入流, 首先可选触发 error 方法, 之后触发 close 事件
// 破坏性操作, writable.write() 方法可能并未执行完毕
const myStream = new Writable();

const fooErr = new Error("foo error");
myStream.destroy(fooErr);
myStream.on("error", (fooErr) => console.error(fooErr.message)); // foo error

myStream.destroy();
myStream.on("error", function wontHappen() {});

// writable.end([chunk[, encoding]][, callback])
// 关闭写入流, 触发 finish 事件
// 等待 writable.write() 方法执行完毕
const file = fs.createWriteStream("example.txt");
file.write("hello, ");
file.end("world!");

// writable.setDefaultEncoding(encoding)
// 设置 Writable 的默认编码
```

## stream.Readable

##### 使用 Readable 的模块

- TTP responses;
- HTTP requests;
- fs read streams;
- zlib streams;
- crypto streams;
- TCP sockets;
- child process stdout and stderr;
- process.stdin;

##### 两种读取模式

- flowing mode;
  - 数据自动从底层系统独处, 通过事件提供给应用程序;
- paused mode;
  - 显示调用 stream.read() 读取数据块;

##### 读取模式的转换

- paused mode - flowing mode;
  - 添加 data 事件;
  - 调用 stream.resume() 方法;
  - 调用 stream.pipe() 方法;
- flowing mode - paused mode;
  - 调用 stream.pause() 方法;
  - 调用 stream.unpipe() 方法;

##### 读取数据机制

- Readable 只有提供了读取或忽略数据的机制后才会在流中读取数据;
- 机制即读取模式相关方法;
- 推荐仅选择一种读取相关的方法读取数据;

##### 三种状态

- readable.readableFlowing === null;
  - 初始状态;
- readable.readableFlowing === true;
  - 添加 data 事件;
  - 调用 readable.resume() 或 readable.pipe() 方法;
- readable.readableFlowing === false;
  - 调用 readable.pause() 或 readable.unpipe() 方法;
  - 此时添加 data 事件无效;

```typescript
const pass = new PassThrough();
const writable = new Writable();

pass.pipe(writable);
pass.unpipe(writable);
// readableFlowing is now false.

pass.on("data", (chunk) => {
  console.log(chunk.toString());
});
// readableFlowing is still false.
pass.write("ok"); // Will not emit 'data'.
pass.resume(); // Must be called to make stream emit 'data'.
// readableFlowing is now true.
```

##### 事件

```typescript
// Readable 流关闭触发
readable.on("close", (chunk) => {
  //
});

// Readable 流接受到数据触发
readable.on("data", (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});

// Readable 流完全被消耗后触发
readable.on("end", () => {
  console.log("There will be no more data.");
});

// Readable 流报错触发
readable.on("error", () => {
  //
});

// 调用 stream.pause() 后触发
readable.on("pause", () => {
  //
});

// 有数据可以被读取时触发
// 监听该事件自动停止 flowing mode, 必须通过 readable.read() 读取数据
// 监听该事件会耗费一定资源, 推荐使用 data 事件或 readable.pipe()
readable.on("readable", function () {
  // There is some data to read now.
  let data;

  while ((data = this.read()) !== null) {
    console.log(data);
  }
});

// 调用 stream.resume() 后触发
readable.on("resume", () => {
  //
});
```

##### 属性

```typescript
readable.closed; // close 事件触发后悔 true
readable.destroyed; // 调用 readable.destroy() 为真
readable.readable; // 能否安全执行 readable.read() 方法
readable.readableEncoding; // 读取编码
readable.readableEnded; // end 事件触发后位 true
readable.errored; // error 事件触发后位 true
readable.readableFlowing; // 读取模式
readable.readableHighWaterMark; // Readable 的 highWaterMark
readable.readableLength; // 队列中等待读取的字节数
```

##### 方法

```typescript
// readable.pipe(destination[, options])
// 使用 flowing mode 将 readable 读取数据传输给 writable
const readable = getReadableStreamSomehow();
const writable = fs.createWriteStream("file.txt");
// All the data from readable goes into 'file.txt'.
readable.pipe(writable);

// readable.pipe() 返回对 destination 的引用, 可以设置一系列管道流
const r = fs.createReadStream("file.txt");
const z = zlib.createGzip();
const w = fs.createWriteStream("file.txt.gz");
r.pipe(z).pipe(w);

// 默认情况 Readable 调用 end() 方法也会调用 Writable 的 end() 方法
reader.pipe(writer, { end: false });
reader.on("end", () => {
  writer.end("Goodbye\n");
});

// readable.read([size])
// 只能在 paused mode 调用, flowing mode 该方法隐式调用
// 该方法获取到一个数据块时, 同时触发 data 事件
// size 小于等于 1GB
// Readable 流数据完全被耗尽, 调用 stream.read() 触发 end 事件

// readable.unpipe([destination])
// 分离 readable.pipe() 连接的 Writable 流, 切换至 paused mode
const fs = require("node:fs");
const readable = getReadableStreamSomehow();
const writable = fs.createWriteStream("file.txt");
// All the data from readable goes into 'file.txt',
// but only for the first second.
readable.pipe(writable);
setTimeout(() => {
  console.log("Stop writing to file.txt.");
  readable.unpipe(writable);
  console.log("Manually close the file stream.");
  writable.end();
}, 1000);

// readable.pause()
// 从 flowing mode 切换至 paused mode, 停止触发 data 事件
// 数据缓存至内部缓冲区中
const readable = getReadableStreamSomehow();
readable.on("data", (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
  readable.pause();
  console.log("There will be no additional data for 1 second.");
  setTimeout(() => {
    console.log("Now data will start flowing again.");
    readable.resume();
  }, 1000);
});

// readable.resume()
// 切换至 flowing mode

// readable.destroy([error])
// 摧毁 Readable 流, 首先可选触发 error 方法, 之后触发 close 事件
// 破坏性操作, readable.read() 方法可能并未执行完毕

// readable.unshift(chunk[, encoding])
// 将一部分数据退回到内部缓冲区

// readable.isPaused()
// 返回 Readable 的状态, 该方法一般没有理由直接使用
const readable = new stream.Readable();
readable.isPaused(); // === false
readable.pause();
readable.isPaused(); // === true
readable.resume();
readable.isPaused(); // === false

// readable.setEncoding(encoding)
// 设置 Readable 流编码
const readable = getReadableStreamSomehow();
readable.setEncoding("utf8");
readable.on("data", (chunk) => {
  assert.equal(typeof chunk, "string");
  console.log("Got %d characters of string data:", chunk.length);
});
```

##### 异步迭代

```typescript
// readable[Symbol.asyncIterator]() 定义
// 持续消耗 Writable 直至完全消耗
// 触发 break, return 或 throw 将摧毁流
async function print(readable) {
  readable.setEncoding("utf8");
  let data = "";
  for await (const chunk of readable) {
    data += chunk;
  }
  console.log(data);
}

print(fs.createReadStream("file")).catch(console.error);
```

## stream.Duplex stream.Transform

##### stream.Duplex

- 同时实现了 Readable 和 Writable 的流;
  - TCP sockets;
  - zlib streams;
  - crypto streams;

##### stream.Transform

- 一种特殊的 Duplex 流, 流的输入和输出相关;
  - zlib streams;
  - crypto streams;

## 工具函数

### Promise 形式

##### stream.pipeline()

```typescript
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";

const ac = new AbortController();
const signal = ac.signal;

setImmediate(() => ac.abort());

// stream.pipeline(source[, ...transforms], destination[, options])
// 将 source 经 transforms 转换写入 destination
const ac = new AbortController();
const { signal } = ac;
setImmediate(() => ac.abort());

try {
  await pipeline(
    createReadStream("archive.tar"),
    createGzip(),
    createWriteStream("archive.tar.gz"),
    { signal }
  );
} catch (err) {
  console.error(err); // AbortError
}
```

##### stream.finished()

```typescript
import { finished } from "stream/promises";
import { createReadStream } from "fs";

// stream.finished(stream[, options])
// 等待 stream 写入或读取完成
const rs = createReadStream("archive.tar");

async function run() {
  await finished(rs);
  console.log("Stream is done reading.");
}

run().catch(console.error);
rs.resume(); // Drain the stream.
```

### 回调形式

##### stream.finished()

```typescript
// stream.finished(stream[, options], callback)
// 等待 Writable 或 Readable 结束后触发 callback, 具有 promise 版本
const rs = fs.createReadStream("archive.tar");

finished(rs, (err) => {
  if (err) {
    console.error("Stream failed.", err);
  } else {
    console.log("Stream is done reading.");
  }
});
```

##### stream.pipeline()

```typescript
// stream.pipeline(source[, ...transforms], destination, callback)
// 将 source 经 transforms 转换写入 destination, 具有 promise 版
pipeline(
  fs.createReadStream("archive.tar"),
  zlib.createGzip(),
  fs.createWriteStream("archive.tar.gz"),
  (err) => {
    if (err) {
      console.error("Pipeline failed.", err);
    } else {
      console.log("Pipeline succeeded.");
    }
  }
);
```

##### stream.Readable.from()

```typescript
// stream.Readable.from(iterable[, options])
// 从 iterators 中创建 Readable 流
```

##### stream.Duplex.from()

```typescript
// stream.Duplex.from(src)
// src 为 <Stream> | <Blob> | <ArrayBuffer> | <string> | <Iterable> | <AsyncIterable> | <AsyncGeneratorFunction> | <AsyncFunction> | <Promise> | <Object> | <ReadableStream> | <WritableStream>
// 创建 Duplex 流
```

##### stream.addAbortSignal()

```typescript
// stream.addAbortSignal(signal, stream)
// 添加 AbortController 实例
const controller = new AbortController();
const read = addAbortSignal(
  controller.signal,
  fs.createReadStream("object.json")
);
// Later, abort the operation closing the stream
controller.abort();
```

##### highWaterMark

```typescript
// stream.getDefaultHighWaterMark(objectMode)
// stream.setDefaultHighWaterMark(objectMode, value)
// 获取或设置 highWaterMark, 默认为 16 kb;
```
