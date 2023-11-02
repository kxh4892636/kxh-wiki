---
id: 11004a89-e5e4-47a2-abae-770649870492
---

# 交互

## event handlers

### 基础

##### 定义 event handlers

```typescript
// 在组件中定义一个函数,
// 将其作为属性传递给对应 event
// 只能传递 handleClick, 不可添加 (), 否则报无线递归的错误
export default function Button() {
  function handleClick() {
    console.log("You clicked me!");
  }
  return <button onClick={handleClick}>Click me</button>;
}
```

##### 行内形式

```typescript
// 使用箭头函数, 适合于简单函数.
// 使用 handleClick() 形式
<button onClick={(e) => {
  handleClick(e);
  console.log('You clicked me!');
}}>
```

##### 读取属性机制

- event handler 可读取传递给组件的属性.

### event handler 作为属性传递

##### 语法格式

```typescript
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

export default function UploadButton() {
  return (
    <Button onClick={() => console.log("Uploading!")}>Upload Image</Button>
  );
}
```

##### 别名

- event handler 作为属性传递时,
- 可使用别名.

```typescript
function Button({ onName, children }) {
  return <button onClick={onName}>{children}</button>;
}

export default function UploadButton() {
  return <Button onName={() => console.log("Uploading!")}>Upload Image</Button>;
}
```

### Event propagation

##### 机制

- 父组件的 event handler 会传递给子组件,
- 当子组件也存在 event handler 时,
- 自下而上依次调用.

##### 停止传播

```typescript
// 使用 e.stopPropagation() 方法.
function Button({ onClick, children }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </button>
  );
}
```

### 默认行为

##### 机制

- 一些 event 具有自己对应的默认行为,
- 如默认刷新网页等.

##### 禁止默认行为

```typescript
// 使用 e.preventDefault() 方法.
export default function Signup() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Submitting!");
      }}
    >
      <input />
      <button>Send</button>
    </form>
  );
}
```

## react 渲染顺序

### 第一步: 触发渲染

##### 初始化触发

- react 初始化时触发渲染.

##### 更新触发

- state 改变时触发渲染.

##### 更新机制

- 触发对应 event;
- 执行 event handle 中的代码;
- react 根据 state variable 重新渲染.

### 第二步: 渲染组件

##### 初始化渲染

- 渲染 root component;
- 创建 DOM.

##### 更新渲染

- react 执行对应组件;
- 组件实时计算并返回一个新的 jsx;
- 渲染 state 改变的组件;
- 若渲染该组件引起了其他组件的变化,
- 依次递归渲染,
- 直至没有组件改变,
- react 根据返回的 jsx 更新 DOM.

### 第三步: 更新 DOM

##### 初始化渲染

- 使用 appendChild() DOM API 创建所有的 DOM;

##### 更新渲染

- react 最少程度的更新 DOM;
- 能不改变就不改变.

##### 更新策略

- react 只有在两次 render 中 DOM 节点不同时,
- 才会更新 DOM.

### 结束: Browser paint

##### Browser paint

- DOM 更新后,
- 浏览器重新绘制屏幕.
