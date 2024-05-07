---
id: 685470f7-7b7d-43a3-a35a-8fc90967dce0
---

# react hook 最佳实践

## 性能优化

### 相关 hook 和 api

- useMemo;
- useCallback;
- memo;

### 基本原则

- 若无必要, 不使用 useMemo 和 useCallback;

### 比较开销

```typescript
// 考虑计算 props 变化和重新计算/渲染的收益
const c = useMemo(() => a + b, [a, b]);
```

### memo 属性要求

```typescript
// 只有组件每个引用类型属性都使用 useCallback/useMemo, memo 才会生效
const func = useCallback(() => {
  // ...
}, []);
const ExpensiveComponent = React.memo(({ func }) => {
  return <div onClick={func}>hello</div>;
});
```

## 定义 hook

### 相互调用 hook

- custom hook 无法相互调用, 否则报错;
  - 即两个 hook A 和 B;
  - 不能 A 中调用 B, B 中有调用 A;

### 避免重复初始化初始值

- 使用 useState/useRef/useEffect 等 hook 时;
- 避免重复初始化不必要的值;

```typescript
const playerRef = useRef(null);
if (playerRef.current === null) {
  playerRef.current = new VideoPlayer();
}

useEffect(() => {
  if (mapRef.current === null) {
    mapRef.current = new MapWidget(containerRef.current);
  }

  const map = mapRef.current;
  map.setZoom(zoomLevel);
}, [zoomLevel]);
```

## 使用 hook

### 实时修改

```typescript
// 修改后的 state 只有在下一次渲染中才可以获取
// 部分场景需要修改后立刻访问, 这时候不应使用 state 传递参数
// 应将修改值直接作为逻辑函数的函数参数
const [value, setValue] = useState(0);
setValue(1);
fn(value); // 修改值 1 只有在下一次渲染中才可以获取, 此时依旧为 0, 故发生错误
fn(1); // 不使用 value, 直接将 1 传入 fn() 中
```

### 闭包问题

##### 常见场景

- 在使用 setTimeout, setInterval, Promise.then, addEventListen, 回调函数的场景下;
- 一定会存在闭包问题;

##### 具体表现

```typescript
// 在 setInterval 中使用 useState
// 由于函数闭包, state 永远是定义时的快照
// 如下例, count 永远指向 1
const App = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // count 永远获取的是 0
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <h1>{count}</h1>;
};
```

##### 数组依赖

```typescript
// 监听 count 变化
// 不断创建新的 setInterval
// 但不断清除 setInterval, 耗费性能
const App = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // count 永远获取的是 0
    }, 1000);
    return () => clearInterval(id);
  }, [count]);
  return <h1>{count}</h1>;
};
```

##### 使用 updater function

```typescript
// 使用 updater function 获取最新的 state 值;
// 不用清除 setInterval
// 但该方法无法获取并使用其他属性
const App = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1); // count 永远获取的是 0
    }, 1000);
  }, []);
  return <h1>{count}</h1>;
};
```

##### 使用 ref

```typescript
// 使用 ref 存储 count
// 不用清除 setInterval
// 可以使用组件中的其余属性
const App = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  countRef.current = count;
  useEffect(() => {
    const id = setInterval(() => {
      setCount(countRef.current + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <h1>{count}</h1>;
};
```

## 模拟生命周期

### componentDidMount

- 使用 useEffect 和空依赖数组实现;

```typescript
useEffect(() => {
  // componentDidMount 逻辑
  return () => {
    // componentWillUnmount 逻辑
  };
}, []);
```

### componentDidUpdate

- 使用 useEffect 和依赖数组实现;

```typescript
useEffect(() => {
  // componentDidUpdate 逻辑
}, [dependencies]);
```

### shouldComponentUpdate

- 使用 memo 实现;

```typescript
const MemoizedComponent = React.memo(Component);
```

### componentDidCatch

- 自定义 ErrorBoundary 组件;

```typescript
function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  if (error) {
    // ...
  }
  return children;
}
```
