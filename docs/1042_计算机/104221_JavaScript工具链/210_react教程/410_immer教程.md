---
id: 8a11d333-9d44-4ba7-829b-789f82fa24e1
---

# immer

## immer 基础

##### immer

- react 不可变数据库;
- 解决 react 要求变量不可变的要求;

##### 安装

```bash
npm install immer
```

##### 工作原理

- 根据 currentState 创建 draft;
- 你可以修改 draft;
- immer 根据 draft 形成 nextState;

## produce

### produce

##### 语法格式

```typescript
/**
 * @description: immer 最重要的函数
 * @param baseState: 起始状态
 * @param recipe: 修改操作, draftState 恒为第一个参数, baseState 的代理
 */
produce(baseState, recipe: (draftState, ...args) => void): nextState
```

##### 示例

```typescript
const nextState = produce(baseState, (draftState) => {
  draftState.push({ title: "Tweet about it" });
  draftState[1].done = true;
});
```

### 柯里化 produce

##### 工作原理

- 若直接传递 recipe 作为 produce() 第一个参数;
- 创建一个函数, 将 recipe 应用于传递给函数的 baseState;
  - 第一个参数为 baseState, recipe 中的 draftState 为其代理;
  - 其余参数为 recipe 中的其余参数;

```typescript
import produce from "immer";
// 原始函数
function toggleTodo(state, id) {
  return produce(state, (draft) => {
    const todo = draft.find((todo) => todo.id === id);
    todo.done = !todo.done;
  });
}
// 柯里化
const toggleTodo = produce((draft, id) => {
  const todo = draft.find((todo) => todo.id === id);
  todo.done = !todo.done;
});

const nextState = toggleTodo(baseState, "Immer");
```

## react

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

## 疑难杂症

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
