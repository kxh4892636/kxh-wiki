# dotenv 教程

## 基础

##### 安装

```bash
pnpm add dotenv --save-dev
```

## 使用

##### 创建配置文集

- 项目根目录创建 .env;

```json
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"
```

##### 使用

```typescript
import * as dotenv from "dotenv";
dotenv.config();
console.log(process.env.S3_BUCKET);
```

##### 指定配置文件

```typescript
import * as dotenv from "dotenv";
// 指向根目录下的 .test 文件;
dotenv.config(".test");
console.log(process.env.S3_BUCKET);
```

## 最佳实践

##### vite

- vite 自带 dotenv;
