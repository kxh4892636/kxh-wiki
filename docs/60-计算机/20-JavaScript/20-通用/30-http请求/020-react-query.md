# react-query

## 基础

### 安装

```bash
pnpm add @tanstack/react-query
```

## 模版代码

```jsx
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { getTodos, postTodo } from '../my-api'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}
```

## 查询

### 基本概念

- 用于在服务器获取数据，无修改操作
- 通常使用 isPending、isError、data、error 属性
- isPending、isError 和 isSuccess 互斥

```jsx
const {
  data, // 获取数据
  dataUpdatedAt,
  error, // 错误信息
  errorUpdatedAt,
  failureCount,
  failureReason,
  fetchStatus,
  isError, // 是否错误
  isFetched,
  isFetchedAfterMount,
  isFetching, // 是否正在获取数据
  isInitialLoading,
  isLoading, // 是否正在加载
  isLoadingError,
  isPaused,
  isPending, // 正在查询数据
  isPlaceholderData,
  isRefetchError,
  isRefetching,
  isStale,
  isSuccess,
  promise,
  refetch,
  status,
} = useQuery(
  {
    queryKey, // 表示查询的唯一标识符，可定义多个
    queryFn, // 请求函数，返回数据或 throw error
    gcTime,
    enabled, // enabled 为 true，才会触发请求
    networkMode,
    initialData, // 初始数据
    initialDataUpdatedAt,
    meta,
    notifyOnChangeProps,
    placeholderData,
    queryKeyHashFn,
    refetchInterval, // 定时查询
    refetchIntervalInBackground,
    refetchOnMount, // 使用 query 的组件挂载时自动查询，建议全局关闭
    refetchOnReconnect,
    refetchOnWindowFocus, // 使用 query 的组件获得焦点时自动查询，建议全局关闭
    retry, // 重试次数
    retryOnMount, // 使用 query 的组件挂载时自动重试
    retryDelay, // 重试间隔时间
    select,
    staleTime, // 过期时间，默认为 0
    structuralSharing,
    subscribed,
    throwOnError,
  },
  queryClient,
)
```

### 查询键

##### 基本概念

- 包含常量和变量（任意类型）的数组
- 唯一标识查询请求

##### 确定性哈希

- 忽视对象中键的顺序，以下查询视为相等

```jsx
useQuery({ queryKey: ['todos', { status, page }], ... })
useQuery({ queryKey: ['todos', { page, status }], ...})
useQuery({ queryKey: ['todos', { page, status, other: undefined }], ... })
```

- 保留数组元素顺序，以下查询不相等

```jsx
useQuery({ queryKey: ['todos', status, page], ... })
useQuery({ queryKey: ['todos', page, status], ...})
useQuery({ queryKey: ['todos', undefined, page, status], ...})
```

### 查询函数变量

- 将查询函数的依赖变量放置于查询键


```jsx
function Todos({ todoId }) {
  const result = useQuery({
    queryKey: ['todos', todoId],
    queryFn: () => fetchTodoById(todoId),
  })
}
```

### 查询函数

##### 处理错误

- 抛出 throw 或返回 rejected 的 promise

```jsx
const { error } = useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    if (somethingGoesWrong) {
      throw new Error('Oh no!')
    }
    if (somethingElseGoesWrong) {
      return Promise.reject(new Error('Oh no!'))
    }

    return data
  },
})
```

### 查询键传递

- 查询键会传递到查询函数中

```jsx
function Todos({ status, page }) {
  const result = useQuery({
    queryKey: ['todos', { status, page }],
    queryFn: fetchTodoList,
  })
}

// Access the key, status and page variables in your query function!
function fetchTodoList({ queryKey }) {
  const [_key, { status, page }] = queryKey
  return new Promise()
}
```

### 查询函数上下文

- queryKey：查询键
- client：查询客户端
- signal：AbortSignal

### 并行查询

##### 手动

```jsx
function App () {
  // The following queries will execute in parallel
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: fetchTeams })
  const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
  ...
}
```

##### useQueries

```jsx
function App({ users }) {
  const userQueries = useQueries({
    queries: users.map((user) => {
      return {
        queryKey: ['user', user.id],
        queryFn: () => fetchUserById(user.id),
      }
    }),
  })
}
```

## 修改

### 基本概念

- 同名属性同 useQuery
- isIdle、isPending、isError 和 isSuccess 互斥

```jsx
const {
  data,
  error,
  isError,
  isIdle,
  isPending,
  isPaused,
  isSuccess,
  failureCount,
  failureReason,
  mutate,
  mutateAsync,
  reset,
  status,
  submittedAt,
  variables,
} = useMutation(
  {
    mutationFn,
    gcTime,
    meta,
    mutationKey,
    networkMode,
    onError,
    onMutate,
    onSettled,
    onSuccess,
    retry,
    retryDelay,
    scope,
    throwOnError,
  },
  queryClient,
)

mutate(variables, {
  onError,
  onSettled,
  onSuccess,
})
```

### 基本使用

```jsx
// 创建修改函数
const mutation = useMutation({
  mutationFn: (newTodo) => {
    return axios.post('/todos', newTodo)
  },
})

// 重置突变状态
mutation.mutate({ id: new Date(), title: 'Do Laundry' })
```

### 生命周期

- 根据定义顺序，顺序调用

```jsx
useMutation({
  mutationFn: addTodo,
  onMutate: (variables) => {
    // A mutation is about to happen!
    return { id: 1 }
  },
  onError: (error, variables, context) => {
    // An error happened!
    console.log(`rolling back optimistic update with id ${context.id}`)
  },
  onSuccess: (data, variables, context) => {
    // Boom baby!
  },
  onSettled: (data, error, variables, context) => {
    // Error or success... doesn't matter!
  },
})
```

## 查询失效

### queryClient.invalidateQueries

- 根据 queryKey 匹配 useQuery
- 标记失效，并后台重新获取

```jsx
// Invalidate every query in the cache
queryClient.invalidateQueries()

// Invalidate every query with a key that starts with `todos`
queryClient.invalidateQueries({ queryKey: ['todos'] })
// Both queries below will be invalidated
const todoListQuery = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
})
const todoListQuery = useQuery({
  queryKey: ['todos', { page: 1 }],
  queryFn: fetchTodoList,
})
```

### queryClient.refetchQueries

- 根据 queryKey 匹配 useQuery
- 直接重新获取

### queryClient.resetQueries

- 根据 queryKey 匹配 useQuery
- 重置查询的状态（loading）和数据（init）

### 匹配函数

- 定义 predicate 匹配函数
- 根据返回布尔值，确定查询是否失效

```jsx
queryClient.invalidateQueries({
  predicate: (query) =>
    query.queryKey[0] === 'todos' && query.queryKey[1]?.version >= 10,
})

// The query below will be invalidated
const todoListQuery = useQuery({
  queryKey: ['todos', { version: 20 }],
  queryFn: fetchTodoList,
})
// The query below will be invalidated
const todoListQuery = useQuery({
  queryKey: ['todos', { version: 10 }],
  queryFn: fetchTodoList,
})
// However, the following query below will NOT be invalidated
const todoListQuery = useQuery({
  queryKey: ['todos', { version: 5 }],
  queryFn: fetchTodoList,
})
```

### 修改导致的失效

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()

// When this mutation succeeds, invalidate any queries with the `todos` or `reminders` query key
const mutation = useMutation({
  mutationFn: addTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
    queryClient.invalidateQueries({ queryKey: ['reminders'] })
  },
})
```

## 来自修改的更新

- 使用 setQueryData，手动更新数据

```jsx
const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: editTodo,
  onSuccess: (data) => {
    queryClient.setQueryData(['todo', { id: 5 }], data)
  },
})

mutation.mutate({
  id: 5,
  name: 'Do the laundry',
})

// The query below will be updated with the response from the successful mutation
const { status, data, error } = useQuery({
  queryKey: ['todo', { id: 5 }],
  queryFn: fetchTodoById,
})
```

- setQueryData 中的 data 为不可变

```jsx
queryClient.setQueryData(['posts', { id }], (oldData) => {
  if (oldData) {
    // ❌ do not try this
    oldData.title = 'my new post title'
  }
  return oldData
})

queryClient.setQueryData(
  ['posts', { id }],
  // ✅ this is the way
  (oldData) =>
    oldData
      ? {
          ...oldData,
          title: 'my new post title',
        }
      : oldData,
)
```

# 筛选

## 查询筛选

- Stale
  - true：匹配失效查询
  - false：匹配活动查询
- fetchStatus
  - fetching：匹配正在 fetching 的查询
  - paused：匹配想要重新查询，但现在处于 paused 状态的查询
  - idle：匹配目前不在 fetching 的查询

# QueryClient

## 设置全局默认状态

```jsx
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  }
});

await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: fetchPosts })
```