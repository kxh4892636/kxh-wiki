---
id: aa841971-c085-4ba4-b154-8d04889d5e39
---

# dgram 模块

##### 创建 dgram.Socket

```typescript
import dgram from 'node:dgram';

const controller = new AbortController();
const { signal } = controller;

// dgram.createSocket(options[, callback])
// new dgram.Socket() 的语法糖
// callback 监听 message 事件
const server = dgram.createSocket({
    type:'udp4' // udp4/udp6
    signal: signal // 标识符, 用于终止 server
});

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);

// Later, when you want to close the server.
controller.abort();
```

##### 事件

```typescript
// socket.close() 后触发
socket.on("close", () => {
  //
});

// socket 连接后触发
socket.on("connect", () => {
  //
});

// socket 报错触发
socket.on("error", (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

// socket.bind() 或者第一次使用 socket.send() 触发
socket.on("listening", () => {});

// 收到消息触发
// message: Buffer
// rinfo: 发送方 address 信息
socket.on("message", (msg, rinfo) => {
  console.log(rinfo); // { port: 12346, family: 'IPv4', address: '127.0.0.1', size: 100 }.
});
```

##### 方法

```typescript
socket.address(); // 返回自身 address 对象

// socket.bind([port][, address][, callback])
// 开始监听端口
server.bind(PORT, HOST, () => {
  //
});

// socket.close([callback])
// 关闭 socket 连接并停止监听
// callback 对应 close 事件
socket.close();

// socket.connect(port[, address][, callback])
// 向远程 socket 发起连接
// callback 对应 connect 事件
client.connect(41234, "localhost", (err) => {
  client.send(message, (err) => {
    client.close();
  });
});

// socket.disconnect()
// 关闭 socket 连接
socket.disconnect();

// socket.send(msg[, offset, length][, port][, address][, callback])
// 向目标端口发送信息
import dgram from "node:dgram";
import { Buffer } from "node:buffer";

const message = Buffer.from("Some bytes");
const client = dgram.createSocket("udp4");
client.send(message, 41234, "localhost", (err) => {
  client.close();
});

// socket.setBroadcast(flag)
// 发起 udp 广播, 必须在 socket.bind() 调用后使用
// socket.bind() 未指定端口和 IP 表示随机监听一个端口, 并接受所有 IP 的 UDP 报文
socket.bind(function () {
  socket.setBroadcast(true);
  socket.send(msg, 1234, "255.255.255.255", function (err) {
    if (err) throw err;
    socket.close();
  });
});

socket.getRecvBufferSize(); // 获取接受缓存区大小
socket.setRecvBufferSize(); // 设置接受缓存区大小
socket.getSendBufferSize(); // 获取发送缓存区大小
socket.setSendBufferSize(); // 设置发送缓存区大小
socket.getSendQueueSize(); // 发送队列字节数量
socket.getSendQueueCount(); // 发送队列等待发送报文段的数量
socket.setTTL(ttl); // 设置 udp 生存时间
socket.remoteAddress(); // 远程 socket address 对象
```
