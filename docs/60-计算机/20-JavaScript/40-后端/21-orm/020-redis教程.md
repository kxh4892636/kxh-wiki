---
id: 226ff186-1eac-440e-8a99-beabf93917d8
---

# redis 教程

## 基础

### 安装

```bash
pnpm add
```

### 创建 redis 数据库连接

```typescript
import { createClient } from "redis";

export const redis = createClient();
redis.on("error", (err) => console.log("Redis Client Error", err));
await redis.connect();
```

## crud

### 报错

##### 报错

- 似乎永远不会发生 crud 逻辑的报错；
- 只会发生程序的报错；

### 简单数据类型

##### 简单数据类型

- 设置简单数据类型；

```typescript
await client.set("key", "value");
const value = await client.get("key");
```

### hash 类型

##### hSet

- 创建或更新 key-value；
- 若 key 不存在则创建，反之则覆写；

```typescript
await client.hSet("key", "field1", "value1", "field2", "value2");
await client.hSet("key", {
  field1: "value1",
  field2: "value2",
});
```

##### hGet/hGetAll

- 获取 key-value；

```typescript
await client.hGet("key", "field1"); // 'value1'
await client.hGet("key", "field2"); // (nil)
await client.hGetAll("key"); // { field1: 'value1', field2: 'value2' }
```

##### hDel

- 删除 value；
- 若 field 存在则删除，反之则忽略；

```typescript
// 删除单个字段
await client.hDel("key", "field1");
```

##### hExists

- key 存在 filed 返回 1，反之返回 0；

```typescript
await client.hExists("key", "field1");
```

##### hKeys

- 返回 key 对应的 hash 的所有字段；

```typescript
await client.hKeys("key"); // [field1, field2]
```

##### hLen

- 返回 key 对应的 hash 的所有字段的数量；

```typescript
await client.hLen("key"); // 2
```

##### hVals

- 返回 key 对应的 hash 的所有字段的值；

```typescript
await client.hVals("key"); // ['value1', 'value2']
```

## 过期时间

##### 过期时间

- 到达过期时间后，自动删除对应 key；

```typescript
// 设置过期时间为 60 s
await redis.expire("key", 60);

// key 不存在过期时间时, 才会创建过期时间
await redis.expire("key", 60, "NX");
// key 已经存在过期时间时, 才会创建过期时间
await redis.expire("key", 60, "XX");
// key 新的过期时间大于原有过期时间才会设置
await redis.expire("key", 60, "GT");
// key 新的过期时间小于原有过期时间才会设置
await redis.expire("key", 60, "LT");
```

##### 更新机制

- 覆写过期时间；
- 过期时间更新为新的值；

## 最佳实践

##### redis 报错的坑

- node-redis 未连接成功时；
- 其方法永远不会 resolve()，因此 catch 只能捕获 redis 的运行错误；
- 使用 redis.isReady 判断 redis 是否连接成功；

```typescript
if (redis.isReady) {
  const redisKey = "username_" + name;
  await redis.hSet(redisKey, "token", token as string).catch(() => {
    throw new Error("Can not set user to redis in signIn service.");
  });
  expiresSecond &&
    (await redis.expire(redisKey, expiresSecond).catch(() => {
      throw new Error("Can not set expire of user in signIn service.");
    }));
}
```
