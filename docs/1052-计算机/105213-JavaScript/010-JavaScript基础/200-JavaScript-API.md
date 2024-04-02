---
id: 1a8bbacf-f353-47b3-90ac-b07cb9fccd25
---

# JavaScript API

## Atomics 与 SharedArrayBuffer

##### Atomics 与 SharedArrayBuffer

- 多个上下文读取同一个 SharedArrayBuffer;

## 媒体元素

##### 媒体元素

- js 提供一系列属性, 方法, 事件用于 \<audio\> 和 \<video\> 标签;

## Encoding API

##### Encoding API

- 用于字符串和 typed array 的转换;

## Web 组件

##### Web 组件

- 用于增强 DOM 行为的工具;
  - shadow DOM;
  - HTML 模板;
  - 自定义元素;

## 跨上下文消息

##### 要求

- 相同 http 协议;
- 相同 domain;
- 相同 port;

##### postMessage()

```typescript
// 跨文档消息
// otherWindow.postMessage(message, targetOrigin, [transfer]);
// 发送 message 至 otherWindow, 指定发送目标的源为 targetOrigin
let iframeWindow = document.getElementById("myframe").contentWindow;
iframeWindow.postMessage("A secret", "http://www.wrox.com");
```

##### message 事件

```typescript
// 接受 XDM 消息后触发 message 事件
window.addEventListener("message", (event) => {
  // event.origin 表示发送者的源
  if (event.origin == "http://www.wrox.com") {
    // event.data 表示消息内容
    processMessage(event.data);
    // event.source 为发送者的 window 对象的代理
    event.source.postMessage("Received!", "http://p2p.wrox.com");
  }
});
```

## File API

### File 类型

```typescript
// 表示表单文件字段中的选择文件
filesList.addEventListener("change", (event) => {
  let files = event.target.files; // 选择的文件集合
  for (const file of files) {
    // name 属性表示文件名, type 属性表示 MIME 类型, size 属性表示文件 byte 大小
    console.log(`${file.name} (${file.type}, ${file.size} bytes)`);
  }
});
```

### FileReader 类型

##### API

```typescript
// 异步读取文件
// 创建 FileReader 对象
// 接受 File 或者 Blob 类型数据
const reader = new FileReader();

// 以文本形式读取文件
reader.readAsText(file);
const content = reader.result;
// 以 URL 读取文件
reader.readAsDataURL(file);
const content = reader.result;
// 以二进制读取文件
reader.readAsBinaryString(file);
const content = reader.result;
// 以 ArrayBuffer 形式读取文件
reader.readAsArrayBuffer(file);
const content = reader.result;

// 停止读取文件
reader.abort(); // 触发 abort 事件
```

##### 事件

```typescript
const reader = new FileReader();
// 50 ms 触发一次, 可以实时读取 result 属性
reader.addEventListener(
  "progress",
  () => {
    //...
  },
  false
);
// 报错触发
reader.addEventListener(
  "error",
  () => {
    const error = reader.error.code; // 错误码
  },
  false
);
// 加载成功后触发
reader.addEventListener(
  "load",
  () => {
    //...
  },
  false
);
// 执行 abort() 触发
reader.addEventListener(
  "abort",
  () => {
    //...
  },
  false
);
```

### FileReaderSync 类型

##### FileReaderSync 类型

- FileReader 的同步版本;
- 只在 FileReaderSync 中可用;

## Blob API

### Blob

##### blob

- 二进制大对象;

##### 创建 blob

```typescript
// 接受字符串数组, ArrayBuffers, ArrayBufferViews, 可指定 MIME 类型
// size 属性表示字节大小, type 表示 MIME 类型
const blob = new Blob(["foo"]); // Blob {size: 3, type: ""}
const blob = new Blob(['{"a": "b"}'], { type: "application/json" }); // {size: 10, type: "application/json"}
```

##### 切分数据

```typescript
const obj = { hello: "world" };
const blob = new Blob([JSON.stringify(obj, null, 2)], {
  type: "application/json",
});
// 读取 blob [0, 3) 字节的数据
const slice = blob.slice(0, 3);
```

##### 对象 URL

```typescript
// 接受一个 File 或 Blob 对象, 返回一个指向对应对象的 URL 字符串
url = window.URL.createObjectURL(file);
img.src = url;
// 手动释放内存
window.URL.revokeObjectURL(url);
```

### 读取拖放文件

```typescript
// 拖放触发 drop事件
let droptarget = document.getElementById("droptarget");
function handleEvent(event) {
  event.preventDefault(); // 必须取消默认行为
  if (event.type == "drop") {
    files = event.dataTransfer.files; // 拖放文件通过 event.dataTransfer.files 读取, 为 File 对象数组
    for (const file of files) {
      console.log(`${file.name} (${file.type}, ${file.size} bytes)`);
    }
  }
}
droptarget.addEventListener("dragenter", handleEvent);
droptarget.addEventListener("dragover", handleEvent);
droptarget.addEventListener("drop", handleEvent);
```

## 原生拖放

### 拖放事件

##### 拖动触发顺序

- 触发元素为拖动元素;
- dragstart, drag, dragend 依次触发;
- 开始移动鼠标瞬间触发 dragstart 事件;
- 拖动鼠标持续触发 drag;
- 停止移动触发 dragend 事件;

##### 放置触发顺序

- 触发元素为目标放置元素;
- dragenter, dragover, drop/dragleave 依次触发;
- 移动到放置目标上触发 dragenter 事件;
- dragenter 触发后, 拖动元素只要在放置元素范围内持续触发 dragover 事件;
- 离开放置元素范围触发 dragleave 事件;
- 放置到目标元素后触发 drop 事件;

### 自定义放置目标

```typescript
// 部分元素不支持放置, 可通过覆盖 dragover 和 dragenter 默认行为将任何标签转换为可放置目标
let droptarget = document.getElementById("droptarget");
droptarget.addEventListener("dragover", (event) => {
  event.preventDefault();
});
droptarget.addEventListener("dragenter", (event) => {
  event.preventDefault();
});
```

### dataTransfer 对象

##### dataTransfer 对象

- 暴露于 event 属性;
- 用于被拖动元素向放置目标传递字符串数据;

##### API

```typescript
// 第一个参数表示格式, 第二个为值
event.dataTransfer.setData("text", "some text"); // 传递文本
event.dataTransfer.setData("URL", "http://www.wrox.com/"); // 传递 URL
let text = event.dataTransfer.getData("text"); // 获取文本
let url = event.dataTransfer.getData("URL"); // 获取 URL
event.clearData(); //清除所有数据
event.clearData("text"); //清除指定格式数据

// 当前存储数据格式数组
const types = event.types;

// dropEffect 属性 与 effectAllowed 属性连用
// dropEffect 属性表示放置行为, 在 dragenter 事件中使用
// none 不可放置, 除文本框外的默认值
// move, copy, link 依次为应该移动到放置对象, 复制到放置对象, 放置目标会导航到拖动元素
const dropEffect = dataTransfer.dropEffect;
// effectAllowed 属性表示被拖动元素是否允许 dropEffect 对应行为, 在 dragenter 事件中使用
// 具有 uninitialized (没有设置动作), none (无允许行为), copy, link, move, copyLink, copyMove, linkMove, all (允许所有行为) 属性;
const effectAllowed = dataTransfer.effectAllowed;
```

### 可拖动能力

##### 可拖动能力

- 图片, 链接和文本默认可拖动;
- 可使用 draggable 设置任意元素可拖动;

```html
<!-- 禁止拖动图片 -->
<img src="smile.gif" draggable="false" alt="Smiley face" />
<!-- 让元素可以拖动 -->
<div draggable="true">...</div>
```

## Notifications API

##### 通知权限

- 只能在安全上下文触发;
- 每个源必须得到用户允许;

##### 请求权限

```typescript
// 权限请求每个域只能触发一次
// 返回一个 promise, 期约值为 granted 表示允许, denied 表示拒绝
Notification.requestPermission().then((permission) => {
  console.log("User responded to permission request:", permission);
});
```

##### 显示和隐藏通知

```typescript
// 显示通知
const n = new Notification("Title text!"); // 显示 Title text!
const n = new Notification("Title text!", {
  body: "Body text!",
  image: "path/to/image.png",
  vibrate: true,
}); // 通过 option 配置一堆选项
// 关闭通知
setTimeout(() => n.close(), 1000);
```

##### 事件

```typescript
const n = new Notification("foo");
n.onshow = () => console.log("Notification was shown!"); // 显示触发
n.onclick = () => console.log("Notification was clicked!"); // 点击触发
n.onclose = () => console.log("Notification was closed!"); // 关闭触发
n.onerror = () => console.log("Notification experienced an error!"); // 报错触发
```

## Streams API

### 基本概念

##### 可读流

- 通过接口读取数据块的流;

##### 可写流

- 通过接口写入数据块的流;

##### 转换流

- 由可读流和可写流组成;

##### 块

- 流的基本单位, 通常是定型数组;
- 大小不一, 之间时间间隔不一;

##### 内部队列

- 流存在不平衡问题;
- 通过内部队列暂存额外的块;

##### 反压

- 流入持续大于流出, 内部队列无限增大;
- 超过一定阈值, 启动反压停止流入;

## 计时 API

### High Resolution Time API

```typescript
// 返回微秒级别的浮点值
// 采用相对度量, 从执行上下文创建从 0 计时
const relativeTimestamp = performance.now();
// 当前上下文创建时的全局上下文基准值
const origin = performance.timeOrigin;
// 绝对度量
const absoluteTimestamp = performance.timeOrigin + relativeTimestamp;
```

### Performance Timeline API

##### 性能条目

```typescript
// 获取执行上下文中的所有性能条目
console.log(performance.getEntries());
```

##### 公共属性

```typescript
const entry = performance.getEntries()[0];
console.log(entry.name); // "https://foo.com"
console.log(entry.entryType); // navigation
console.log(entry.startTime); // 0
console.log(entry.duration); // 182.36500001512468
```

##### 私有 API

- User Timing API: 自定义性能条目;
- Navigation Timing API: 导航事件的各种时间戳;
- Resource Timing API: 页面加载的各种时间戳;

## Page Visibility API

##### Page Visibility API

- 表示页面对用户是否可见;

##### API

```typescript
// 页面当前状态
// hidden 表示不可见, visible 表示可见
const visibilityState = document.visibilityState;
// 页面切换状态时触发
document.addEventListener("visibilitychange", () => {
  // ...
});
```

## Web Cryptography API

### 随机数

```typescript
// 将随机数写入传递给她的定型数组
// 最多生成 2 ** 16 个字节
const array = new Uint8Array(1);
const fooArray = new Uint32Array(1);
for (let i = 0; i < 5; ++i) {
  console.log(crypto.getRandomValues(array)); // 产生 5 个 8 位随机数
  console.log(crypto.getRandomValues(fooArray)); // 产生 5 个 32 位随机数
}

// 产生 UUID
let uuid = crypto.randomUUID();
```
