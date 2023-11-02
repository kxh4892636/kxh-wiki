---
id: d501f11a-92c3-4d85-92ed-1c500c5c713b
---

# hook

## 基本概念

##### hook

- react 中的特殊函数;
- 以 use 为前缀.

##### 使用原则

- hook 只能定义在组件或 hook 的开头;
- 不能定义在条件语句, 循环语句或函数内.

## useRef

### 基本语法

##### 导入 useRef

```typescript
import { useRef } from "react";
const App = () => {
  const ref = useRef(0);
  //...
};
```

##### 使用 useRef

```typescript
import { useRef } from "react";
const App = () => {
  const ref = useRef(0);
  //...
  const value = ref.current;
  ref.current = newValue;
};
```

### useRef 和 useState 的不同

##### 返回值

- ref: {current: initialValue};
- state: [value, setValue].

##### 触发渲染

- ref: 改变 ref 不触发渲染;
- state: 改变 state 触发渲染.

##### 可变性

- ref: mutable, 可读写;
- state: immutable;

##### 更新值

- ref: 实时更新;
- state: 下一次渲染更新;

##### 读取值

- ref: 渲染过程中无法读 ref;
- state: 任何时间读 state, 但仅是其快照.

### Ref 用途

- 存储 timeout IDs;
- 储存和操作 DOM;

### 操作 DOM

##### 操作 DOM

```typescript
// 使用 ref 属性
import { useRef } from "react";
const App = () => {
  const inputRef = useRef(null);
  function handleClick() {
    inputRef.current.focus();
  }
  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
};
```

##### 其余组件的 DOM

- react 不允许组件访问其他组件的 DOM 节点.

##### 强制更新 DOM

```typescript
flushSync(() => {
  setTodos([...todos, newTodo]);
});
listRef.current.lastChild.scrollIntoView();
```

## useEffect

### 基本语法

##### 创建 useEffect

```typescript
import { useEffect } from "react";
const App = () => {
  useEffect(() => {
    // ...
  });
  // ...
};
```

##### 指定依赖

```typescript
import { useEffect } from "react";
const App = () => {
  // 指定 dependencies
  // dependencies 为 reactive values, 如 props, states, 组件中定义的变量
  // dependencies 不可自定义, 所有 reactive values 必须添加至 dependencies
  // 只有 dependencies 发生改变时, 才会执行 useEffect
  // 若 dependencies 为 [], 仅会在组件 mounts 时执行一次 useEffect;
  // 若 dependencies 为 空, 每次组件渲染都会执行 useEffect;
  useEffect(() => {
    // ...
  }, [dependencies]);
  // ...
};
```

##### useEffect 中的 return

```typescript
import { useEffect } from "react";
const App = () => {
  // 在每次 useEffect 执行前执行 return 中的箭头函数
  // 若未指定 return, 默认返回一个空函数
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [dependencies]);
  // ...
};
```

### effect 和 handler event 的区别

##### 触发

- effect 在其 dependencies 变化时触发;
- handler event 被指定行为触发;

##### 逻辑

- event handler 的逻辑非响应式;
  - event handlers 只会被对应 event 触发;
  - event handler 中 reactive values 的改变不会触发 event handler.
- effect 的逻辑响应式;
  - effect 中 reactive values 的改变会触发 effect.

### 生命周期

##### component 生命周期

- mount: 添加至屏幕;
- update: props/state 变化;
- unmount: 从屏幕移除.

##### useEffect 和生命周期的关系

- effect 独立于 component 的 lifecycle;
- component 的一次 lifecycle 可以触发多次 effect;

##### useEffect 作用时机

- Browser paint 之后;
- 但仍在本次 render 中;
- 此时 useState 已经更新;

##### react debug 阶段渲染两次的执行顺序

```typescript
// 先执行 App 内两次, 在执行 useEffect 两次
// 并不是 App-useEffect 循环两次
// 还是在一个快照中
const App = () => {
  const [value, setValue] = useState("init");
  console.log(value);
  useEffect(() => {
    setValue((v) => "value");
    console.log("useEffect");
  }, []);
  return <></>;
};
// init
// init
// useEffect
// useEffect
// value
// value
```

### 使用场景

##### 基本原则

- 需要副作用, 但是无对应 event handler;

##### 初始化

```typescript
import { useEffect } from "react";
const App = () => {
  const map = useRef(undefined);
  useEffect(() => {
    // 仅初始化一次
    if (map) return;
    else;
    map.current = new Map();
  }, []);
  // ...
};
```

### 使用原则

- 尽可能少的使用 useEffect;
- 不要 useEffect 内部使用 setter function;
  - 使用 update function, 使 state 不再是 relative value;

```typescript
function ChatRoom({ roomId }) {
  useEffect(() => {
    connection.on("message", (receivedMessage) => {
      setMessages([...messages, receivedMessage]);
    });
    // 更换为 update function
    connection.on("message", (receivedMessage) => {
      setMessages((msgs) => [...msgs, receivedMessage]);
    });
  }, [roomId, messages]); // ✅ All dependencies declared
  // ...
}
```

- 不要 useEffect 内部处理 event handler;
- 各 Effect 表示独立的逻辑行为;
- 不要在 useEffect 中使用 object 和 function;
  - js 中 object 和 function 实例相互隔离;
  - react 使其为不同的 value;
  - 始终触发 useEffect;

## 性能优化

### memo

##### memo

```typescript
import { memo } from "react";
// 组件触发更新时, 只有组件属性发生变化, 组件才会重新渲染
// 所有属性需要 useCallback 包装
export const Component = memo(() => {
  return <div>test</div>;
});
```

### useMemo

##### useMemo

```typescript
// useMemo 缓存回调函数的返回值
// 组件重新渲染时, 只有当 [] 中的属性发生变化时, 执行回调函数, 返回其返回值
const visibleTodos = useMemo(() => {
  return getFilteredTodos(todos, filter);
}, [todos, filter]);
```

### useCallback

##### useCallback

```typescript
// 可以理解为 useMemo 的语法糖
// useCallback 缓存回调函数地址
// 组件重新渲染时, 只有当 [] 中的属性发生变化时, 执行回调函数, 更新其函数地址
const visibleTodos = useMemo(() => {
  return getFilteredTodos(todos, filter);
}, [todos, filter]);
const visibleTodos = useCallback(getFilteredTodos(todos, filter), [
  todos,
  filter,
]);
```
