---
id: b24f338e-3621-495a-b627-56648fe77063
---

# fastify 工具链

## @fastify/cors

##### 安装

```bash
pnpm add @fastify/cors
```

##### 基础

- 解决跨域问题;

```typescript
import Fastify from "fastify";
import cors from "@fastify/cors";

const fastify = Fastify();
await fastify.register(cors, {
  // put your options here
});
```

## @fastify/formbody

##### 安装

```bash
pnpm add @fastify/formbody
```

##### 基础

- 解析 application/x-www-form-urlencoded;

```typescript
import Fastify from "fastify";
import formbody from "@fastify/formbody";

const fastify = Fastify();
await fastify.register(formbody, {
  // put your options here
});
```

## @fastify/helmet

##### 安装

```bash
pnpm add @fastify/helmet
```

##### 基础

- 安全相关 header;

```typescript
import Fastify from "fastify";
import helmet from "@fastify/helmet";

const fastify = Fastify();
await fastify.register(helmet, {
  // put your options here
});
```

## @fastify/multipart

##### 安装

```bash
pnpm add @fastify/multipart
```

##### 基础

- multipart content-type 支持;

```typescript
import Fastify from "fastify";
import multipart from "@fastify/multipart";

const fastify = Fastify();
await fastify.register(multipart, {
  // put your options here
});

fastify.post("/", async function (req, reply) {
  // process a single file
  // also, consider that if you allow to upload multiple files
  // you must consume all files otherwise the promise will never fulfill
  const data = await req.file();
  data.file; // stream
  data.fields; // other parsed parts
  data.fieldname;
  data.filename;
  data.encoding;
  data.mimetype;
});
```

## @fastify/swagger

### 安装

```bash
pnpm add --save-dev @fastify/swagger
pnpm add --save-dev @fastify/swagger-ui
```

### 基础

- 基于 schema 生成 openapi 文档;
- 注册插件必须使用 await;

```typescript
import Fastify from "fastify";

const app = Fastify();
await app.register(import("@fastify/swagger"), {
  openapi: {
    openapi: "3.0.3",
    info: {
      title: "openapi",
      version: "0.1.0",
    },
  },
});
await app.register(import("@fastify/swagger-ui"), {
  routePrefix: "/api-doc",
});
```

### 定义 schema

```typescript
const schema = {
  tags: ["test"],
  body: bodyJsonSchema,
  querystring: queryStringJsonSchema,
  params: paramsJsonSchema,
  headers: headersJsonSchema,
  response: {
    default: responseSchema0,
    200: responseSchema1,
  },
};

fastify.post("/the/url", { schema }, handler);
```

### 返回非 json 类型

- 仅用于 openapi 3.0;

```typescript
{
  response: {
    200: {
      description: 'Description and all status-code based properties are working',
      content: {
        'application/json': {
          schema: {
            name: { type: 'string' },
            image: { type: 'string' },
            address: { type: 'string' }
          }
        },
        'application/vnd.v1+json': {
          schema: {
            fullName: { type: 'string' },
            phone: { type: 'string' }
          }
        }
      }
    }
  }
}
```
