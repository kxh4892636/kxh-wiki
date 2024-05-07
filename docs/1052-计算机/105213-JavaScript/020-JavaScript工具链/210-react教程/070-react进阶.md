---
id: c5060236-ac93-4ad4-9f46-56952e21e962
---

# react 进阶

## react 特点

- 声明式编程: 隐藏底层细节, 关注于 UI 而非底层实现;
- 虚拟 DOM: 基于虚拟 DOM 和 diff 算法, 最小化的更新 DOM;
- 组件化: UI 抽象为组件, 更好的维护性和复用性;
- 单向数据流: 自上而下的传递数据, 方便维护和调试;
- 函数式编程;

## 性能优化方法

- 使用 useMemo, useCallback 和 memo 避免不必要的渲染;
- 使用 lazy, Suspense, startTransition 实现按需加载组件;
- 避免组件属性的频繁修改;

## react diff

### 虚拟 DOM

- 使用 diff 算法与虚拟 DOM 配合;
- 计算虚拟 DOM 中真正变化的部分;
- 仅更新该部分虚拟 DOM 对应的真实 DOM;
- 减少性能耗费;

### 协调

- 组件状态发生变化, react 触发重渲染, 生成渲染后的虚拟 dom 树;
- 通过 diff 算法对比渲染前后的虚拟 DOM 树的差异, 计算最小的更新操作;
- 将最小的更新操作应用至真实 dom, 减少对于真实 dom 的更新;

### diff 算法

##### 传统 diff

- 传统 diff 算法时间复杂度为 O(n^3);
- react 定义三种策略降低时间复杂度为 O(n);

##### 策略

- tree diff: 对比树的整个层级;
  - 两个树进行对比时, 仅会对比同一层级的节点. 忽略跨层级操作;
  - 若同一层级节点不同, 完全删除该节点及其子节点;
- component diff: 对比两个节点;
  - 首先判断两个节点类型是否相同;
  - 若相同进行下一层级, 否则替换其本身及所有子节点;
- element diff: 对比同一层级的一组节点集合;
  - 基于唯一标识 key 判断渲染前后的新老集合是否需要插入/删除/移动;
    - INSERT_MARKUP;
    - MOVE_EXISTING;
    - REMOVE_NODE;

##### element diff 算法

- 遍历新集合中的节点;
  - 通过唯一标识 key 判断新老集合是否存在相同节点;
  - 定义索引 current, 表示新集合遍历节点中在老集合中的最右位置;
  - 若存在相同节点, 进行移动操作;
    - 判断老集合节点位置 old 和 current 的大小;
    - 若 old \< current 进行节点移动操作, 否则不进行该操作;
- 对老集合进行遍历, 判断是否存在新集合不存在, 但老集合存在的节点, 进行删除操作;

## react Fiber

### 背景

- react 通过遍历组件树个更新状态;
- 当组件树过大, 遍历开销大;
- 若某个组件更新过程堵塞, 整个组件树更新也会堵塞;

### 基本思想

- 将组件树的遍历变成了可中断的异步任务;
- 将整个组件树拆分为多个任务, 每个任务具有多个任务单元 (fiber);
- 根据优先级顺序串行执行 fiber;
- 每执行完一个 fiber 后, 检查是否存在更高优先级的任务;
  - 若存在, 中断当前任务, 执行更高优先级的任务, 执行完毕后返回当前任务;
  - 反之继续执行当前任务;
- 同时优化 diff 算法: 将递归遍历修改 (O(n^3)) 为迭代遍历 (O(n));

### 三个阶段

- 协调: 即 diff 中的协调;
  - 协调阶段可以中断;
- 调度;
  - 构建任务优先级队列;
  - 在每个浏览器帧之间动态分配和调度任务;
- 渲染: 浏览器渲染组件;

### Fiber 对象

- 一个任务单元对应一个 Fiber 对象;
- 包含组件的状态和相关信息;

### 双缓存技术

- 支持可中断的异步任务;
- 定义两个 fiber 树, current fiber tree 和 work in progress fiber tree;
- current fiber tree 对应当前渲染结果;
- work in progress fiber tree 对应正在进行更新操作的 fiber 树;
- 更新操作完成后, 将 current fiber tree 替换为 work in progress fiber tree;

### 优点

- 更快的渲染速度: fiber 和 diff 优化, 高效渲染组件;
- 更好的用户体验: 可中断和恢复的 fiber;
- 更高的拓展性;

### 相关 api

- 控制任务单元的执行顺序, 暂停和恢复;
  - requestIdleCallback;
  - cancelIdleCallback;
  - setTimeout;
  - setImmediate;

## react 本质

### useState

##### 执行顺序

- 初始渲染, 通过 useState 定义多个状态;
- 调用 useState, 生成 hook 记录, 包括状态值和修改函数;
- 多次调用 useState 生成的 hook 记录, 生成一个链表;
- 触发 setter 函数, 修改链表中的对应状态值, 同时触发重渲染;
- 重新渲染时, 依次调用 useState, 并修改链表中的对应 hook 记录;

##### setter 的本质

- setter 为一个 reducer 函数, 用于修改对应状态值;
- 底层基于 useReducer 实现, 具有关键函数 basicStateReducer;
- 当参数不为函数时, 基于当前快照值改变状态;
- 当参数为函数时, 获取当前的最新值, 基于最新值改变状态;

```typescript
function basicStateReducer(state, action) {
  return typeof action === "function" ? action(state) : action;
}
```

### useEffect

- 调用 useEffect, 生成 hook 记录, 添加到 hook 链表中;
- 额外在 effect 队列中添加等待执行的 effect 函数;
- 浏览器渲染后, 依次调用 effect 队列;
- 调用过程依旧属于本次渲染;

### 渲染原理

- 虚拟 dom;
  - react 自定义建立 dom 树, 一一对应真实 dom;
- 调和过程;
  - 组件状态发生变化, react 触发重渲染, react 生成渲染后的虚拟 dom 树;
  - 通过 diff 算法对比渲染前后的虚拟 DOM 树的差异, 计算最小的更新操作;
  - 将最小的更新操作应用至真实 dom, 减少对于真实 dom 的更新;
- 批量更新机制;
  - 将多个组件状态变化合并为单次更新操作;
  - 统一进行虚拟 dom 对比和真实 dom 的更新;

## react 和 vue 的区别

| 特点       | vue                                | react                  |
| ---------- | ---------------------------------- | ---------------------- |
| 学习曲线   | 易上手, api 多                     | js 要求高, api 少      |
| 响应式原理 | 单向数据流但是双向绑定, 响应式系统 | 单向数据流             |
| 模板语法   | 模板语法                           | jsx                    |
| 状态管理   | 官方, vuex/pino                    | 社区, 乱七八糟         |
| 生态系统   | 不断发展的社区                     | 庞大的社区, 成熟的生态 |
