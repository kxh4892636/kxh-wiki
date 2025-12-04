---
id: 9914830d-cea8-4feb-b8be-07057754d709
---

# html 结构标签

## 基本结构

### 基本结构

```html
<!-- 表明 html5 -->
<!DOCTYPE html>
<!-- 网页 -->
<html>
  <!-- 网页头部 -->
  <head>
    <meta charset="utf-8" />
    <title>My test page</title>
  </head>
  <!-- 网页内容 -->
  <body>
    <p>This is my page</p>
  </body>
</html>
```

### 网页语言

```html
<html lang="zh-CN"></html>
<html lang="en-US"></html>
```

## html 头部

### html 头部基础

- html 元数据;

```html
<head>
  ...
</head>
```

### title 标签

- 网页标题;

```html
<title>My test page</title>
```

### meta 标签

- 网页元数据;

```html
<!-- 确定文档编码 -->
<meta charset="utf-8" />
<!-- 添加作者信息 -->
<meta name="author" content="Chris Mills" />
<!-- 添加网页描述 -->
<meta
  name="description"
  content="The MDN Web Docs Learning Area aims to provide
complete beginners to the Web with all they need to know to get
started with developing web sites and applications."
/>
```

### link 标签

- 外部资源;

```html
<!-- 添加网页图标 -->
<link rel="icon" href="favicon.ico" type="image/x-icon" />
<!-- 添加 css -->
<link rel="stylesheet" href="my-css-file.css" />
<!-- 添加 js -->
<script src="my-js-file.js" defer></script>
```

## 语义标签

### header element

- 设置网页内容页眉;
- 与 hx 配合使用;

```html
<header>
  <h1>Main Page Title</h1>
</header>
```

### footer element

- 设置网页内容页脚;
- 基本内容;
  - 作者信息;
  - 版权信息;
  - 友情链接;
  - ...;

```html
<footer>
  Some copyright info or perhaps some author info for an &lt;article&gt;?
</footer>
```

### nav element

- 导航栏;

```html
<nav class="menu">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

### aside element

- 侧边栏;

```html
<article>
  <p>
    The Disney movie <cite>The Little Mermaid</cite> was first released to
    theatres in 1989.
  </p>
  <aside>
    <p>The movie earned $87 million during its initial release.</p>
  </aside>
  <p>More info about the movie...</p>
</article>
```

### main element

- 正文;

```html
<main>
  <h1>Apples</h1>
  <p>The apple is the pomaceous fruit of the apple tree.</p>
  <article>
    <p>
      The Disney movie <cite>The Little Mermaid</cite> was first released to
      theatres in 1989.
    </p>
    <aside>
      <p>The movie earned $87 million during its initial release.</p>
    </aside>
    <p>More info about the movie...</p>
  </article>
</main>
```

### section element

- 正文分段, 与 hx 配合使用;

```html
<section>
  <h2>Heading</h2>
  <p>Bunch of awesome content</p>
</section>
```

### article element

- 正文分段, 与 hx 配合使用;
- 可视为特殊的 section, 强调其独立, 完整性;

```html
<article>
  <h2>Heading</h2>
  <p>Bunch of awesome content</p>
</article>
```

## 非语义标签

#### div element

- 自定义语义标签;
- 块级标签;

```html
<div class="shadowbox">
  <p>Here's a very interesting note displayed in a lovely shadowed box.</p>
</div>
```

#### span element

- 自定义语义标签;
- 行内标签;

```html
<p><span>Some text</span></p>
```

#### br element

- 换行;

```html
Mozilla<br />
331 E. Evelyn Avenue<br />
Mountain View, CA<br />
```

#### hr element

- 水平线;

```html
<p>This is the first paragraph of text.</p>
<hr />
<p>This is the second paragraph of text.</p>
```
