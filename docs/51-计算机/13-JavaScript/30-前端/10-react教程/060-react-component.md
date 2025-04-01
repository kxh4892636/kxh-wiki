---
id: 970ad259-d439-41f5-ab1e-3ecf17abef22
---
# react Component

## `<Fragment>`

- `<></>` 的简写；
- 不使用父节点的情况下进行分组；

```typescript
<>
  <OneChild />
  <AnotherChild />
</>
```

## `<Profiler>`

### 基本使用

- 编程方式进行组件树性能分析；
- 生产环境默认禁用；

```typescript
<App>
  <Profiler id="Sidebar" onRender={onRender}>
    <Sidebar />
  </Profiler>
  <PageContent />
</App>
```

### onRender 回调

- 监听组件每重新渲染，调用 onRender 回调；

```typescript
function onRender(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  // Aggregate or log render timings...
}
```

### 多个 `<Profiler>`

```typescript
<App>
  <Profiler id="Sidebar" onRender={onRender}>
    <Sidebar />
  </Profiler>
  <Profiler id="Content" onRender={onRender}>
    <Content />
  </Profiler>
</App>
```

### 嵌套 `<Profiler>`

```typescript
<App>
  <Profiler id="Sidebar" onRender={onRender}>
    <Sidebar />
  </Profiler>
  <Profiler id="Content" onRender={onRender}>
    <Content>
      <Profiler id="Editor" onRender={onRender}>
        <Editor />
      </Profiler>
      <Preview />
    </Content>
  </Profiler>
</App>
```

## `<StrictMode>`

### 基本使用

- 启动严格模式；
- 开发过程暴漏常见错误；

```typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### 运行机制

- 组件渲染两次，避免 impure 渲染引起错误；
- useEffect 运行两次，避免缺少 return 引起的错误；

## `<Suspense>`

### 基本使用

- 显示占位内容；
- 直至包裹组件加载完成；

```typescript
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```

### 子组件

- 默认情况 `<Suspense>` 视内部的整个树为一个单元；
- 其中一个组件处于加载中，整个树都会被替换；

```typescript
<Suspense fallback={<Loading />}>
  <Biography />
  <Panel>
    <Albums />
  </Panel>
</Suspense>
```

### 嵌套使用

- `<Suspense>` 可嵌套使用；
- 避免内部整个树统一替换；

```typescript
<Suspense fallback={<BigSpinner />}>
  <Biography />
  <Suspense fallback={<AlbumsGlimmer />}>
    <Panel>
      <Albums />
    </Panel>
  </Suspense>
</Suspense>
```

### 避免已显示内容隐藏

- 子组件切换状态会导致显示占位内容；
- 若已经显示部分内容，占位内容的切换影响用户体验；
- 与 useTransition 或 startTransition 使用；
- 避免子组件切换状态导致的回退；

```typescript
export default function App() {
  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
  );
}

function Router() {
  const [page, setPage] = useState("/");

  function navigate(url) {
    startTransition(() => {
      setPage(url);
    });
  }
  // ...
}
```
