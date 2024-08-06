---
id: 9914830d-cea8-4feb-b8be-07057754d709
---

# html 结构

## html 基本结构

```html
<!-- 表明文件类型 -->
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

## html 头部

### html 头部基础

```html
<!-- 使用 head 标签 -->
<!-- 放置页面元数据, 不显示在网页中 -->
<head>
  ...
</head>
```

### 常用标签

##### \<title\> 标签

```html
<!-- 使用 title 标签 -->
<!-- 表示网页标题 -->
<title>My test page</title>
```

##### \<meta\> 标签

```html
<!-- 使用 meta 标签 -->
<!-- 表示网页元数据 -->

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

##### \<link\> 标签

```html
<!-- 添加网页图标 -->
<link rel="icon" href="favicon.ico" type="image/x-icon" />
<!-- 添加 css -->
<link rel="stylesheet" href="my-css-file.css" />
<!-- 添加 js -->
<script src="my-js-file.js" defer></script>
```

##### \<html\> 标签

```html
<!-- 设置网页语言 -->
<html lang="zh-CN"></html>
<html lang="en-US"></html>
```

## html 内容

### 语义标签

#### \<header\> element

```html
<!-- 页眉 -->
<header>
  <h1>Main Page Title</h1>
</header>
<!-- 页标题 -->
<header>
  <h1>Main Page Title</h1>
</header>
<!-- 文章标题 -->
<article>
  <header>
    <h2>The Planet Earth</h2>
  </header>
  <p>
    We live on a planet that's blue and green, with so many things still unseen.
  </p>
</article>
```

#### \<footer\> element

##### 语法格式

```html
<!-- 页脚 -->
<footer>
  Some copyright info or perhaps some author info for an &lt;article&gt;?
</footer>
```

##### 内容

- 作者信息;
- 版权信息;
- 友情链接;
- ...;

#### \<nav\> element

```html
<!-- 导航栏 -->
<nav class="menu">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

#### \<aside\> element

```html
<!-- 侧边栏 -->
<!-- 和文档主题不相关的内容 -->
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

#### \<main\> element

```html
<!-- 正文 -->
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

#### \<section\> element

```html
<!-- 文档正文分段 -->
<!-- 总有一个标题 -->
<section>
  <h2>Heading</h2>
  <p>Bunch of awesome content</p>
</section>
```

#### \<article\> element

##### 语法结构

```html
<!-- 文档正文分段 -->
<!-- 总有一个标题 -->
<article>
  <h2>Heading</h2>
  <p>Bunch of awesome content</p>
</article>
```

##### \<article\> element 和\<section\> element 的异同

- \<section\>: 对内容分块.
- \<article\>
  - 可视为特殊的 \<section\>
  - 但强调其独立, 完整性.

### 非语义标签

#### \<div\> element

```html
<!-- 自定义语义化标签, 块级标签 -->
<div class="shadowbox">
  <p>Here's a very interesting note displayed in a lovely shadowed box.</p>
</div>
```

#### \<span\> element

```html
<!-- 自定义语义化标签, 行内标签 -->
<p><span>Some text</span></p>
```

#### \<br\> element

```html
<!-- 换行 -->
Mozilla<br />
331 E. Evelyn Avenue<br />
Mountain View, CA<br />
```

#### \<hr\> element

```html
<!-- 水平线 -->
<p>This is the first paragraph of text.</p>
<hr />
<p>This is the second paragraph of text.</p>
```
