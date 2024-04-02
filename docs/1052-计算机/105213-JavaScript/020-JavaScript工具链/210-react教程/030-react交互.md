---
id: 11004a89-e5e4-47a2-abae-770649870492
---

# 交互

## event handlers

### 定义 event handlers

##### 传递函数

- 定义函数;
- 作为属性传递至对应 event;

```typescript
export default function Button() {
  function handleClick() {
    console.log("You clicked me!");
  }
  return <button onClick={handleClick}>Click me</button>;
}
```

##### 行内形式

- 使用箭头函数;

```typescript
<button onClick={(e) => {
  handleClick(e);
  console.log('You clicked me!');
}}>
```

### event handler 作为属性传递

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

### 停止传播和默认行为;

- 停止传播: stopPropagation();
- 默认行为: preventDefault();

## react 渲染顺序

### 第一步: 触发渲染

##### 初始化触发

- react 初始化时触发渲染;

##### 更新触发

- state 改变时触发渲染;

##### 更新机制

- 触发对应 event;
- 执行 event handle 中的代码;
- react 根据 state 是否改变确定是否重新渲染;

### 第二步: 渲染组件

##### 初始化渲染

- 渲染 root component;
- 创建 DOM;

##### 更新渲染

- react 执行对应组件;
- 组件实时计算并返回一个新的 jsx;
- 渲染改变的组件及其子组件;
- 若渲染该组件引起了其他组件的变化;
  - 依次递归渲染;
  - 直至没有组件改变;
- react 根据返回的 jsx 更新 DOM;

### 第三步: 更新 DOM

##### 初始化渲染

- 使用 appendChild() DOM API 创建所有的 DOM;

##### 更新渲染

- react 最少程度的更新 DOM;
- 能不改变就不改变;

##### 更新策略

- react 只有在两次 render 中 DOM 节点不同时;
- 才会更新 DOM;

### 结束: Browser paint

##### Browser paint

- DOM 更新后;
- 浏览器重新绘制屏幕;
