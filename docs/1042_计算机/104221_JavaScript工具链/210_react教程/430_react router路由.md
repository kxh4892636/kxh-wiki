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

##### Link

- 基于 \<a\> 的封装;
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
- 具有 active, pending 和 transitioning 三种状态;
- 默认为 active 状态;
- 用于 className, style 和子标签的状态管理;

##### className

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

##### style

```typescript
<NavLink
  to="/messages"
  style={({ isActive, isPending, isTransitioning }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isPending ? "red" : "black",
      viewTransitionName: isTransitioning ? "slide" : "",
    };
  }}
>
  Messages
</NavLink>
```

##### children

```typescript
<NavLink to="/tasks">
  {({ isActive, isPending, isTransitioning }) => (
    <span className={isActive ? "active" : ""}>Tasks</span>
  )}
</NavLink>
```

### useNavigate

##### useNavigate

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
