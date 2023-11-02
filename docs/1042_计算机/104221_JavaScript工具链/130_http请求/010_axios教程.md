---
id: adf84ab4-8666-48cf-91eb-5693f8e92b9d
---

# axios 教程

## 基础

##### 安装

```bash
npm install axios
```

## http 请求

### 请求配置

##### 请求配置

```typescript
axios.request({
  url: "/user", // URL 地址
  method: "get", // 默认 get
  baseURL: "https://some-domain.com/", // 若 url 为相对路径, 自动添加至 URL 前,
  headers: { "X-Requested-With": "XMLHttpRequest" }, // 设置 header
  params: {
    // 用于 get 请求, 即 req.query
    ID: 12345,
  },
  data: {
    // 用于 post 请求, 即 req.body
    firstName: "Fred",
  },
  timeout: 1000, // 设置过期时间
  responseType: "json", // 设置返回请求数据类型, 默认 json, json + blob + document
  responseEncoding: "utf8", // 设置返回请求编码, 默认 utf8
  proxy: {
    // 设置代理服务器
    host: "127.0.0.1",
    port: 9000,
    auth: {
      username: "kxh",
      password: "123456",
    },
  },
});
```

##### 修改默认配置

```typescript
// 全局默认配置
axios.defaults.baseURL = "https://api.example.com";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// 实例默认配置
const instance = axios.create({
  baseURL: "https://api.example.com",
});
instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
```

### 响应结构

```json
{
  // 服务器响应数据
  "data": {},
  // HTTP 状态码
  "status": 200,
  // HTTP 状态信息
  "statusText": "OK",
  // 服务器响应的头
  "headers": {},
  // 请求提供的配置信息
  "config": {},
  //
  "request": {}
}
```

### get 请求

##### get 请求

```typescript
axios
  .get({
    url: "/user",
    params: {
      ID: 12345,
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
```

### post 请求

##### post 请求

```typescript
axios
  .post({
    url: "/user",
    data: { firstName: "Fred", lastName: "Flintstone" },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

##### 发送数据格式

- 发送字符串, 默认为 application/x-www-form-urlencoded;
- 发送 object, 默认为 application/json;
- 发送 formdata, 默认为 multipart/form-data;

## 拦截器

##### request

- 发送请求之前运行;

```typescript
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
```

##### response

- 收到响应之后运行;

```typescript
// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
```

##### 自定义实例

```typescript
// 拒绝某一全局拦截器
const myInterceptor = axios.interceptors.request.use(function () {
  /*...*/
});
axios.interceptors.request.eject(myInterceptor);

// 拒绝全部全局拦截器
const instance = axios.create();
instance.interceptors.request.use(function () {
  /*...*/
});
instance.interceptors.request.clear(); // Removes interceptors from requests
instance.interceptors.response.use(function () {
  /*...*/
});
instance.interceptors.response.clear(); // Removes interceptors from responses

// 自定义添加拦截器
const instance = axios.create();
instance.interceptors.request.use(function () {
  /*...*/
});
```

##### 执行顺序

- 根据定义顺序依次执行;

## 进度处理

##### 进度处理

```typescript
await axios.post({
  url: url,
  data: data,
  onUploadProgress: function (axiosProgressEvent) {
    /*{
      loaded: number;
      total?: number;
      progress?: number; // in range [0..1]
      bytes: number; // how many bytes have been transferred since the last trigger (delta)
      estimated?: number; // estimated time in seconds
      rate?: number; // upload speed in bytes
      upload: true; // upload sign
    }*/
  },

  onDownloadProgress: function (axiosProgressEvent) {
    /*{
      loaded: number;
      total?: number;
      progress?: number;
      bytes: number; 
      estimated?: number;
      rate?: number; // download speed in bytes
      download: true; // download sign
    }*/
  },
});
```

##### 速率限制

```typescript
const { data } = await axios.post({
  url: url,
  data: data,
  onUploadProgress: ({ progress, rate }) => {
    console.log(
      `Upload [${(progress * 100).toFixed(2)}%]: ${(rate / 1024).toFixed(
        2
      )}KB/s`
    );
  },

  maxRate: [100 * 1024], // 100KB/s limit
});
```
