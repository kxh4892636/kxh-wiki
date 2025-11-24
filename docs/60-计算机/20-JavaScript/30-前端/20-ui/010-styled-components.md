---
id: c8543966-2b2e-4152-bb8b-c6c7adf40c83
---

# style-components 教程

## style-components 基础

##### 安装

```bash
npm install styled-components
npm install --save-dev @types/styled-components
```

## 基本概念

##### 定义 style-components

```typescript
const Title = styled.h1`
  font-size: 1.5em;
  color: palevioletred;

  &:hover {
    filter: brightness(0.85);
  }
`;
```

##### 使用 style-components

```typescript
const app = () => <Title>text</Title>;
```

##### 使用规范

- 大驼峰；
- 可使用 Styled 前缀；
- 定义在组件外；

## 拓展样式

```typescript
// 在已有组件或标签基础上拓展样式
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;
```

## 传递表达式

```typescript
// 传递函数
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${func()};
  color: ${func()};
`;
// 传递属性
// Create an Input component that'll render an <input> tag with some styles
const Input = styled.input`
  color: ${(props) => props.inputColor || "palevioletred"};
`;

render(
  <div>
    <Input type="text" />
    <Input type="text" inputColor="rebeccapurple" />
  </div>
);
```

## 标识符

##### &

- 表示任何选择器；

##### &&

- 提高 css 特殊性，没有 !important 高；

##### as

```typescript
// as 将 button 作为 a 使用, 不推荐使用
<div>
  <Button>Normal Button</Button>
  <Button as="a" href="#">
    Link with Button styles
  </Button>
</div>
```

## attrs 构造函数

##### 定义 attrs 构造函数

```typescript
// 使用 .attrs 确定标签属性
const Input = styled.input.attrs((props) => ({
  // 静态属性
  type: "text",
  // 动态属性
  size: props.size || "1em",
}))`
  margin: ${(props) => props.size};
  padding: ${(props) => props.size};
`;

render(
  <div>
    <Input placeholder="A small text input" />
    <br />
    <Input placeholder="A bigger text input" size="2em" />
  </div>
);
```

##### 继承 attrs 构造函数

```typescript
const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.size || "1em",
}))`
  border: 2px solid palevioletred;
  margin: ${(props) => props.size};
  padding: ${(props) => props.size};
`;
// 覆盖 Input 中的 type 和 border 属性
// 其余属性继承 Input
const PasswordInput = styled(Input).attrs({
  type: "password",
})`
  border: 2px solid aqua;
`;
```

## 自定义属性

```typescript
// 使用 <> 定义 NavItem 具有什么属性
const NavItem = styled.div<{ position: string | undefined }>`
  margin-top: ${(props) => props.position && "auto"};
`;
<NavItem position={value.position}>{value.icon}</NavItem>;
```

## 动画
