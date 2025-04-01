---
id: c5060236-ac93-4ad4-9f46-56952e21e962
---

# react 进阶

## 基础

### react 特点

- 声明式编程：隐藏底层细节，关注于 UI 而非底层实现；
- 虚拟 DOM：基于虚拟 DOM 和 diff 算法，最小化的更新 DOM；
- 组件化：UI 抽象为组件，更好的维护性和复用性；
- 单向数据流：自上而下的传递数据，方便维护和调试；
- 函数式编程；

### 性能优化方法

- 避免组件属性的频繁修改；
- 使用 useMemo，useCallback 和 memo 避免不必要的渲染；
- 使用 lazy，Suspense 实现按需加载组件；
- 基于 startTransition，useTransition，useDeferredValue 延迟更新 UI；
- 通用手段
  - 懒加载；
  - 懒渲染；
  - 节流/防抖；

### 高阶组件

##### 基础

- react 复用组件逻辑的设计模式；
- 本质为一个函数，接受一个组件，并返回一个新组件；
- 用于拓展组件功能；

##### 应用场景

- 拓展组件功能；
- 劫持原组件逻辑；
- 动态加载组件；
- 动态绑定事件；

## 虚拟 DOM

##### 基础

- 一个 js 对象；
- 描述 DOM 结构特征；
- 使用 diff 算法与虚拟 DOM 配合，提高组件渲染速度；

##### 优点

- 减少性能耗费；
- 易于实现跨平台；

##### 缺点

- 无法进行针对性的性能极致优化；
- 首屏加载速度；
  - 中间过程包了一层虚拟 DOM；
  - 创建速度慢；

##### 为什么速度快

- js 速度比 DOM 通信快；
  - DOM 未触发重排和重绘；
  - DOM 通信使用 IPC，性能耗费大；
- 如果真实 DOM 能够做到最优解，速度比虚拟 DOM 快，但是一般难以做到；

## diff

##### 传统 diff

- 传统 diff 算法时间复杂度为 O(n^3)；
- react 定义三种策略降低时间复杂度为 O(n)；

##### 策略

- tree diff：对比树的同一层级；
  - 两个树进行对比时，仅会对比同一层级的节点。忽略跨层级操作，只有删除和创建操作；
  - 若同一层级相同位置节点不同，删除或创建该节点；
- component diff：对比两个组件；
  - 首先判断两个节点类型是否相同；
  - 若相同进行下一层级，否则替换其本身及所有子节点；
- element diff：对比同一层级的一组元素集合；
  - 基于唯一标识 key 判断渲染前后的新老集合是否需要插入/删除/移动；
    - INSERT_MARKUP；
    - MOVE_EXISTING；
    - REMOVE_NODE；

##### element diff 算法

- 遍历新集合中的节点；
  - 通过唯一标识 key 判断新老集合是否存在相同节点；
  - 定义索引 current，表示新集合遍历节点中在老集合中的最右位置；
  - 若存在相同节点，进行移动操作；
    - 判断老集合节点位置 old 和 current 的大小；
    - 若 old \< current 进行节点移动操作，否则不进行该操作；
  - 若不能存在，进行插入操作；
- 对老集合进行遍历，判断是否存在新集合不存在，但老集合存在的节点，进行删除操作；

##### 协调

- 组件状态发生变化，react 触发重渲染，生成渲染后的虚拟 dom 树；
- 通过 diff 算法对比渲染前后的虚拟 DOM 树的差异，计算最小的更新操作；
- 将最小的更新操作应用至真实 dom，减少对于真实 dom 的更新；

## render

### jsx 解析

- 函数组件使用 jsx 描述组件结构；
- 通过 babel 对 jsx 进行编译，转换为 js 代码；
- jsx 编译过程中使用 root。render() 生成虚拟 DOM；
- 使用 diff 算法进行虚拟 DOM 更新；

### 渲染流程

##### 触发渲染

- 初始化触发：react 初始化时触发渲染；
- 更新触发：props 或 state 更新时触发渲染；

##### 渲染组件

- 初始化渲染：渲染 root component；
- 更新渲染；
  - react 执行对应组件，实时计算并返回一个新的 jsx；
  - 渲染改变该组件及其子组件；
  - 若渲染该组件引起了其他组件的变化，依次递归渲染；
- 根据 jsx 创建虚拟 DOM；

##### 更新 DOM

- 初始化渲染：使用 appendChild() DOM API 创建所有的 DOM；
- 更新渲染：即协调过程；

##### Browser paint

- 浏览器根据 DOM 重新绘制屏幕；

### 渲染原理

- 虚拟 dom；
- 调和过程；
- 批量更新机制；

## react 事件机制

### 事件监听

- 使用 jsx 绑定事件；

```typescript
<div ref={ref} onClick={onClick} />
```

### 合成事件

- react 根据 W3C 规范对浏览器原生事件进行封装；
- 解决浏览器之间的兼容性问题；
- 同时额外添加事件，提高交互体验；

### 事件委托

- react 通过事件委托的方式，同一将所有事件绑定在 react Root 统一处理；
- 减少事件注册，进而减少内存消耗，提升性能；
- 用于解决浏览器兼容性问题；

## react Fiber

### 背景

- react 通过遍历组件树个更新状态；
- 当组件树过大，遍历开销大；
- 若某个组件更新过程堵塞，整个组件树更新也会堵塞；

### fiber

- 基于优先级和 window。requestIdleCallback() API 的循环任务调度算法；

### 基本思想

- 将组件树的遍历变成了可中断的异步任务；
- 将整个组件树渲染拆分为多个任务，每个任务具有多个任务单元 (fiber)；
- 根据优先级顺序串行执行 fiber；
  - 每执行完一个 fiber 后，检查是否存在更高优先级的任务；
  - 若存在，中断当前任务，执行更高优先级的任务，执行完毕后返回当前任务；
- 依次取出 fiber 在主线程执行，如果当前帧 (16ms) 具有足够时间完成下一个 fiber，继续执行，反之停止执行；

### 三个阶段

- 协调：即 diff 中的协调，协调阶段可以中断；
- 调度；
  - 构建任务优先级队列；
  - 在每个浏览器帧之间动态分配和调度任务；
- 渲染：浏览器渲染组件；

### Fiber 对象

- 一个组件实例为一个任务单元；
- 一个任务单元对应一个 Fiber 对象；
- 包含组件的状态和相关信息；

### 双缓存技术

- 支持可中断的异步任务；
- 定义两个 fiber 树，current fiber tree 和 work in progress fiber tree；
- current fiber tree 对应当前渲染结果；
- work in progress fiber tree 对应正在进行更新操作的 fiber 树；
- 更新操作完成后，将 current fiber tree 替换为 work in progress fiber tree；

### 优点

- 更快的渲染速度：fiber 和 diff 优化，高效渲染组件；
- 更好的用户体验：可中断和恢复的 fiber；
- 更高的拓展性；

### 相关 api

- 控制任务单元的执行顺序，暂停和恢复；
  - requestIdleCallback；
  - cancelIdleCallback；
  - setTimeout；
  - setImmediate；

## hook

### useState

#### useState 执行顺序

- 初始渲染，通过 useState 定义多个状态；
- 调用 useState，生成 hook 记录，构建一个链表，包括状态值和修改函数；
- 触发 setter 函数，修改链表中的对应状态值，同时触发重渲染；
- 重新渲染时，依次调用 useState，并修改链表中的对应 hook 记录；

#### setter 的本质

- setter 为一个 reducer 函数，用于修改对应状态值；
- 底层基于 useReducer 实现，具有关键函数 basicStateReducer；
- 当参数不为函数时，基于当前快照值改变状态；
- 当参数为函数时，获取当前的最新值，基于最新值改变状态；

```typescript
function basicStateReducer(state, action) {
  return typeof action === "function" ? action(state) : action;
}
```

#### 异步和同步

##### 异步和同步

- react 类组件的生命周期中调用 setState 为同步；
- 在事件处理函数，定时器，promise 调用 setState 为异步操作；
  - 将更新操作放置于更新队列中，等待当前代码执行完毕后进行批量更新；

##### 批量更新机制

- react 会对同一类型 setState 进行合并更新处理；
- react 对不同类型 setState 进行批量更新处理，减少不必要的 DOM 操作；
- react 会在下一次渲染，按顺序调用更新队列，得到最终的 state 值，然后进行 jsx 构建；
- 可通过 flushSync 手动退出批量更新机制；

```typescript
function handleClick() {
  // 批量处理更新, 合并多个 state
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React 将会 re-render 一次.
}

function handleClick() {
  flushSync(() => {
    setCounter((c) => c + 1);
  });
  // 现在 React 已经重新渲染了 dom
  flushSync(() => {
    setFlag((f) => !f);
  });
  // 现在 React 已经重新渲染了 dom
}
```

### useEffect

- 调用 useEffect，生成 hook 记录，添加到 hook 链表中；
- 额外在 effect 队列中添加等待执行的 effect 函数；
- 浏览器渲染后，依次调用 effect 队列；
- 调用过程依旧属于本次渲染；

## react 和 vue 的区别

### 概述

| 特点       | vue                                    | react                  |
| ---------- | -------------------------------------- | ---------------------- |
| 学习曲线   | 易上手, api 多                         | js 要求高, api 少      |
| 响应式原理 | 单向数据流但是双向绑定, 响应式系统     | 单向数据流             |
| 模板语法   | 模板语法                               | jsx                    |
| 生态系统   | 不断发展的社区, 但是具有统一的官方实现 | 庞大的社区, 成熟的生态 |

### 单向数据流

- 数据传递的流向；
- 数据只能从父组件传递至子组件；

### 单向绑定和双向绑定

- view 和 viewModel 的映射关系；
- 单向绑定：viewModel 发生变化，自动同步至 view，反之无效；
- 双向绑定：任意层的变化都会同步至另一层；
- react 单向绑定表现；
  - react 只能通过 state 的变化 (viewModel)，更新组件 (view)；
  - 表单输入值反生变化(view)，无法影响 state (viewModel)；
    - 只能在 onChange 事件中通过 setState 促使 state 发生变化；
