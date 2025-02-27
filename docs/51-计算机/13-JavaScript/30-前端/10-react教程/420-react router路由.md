---
id: 39a5628a-2b5a-44fd-9422-da8c082281d4
---

# react router

## 基础

### 安装

```typescript
pnpm add react-router-dom
```

### 使用流程

- 选择路由模式;
- 定义路由;
- 跳转路由;

## 路由模式

### BrowserRouter

- 基于 DOM History API;
- 根据 url 进行路由管理;
- 推荐使用模式;

```typescript
import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>{/* The rest of your app goes here */}</BrowserRouter>
);
```

### HashRouter

- 使用 url 中的 hash 部分进行路由管理;
- 强烈不推荐使用;

```typescript
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>{/* The rest of your app goes here */}</HashRouter>,
  root
);
```

### MemoryRouter

- 基于内存进行路由管理;
- 主要用于测试和组件开发工具;

```typescript
import * as React from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));

root.render(
  <MemoryRouter>{/* The rest of your app goes here */}</MemoryRouter>
);
```

### StaticRouter

- 用于 ssr;

```typescript
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import http from "http";

function requestHandler(req, res) {
  let html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      {/* The rest of your app goes here */}
    </StaticRouter>
  );

  res.write(html);
  res.end();
}

http.createServer(requestHandler).listen(3000);
```

## 定义路由

##### Routes 和 Route

- 模板定义;
- Routes 作为根路由;
- Route 作为具体跳转路由;

```typescript
export default function App() {
  return (
    <>
      <div>title</div>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="messages" element={<DashboardMessages />} />
          <Route path="tasks" element={<DashboardTasks />} />
        </Route>
        <Route path="about" element={<AboutPage />} />
      </Routes>;
    </>
  );
}
```

##### useRoutes

- 函数式定义;

```typescript
import * as React from "react";
import { useRoutes } from "react-router-dom";

let element = useRoutes([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "messages",
        element: <DashboardMessages />,
      },
      { path: "tasks", element: <DashboardTasks /> },
    ],
  },
  { path: "about", element: <AboutPage /> },
]);
export default function App() {
  return (
    <>
      <div>title</div>
      {element}
    </>
  );
}
```

## 跳转路由

### Link

##### 基本使用

- 基于 a 的封装;
- 切换至对应 path;

```typescript
import * as React from "react";
import { Link } from "react-router-dom";

function UsersPage({ user }) {
  return (
    <div>
      <Link to={user.id}>{user.name}</Link>
    </div>
  );
}
```

##### relative

- 基于当前 path 进行切换;

```typescript
import * as React from "react";
import { Link } from "react-router-dom";

function EditContact() {
  return (
    <div>
      <Link to=".." relative="path">
        Cancel
      </Link>
    </div>
  );
}
```

##### preventScrollReset

- 保存滚动位置状态;

```typescript
<Link to="?tab=one" preventScrollReset={true} />
```

##### state

- 附加状态信息;
- 使用 useLocation() 获取状态;

```typescript
<Link to="new-path" state={{ some: "value" }} />;

let { state } = useLocation();
```

### NavLink

##### NavLink

- Link 的封装;
- 具有 active, pending 和 transitioning 三种状态, 默认为 active 状态;
- 用于 className, style 和子标签的状态管理;

```typescript
<NavLink
  to="/messages"
  className={({ isActive, isPending, isTransitioning }) =>
    [
      isPending ? "pending" : "",
      isActive ? "active" : "",
      isTransitioning ? "transitioning" : "",
    ].join(" ")
  }
>
  Messages
</NavLink>
```

### useNavigate

- 编程式导航;
- 切换至对应 path;

```typescript
import { useNavigate } from "react-router-dom";

function useLogoutTimer() {
  const userIsInactive = useFakeInactiveUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsInactive) {
      fake.logout();
      navigate("/session-timed-out");
    }
  }, [userIsInactive]);
}
```

##### relative

- 同 Link;

##### preventScrollReset

- 同 Link;

##### state

- 同 Link;

## 常用 hook 和工具

### useLocation

- 获取当前路由的 location object;

```typescript
import * as React from "react";
import { useLocation } from "react-router-dom";

function App() {
  let location = useLocation();
  // ...
}
```

### matchRoutes

- 根据当前 url 返回对应的 Route 元数据;

```typescript
export const ExtendRouter = ({ children }: AppProps) => {
  const location = useLocation();
  const matches = matchRoutes(route, location);

  // ...
};
```

## 最佳实践

### 路由守卫

##### 定义路由守卫

```typescript
interface AppProps {
  children: JSX.Element | null;
}
export const ExtendRouter = ({ children }: AppProps) => {
  const location = useLocation();
  const matches = matchRoutes(route, location);

  useLayoutEffect(() => {
    // 执行相关代码
  }, [location.pathname]);

  return children;
};
```

##### 使用路由守卫

```typescript
<ExtendRouter>{element}</ExtendRouter>
```

## 手写极简路由

### 实现 Router

- 监听 history 事件;
  - 监听 pushState 和 popState 事件;
  - pushState 自己通过状态管理库实现;
  - popState 浏览器自带;
- 定义 push 和 goBack 函数;
- 使用状态管理保存 history 和 location;

```typescript
const useRouterStore = create((set) => ({
  location: null,
  setLocation: (value) => {
    set({
      location: value,
    });
  },
  history: null,
  setHistory: (value) => {
    set({
      history: value,
    });
  },
}));

export const Router = ({ children }) => {
  const setHistory = useRouterStore((state) => state.setHistory);
  const setLocation = useRouterStore((state) => state.setLocation);

  useEffect(() => {
    const { pathname } = window.location;
    setLocation(pathname || "/");
    setHistory({
      push,
      goBack,
    });
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const push = (location) => {
    setLocation(location);
    window.history.pushState({ location }, null, location);
  };

  const goBack = () => {
    window.history.go(-1);
  };

  const handlePopState = () => {
    const { pathname } = window.location;
    setLocation(pathname);
  };

  return <>{children}</>;
};
```

### 实现 Route

- 从属性中获取 component 和 path;
- 如果 path 相同返回 component, 反之返回 null;

```typescript
export const Route = (props) => {
  const { component: Component, path: componentPath } = props;
  const location = useRouterStore((state) => state.location);

  return <>{location === componentPath ? <Component /> : null}</>;
};
```

### Link

- 从属性获取 to;
- 使用 history 的 push 方法定向到 to;

```typescript
const Link = (props) => {
  const history = useRouterStore((state) => state.history);

  const handleTo = () => {
    history.push(props.to);
  };

  return (
    <a {...props} onClick={handleTo}>
      {props.children}
    </a>
  );
};
```

### 简单示例

```typescript
export const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/users" component={Users} />
      </div>
    </Router>
  );
};
```
