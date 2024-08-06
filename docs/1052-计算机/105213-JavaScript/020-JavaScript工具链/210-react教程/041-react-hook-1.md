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
- 该 hook 会阻止浏览器重新绘制屏幕, 导致堵塞组件渲染;
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

### useInsertionEffect

- `useInsertionEffect(setup, dependencies?)`;
- 适用于 css in js;
- 在布局效果触发之前将元素插入到 dom 中;
- 只能在客户端运行;

```typescript
import { useInsertionEffect } from "react";

// Inside your CSS-in-JS library
function useCSS(rule) {
  useInsertionEffect(() => {
    // ... inject <style> tags here ...
    // 指定依赖
  }, [dep0, dep1]);
  return rule;
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

## useDeferredValue

### 基本使用

- `const deferredValue = useDeferredValue(value)`;
- 延迟更新部分 UI;
- value 为需要推迟更新的值;
- 初始渲染, useDeferredValue 返回提供值;
- 更新渲染期间, react 首先尝试使用旧值进行重新渲染;
- 渲染完成后, 立刻尝试使用新值进行重新渲染, 该渲染可以中断;

```typescript
import { useState, useDeferredValue } from "react";

// 必须为原始值类型
function SearchPage() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  // ...
}
```

### 加载新内容时显示旧内容

- 与 Suspense 或 lazy 搭配使用;

```typescript
import { Suspense, useState, useDeferredValue } from "react";
import SearchResults from "./SearchResults.js";

export default function App() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}
```

### 表示内容已过期

- 根据 query 和 deferredQuery 的状态判断数据是否过期;

```typescript
import { Suspense, useState, useDeferredValue } from "react";
import SearchResults from "./SearchResults.js";

export default function App() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <div
          style={{
            opacity: isStale ? 0.5 : 1,
            transition: isStale
              ? "opacity 0.2s 0.2s linear"
              : "opacity 0s 0s linear",
          }}
        >
          <SearchResults query={deferredQuery} />
        </div>
      </Suspense>
    </>
  );
}
```

### 优化 UI 性能

- SlowList 使用 memo 包裹;
- SlowList 使用 useDeferredValue 值作为属性;
- 推迟 SlowList 渲染, 避免堵塞 UI, 影响用户体验;

```typescript
const SlowList = memo(function SlowList({ text }) {
  // ...
});

function App() {
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);
  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}
```

## useDebugValue

### 基本使用

- `useDebugValue(value, format?)`;
- 用于 react devtools 调试;

```typescript
import { useDebugValue } from "react";

function useOnlineStatus() {
  // ...
  useDebugValue(isOnline ? "Online" : "Offline");
  // ...
}
```

### 自定义 hook 添加标签

- 自定义 hook 中使用 useDebugValue;
- devtools 显示标签;
- 可添加 format 函数, 对 value 进行处理;

```typescript
useDebugValue(date, (date) => date.toDateString());
```

![添加标签](images/2024-04-08-14-32-00.png)

## useId

- `const id = useId()`;
- 生成一个唯一 id;
- 禁止用作 key;

```typescript
import { useId } from "react";

function PasswordField() {
  const passwordHintId = useId();
  // ...
}
```

## useSyncExternalStore

### 基本使用

- `const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)`;
- 订阅外部存储;
- 存储快照不不可变数据类型;
- 尽量使用 react 内部状态管理;

```typescript
import { useSyncExternalStore } from "react";
import { todosStore } from "./todoStore.js";

// subscribe 为一个接受 callback 的函数, 存储更改时, 调用对应 callback
// subscribe 返回一个取消订阅的函数
// getSnapshot, 返回外部存储数据快照, 返回值不同, react 重新渲染
function TodosApp() {
  const todos = useSyncExternalStore(
    todosStore.subscribe,
    todosStore.getSnapshot
  );
  // ...
}

let nextId = 0;
let todos = [{ id: nextId++, text: "Todo #1" }];
let listeners = [];
export const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: "Todo #" + nextId }];
    emitChange();
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  },
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}
```

## useTransition

### 基本使用

- `const [isPending, startTransition] = useTransition()`;
- 不堵塞用户界面的情况下更新状态;

```typescript
import { useTransition } from "react";

// isPending 标签是否具有待处理的 startTransition
// startTransition 调用若干 set 函数, 将对应状态更新为 transition
// startTransition 函数立刻执行, 不会延迟运行回调
function TabContainer() {
  const [isPending, startTransition] = useTransition();

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  } // ...
}
```

### 将 UI 更新变为非堵塞

- 不使用 useTransition 更新渲染时间过长的组件 SlowComponent;
  - 该组件会冻结用户 UI, 影响用户交互;
- 使用 useTransition 不会冻结用户 UI, 可打断 SlowComponent 渲染;

### 过渡期间标识 UI

- 使用 useTransition 返回的布尔值标识 UI 当前状态;

```typescript
export default function TabButton({ children, isActive, onClick }) {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>{children}</b>;
  }
  if (isPending) {
    return <b className="pending">{children}</b>;
  }
  //...
}
```

### 用于路由

```typescript
function Router() {
  const [page, setPage] = useState("/");
  const [isPending, startTransition] = useTransition();

  function navigate(url) {
    startTransition(() => {
      setPage(url);
    });
  }
  // ...
}
```

### 疑难杂症

##### 不能在 startTransition 中实时更新输入

- startTransition 只能转换 state 状态;
- 更新输入应该实时改变, 同步更新;
- 可声明两个单独的状态变量或者使用 useDeferredValue;

```typescript
function handleChange(e) {
  // ❌ Can't use Transitions for controlled input state
  startTransition(() => {
    setText(e.target.value);
  });
}
```

##### startTransition 函数必须为同步函数

```typescript
startTransition(() => {
  // ❌ Setting state *after* startTransition call
  setTimeout(() => {
    setPage("/about");
  }, 1000);
});

setTimeout(() => {
  startTransition(() => {
    // ✅ Setting state *during* startTransition call
    setPage("/about");
  });
}, 1000);
```
