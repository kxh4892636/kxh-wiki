---
id: e5239581-eba5-402e-bb93-01112e5c84d2
---

# node 最佳实践

## 异步

### 使用 promise 简易封装 child_process

```typescript
import { spawn } from "child_process";

export const spawnAsPromised = (command:string, args:string[], options:object) => {
  return new Promise( (resolve, reject) {
    let stdout = "";
    let stderr = "";
    const cp = spawn(command, args, options);
    cp.stdout.on("data",  (chunk) {
      stdout += chunk;
    });
    cp.stderr.on("error",  (chunk) {
      stderr += chunk;
    });
    cp.on("close",  (code) {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(stderr);
      }
    });
  });
};
```

## 模块

### zlib 模块

##### 服务器使用 gzip

```typescript
import fs from "fs";
import zlib from "zlib";

// 压缩文件
const gzip = zlib.createGzip();
res.writeHead(200, {
  "Content-Encoding": "gzip",
});
pipeline(filepath, gzip, res, (err) => {
  if (err) {
    console.error("An error occurred:", err);
    process.exitCode = 1;
  }
});

// 压缩字符串
res.writeHead(200, {
  "Content-Encoding": "gzip",
});
zlib.gzip(responseText, (err, result) => {
  res.end(result.toString());
});
```

### fs 模块

##### 动态请求返回静态文件

```typescript
// 常用于图片, 视频等二进制文件传输
import fs from "fs";
const getMesh = async (req: Request, res: Response) => {
  const filePath = await dataService.getMesh(req.query.id as string);
  // 读取文件
  const content = fs.readFileSync(filePath, "binary");
  // 发送
  res.writeHead(200, "ok");
  res.write(content, "binary");
  // 结束
  res.status(200).end();
};
```

##### 动态请求返回文件流

```typescript
// 常用于图片, 视频等二进制文件传输
import fs from "fs";
const getMesh = async (req: Request, res: Response) => {
  const filePath = await dataService.getMesh(req.query.id as string);
  // 创建文件流, 异步操作
  const cs = fs.createReadStream(filePath);
  // 监听 data 事件, 不断写入数据
  cs.on("data", (chunk) => {
    res.write(chunk);
  });
  // 监听 end 事件, 返回 http 请求
  cs.on("end", () => {
    res.status(200).end();
  });
};
```

### net 模块

#### 服务器端 + 客户端示例

##### 服务器端

```typescript
import net from "net";

const server = net.createServer();

server.on("connection", (socket) => {
  socket.on("data", (buffer) => {
    console.log("data: ", buffer.toString());
    socket.write("server data");
  });

  socket.on("connect", () => {
    console.log("TCP connection connect.");
  });

  socket.on("end", () => {
    console.log("TCP connection end.");
  });
});

server.on("error", (err) => {
  console.log(err.message);
});

server.on("close", () => {
  console.log("TCP server stop.");
});

server.listen(1122, () => {
  console.log("TCP server start.");
});
```

##### 客户端

```typescript
import net from "net";

const client = net.createConnection(1122);

client.on("data", (buffer) => {
  console.log("data: ", buffer.toString());
  client.end();
});

client.on("connect", () => {
  console.log("TCP connection connect.");
});

client.on("end", () => {
  console.log("TCP connection end.");
});

client.write("client data");
```

### dgram 模块

#### 服务器端 + 客户端示例

##### 服务器端

```typescript
import dgram from "dgram";

const server = dgram.createSocket("udp4");

server.on("message", (buffer, rinfo) => {
  console.log(buffer.toString());
});

server.on("error", (err) => {
  console.log(err.message);
});

server.on("close", () => {
  console.log("Server close.");
});

server.bind(1908, () => {
  console.log("Server start.");
});
```

##### 客户端

```typescript
import dgram from "dgram";

const client = dgram.createSocket("udp4");

client.connect(1908, () => {
  client.send("send", () => {
    client.close();
  });
});
client.on("close", () => {
  console.log("client close.");
});
```
