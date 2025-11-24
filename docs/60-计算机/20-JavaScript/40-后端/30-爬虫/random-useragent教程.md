---
id: e7b69454-b794-46f2-96c0-abe378419f8e
---
# random-useragent 教程

##### 安装

```typescript
pnpm add random-useragent
pnpm add --save-dev @types/random-useragent
```

##### 基础使用

```typescript
import userAgent from "random-useragent";

const agent = userAgent.getRandom((ua) => {
  return ua.osName === "Windows" && ua.osVersion === "10";
});
```

##### UserAgent 接口

```typescript
export interface UserAgent {
  folder: string;
  description: string;
  userAgent: string;
  appCodename: string;
  appName: string;
  appVersion: string;
  platform: string;
  vendor: string;
  vendorSub: string;
  browserName: string;
  browserMajor: string;
  browserVersion: string;
  deviceModel: string;
  deviceType: string;
  deviceVendor: string;
  engineName: string;
  engineVersion: string;
  osName: string;
  osVersion: string;
  cpuArchitecture: string;
}
```
