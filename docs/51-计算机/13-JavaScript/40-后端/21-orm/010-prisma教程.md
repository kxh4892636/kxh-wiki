---
id: 906d423e-eb09-4f20-8d76-5dc16dce1c3c
---

# prisma 教程

## prisma 基础

### 创建新数据库

##### 基础依赖

- typescript；
- ts-node；

##### 安装相关依赖

```bash
npm install prisma --save-dev
npm install @prisma/client
```

##### 初始化 prisma

```bash
# 新建 prisma 文件夹
# 新建 .env 文件
npx prisma init
```

##### 配置 .env 文件

```bash
# USER 数据库用户名
# PASSWORD 数据库密码
# HOST:PORT 数据库 URL
# 数据库名称
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

##### 配置 schema.prisma 文件

- 没什么好说的，自己配置就完了；

##### 应用至数据库

```bash
# 将 schema.prisma 配置应用至数据库
# 生成一条 migrate 记录
npx prisma migrate dev --name init
```

##### 应用至 prisma client

```bash
npx prisma generate
```

### 根据已有数据库配置

##### 基础依赖

##### 安装相关依赖

##### 初始化 prisma

##### 配置 .env 文件

- 同创建新数据库；

##### 拉取数据库配置

```bash
# 根据数据库配置 schema.prisma 文件
npx prisma db pull
```

##### 创建 migration 对应 sql

```bash
# 按步骤执行即可, 从 vscode 终端执行有 bug, 建议从 git bash 中;
mkdir -p prisma/migrations/0_init
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
```

##### 应用至 prisma client

- 同创建新数据库；

## 常用命令解析

##### npx prisma db pull

- 用于从数据库拉取配置；

##### npx prisma migrate dev --name xxx

- 将 schema。prisma 配置应用至数据库；
- 同时自动执行 npx prisma generate；
- 在修改数据库结构时使用；

##### npx prisma generate

- 将 schema。prisma 配置应用至 prisma client；
- 一般在修改 schema。prisma 配置中别名或拉取数据库配置后使用；
- 修改后 vscode 要重启才能生效，其余 IDE 不清楚；

## prisma schema

### @ 和 @@

```
// @ 表示字段在数据库中的名称
// @@ 表示表在数据库中的名称
model MyUser {
  userId    Int     @id @default(autoincrement()) @map("user_id")
  firstName String? @map("first_name")
  lastName  String  @unique @map("last_name")

  @@map("my_user")
}
```

## prisma client

### curd

#### 报错

##### create/createMany

- 重复添加具有唯一约束的字段报错；

##### find/findMany

- 好像不会报错；

##### update/updateMany

- 更新不存在的字段报错；

##### delete/deleteMany

- 删除不存在的字段报错；

#### create

##### create

```typescript
// 单条记录
const user = await prisma.user.create({
  data: {
    email: "elsa@prisma.io",
    name: "Elsa Prisma",
  },
});
// 多条记录
const createMany = await prisma.user.createMany({
  data: [
    { name: "Bob", email: "bob@prisma.io" },
    { name: "Bobo", email: "bob@prisma.io" }, // Duplicate unique key!
    { name: "Yewande", email: "yewande@prisma.io" },
    { name: "Angelique", email: "angelique@prisma.io" },
  ],
  skipDuplicates: true, // Skip 'Bobo'
});
```

#### read

##### 查询所有字段

```typescript
// 通过唯一标识符读取唯一记录
const user = await prisma.user.findUnique({
  where: {
    email: "elsa@prisma.io",
  },
});
// 读取所有记录
const users = await prisma.user.findMany();
// 读取满足查询条件的所有记录
const users = await prisma.user.findMany({
  where: {
    email: {
      endsWith: "prisma.io",
    },
  },
});
// 读取满足查询条件的第一条记录
const users = await prisma.user.findFirst({
  where: {
    email: {
      endsWith: "prisma.io",
    },
  },
});
```

##### 查询指定字段

```typescript
// 使用 select 关键字
const fileInfo = await prisma.data.findUnique({
  where: {
    id: key,
  },
  select: {
    data: true,
    type: true,
  },
});
```

##### 降序/升序查询

```typescript
// 升序查询
const posts = await prisma.post.findMany({
  orderBy: {
    title: "asc",
  },
});
// 降序查询前 10 个
const getActiveUsers = await prisma.user.findMany({
  take: 10,
  orderBy: {
    title: "desc",
  },
});
```

##### 返回值

- findUnique() 返回 {} 或 null；
- findMany() 返回数组，但数组可为空；

#### update

##### update

```typescript
// 通过唯一标识符更新满足查询条件的唯一记录
const updateUser = await prisma.user.update({
  where: {
    email: "viola@prisma.io",
  },
  data: {
    name: "Viola the Magnificent",
  },
});
// 更新满足查询条件的所有记录
const updateUsers = await prisma.user.updateMany({
  where: {
    email: {
      contains: "prisma.io",
    },
  },
  data: {
    role: "ADMIN",
  },
});
// 更新所有记录
const updateUsers = await prisma.user.updateMany({
  data: {
    role: "ADMIN",
  },
});
```

#### delete

##### delete

```typescript
// 通过唯一标识符删除满足查询条件的唯一记录
const deleteUser = await prisma.user.delete({
  where: {
    email: "bert@prisma.io",
  },
});
// 删除满足查询条件的所有记录
const deleteUsers = await prisma.user.deleteMany({
  where: {
    email: {
      contains: "prisma.io",
    },
  },
});
// 删除所有记录
const deleteUsers = await prisma.user.deleteMany({});
```

### raw sql

##### 作用

- 执行原生 sql；
- 进行 prisma 难以进行的操作；

##### 常用 API

```typescript
// (method) PrismaClient.$queryRaw<unknown>(query: TemplateStringsArray | Sql, ...values: any[]): Prisma.PrismaPromise<unknown> 执行原生 sql
```

##### 注意

```typescript
// 访问数组使用 array[index] 语法
await prisma.$queryRaw`UPDATE data SET cities[0] = 'Qu Fu WHERE country = 'china'`;
// 字符串必须使用单引号
await prisma.$queryRaw`UPDATE data SET name = 'kxh' WHERE id = 1`;
// 使用 null 表示空值
await prisma.$queryRaw`UPDATE data SET name = null WHERE id = 1`;
```

## 最佳实践

### prisma cli 使用

- 仅使用 prisma db pull 和 prisma generate 两个命令；
- 不使用 prisma 改变数据库；

### undefined 使用

- 更新操作中对字段赋值 undefined；
- prisma 忽略该字段更新；

```typescript
const updateUser = await prisma.user.update({
  where: {
    email: "viola@prisma.io",
  },
  data: {
    name: "Viola the Magnificent",
    age: undefined,
  },
});
```
