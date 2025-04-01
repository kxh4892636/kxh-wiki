---
id: 8a11d333-9d44-4ba7-829b-789f82fa24e1
---

# immer

## immer 基础

##### immer

- react 不可变数据库；
- 解决 react 要求变量不可变的要求；

##### 安装

```bash
npm install immer
```

##### 工作原理

- 根据 currentState 创建 draft；
- 你可以修改 draft；
- immer 根据 draft 形成 nextState；

##### produce

- baseState：起始状态；
- recipe：修改操作，draftState 恒为第一个参数，baseState 的代理；

```typescript
// produce(baseState, recipe: (draftState, ...args) => void): nextState
const nextState = produce(baseState, (draftState) => {
  draftState.push({ title: "Tweet about it" });
  draftState[1].done = true;
});
```

## 最佳实践

##### 返回 draft

```typescript
// immer 是通过 proxy 实现
// 因此本例中返回的是一个 ModelStatus 对象的 proxy, 并不是 ModelStatus 对象本身
removeModelStatus: (key) => {
  let model: ModelStatus;
  set(
    produce((draft: ModelStatusStore) => {
      model = draft.modelStatus.filter((ms) => ms.value === key)[0];
    })
  );
  return model;
};
```

### useState

```typescript
// state 修改操作
setTodos(
  produce((draft) => {
    const todo = draft.find((todo) => todo.id === id);
    todo.done = !todo.done;
  })
);
// state 添加操作
setTodos(
  produce((draft) => {
    draft.push({
      id: "todo_" + Math.random(),
      title: "A new todo",
      done: false,
    });
  })
);
```

### zustand

```typescript
import create from "zustand";
import produce from "immer";

export const useStore = create((set) => ({
  kdramas: [],
  // 添加操作
  addDrama: (value) =>
    set(
      produce((draft) => {
        draft.kdramas.push(value);
      })
    ),
  // ...
}));
```
