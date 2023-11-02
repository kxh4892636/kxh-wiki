---
id: 9f01c968-22c2-4271-995e-904f8a274111
---
# event 模块

## EventEmitter

### 事件

```typescript
// newListener
import { EventEmitter } from "node:events";

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.once("newListener", (event, listener) => {
  if (event === "event") {
    myEmitter.on("event", () => {
      console.log("B");
    });
  }
});
myEmitter.on("event", () => {
  console.log("A");
});
myEmitter.emit("event");
// Prints:
//   B
//   A

// removeListener
// 监听器被移除后触发
```

### 方法

##### 添加监听器

```typescript
// emitter.on(eventName, listener)
// 添加监听器
import { EventEmitter } from "node:events";
const myEE = new EventEmitter();
myEE.on("foo", () => console.log("a"));
myEE.prependListener("foo", () => console.log("b"));
myEE.emit("foo");
//  b
//  a

// emitter.prependListener(eventName, listener)
// 添加至 eventName 对应的监听器数组的队头

// emitter.addListener(eventName, listener)
// emitter.on(eventName, listener) 的别名

// emitter.once(eventName, listener)
// 添加只能触发一次的监听器, 触发后自动移除
// once 和 on 添加到同一监听器数组中, 只是 once 自动移除
import { EventEmitter } from "node:events";
const myEE = new EventEmitter();
myEE.once("foo", () => console.log("a"));
myEE.prependOnceListener("foo", () => console.log("b"));
myEE.emit("foo");

// emitter.prependOnceListener(eventName, listener)
// 添加至 eventName 对应的监听器数组的队头, 触发一次自动移除
```

##### 移除监听器

```typescript
// emitter.removeListener(eventName, listener)
// 移除 eventName 以及 listener 对应的监听器, 移除最近添加的监听器
// 若 emitter 重复添加多次, removeListener 执行相同次数
import { EventEmitter } from "node:events";
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log("A");
  myEmitter.removeListener("event", callbackB);
};
const callbackB = () => {
  console.log("B");
};

myEmitter.on("event", callbackA);
myEmitter.on("event", callbackB);

// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit("event");
//   A
//   B
// Internal listener array [callbackA]
myEmitter.emit("event");
//   A

// emitter.off(eventName, listener)
// emitter.removeListener() 的别名

// emitter.removeAllListeners([eventName])
// 移除所有 eventName 的监听器
```

##### 触发监听器

```typescript
// emitter.emit(eventName[, ...args])
// 根据监听顺序, 同步调用 eventName 事件的所有监听器
import { EventEmitter } from "node:events";
const myEmitter = new EventEmitter();

// First listener
myEmitter.on("event", function firstListener() {
  console.log("Helloooo! first listener");
});
// Second listener
myEmitter.on("event", function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on("event", function thirdListener(...args) {
  const parameters = args.join(", ");
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners("event"));
// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
myEmitter.emit("event", 1, 2, 3, 4, 5);
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

##### 元数据

```typescript
// emitter.eventNames()
// 返回所有注册的监听器的名称
import { EventEmitter } from "node:events";

const myEE = new EventEmitter();
myEE.on("foo", () => {});
myEE.on("bar", () => {});
const sym = Symbol("symbol");
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]

// emitter.setMaxListeners(n)
// 设置最大监听器数量

// emitter.getMaxListeners()
// 获取最大监听器数量

// emitter.listenerCount(eventName[, listener])
// eventName 对应监听器数量

// emitter.listeners(eventName)
// eventName 监听器数组的副本
```

## API

### 属性

```typescript
events.defaultMaxListeners; // 默认最大监听器数量, 作用于所有 EventEmitter 实例, 读写
```

### 方法

##### 监听器

```typescript
// events.getEventListeners(emitterOrTarget, eventName)
// 获取 emitterOrTarget 对应 eventName 的 listener 数组;
import { getEventListeners, EventEmitter } from "node:events";
{
  const ee = new EventEmitter();
  const listener = () => console.log("Events are fun");
  ee.on("foo", listener);
  console.log(getEventListeners(ee, "foo")); // [ [Function: listener] ]
}
{
  const et = new EventTarget();
  const listener = () => console.log("Events are fun");
  et.addEventListener("foo", listener);
  console.log(getEventListeners(et, "foo")); // [ [Function: listener] ]
}

// events.getMaxListeners(emitterOrTarget)
// 等效于 emitter.getMaxListeners()

// events.setMaxListeners(n[, ...eventTargets])
// 设置 ...eventTargets 的最大监听器数量
import { setMaxListeners, EventEmitter } from "node:events";
const target = new EventTarget();
const emitter = new EventEmitter();
setMaxListeners(5, target, emitter);
```

##### event.once()

```typescript
// events.once(emitter, name[, options])
// 返回一个 promise, emitter 触发后返回 resolve 状态, 触发 error 时间返回 rejected 状态
// resolve 值为 emitter 触发时携带的参数
// rejected 值为对应错误
import { once, EventEmitter } from "node:events";
import process from "node:process";

const ee = new EventEmitter();
process.nextTick(() => {
  ee.emit("myevent", 42);
});
const [value] = await once(ee, "myevent");
console.log(value); // 42

const err = new Error("kaboom");
process.nextTick(() => {
  ee.emit("error", err);
});
try {
  await once(ee, "myevent");
} catch (err) {
  console.error("error happened", err); // new Error("kaboom")
}

// 可以使用 <AbortSignal> 取消
import { EventEmitter, once } from "node:events";

const ee = new EventEmitter();
const ac = new AbortController();
async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log("event emitted!");
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Waiting for the event was canceled!");
    } else {
      console.error("There was an error", error.message);
    }
  }
}
foo(ee, "foo", ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit("foo"); // Prints: Waiting for the event was canceled!
```

##### events.on()

```typescript
// events.on(emitter, eventName[, options])
// 返回 emitter 触发事件的 <AsyncIterator>
import { on, EventEmitter } from "node:events";
import process from "node:process";

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit("foo", "bar");
  ee.emit("foo", 42);
});

for await (const event of on(ee, "foo")) {
  console.log(event); // prints ['bar'] [42]
}

// 可以使用 <AbortSignal> 取消
import { on, EventEmitter } from "node:events";
import process from "node:process";

const ac = new AbortController();
(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit("foo", "bar");
    ee.emit("foo", 42);
  });

  for await (const event of on(ee, "foo", { signal: ac.signal })) {
    console.log(event); // prints ['bar'] [42]
  }
})();
process.nextTick(() => ac.abort());
```

## Event

## EventTarget

## NodeEventTarget
