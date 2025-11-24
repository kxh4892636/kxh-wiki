---
id: 1e693ef2-bb3a-44cf-896a-ad248972e0ec
---

# react api

## memo

### 基本使用

- react 默认情况下，当一个组件重新渲染时，会递归重新渲染其所有组件；
- 使用 memo 缓存组件，避免不必要的渲染耗费；

```typescript
import { memo } from "react";

const SomeComponent = memo(function SomeComponent(props) {
  // ...
});
```

### 缓存机制

- memo 组件属性发生变化，组件重新渲染；
- memo 内部的 state/context 发生变化，组件重新渲染；

### 引用类型

- react 使用浅相等比较引用类型的前后变化；
- 对于 object/function，需要 useMemo/useCallback 包装；

```typescript
function Page() {
  const [name, setName] = useState("Taylor");
  const [age, setAge] = useState(42);

  const person = useMemo(() => ({ name, age }), [name, age]);

  return <Profile person={person} />;
}

const Profile = memo(function Profile({ person }) {
  // ...
});
```

## forwardRef

### 基本使用

- react 19 该 api 已废弃，ref 已经可以作为属性传递；
- forwardRef(render)；
- 包裹一个组件，其接受父组件传递的 ref 属性；

```typescript
import { forwardRef } from "react";

const MyInput = forwardRef(function MyInput(props, ref) {
  return (
    <label>
      {props.label}
      <input ref={ref} />
    </label>
  );
});
```

### 将子组件中的的 DOM 节点暴漏于父组件

```typescript
function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

### 层层传递

```typescript
function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <FormField label="Enter your name:" ref={ref} isRequired={true} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}

const FormField = forwardRef(function FormField(props, ref) {
  // ...
  return (
    <>
      <MyInput ref={ref} />
      ...
    </>
  );
});
```

### 命令式句柄

- 配合 useImperativeHandle hook；
- 暴漏部分 DOM (命令式句柄)，而不是整个 DOM 节点；
- 详情见 [useImperativeHandle](./040-react-hook.md#useimperativehandle)

## lazy

### 基本使用

##### lazy

- `const SomeComponent = lazy(load)`；
- 声明一个延迟加载的组件；

```typescript
import { lazy } from "react";

const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));
```

### load 函数

- 返回一个 promise；
- 直到 react 尝试渲染 lazy 返回组件之前不会调用；
- 调用 load 后，等待其解析值，并渲染为 react 组件，定义为 `.default` 属性；

### 返回值

- 返回一个 react 组件；
- 未渲染时，使用 `<Suspense>`；

### 搭配 Suspense 惰性加载

- 只有 react 尝试显示对应组件时，才会渲染；
- 未渲染时显示 Suspense 对应组件；

```typescript
import { lazy } from "react";
const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));

<Suspense fallback={<Loading />}>
  <h2>Preview</h2>
  <MarkdownPreview />
</Suspense>;
```

## startTransition

### 基本使用

- `startTransition(scope)`；
- 不堵塞 UI 的情况下更新状态；
- 等效于 useTransition，只是缺少 isPending 状态变量；

```typescript
import { startTransition } from "react";

function TabContainer() {
  const [tab, setTab] = useState("about");

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
```
