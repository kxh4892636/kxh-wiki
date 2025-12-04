---
id: 613a18ac-7117-4a9f-a769-d63f22431753
---

# html 超链接和嵌入标签

## 超链接

### a element

##### 语法格式

- rel : 描述信息;
- href: url;
- target: 跳转形式;

```html
<a rel="page" href="https://www.mozilla.com" target="_blank"> Mozilla </a>
```

##### 链接到非 html 资源

- 预览该文件;
- 下载该文件 (不可预览)
- 下载文件所需依赖环境;

##### 链接电子邮件

- `mailto:邮件地址?k1=v1&k2=v2`;
- cc : 表示抄送人;
- bcc : 表示密件抄送;
- subject : 表示邮件题目;
- body : 表示邮件内容;

```html
<a
  href="mailto:nowhere@mozilla.org?cc=name1@mail.com,name2@mail.com&bcc=name3@rapidtables.com&subject=The%20subject%20of%20the%20email&body=The%20body%20of%20the%20email"
>
  Send mail with cc, bcc, subject and body
</a>
```

## 嵌入

### iframe element

- 嵌入网页;
- src: 必须, 嵌入网页 url;
- title: 描述信息;
- allowfullscreen: 是否全屏;
- sanbox: 沙盒模式;

```html
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

### object element

- 嵌入外部资源;
- data: 必须, 外部资源 url;
- type: 必须, MIME 类型;

```html
<object
  type="application/pdf"
  data="/media/examples/In-CC0.pdf"
  width="250"
  height="200"
></object>
```

### embed element

- 嵌入外部资源;
- src: 必须, 外部资源 url;
- type: 必须, MIME 类型;

```html
<embed
  type="video/quicktime"
  src="movie.mov"
  width="640"
  height="480"
  title="Title of my video"
/>
```

### object element 和 embed element 的区别

- object element 通常应用于 ie;
- embed 为 html5 标签, 通常应用于其他浏览器;
- 通常将 embed element 嵌套在 object element 内, 确保浏览器兼容性;

## src 和 href 属性的区别

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
