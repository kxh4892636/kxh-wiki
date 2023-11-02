---
id: e3553c38-ff56-4e59-9a47-bcefc6e59274
---

# UI

## 组件

### 组件基础

##### 组件

- 用户 UI 构建的最小组成部分.

### 定义组件

##### 定义组件

```typescript
// 普通函数形式
function Profile() {
  // ...
}
// 箭头函数形式
const Profile = () => {
  //...
};
```

##### 命名规范

- 必须大驼峰;

##### 组件规范

- 组件必须定义在 export default 前;
- 组件必须有返回值.

##### 组件无效值

- 在 react 中,
- 返回 null/0/undefined 表示组件无内容.

### 使用组件

##### 使用组件

```typescript
<ComponentName />
```

### 嵌套组件

##### 嵌套组件

- 组件可嵌套;
- 上层组件称为父组件;
- 嵌套组件称为子组件.

```typescript
function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
    </section>
  );
}
```

### 导出组件

##### 命名导出

```typescript
// 普通函数形式
export function Button() {}
// 常量形式
const Button;
export Button;
```

##### 默认导出

```typescript
// 普通函数形式
export default function Button() {}
// 常量形式
const Button;
export default Button;
```

##### 命名导出和默认导出的限制

- 一个文件只能有一个默认导出;
- 但可以有多个命名导出.

### 导入组件

##### 命名组件导入

```typescript
import { Button } from "./button.js";
```

##### 默认组件导入

```typescript
import Button from "./button.js";
```

##### 省略 js 文件后缀名

- 导入的 js 文件可省略 js 后缀名.

## jsx

### jsx 基础

##### jsx

- 一种 js 的语法拓展,
- 允许你在 js 中书写 html.

### jsx 原则

##### 组件返回值永远有一个父标签

```typescript
// <div> 或 <>
<>
  <img src="https://i.imgur.com/yXOvdOSs.jpg" alt="Hedy Lamarr" class="photo" />
</>
```

##### 闭合所有标签

```typescript
// 空标签采用 <element /> 形式
// 正常标签采用 <element></element> 形式
<>
  <img src="https://i.imgur.com/yXOvdOSs.jpg" alt="Hedy Lamarr" class="photo" />
  <ul>
    <li>Invent new traffic lights</li>
    <li>Rehearse a movie scene</li>
    <li>Improve the spectrum technology</li>
  </ul>
</>
```

##### 命名规范

- 所有属性名使用小驼峰形式;
- 几乎所有的属性名不能使用 - ;
- 属性名不能与 js 冲突.
- html 冲突的属性改名;

### 大括号

##### 机制

- jsx 中可通过 {} 传递变量, 函数, 对象和表达式等.

##### 传递变量

```typescript
export default function TodoList() {
  const name = "Gregorio Y. Zara";
  return <h1>{name}'s To Do List</h1>;
}
```

##### 传递对象

```typescript
export default function TodoList() {
  return (
    // css 在 jsx 中作为 object 传递, 故 style 套两层 {}
    <div
      style={{
        backgroundColor: "black",
        color: "pink",
      }}
    ></div>
  );
}
```

##### 传递表达式

```typescript
export default function TodoList() {
  const firstName = "Xiaohan";
  const lastName = "Kong";
  return <h1>{firstName + "" + lastName}'s To Do List</h1>;
}
```

##### 传递函数

```typescript
export default function TodoList() {
  const items = {
    title: "delete",
    action:{()=>{deleteItem()}}
  };
}
```

## 传递属性

### 传递机制

##### 机制

- 父组件向子组件传递属性;
- 子组件使用 {} 或者 props 读取属性.

```typescript
function Avatar({ person, size }) {
  // person and size are available here
}

export default function Profile() {
  return (
    <Avatar person={{ name: "Lin Lanying", imageId: "1bX5QH6" }} size={100} />
  );
}
```

##### props 和 {}

- props 是一个关键字,
  - 代表传递的属性.
- {} 叫做 destructuring,
  - 一种特殊的语法格式.

```typescript
// 两者等效
function Avatar({ person, size }) {
  // ...
}
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

### 属性默认值

##### 设置默认值

- 当父组件传递属性值为 undefined 时;
- 使用默认值;
- 传递 null 视为传递属性值为 null;

```typescript
function Avatar({ person, size = 100 }) {
  // ...
}
```

### 改变属性

##### 改变属性

- react 中属性是不可改变的,
- 如果需要改变属性,
- 父组件需要设置不同的状态,
- 向传递一组新属性用于代替旧属性.

### children 属性

##### children 属性

- 组件属性使用 children 属性;
  - children 为关键字,
  - 表示被嵌套的内容.
- 组件看作正常的 html 标签;
  - 使用 \</ element\> 的格式.

```typescript
import Avatar from "./Avatar.js";

function Card({ children }) {
  return <div className="card">{children}</div>;
}

export default function Profile() {
  return (
    <Card>
      <Avatar />
    </Card>
  );
}
```

## 条件渲染

### if 语句

```typescript
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✔";
  }
  return <li className="item">{itemContent}</li>;
}
```

### 条件运算符

```typescript
function Item({ name, isPacked }) {
  return <li className="item">{isPacked ? name + " ✔" : name}</li>;
}
```

### && 操作符

```typescript
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && "✔"}
    </li>
  );
}
```

## 渲染列表

### 定义列表

##### 思想

- 基于 js 的数组,
- 使用 map() 和 filter() 方法定义列表.

##### 定义列表

```typescript
export default function List() {
  // 使用 filter() 方法筛选数组
  const chemists = people.filter((person) => person.profession === "chemist");
  // 使用 map() 方法.生成列表
  const listItems = chemists.map((person) => (
    <li key={person.id}>{person.name}</li>
  ));
  return <ul>{listItems}</ul>;
}
```

### key 值

##### key 属性

- react 生成列表元素时必须定义 key,
- 用于标识每个列表元素.

##### key 原则

- key 必须唯一;
- key 不可改变.

##### key 和属性的关系

- 组件不可将 key 作为属性传递,
- 若组件需要 id,
- 自定义 id 属性.

```typescript
<Profile key={id} userId={id} />
```

## 组件的纯粹性

##### 纯粹性

- 组件不能改变之前存在的变量或对象;
- 组件输入相同参数, 输出相同结果;

##### strict mode

- react 部署时会渲染 component 两次;
- 用于判断 component 的副作用;

##### 例外情况

- 使用 event handlers 的时候;
- 组件可以改变之前存在的变量或对象;
