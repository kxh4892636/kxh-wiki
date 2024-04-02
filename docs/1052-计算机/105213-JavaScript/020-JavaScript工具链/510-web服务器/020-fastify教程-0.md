---
id: 17f59d12-0e79-46fc-ad92-6d802b963ac8
---

# fastify 基础

## 基础

##### 安装

```bash
pnpm add fastify
```

## Server

### 定义 Server

```typescript
import { fastify, FastifyInstance } from "fastify";

const initializeMiddleware = (app: FastifyInstance) => {
  // 若干中间件
};

const initializeRoutes = (app: FastifyInstance) => {
  // 若干路由
};

const startApp = async (port: number) => {
  const app = fastify({
    logger: true,
  });
  initializeMiddleware(app);
  initializeRoutes(app);

  try {
    await app.listen({ port });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startApp();
```

### API

##### 生命周期相关

- after(): 当前插件加载完成后执行, 始终在 ready() 之前执行;
- ready(): 所有插件加载完成后执行;
- listen(): ready() 后执行;
- close(): 关闭 fastify 实例;

```typescript
fastify
  .register((instance, opts, done) => {
    console.log("Current plugin");
    done();
  })
  .after((err) => {
    console.log("After current plugin");
  })
  .register((instance, opts, done) => {
    console.log("Next plugin");
    done();
  })
  .ready((err) => {
    console.log("Everything has been loaded");
  });
```

##### 插件相关

- decorate()/register()/hook();
- 详细见具体模块;

## 路由

### 定义路由

```typescript
import { FastifyInstance } from "fastify";

export const testRoute = async (app: FastifyInstance) => {
  app.route({
    method: "get",
    url: "/test",
    schema: {
      querystring: {
        name: { type: "string" },
        excitement: { type: "integer" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            hello: { type: "string" },
          },
        },
      },
    },
    handler: function (request, reply) {
      reply.send({ hello: "world" });
    },
  });
};
```

### 使用路由

```typescript
const fastify = Fastify({
  logger: true,
});

fastify.register(testRoute);
```

### 路由参数

##### URL 参数

- 支持正则表达式;

```typescript
fastify.get("/example/:userId/:secretToken", function (request, reply) {
  const { userId, secretToken } = request.params;
  // ...
});

// 正则表达式
fastify.get("/example/:file(^\\d+).png", function (request, reply) {
  // curl ${app-url}/example/12345.png
  // file === '12345'
  const { file } = request.params;
  // ...
});
```

### 异步写法

- 使用 async 函数;
- 使用 return 返回请求;

```typescript
fastify.get("/", options, async function (request, reply) {
  var data = await getData();
  var processed = await processData(data);
  return processed;
});

// 使用 reply 相关方法
fastify.get("/", options, async function (request, reply) {
  var data = await getData();
  var processed = await processData(data);
  return reply.send(processed);
});
```

##### 回调函数返回请求

- 使用 reply.send() 并 return reply;

```typescript
fastify.get("/", options, async function (request, reply) {
  setImmediate(() => {
    reply.send({ hello: "world" });
  });
  return reply;
});
```

### 路由前缀

```typescript
fastify.register(testRoute, { prefix: "/v1" });
```

### 常用 hook

- preValidation(request, reply, done): 身份验证 hook;
- preHandler(request, reply, done): 执行 handler 之前调用的 hook;
- onTimeout(request, reply, done): 超时 hook;
- onError(request, reply, error, done): 报错 hook;

## request

### 属性

```typescript
fastify.post("/:params", options, function (request, reply) {
  console.log(request.body); // post body
  console.log(request.query); // queryString
  console.log(request.params); // url 参数
  console.log(request.headers);
  console.log(request.raw);
  console.log(request.server);
  console.log(request.id);
  console.log(request.ip);
  console.log(request.ips);
  console.log(request.hostname);
  console.log(request.protocol);
  console.log(request.url);
  console.log(request.routerMethod);
  console.log(request.routeOptions.bodyLimit);
  console.log(request.routeOptions.method);
  console.log(request.routeOptions.url);
  console.log(request.routeOptions.attachValidation);
  console.log(request.routeOptions.logLevel);
  console.log(request.routeOptions.version);
  console.log(request.routeOptions.exposeHeadRoute);
  console.log(request.routeOptions.prefixTrailingSlash);
  console.log(request.routerPath.logLevel);
  request.log.info("some info"); // pino log 对象
});
```

## reply

### 状态码

```typescript
// 设置状态码
fastify.get("/", options, function (request, reply) {
  reply.code(200).send({ hello: "world" });
});

// 读写状态码
if (reply.statusCode >= 299) {
  reply.statusCode = 500;
}
```

### 操作首部字段

```typescript
// 添加首部字段
reply.header("set-cookie", "foo");
reply.header("set-cookie", "bar");
reply.headers({
  "x-foo": "foo",
  "x-bar": "bar",
});
// 获取首部字段
reply.getHeaders();
// 移除首部字段
reply.removeHeader("x-foo");
// 布尔判断
reply.hasHeader("x-foo");

// reply.header('Content-Type', 'the/type') 的简写
reply.type("text/html");
```

### 重定向

```typescript
reply.redirect("/home");
// 设置状态码
reply.redirect(303, "/home");
```

### 发送请求

```typescript
// 对象
fastify.get("/json", options, function (request, reply) {
  reply.send({ hello: "world" });
});
// 字符串
fastify.get("/json", options, function (request, reply) {
  reply.send("plain string");
});
// 文件流
fastify.get("/streams", async function (request, reply) {
  const fs = require("node:fs");
  const stream = fs.createReadStream("some-file", "utf8");
  // 未设置 Content-Type, 默认为 application/octet-stream
  reply.header("Content-Type", "application/octet-stream");
  return reply.send(stream);
});
```

### 错误处理

##### 自动封装

- reply 返回 Error;
- fastify 自动封装以下结构;

```typescript
{
  error: String; // the HTTP error message
  code: String; // the Fastify error code
  message: String; // the user error message
  statusCode: Number; // the HTTP status code
}
```

##### 自定义错误类型

- response 为指定状态码设置 schema;
- 若无对应状态码使用默认 schema;

```typescript
fastify.get(
  "/",
  {
    schema: {
      response: {
        501: {
          type: "object",
          properties: {
            statusCode: { type: "number" },
            code: { type: "string" },
            error: { type: "string" },
            message: { type: "string" },
            time: { type: "string" },
          },
        },
      },
    },
  },
  function (request, reply) {
    const error = new Error("This endpoint has not been implemented");
    error.time = "it will be implemented in two weeks";
    reply.code(501).send(error);
  }
);
```

// NOTE

## 验证和序列化

### Type Provider

- 个人使用 typebox;
- 用于验证数据和序列化的 typescript 支持;

```typescript
// index.ts
import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { registerRoutes } from "./routes";

const server = Fastify().withTypeProvider<TypeBoxTypeProvider>();
registerRoutes(server);
server.listen({ port: 3000 });

// routes.ts
import { Type } from "@sinclair/typebox";
import {
  FastifyInstance,
  FastifyBaseLogger,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
type FastifyTypebox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>;
export function registerRoutes(fastify: FastifyTypebox): void {
  fastify.route(
    "/route",
    {
      method: "GET",
      schema: {
        querystring: queryStringJsonSchema,
      },
    },
    (request, reply) => {
      const { foo, bar } = request.query; // type safe!
    }
  );
}
```

### 验证数据

- 验证输入值是否符合 schema;
- 不符合报错, 触发 onError handler;
- 仅用于 application-json;

```typescript
// 定义 schema
export const DatasetActionBodySchema = Type.Object({
  datasetID: Type.String(),
  datasetName: Type.String(),
  datasetAction: Type.Union([
    Type.Literal("create"),
    Type.Literal("rename"),
    Type.Literal("delete"),
  ]),
});

// 使用 schema
const schema = {
  body: bodyJsonSchema,
  querystring: queryStringJsonSchema,
  params: paramsJsonSchema,
  headers: headersJsonSchema,
};

fastify.post("/the/url", { schema }, handler);
```

### 序列化数据

- schema 中定义 response, 加快序列化速度;
- 使用同验证数据;
- 仅用于 application-json;

```typescript
const schema = {
  response: {
    default: responseSchema0,
    200: responseSchema1,
  },
};

fastify.post("/the/url", { schema }, handler);
```

## hook

### 基础

##### 工作机制

- 使用 fastify.addHook() 监听声明周期特定事件;
- 到达事件触发对应 hook

##### 注册 hook

```typescript
// 同步, 需要 done()
fastify.addHook("onRequest", (request, reply, done) => {
  // Some code
  done();
});
// 异步, 不需要 done()
fastify.addHook("onRequest", async (request, reply) => {
  await asyncMethod();
});
```

### Request/Reply hook

##### onRequest

```typescript
fastify.addHook("onRequest", async (request, reply) => {
  // Some code
  await asyncMethod();
});
```

##### preParsing

```typescript
fastify.addHook("preParsing", async (request, reply, payload) => {
  // Some code
  await asyncMethod();
  return newPayload;
});
```

##### preValidation

```typescript
fastify.addHook("preValidation", async (request, reply) => {
  const importantKey = await generateRandomString();
  request.body = { ...request.body, importantKey };
});
```

##### preHandler

```typescript
fastify.addHook("preHandler", async (request, reply) => {
  // Some code
  await asyncMethod();
});
```

##### preSerialization

```typescript
fastify.addHook("preSerialization", async (request, reply, payload) => {
  return { wrapped: payload };
});
```

##### onError

```typescript
fastify.addHook("onError", async (request, reply, error) => {
  // Useful for custom error logging
  // You should not use this hook to update the error
});
```

##### onSend

```typescript
fastify.addHook("onSend", async (request, reply, payload) => {
  const newPayload = payload.replace("some-text", "some-new-text");
  return newPayload;
});
```

##### onResponse

```typescript
fastify.addHook("onResponse", async (request, reply) => {
  // Some code
  await asyncMethod();
});
```

##### onTimeout

```typescript
fastify.addHook("onTimeout", async (request, reply) => {
  // Some code
  await asyncMethod();
});
```

##### onRequestAbort

```typescript
fastify.addHook("onRequestAbort", async (request) => {
  // Some code
  await asyncMethod();
});
```

##### 错误处理

```typescript
fastify.addHook("onRequest", async (request, reply) => {
  throw new Error("Some error");
});
```

##### 提前返回请求

- 使用 return 或 reply.send();

```typescript
fastify.addHook("onRequest", (request, reply, done) => {
  reply.send("Early response");
});

// Works with async functions too
fastify.addHook("preHandler", async (request, reply) => {
  setTimeout(() => {
    reply.send({ hello: "from prehandler" });
  });
  return reply; // mandatory, so the request is not executed further
  // Commenting the line above will allow the hooks to continue and fail with FST_ERR_REP_ALREADY_SENT
});
```

##### 路由级别 hook

- fastify.route 中使用对应 hook;

### fastify hook

##### onListen

- fastify 实例监听之前触发;
- 调用 fastify.ready() 触发;

```typescript
fastify.addHook("onReady", async function () {
  // Some async code
  await loadCacheFromDatabase();
});
```

##### onReady

- fastify 实例监听触发;

```typescript
fastify.addHook("onListen", async function () {
  // Some async code
});
```

##### onReady

- 所有请求处理完毕, 且调用 fastify.close() 后触发;

```typescript
fastify.addHook("onClose", async (instance) => {
  // Some async code
  await closeDatabaseConnections();
});
```

##### preClose

- 调用 fastify.close() 之前触发;

```typescript
fastify.addHook("preClose", async () => {
  // Some async code
  await removeSomeServerState();
});
```

##### onRoute

- 触发路由时触发;

```typescript
fastify.addHook("onRoute", (routeOptions) => {
  //Some code
  routeOptions.method;
  routeOptions.schema;
  routeOptions.url; // the complete URL of the route, it will include the prefix if any
  routeOptions.path; // `url` alias
  routeOptions.routePath; // the URL of the route without the prefix
  routeOptions.bodyLimit;
  routeOptions.logLevel;
  routeOptions.logSerializers;
  routeOptions.prefix;
});
```

##### onRegister

- 注册插件且创建封装上下文之前触发;

```typescript
fastify.addHook("onRegister", (instance, opts) => {
  // ...
});
```
