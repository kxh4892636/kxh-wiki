---
id: a4fee038-8420-4e81-83d4-b619b6b7dd78
---

# zustand 教程

## 基础

##### 安装

```bash
npm install zustand
```

##### 定义全局状态变量

```typescript
import { create } from "zustand";
const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
```

##### 使用全局状态变量

```typescript
import useBearStore from "use_bear_store";
const BearCounter = () => {
  const bears = useBearStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
};
```

##### 内部行为访问状态

```typescript
// 使用 get 参数
const useSoundStore = create((set, get) => ({
  sound: "grunt",
  action: () => {
    const sound = get().sound
    // ...
  }
})
```

##### 渲染机制

- zustand 中 state 发生改变;
- zustand 会从新渲染所有使用该 state 的组件;

## 工具链

### ts

```typescript
import { create } from "zustand";
// 定义接口
interface BearStore {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}
// 通过泛型使用接口
const useBearStore = create<BearStore>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
```

### immer

- [immer](./410-immer教程.md#zustand);

## 中间件

### 持久化存储

```typescript
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useBearStore = create(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      // name 必须指定且唯一
      name: "food-storage",
      // 默认为 localStorage
      // 可选 sessionStorage, AsyncStorage, IndexedDB
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
```

## 最佳实践

### 组件只有 action 而没有 state

- zustand 根据 state 的变化决定是否渲染组件;
- 若组件只有 action 而没有 state;
- state 发生改变, 该组件不会重新渲染;

```typescript
// 该组件不会重新渲染
const App = () => {
  // const modelStatus = useModelsStatus((state) => state.modelStatus);
  const addModelStatus = useModelsStatus((state) => state.addModelStatus);
  // ...
  return <></>;
};
```

### zustand 的闭包问题

- 由于 react 闭包, zustand 无法获取最新的值;
- 使用 zustand 中的 get() 函数可以获取最新的值;

```typescript
// store.tsx
import { create } from "zustand";

interface Store {
  count: number;
  setCount: (value: number) => void;
  getCount: () => number;
}

export const useStore = create<Store>((set, get) => ({
  count: 0,
  setCount: (value: number) => {
    set({
      count: value,
    });
  },
  getCount: () => get().count,
}));

// App.tsx
const App = () => {
  const count = useStore((state) => state.count);
  const setCount = useStore((state) => state.setCount);
  const getCount = useStore((state) => state.getCount);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
      setCount(getCount() + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
};
```
