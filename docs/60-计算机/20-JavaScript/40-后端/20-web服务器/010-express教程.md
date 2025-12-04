---
id: 463eae31-7924-4043-9c4c-72df0f46168a
---

# express 教程

## express 入门

### 环境配置

##### 安装

```bash
npm install express
npm install --save-dev @types/express
```

### 项目结构

- index.ts: 项目入口;
- routes: 项目路由;
- controllers: 项目控制器;
- services: 项目服务;

```typescript
// route
// 设置对应的 controller
router.get("/case", caseController.getCase);
// controller
// 控制代码逻辑
const getCase = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await caseService.getCase(req.query.id as string));
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
// services
// 负责逻辑具体实现
const getList = async () => {
  const data = await prisma.case.findMany();
  return data;
};
```

## express 基础

### 处理 http 请求

##### 规范写法

```typescript
// 使用 try catch 语句
// 返回 res.status(xxx).xxx()
// json 对象使用 json(), 其余使用 send()
// 一律返回 200
// catch 打印错误信息
const getCase = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await caseService.getCase(req.query.id as string));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(200).json(error.message);
    }
  }
};
```

### 调用其他编程语言

##### 调用命令行

```typescript
import { execSync } from "child_process";
// 接受命令行执行命令的返回字符串的 Buffer
const output = execSync(`python test.py`);
// 转换为字符串
const str = output.toString();
```

## API

### express

##### express

```typescript
// 导入 express
import express from "express";
// 使用 express
const app = express();
```

##### express.json([options])

```typescript
// express 中间件
// 解析 application/json 类型的请求数据, 放置于 body
// 一般与 express.urlencoded() 一起使用
// 应用于 post/put 请求
app.use(express.json());
```

##### express.urlencoded([options])

```typescript
// express 中间件
// 解析 x-www-form-urlencoded 类型的请求数据, 放置于 body
// 格式 name=zhangsan&age=18
// 一般与 express.json() 一起使用
// 应用于 post/put 请求
app.use(express.urlencoded({ extended: false }));
```

##### express.static(root, [options])

```typescript
// express 中间件
// 设置静态文件目录, 可通过 / 直接访问
app.use(express.static("public"));
```

##### express.Router([options])

```typescript
// 创建 express router 类型
const router = express.Router();
```

### app

##### app.use([path,] callback [, callback...])

```typescript
// 设置 express 中间件
// 其有顺序, 根据代码顺序以此执行
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
// 设置路由
app.use("/case", caseRoute);
// ...
```

##### app.listen([port[, host[, backlog]]][, callback])

```typescript
// 设置 express 监听端口
const app = express();
const port = 3456;
app.listen(port, () => {
  console.log("http://localhost:3456");
});
```

##### app.all(path, callback [, callback ...])

```typescript
// 接受 http 所有类型的请求
app.all("/secret", (req, res, next) => {
  // ...
});
```

##### app.METHOD(path, callback [, callback ...])

```typescript
// 接受 http 的一系列请求
// 常见的有 get, post, put 和 delete;
app.post("/", (req, res) => {
  res.send("POST request to homepage");
});
```

### res

##### res.end([data] [, encoding])

```typescript
// 结束 http 请求, 不返回数据
res.status(400).send("Bad Request");
```

##### res.send([body])

```typescript
// 结束 http 请求, 返回 body
// body 可为 buffer, string, object, boolean 和 array
res.status(500).send({ error: "message" });
```

##### res.json([body])

```typescript
// 结束 http 请求, 返回 json
// 在 send() 基础上使用  JSON.stringify()
res.status(500).json({ error: "message" });
```

##### res.status(code)

```typescript
// 设置 res 返回 http 状态码
res.status(400).send("Bad Request");
```

### req

##### req.body

```typescript
// 获取 put 或 post 请求的body;
// 需要使用 body-parse 或 multer 中间件
app.post("/profile", (req, res, next) => {
  res.json(req.body);
});
```

##### req.query

```typescript
// 获取请求字符串中的参数
app.get("/profile", (req, res, next) => {
  // Get /profile?name=kxh&age=23
  res.json(req.query); // {name: 'kxh', age: 23}
});
```

##### req.params

```typescript
// 根据 router 规则获取请求字符串参数
app.get("/profile/:name", (req, res, next) => {
  // GET /profile/test
  res.json(req.params.name); // test
});
```

### router

##### router.all(path, callback [, callback ...])

```typescript
// 接受 http 所有类型的请求
router.all("/secret/*", (req, res, next) => {
  // ...
});
```

##### router.METHOD(path, [callback, ...] callback)

```typescript
// 接受 http 的一系列请求
// 常见的有 get, post, put 和 delete;
router.post("/", (req, res) => {
  res.send("POST request to homepage");
});
```

## 第三方库

### cors

##### 安装

```bash
npm install cors
npm install --save-dev @types/cors
```

##### 作用

- 解决前后端交互跨域问题;

##### 语法格式

```typescript
import cors from "cors";
app.use(cors());
```

### helmet

##### 安装

```bash
npm install helmet
```

##### 作用

- 提供一定程度的安全你保护;

##### 语法格式

```typescript
import helmet from "helmet";
app.use(helmet());
```

### multer

##### 安装

```bash
npm install multer
npm install --save-dev @types/multer
```

##### 作用

- express 处理 multipart/form-data 类型数据中间件;
- 用于数据上传;

##### 语法格式

```typescript
// 导入 multer
import multer from "multer";
// 设置 multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // 设置文件存储目录
      cb(null, dataFoldURL + "/temp/input");
    },
    filename: (req, file, cb) => {
      // 解决中文名乱码
      const filename = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      // 设置文件名
      cb(null, filename);
    },
  }),
});
// 使用 multer
router.post("/upload", upload.single("file"), (req, res) => {
  // 获取 file 信息;
  const file = req.file;
});
```
