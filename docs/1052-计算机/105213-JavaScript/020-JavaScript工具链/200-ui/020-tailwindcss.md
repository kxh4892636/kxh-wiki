---
id: 8c90a841-56ae-4ba2-a8c1-344f0d2409f8
---

# tailwindcss

## 基础

### 环境配置

##### 安装

```bash
pnpm add --save-dev tailwindcss postcss autoprefixer
pnpm dlx tailwindcss init -p
```

##### 配置文件

- 根目录创建 `tailwind.config.js`;

```typescript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

##### css 文件

- 创建 `./src/index.css`;

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 插件

- vscode plugin;
- prettier-plugin-tailwindcss;

## 原子化 css

- 不必考虑类名;
- 可重用性: 减少 css 文件体积;
- 自带 UI 设计系统;
- 可维护性;
- 状态管理;
- 响应式设计;

```typescript
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
```

## 状态管理

### 支持状态管理

- 伪类;
- 微元素;
- 媒体查询;
- 选择器;

### 伪类

##### hover/focus/active

```typescript
<button class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
  Save changes
</button>
```

##### first/last/odd/even

```typescript
<ul role="list" class="p-6 divide-y divide-slate-200">
  {#each people as person}
    <!-- Remove top/bottom padding when first/last child -->
    <li class="flex py-4 first:pt-0 last:pb-0">
      <img class="h-10 w-10 rounded-full" src="{person.imageUrl}" alt="" />
      <div class="ml-3 overflow-hidden">
        <p class="text-sm font-medium text-slate-900">{person.name}</p>
        <p class="text-sm text-slate-500 truncate">{person.email}</p>
      </div>
    </li>
  {/each}
</ul>
```

#### 表单状态

- required/invalid/disabled;

```typescript
<form>
  <label class="block">
    <span class="block text-sm font-medium text-slate-700">Username</span>
    <!-- Using form state modifiers, the classes can be identical for every input -->
    <input type="text" value="tbone" disabled class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
  </label>
  <!-- ... -->
</form>
```

#### 父元素状态

##### 基础

- 根据父元素的状态设置自身样式;
- 使用 group 标记父元素;
- 使用 group-\* 设置状态;

```typescript
<a href="#" class="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500">
  <div class="flex items-center space-x-3">
    <svg class="h-6 w-6 stroke-sky-500 group-hover:stroke-white" fill="none" viewBox="0 0 24 24"><!-- ... --></svg>
    <h3 class="text-slate-900 group-hover:text-white text-sm font-semibold">New project</h3>
  </div>
  <p class="text-slate-500 group-hover:text-white text-sm">Create a new project from a variety of starting templates.</p>
</a>
```

##### 嵌套父元素

- 使用 `group/{name}` 标记父元素;
- 使用 `group-*/{name}` 设置状态;

```typescript
<ul role="list">
  {#each people as person}
    <li class="group/item hover:bg-slate-100 ...">
      <img src="{person.imageUrl}" alt="" />
      <div>
        <a href="{person.url}">{person.name}</a>
        <p>{person.title}</p>
      </div>
      <a class="group/edit invisible hover:bg-slate-200 group-hover/item:visible ..." href="tel:{person.phone}">
        <span class="group-hover/edit:text-gray-700 ...">Call</span>
        <svg class="group-hover/edit:translate-x-0.5 group-hover/edit:text-slate-500 ...">
          <!-- ... -->
        </svg>
      </a>
    </li>
  {/each}
</ul>
```

##### 选择器

- 使用 `group-[*]` 操作符表示 \* 选择器对应标签的状态;

```typescript
<div class="group is-published">
  <div class="hidden group-[.is-published]:block">Published</div>
</div>
```

#### 同级元素状态

- 父元素基础上将 group 替换为 peer;

```typescript
<form>
  <label for="email">Email:</label>
  <input id="email" name="email" type="email" class="is-dirty peer" required />
  <div class="peer-[.is-dirty]:peer-required:block hidden">This field is required.</div>
  <!-- ... -->
</form>
```

#### 后代元素状态

- 父元素基础上将 group 替换为 has;

```typescript
<label class="has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 ..">
  <svg fill="currentColor">
    <!-- ... -->
  </svg>
  Google Pay
  <input type="radio" class="checked:border-indigo-500 ..." />
</label>
```

#### 设置直接子元素

- 设置直接子元素样式;
- 父元素基础上将 group 替换为 \*;

```typescript
<div>
  <h2>Categories<h2>
  <ul class="*:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 ...">
    <li>Sales</li>
    <li>Marketing</li>
    <li>SEO</li>
    <!-- ... -->
  </ul>
</div>
```

#### 基于父元素/同级元素的后代

- 使用 `group-has-*` 和 `peer-has-*` 操作符;

### 伪元素

##### before 和 after

- 使用 `before` 和 `after` 操作符;

```typescript
<label class="block">
  <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
    Email
  </span>
  <input
    type="email"
    name="email"
    class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
    placeholder="you@example.com"
  />
</label>
```

##### Placeholder text

- input 中的 placeholder;
- 使用 `placeholder` 操作符;

```typescript
<label class="relative block">
  <span class="sr-only">Search</span>
  <span class="absolute inset-y-0 left-0 flex items-center pl-2">
    <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"><!-- ... --></svg>
  </span>
  <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
</label>
```

##### File input buttons

- input 中的 file;
- 使用 `file` 操作符;

```typescript
<form class="flex items-center space-x-6">
  <div class="shrink-0">
    <img
      class="h-16 w-16 object-cover rounded-full"
      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
      alt="Current profile photo"
    />
  </div>
  <label class="block">
    <span class="sr-only">Choose profile photo</span>
    <input
      type="file"
      class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
    />
  </label>
</form>
```

##### List markers

- list 中的 maker;
- 使用 `marker` 操作符;

```typescript
<ul
  role="list"
  class="marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-500"
>
  <li>5 cups chopped Porcini mushrooms</li>
  <li>1/2 cup of olive oil</li>
  <li>3lb of celery</li>
</ul>
```

##### Highlighted text

- 选中文字;
- 使用 `selection` 操作符;

```typescript
<div class="selection:bg-fuchsia-300 selection:text-fuchsia-900">
  <p>
    So I started to walk into the water. I won't lie to you boys, I was
    terrified. But I pressed on, and as I made my way past the breakers a
    strange calm came over me. I don't know if it was divine intervention or the
    kinship of all living things but I tell you Jerry at that moment, I{" "}
    <em>was</em> a marine biologist.
  </p>
</div>
```

##### First-line and first-letter

- 第一行/第一个字母;
- 使用 `first-line`/`first-letter` 操作符;

```typescript
<p
  class="first-line:uppercase first-line:tracking-widest
  first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
  first-letter:mr-3 first-letter:float-left
"
>
  Well, let me tell you something, funny boy. Y'know that little stamp, the one
  that says "New York Public Library"? Well that may not mean anything to you,
  but that means a lot to me. One whole hell of a lot.
</p>
```

### 媒体查询

#### 响应式

- [[#响应式设计]];

#### 主题

- [[#主题切换]];

#### Viewport orientation

- 设备视口方向;
- 使用 `portrait` 和 `landscape` 操作符;

```typescript
<div>
  <div class="portrait:hidden">
    <!-- ... -->
  </div>
  <div class="landscape:hidden">
    <p>
      This experience is designed to be viewed in landscape. Please rotate your
      device to view the site.
    </p>
  </div>
</div>
```

#### Print styles

- 打印文档时样式;
- 使用 `print` 操作符;

```typescript
<div>
  <article class="print:hidden">
    <h1>My Secret Pizza Recipe</h1>
    <p>This recipe is a secret, and must not be shared with anyone</p>
    <!-- ... -->
  </article>
  <div class="hidden print:block">
    Are you seriously trying to print this? It's secret!
  </div>
</div>
```

#### Supports rules

- 浏览器是否支持特定功能;
- 使用 `supports-[...]` 操作符;

```typescript
<div class="flex supports-[display:grid]:grid ...">
  <!-- ... -->
</div>
```

### 属性选择器

##### ARIA 属性

- 根据 ARIA 属性设置样式;

| Modifier      | CSS                     |
| ------------- | ----------------------- |
| aria-checked  | &[aria-checked="true"]  |
| aria-disabled | &[aria-disabled="true"] |
| aria-expanded | &[aria-expanded="true"] |
| aria-hidden   | &[aria-hidden="true"]   |
| aria-pressed  | &[aria-pressed="true"]  |
| aria-readonly | &[aria-readonly="true"] |
| aria-required | &[aria-required="true"] |
| aria-selected | &[aria-selected="true"] |

##### Data 属性

- 根据 data 属性设置样式;
- 使用 `data-*` 修饰符;

```typescript
<!-- Will apply -->
<div data-size="large" class="data-[size=large]:p-8">
  <!-- ... -->
</div>

<!-- Will not apply -->
<div data-size="medium" class="data-[size=large]:p-8">
  <!-- ... -->
</div>
```

##### RTL

- 根据文字方向设置样式;
- 使用 `rtl` 和 `ltr` 操作符;

```typescript
<div class="group flex items-center">
  <img class="shrink-0 h-12 w-12 rounded-full" src="..." alt="" />
  <div class="ltr:ml-3 rtl:mr-3">
    <p class="text-sm font-medium text-slate-700 group-hover:text-slate-900">
      ...
    </p>
    <p class="text-sm font-medium text-slate-500 group-hover:text-slate-700">
      ...
    </p>
  </div>
</div>
```

##### Open/closed state

- 作用于 \<details\> 或 \<dialog\> 标签, 表示其 open/close 状态;
- 使用 `open` 操作符表示打开状态;

```typescript
<div class="max-w-lg mx-auto p-8">
  <details
    class="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg"
    open
  >
    <summary class="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
      Why do they call it Ovaltine?
    </summary>
    <div class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
      <p>The mug is round. The jar is round. They should call it Roundtine.</p>
    </div>
  </details>
</div>
```

### 自定义选择器

##### 自定义选择器

- & 表示 class 对应标签;
- 使用 [] 包裹;

```typescript
<ul role="list">
  {#each items as item}
    <li class="[&:nth-child(3)]:underline">{item}</li>
  {/each}
</ul>
```

##### 选择器堆叠

- 选择器可任意堆叠;

```typescript
<ul role="list">
  {#each items as item}
    <li class="lg:[&:nth-child(3)]:hover:underline">{item}</li>
  {/each}
</ul>
```

### 操作符列表

- [操作符列表](https://tailwindcss.com/docs/hover-focus-and-other-states#quick-reference);

## 设计系统

### 响应式设计

##### 断点

- 使用 `sm/md/lg/xl/2xl` 操作符;

| Breakpoint prefix | Minimum width | CSS                                  |
| ----------------- | ------------- | ------------------------------------ |
| sm                | 640px         | `@media (min-width: 640px) { ... }`  |
| md                | 768px         | `@media (min-width: 768px) { ... }`  |
| lg                | 1024px        | `@media (min-width: 1024px) { ... }` |
| xl                | 1280px        | `@media (min-width: 1280px) { ... }` |
| 2xl               | 1536px        | `@media (min-width: 1536px) { ... }` |

```typescript
<div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  <!-- ... -->
</div>
```

##### 移动优先

- 默认使用移动布局设计;
- 单独设置 sm/md/lg...;

```typ<!-- This will center text on mobile, and left align it on screens 640px and wider -->
<div class="text-center sm:text-left"></div>escript
```

##### 断点范围

- 使用 `max-*` 修饰符;

| Modifier | Media query                                      |
| -------- | ------------------------------------------------ |
| max-sm   | `@media not all and (min-width: 640px) { ... }`  |
| max-md   | `@media not all and (min-width: 768px) { ... }`  |
| max-lg   | `@media not all and (min-width: 1024px) { ... }` |
| max-xl   | `@media not all and (min-width: 1280px) { ... }` |
| max-2xl  | `@media not all and (min-width: 1536px) { ... }` |

```typescript
<div class="md:max-lg:flex">
  <!-- ... -->
</div>
```

### 主题切换

##### 默认机制

- 默认使用系统偏好;

##### dark 属性

- 默认为浅色模式;
- 使用 `dark` 操作符表示深色模式;

```typescript
<div class="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
  <h3 class="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
    Writes Upside-Down
  </h3>
  <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">
    The Zero Gravity Pen can be used to write in any orientation, including
    upside-down. It even works in outer space.
  </p>
</div>
```

##### 手动切换

- 使用 class 策略;
- 设置 `dark` 修饰符;

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  // ...
};
```

```html
<!-- Dark mode not enabled -->
<html>
  <body>
    <!-- Will be white -->
    <div class="bg-white dark:bg-black">
      <!-- ... -->
    </div>
  </body>
</html>

<!-- Dark mode enabled -->
<html class="dark">
  <body>
    <!-- Will be black -->
    <div class="bg-white dark:bg-black">
      <!-- ... -->
    </div>
  </body>
</html>
```

##### 系统偏好

- 使用 `Window.matchMedia()` API 和 `prefers-color-scheme` 选择器;

```typescript
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
```

### 自定义样式

##### 自定义主题

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      blue: "#1fb6ff",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
};
```

##### 任意属性值

- 使用 [] 包裹对应 css 属性值;

```typescript
<div class="top-[117px]">
  <!-- ... -->
</div>
```

##### 任意 css 属性

- 使用 [] 包裹对应 css 属性;

```typescript
<div class="[mask-type:luminance] hover:[mask-type:alpha]">
  <!-- ... -->
</div>
```

##### 处理空白

- 使用 \_ 表示空白;
- 用于任意 css 简写属性;

```typescript
<div class="grid grid-cols-[1fr_500px_2fr]">
  <!-- ... -->
</div>
```

##### 基础样式

- index.css 中设置;
- 使用 `@layer base` 操作符;

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
  /* ... */
}
```

##### 自定义原子类

- tailwindcss 不包含的原子 css 属性;
- 使用 `@layer utilities` 操作符;

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
}
```

```typescript
<div class="lg:dark:content-auto">
  <!-- ... -->
</div>
```

## 操作符和函数

### 操作符

- @tailwind: tailwindcss 默认规则;
- @layer: 用户自定义规则;
- @apply: 内联自定义 css;
- @config: 加载配置文件;

```css
@config "./tailwind.site.config.js";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 函数

##### theme()

- 访问自定义主题配置;

```typescript
.content-area {
  height: calc(100vh - theme(spacing.12));
}
```

##### screen()

- 通过名称引用断点媒体查询;

```css
@media screen(sm) {
  /* ... */
}
```
