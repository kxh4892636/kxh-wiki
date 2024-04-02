---
id: 116af4bf-9f75-4fa7-a0c0-0d78a1c500ff
---

# create react app

## 基础

##### create react app

- 构建 react 应用程序.

##### 创建 app

```bash
# 原生 react 应用
npx create-react-app my-app
# 支持 ts 的 react 应用
npx create-react-app my-app --template typescript
```

## 样式

### css reset

##### 使用方法

- 在 index.css 或 App.css 中添加以下代码;

```css
@import-normalize; /* bring in normalize.css styles */
/* rest of app styles */
```

## 安装

##### antd

- npm install antd
- npm install @ant-design/icons

##### axios

- npm install axios

##### swr

- npm install swr

##### echarts

- npm install echarts

##### immer

- npm install immer

##### styled-components

- npm install styled-components
- npm install @types/styled-components

##### mapbox

- npm install mapbox-gl
- npm install @types/mapbox-gl

##### zustand

- npm install zustand

## 样式和静态文件

### 公共文件夹

##### 机制

- cra 根目录下的 public 为公共文件夹;
- 其文件可通过 URL 静态访问;

##### 语法格式

```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

```typescript
return <img src={process.env.PUBLIC_URL + "/img/logo.png"} />;
```
