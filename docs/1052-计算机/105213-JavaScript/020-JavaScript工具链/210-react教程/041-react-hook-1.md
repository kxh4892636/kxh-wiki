---
id: d501f11a-92c3-4d85-92ed-1c500c5c713b
---

# hook

## useEffect

### 基本使用

```typescript
import { useEffect } from "react";
import { createConnection } from "./chat.js";

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState("https://localhost:1234");

  // react 渲染后触发 useEffect
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    // 下一次 useEffect 触发前指定 return 中的箭头函数
    return () => {
      connection.disconnect();
    };
    // 指定依赖
  }, [serverUrl, roomId]);
}
```

### useEffect 依赖

##### 运行机制

- 只有 dependencies 发生改变时, 才会执行 useEffect;
- 若 dependencies 为 [], 仅会在组件 mounts 时执行一次 useEffect;
- 若 dependencies 为 空, 每次组件渲染都会执行 useEffect;

```typescript
import { useEffect } from "react";
const App = () => {
  useEffect(() => {
    // ...
  }, [dependencies]);
  // ...
};
```

##### 依赖原则

- 依赖避免使用 object 和 function, 避免 useEffect 大量调用, 引起性能问题;
  - js 中 object 和 function 实例相互隔离;
  - react 使其为不同的 value;
  - 始终触发 useEffect;
- react 要求 dependencies 无法自定义, 必须包含 useEffect 中的所有 reactive value;
  - 但是实际情况下忽略;

### useEffect 中的 return

- 在每次 useEffect 执行前执行 return 中的箭头函数;
- 若未指定 return, 默认返回一个空函数;

```typescript
import { useEffect } from "react";
const App = () => {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [dependencies]);
};
```

### 同步操作

- useEffect 回调函数必须为同步函数, 故无法使用 await;
- 执行异步函数, 必须使用 promise;

```typescript
useEffect(() => {
  fetchBio(person).then((result) => {
    setBio(result);
  });
}, [person]);
```

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

### useLayoutEffect

- 在浏览器绘制之前触发的 useEffect 版本;
- 尽量首选 useEffect, 不使用 useLayoutEffect;

```typescript
import { useEffect } from "react";
import { createConnection } from "./chat.js";

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState("https://localhost:1234");

  // react 渲染之后, 浏览器更新之前触发 useLayoutEffect
  useLayoutEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    // 下一次 useLayoutEffect 触发前指定 return 中的箭头函数
    return () => {
      connection.disconnect();
    };
    // 指定依赖
  }, [serverUrl, roomId]);
}
```

## useMemo 和 useCallback

### useMemo

##### 基本使用

- 缓存回调函数的返回值;
- 避免多次渲染之间重复计算;

```typescript
import { useMemo } from "react";

function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);
}
```

##### 依赖项

- 组件重新渲染时, 只有当 [] 中依赖发生变化, 执行回调函数, 更新其返回值;
- 依赖禁止使用 object 和 function;
  - js 中 object 和 function 实例相互隔离;
  - react 使其为不同的 value;
  - 导致 useMemo 无效;
- 可使用 useMemo 缓存 object 和 function;

```typescript
function Dropdown({ allItems, text }) {
  const searchOptions = { matchMode: "whole-word", text };

  const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions]);
}

// 使用 useMemo 缓存另一个 useMemo 的依赖项
function Dropdown({ allItems, text }) {
  const searchOptions = useMemo(() => {
    return { matchMode: "whole-word", text };
  }, [text]);

  const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions]);
}
```

##### 与 memo 连用

- memo 只有在其所有属性均不变的情况下, 才会缓存子组件;
- 故使用 useMemo 缓存 object 和 function;

```typescript
export default function Page({ productId, referrer }) {
  const handleSubmit = useMemo(() => {
    return (orderDetails) => {
      post("/product/" + productId + "/buy", {
        referrer,
        orderDetails,
      });
    };
  }, [productId, referrer]);

  return <Form onSubmit={handleSubmit} />;
}
```

### useCallback

##### 基本使用

- useMemo 的语法糖;
- useCallback 缓存回调函数地址;
- 组件重新渲染时, 只有当 [] 中的属性发生变化时, 执行回调函数, 更新其函数地址;

```typescript
// 两者等效
const visibleTodos = useMemo(() => {
  return getFilteredTodos(todos, filter);
}, [todos, filter]);

const visibleTodos = useCallback(getFilteredTodos(todos, filter), [
  todos,
  filter,
]);
```

##### 依赖项

- 同 useMemo;

##### 与 memo 连用

- 同 useMemo;

```typescript
export default function Page({ productId, referrer }) {
  const handleSubmit = useCallback(
    (orderDetails) => {
      post("/product/" + productId + "/buy", {
        referrer,
        orderDetails,
      });
    },
    [productId, referrer]
  );

  return <Form onSubmit={handleSubmit} />;
}
```
