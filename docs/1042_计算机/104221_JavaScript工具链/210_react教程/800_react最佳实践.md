---
id: 1a108025-b0cf-4062-8935-4097fd556546
---

# react 最佳实践

## hook

### 闭包问题

##### 常见场景

- 在使用 setTimeout, setInterval, Promise.then, addEventListen, 回调函数的场景下, 即延迟调用;
- 一定会存在闭包问题;

##### 具体表现

```typescript
// 在 setInterval 中使用 useState
// 由于函数闭包, state 永远是定义时的快照
// 如下例, count 永远指向 1
const App = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // count 永远获取的是 0
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <h1>{count}</h1>;
};
```

##### 数组依赖

```typescript
// 监听 count 变化
// 不断创建新的 setInterval
// 但不断清除 setInterval, 耗费性能
const App = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // count 永远获取的是 0
    }, 1000);
    return () => clearInterval(id);
  }, [count]);
  return <h1>{count}</h1>;
};
```

##### 使用 updater function

```typescript
// 使用 updater function 获取最新的 state 值;
// 不用清除 setInterval
// 但该方法无法获取并使用其他属性
const App = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1); // count 永远获取的是 0
    }, 1000);
  }, []);
  return <h1>{count}</h1>;
};
```

##### 使用 ref

```typescript
// 使用 ref 存储 count
// 不用清除 setInterval
// 可以使用组件中的其余属性
const App = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  countRef.current = count;
  useEffect(() => {
    const id = setInterval(() => {
      setCount(countRef.current + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <h1>{count}</h1>;
};
```

### hook 思想

##### 返回逻辑函数

```typescript
const useKeys = () =>  {
  function getAllKeys(data) {
    ...
  }
  function getLayerKeys(data) {
    ...
  }
  function getGroupKeys(data) {
    ...
  }
  return{getAllKeys, getLayerKeys, getGroupKeys}
}
```

## hook 使用误区

##### useEffect 的依赖

- 不是所有的依赖都必须放到依赖数组中;
- 只有当某变量发生变化, 需要触发 useEffect 时, 将其放入依赖数组中;

##### useMemo

```typescript
// 不要滥用 useMemo
// 考虑计算和比较变化的收益
const c = useMemo(() => a + b, [a, b]);
```

##### useCallback

```typescript
// 尽量少的使用 useCallback
// 只有组件被 memo 包裹, 且组件每个属性都使用 useCallback, useCallback 才会生效
const func = useCallback(() => {
  // ...
}, []);
const ExpensiveComponent = React.memo(({ func }) => {
  return <div onClick={func}>hello</div>;
});
```

### hook 的限制

##### 相互调用

- hook 无法相互调用, 否则报错;
  - 即两个 hook A 和 B;
  - 不能 A 中调用 B, B 中有调用 A;

### hook 函数返回值的坑

```typescript
type Action = "all" | "layer" | "group";
// 当 hook 使用 if 或 Switch 返回不同函数时
// ts 无法正常识别返回函数的参数类型
// 如下例, ts 认为返回函数必定有 layer 和 group 两个参数, 导致 getAllKeys 和 getLayerKeys 无法使用, 原因不详
// 如果想要解决, 需要将 layer 和 group 设置为可选参数
// 推荐返回包含三个函数的对象
const useKeys = (type: Action) => {
  function getAllKeys() {
    // ...
  }
  function getLayerKeys(layer: Layer) {
    // ...
  }
  function getGroupKeys(layer: Layer, group: boolean) {
    // ...
  }
  if (type === "all") return getAllKeys;
  else if (type === "layer") return getLayerKeys;
  else return getGroupKeys;
};
```

## 组件

### 弹窗

##### 设计思想

- 单独设置一个组件存放弹窗;
- 该组件接受一个作为弹窗的组件作为属性;
- 使用 useState 确定该弹窗是否显示;

### 不使用路由实现动态侧边栏

```typescript
// 显示 selectID 对应的面板
const Item = ({ selectID, items }: AppProps2) => {
  const panel = items.filter((value) => {
    if (value.id !== selectID) {
      return false;
    }
    return true;
  });
  return panel.length ? panel[0].panel : <></>;
};

const Sidebar = ({ items }) => {
  const [showPanelID, setShowPanelID] = useState(""); // 表明当前面板 id
  const [showItem, setShowItem] = useState(false); // 表明是否显示面板
  // 生成侧边栏
  const sidebarItems = items.map((value): JSX.Element => {
    return (
      <Tooltip placement="right" title={value.title} key={crypto.randomUUID()}>
        <AsideItem
          onClick={(e) => {
            // 侧边栏组件切换逻辑
            // 如果面板已经显示, 而且并切换到其他面板, 不做任何操作, 依旧显示面板
            // 否则关闭该面板, 即多次点击同一侧边栏选项的情况
            if (showItem && e.currentTarget.id !== showPanelID) {
            } else {
              setShowItem(!showItem);
            }
            // 如果多次点击同一侧边栏选项, 清空面板 id
            // 否则将面板 id 设置为当前点击侧边栏选项
            if (showPanelID === e.currentTarget.id) {
              setShowPanelID("");
            } else {
              setShowPanelID(e.currentTarget.id);
            }
          }}
        >
          {value.icon}
        </AsideItem>
      </Tooltip>
    );
  });

  return (
    <>
      <Aside>{sidebarItems}</Aside>
      {showItem ? (
        <PanelContainer style={{ borderRight: "1px solid #d9d9d9" }}>
          <Item selectID={showPanelID} items={items} />
        </PanelContainer>
      ) : (
        <></>
      )}
    </>
  );
};
```

### 创建 svg 组件

##### 语法格式

```typescript
// style 用于修改 svg 组件的大小和颜色
const LayerOutlined: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
  return (
    // span, 修改 svg 样式
    // 设置 padding 和 lineHeight 重置样式
    // fontSize 配合 svg 标签中的 width 和 height 修改 svg 大小
    // color 修改 svg 颜色
    // viewbox 设置 svg 显示区域, 这里和 antd 保持一致
    // svg 中其他属性默认
    <span
      style={{
        padding: "0px",
        lineHeight: "0px",
        fontSize: "14px",
        color: "#595959",
        ...style,
      }}
    >
      <svg
        className="icon"
        viewBox="64 64 896 896"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1394"
        width="1em"
        height="1em"
      >
        // svg 代码忽略
      </svg>
    </span>
  );
};
```

## 思想

### 实时修改

```typescript
// 修改后的 state 只有在下一次渲染中才可以获取
// 部分场景需要修改后立刻访问, 这时候不应使用 state 传递参数
// 应将修改值直接作为逻辑函数的函数参数
const [value, setValue] = useState(0);
setValue(1);
fn(value); // 修改值 1 只有在下一次渲染中才可以获取, 此时依旧为 0, 故发生错误
fn(1); // 不使用 value, 直接将 1 传入 fn() 中
```
