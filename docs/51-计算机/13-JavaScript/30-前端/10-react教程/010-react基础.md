---
id: 6b901c98-dae3-4672-91fb-26a6b0c41bfd
---

# react 基础

## 基本概念

### 不改变对象

- react 视一切数据类型为不可变对象;
- 若数据类型为引用类型, 不能修改其内部值, 而是直接赋予一个新的引用类型;

### 渲染策略

- react 严格模式下同一组件重复渲染两次;
  - 假设渲染流程为 A - B - C;
  - 渲染流程为 A \* 2 - B \*2 - C \* 2;
  - 而不是 (A - B - C) \* 2;
- 避免副作用产生的未知影响;

### 快照机制

- react 组件每一状态生成一个快照;
- react hook 导致的状态更改, 参照值仅是基于当前快照, 修改值于下一快照生效;
- react hook 同时执行相同操作, 作用相同;
- 同时快照生成一个闭包, 作用于 setTimeout()/setInterval() 等 API;

```typescript
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}

// 闭包
const [number, setNumber] = useState(0);
setNumber(number + 5);
setTimeout(() => {
  alert(number); // 0
}, 3000);
```

### pure function

- react 中 component/hook 尽力而为的定义为 pure function;
  - useEffect 难以避免;
- 输入相同的数据, 输出必然相同, 即不存在副作用的函数;
