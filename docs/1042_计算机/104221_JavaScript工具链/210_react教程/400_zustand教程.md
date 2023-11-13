---
id: a4fee038-8420-4e81-83d4-b619b6b7dd78
---

# zustand 教程

## 入门

##### 安装

```bash
npm install zustand
```

## 基础

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

## 进阶

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

[[410_immer教程#zustand]]

### 疑难杂症

##### 组件只有全局状态变量的 action 而没有状态变量本身

```typescript
// 如果只有 modelStatus 的相关方法, 而没有 modelStatus 本身
// 在组件内部执行相关方法后, 即使 modelStatus 已经改版
// 由于没有 modelStatus, zustand 无法判别该组件需要被渲染
// 所以组件不会重新渲染, 就产生 bug 哩, 真的好恶心
// 因此组件中改变 modelStatus 有要获取 modelStatus 时, 一定要有 modelStatus 本身
// 即使你并没有使用 modelStatus 变量;
const App = () => {
  // const modelStatus = useModelsStatus((state) => state.modelStatus);
  const addModelStatus = useModelsStatus((state) => state.addModelStatus);
  const getModelStatus = useModelsStatus((state) => state.getModelStatus);
  const updateModelStatus = useModelsStatus((state) => state.updateModelStatus);
  const removeModelStatus = useModelsStatus((state) => state.removeModelStatus);
  // ...
  return <></>;
};
```

##### zustand 的闭包问题

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
      setCount(count + 1); // 由于闭包, count 无法获取最新的值
      setCount(getCount() + 1); // 使用 zustand 中的 get() 函数可以获取最新的值
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
};
```
