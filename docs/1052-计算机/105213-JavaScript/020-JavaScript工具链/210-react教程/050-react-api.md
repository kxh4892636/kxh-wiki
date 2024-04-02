---
id: 1e693ef2-bb3a-44cf-896a-ad248972e0ec
---

## react api

## memo

### 基本使用

- react 默认情况下, 当一个组件重新渲染时, 会递归重新渲染其所有组件;
- 使用 memo 缓存组件, 避免不必要的渲染耗费;

```typescript
import { memo } from "react";

const SomeComponent = memo(function SomeComponent(props) {
  // ...
});
```

### 缓存机制

- memo 组件属性发生变化, 组件重新渲染;
- memo 内部的 state/context 发生变化, 组件重新渲染;

### 引用类型

- react 使用浅相等比较引用类型的前后变化;
- 对于 object/function, 需要 useMemo/useCallback 包装;

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
