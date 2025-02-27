---
id: 33aa9810-64d2-4622-bf18-37b0676c9077
---

# httpsProxyAgent 教程

##### 安装

```typescript
pnpm add https-proxy-agent
```

##### 基本使用

```typescript
const agent = new HttpsProxyAgent(`http://172.21.240.1:7890`);
const sign = new AbortController();
setTimeout(() => {
  sign.abort();
}, 3000);
const result = await fetch(url, {
  headers: headers,
  signal: sign.signal,
  agent: agent,
});
```
