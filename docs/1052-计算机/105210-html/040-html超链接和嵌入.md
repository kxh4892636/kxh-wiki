---
id: 613a18ac-7117-4a9f-a769-d63f22431753
---

# html 超链接和嵌入

## 超链接

### url

##### url

- 全称 Uniform Resource Locator,
- 确定某对象网络位置.

##### 绝对路径和相对路径

```html
<!-- 绝对路径 -->
https://www.example.com
<!-- 相对路径 -->
pdfs/project-brief.pdf
```

### path

##### path

- 确定文件位置.

##### 引用文件路径

```html
<!-- 相同目录 -->
<a href="contacts.html"></a>
<!-- 子目录 -->
<a href="projects/index.html"></a>
<!-- 上级目录 -->
<a href="../pdfs/project-brief.pdf"></a>
<!-- 多层上级目录 -->
<a href="../../pdfs/project-brief.pdf"></a>
```

### \<a\> element

##### 语法格式

```html
<!-- 超链接 -->
<!-- rel 表示对其概述 -->
<!-- href 为超链接 URL -->
<!-- target 表示如何显示超链接, _blank 表示打开一个新标签页 -->
<a rel="page" href="https://www.mozilla.com" target="_blank"> Mozilla </a>
```

##### 链接到非 html 资源

- 预览该文件;
- 下载该文件 (不可预览)
- 下载文件所需依赖环境.

##### 链接电子邮件

```html
<!-- mailto 表示发送地址 -->
<!-- cc 表示抄送人 -->
<!-- bcc 表示密件抄送 -->
<!-- subject 表示邮件题目 -->
<!-- body 表示邮件内容 -->
<!-- mailto 与其他标识符 ? 分隔, 其他 & 分隔, 使用 key=value 形式 -->
<a
  href="mailto:nowhere@mozilla.org?cc=name1@mail.com,name2@mail.com&bcc=name3@rapidtables.com&subject=The%20subject%20of%20the%20email&body=The%20body%20of%20the%20email"
>
  Send mail with cc, bcc, subject and body
</a>
```

## 嵌入

### \<iframe\> element

```html
<!-- 嵌入网页 -->
<!-- src 表示嵌入网页 URL -->
<!-- width/height 设置标签大小 -->
<!-- allowfullscreen 布尔属性, 表示是否允许进入全屏模式 -->
<!-- titile 用于可访问性, 概述标签内容 -->
<!-- sanbox 表示进入沙盒模式, 推荐使用 -->
<iframe
  src="https://example.org"
  title="iframe Example 1"
  width="400"
  height="300"
  allowfullscreen
  sanbox
>
</iframe>
```

### \<object\> element

```html
<!-- 嵌入外部资源 -->
<!-- data 必选, 表示外部资源 URL -->
<!-- type 必选, 表示外部资源类型, 使用 MIME 标准 -->
<!-- width/height 设置标签大小 -->
<object
  type="application/pdf"
  data="/media/examples/In-CC0.pdf"
  width="250"
  height="200"
></object>
```

### \<embed\> element

```html
<!-- 嵌入外部资源 -->
<!-- data 必选, 表示外部资源 URL -->
<!-- type 必选, 表示外部资源类型, 使用 MIME 标准 -->
<!-- width/height 设置标签大小 -->
<!-- titile 用于可访问性, 概述标签内容 -->
<embed
  type="video/quicktime"
  src="movie.mov"
  width="640"
  height="480"
  title="Title of my video"
/>
```

### \<object\> element 和 \<embed\> element

##### \<object\> element 和 \<embed\> element 的区别

- \<object\> element 通常应用于 ie;
- \<embed\> 为 html5 标签, 通常应用于其他浏览器;

##### \<object\> element 和 \<embed\> element 组合使用

- \<embed\> element 嵌套在\<object\> element 内;
- 确保浏览器兼容性;

## 最佳实践

### src 和 href 的区别

##### src

- 指定外部资源引用路径;
- 用于 img, script, iframe 等标签中;
- 浏览器解析具有 src 属性的标签, 立刻下载并加载;

##### href

- 指定超链接的引用路径;
- 用于 a, link 等标签中;
- 浏览器解析到具有 href 属性的标签;
  - a 会跳转至制定 url;
  - link 会引用外部资源;
