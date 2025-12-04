# swagger 教程

## 基础

### express

##### 安装

```bash
pnpm add --save-dev swagger-ui-express
```

##### 加载配置文件

```typescript
import swaggerUi from "swagger-ui-express";
import express from "express";
const swaggerOption = JSON.parse(
  (await readFile("./src/core/swagger.json")).toString()
);
const app = express();
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerOption));
```

## 配置文件

##### 配置文件

- 配置文件默认使用 openapi 规范;
- 详见 [[050_openapi 教程]];
