---
id: 884beb00-75f1-4251-a6ad-f47173c1d6da
---

# html 文本

## 段落

### \<hx\> element

```html
<!-- 标题 -->
<h1>Heading level 1</h1>
<h2>Heading level 2</h2>
<h3>Heading level 3</h3>
<h4>Heading level 4</h4>
<h5>Heading level 5</h5>
<h6>Heading level 6</h6>
```

### \<p\> element

```html
<!-- 段落 -->
<p>This is the first paragraph.</p>
<p>This is the second paragraph.</p>
```

## 列表

### \<ul\> element

```html
<!-- 无序列表 -->
<ul>
  <li>first item</li>
  <li>second item</li>
  <li>third item</li>
</ul>
```

### \<ol\> element

```html
<!-- 有序列表 -->
<!-- reversed 倒序排列 -->
<!-- start 表示序号从 2 开始 -->
<ol reversed start="2">
  <li>Fee</li>
  <li>Fi</li>
  <li>Fo</li>
  <li>Fum</li>
</ol>
```

### \<dl\> element

##### 语法格式

```html
<!-- 描述列表 -->
<dl>
  <dt>Firefox</dt>
  <dd>
    A free, open source, cross-platform, graphical web browser developed by the
    Mozilla Corporation and hundreds of volunteers.
  </dd>
  <!-- Other terms and descriptions -->
</dl>
```

##### \<dt\> element 和 \<dd\> element 的对应数量

- 一对一;
- 一对多;
- 多对一;
- 多对多.

### 嵌套列表

```html
<!-- <li> element 中嵌套 -->
<ol>
  <li>Remove the skin from the garlic, and chop coarsely.</li>
  <li>Remove all the seeds and stalk from the pepper, and chop coarsely.</li>
  <li>Add all the ingredients into a food processor.</li>
  <li>
    Process all the ingredients into a paste.
    <ul>
      <li>
        If you want a coarse "chunky" hummus, process it for a short time.
      </li>
      <li>If you want a smooth hummus, process it for a longer time.</li>
    </ul>
  </li>
</ol>
```

## 文本标记

### 加粗

```html
<!-- 为语义的重要性而加粗, 可被终端识别 -->
<p>
  Before proceeding, <strong>make sure you put on your safety goggles</strong>.
</p>
<!-- 形式上的加粗, 无语义的重要性 -->
<p>Before proceeding, <b>make sure you put on your safety goggles</b>.</p>
```

### 斜体

```html
<!-- 为语义的重要性而倾斜, 可被终端识别 -->
<p>This is <em>not</em> a drill!</p>
<!-- 形式上的倾斜, 无语义的重要性 -->
<p>This is <i>not</i> a drill!</p>
```

### \<u\> element

##### 语法格式

```html
<!-- 下划线 -->
<p>This paragraph includes a <u class="spelling">wrnogly</u> spelled word.</p>
```

##### 避免使用 \<u\> element

- 无语义,
- 推荐使用 css.

## 引用

### \<blockquote\> element

```html
<!-- 块引用 -->
<!-- cite 指向引用 url -->
<blockquote cite="https://datatracker.ietf.org/doc/html/rfc1149">
  <p>KXH I love you.</p>
</blockquote>
```

### \<q\> element

```html
<!-- 行内引用 -->
<!-- cite 指向引用 url -->
<p>
  According to Mozilla's website,
  <q cite="https://www.mozilla.org/en-US/about/history/details/"
    >Firefox 1.0 was released in 2004 and became a big success.</q
  >
</p>
```

### \<cite\> element

```html
<!-- 语义层次上的引用 -->
<p>More information can be found in <cite>[ISO-0000]</cite>.</p>
```

## 信息

### \<abbr\> element

```html
<!-- 表示缩写 -->
<!-- title 属性显示缩写全称 -->
<p>Using <abbr title="html">HTML</abbr> is fun and easy!</p>
```

### \<address\> element

##### 语法格式

```html
<!-- 语义层次上表明地址或联系信息 -->
<!-- 内部标签只能使用 <a> -->
<p>Contact the author of this page:</p>
<address>
  <a href="mailto:jim@rock.com">jim@rock.com</a><br />
  <a href="tel:+13115552368">(311) 555-2368</a>
</address>
```

### \<time\> element

```html
<!-- 表明具体时间 -->
<!-- datetime 使用 ISO 8601时间表示法 -->
<p>
  The Cure will be celebrating their 40th anniversary on
  <time datetime="2018-07-07">July 7</time> in London's Hyde Park.
</p>
```

## 上下标

### \<sup\> element

```html
<!-- 文本形式显示为上标 -->
<p>
  One of the most common equations in all of physics is <var>E</var>=<var>m</var
  ><var>c</var><sup>2</sup>.
</p>
```

### \<sub\> element

```html
<!-- 文本形式显示为下标 -->
<p>
  Almost every developer's favorite molecule is
  C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>, also known as
  "caffeine."
</p>
```

## 计算机代码

##### \<code\> element

```html
<!-- 显示为代码形式 -->
<p>
  The function <code>selectAll()</code> highlights all the text in the input
  field so the user can, for example, copy or delete the text.
</p>
```

##### \<pre\> element

```html
<!-- 保留空格 -->
<pre>
  L          TE
    A       A
      C    V
       R A
       DOU
       LOU
      REUSE
      QUE TU
      PORTES
    ET QUI T'
    ORNE O CI
     VILISÉ
    OTE-  TU VEUX
     LA    BIEN
    SI      RESPI
            RER       - Apollinaire
</pre>
```

##### \<var\> element

```html
<!-- 标记为计算机程序变量 -->
<p>
  The volume of a box is <var>l</var> × <var>w</var> × <var>h</var>, where
  <var>l</var> represents the length, <var>w</var> the width and
  <var>h</var> the height of the box.
</p>
```

##### \<kbd\> element

```html
<!-- 显示为键盘按键形式 -->
<p>
  Please press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> to re-render an
  MDN page.
</p>
```

##### \<samp\> element

```html
<!-- 标记为计算机程序输出信息 -->
<p>I was trying to boot my computer, but I got this hilarious message:</p>
<p>
  <samp>Keyboard not found <br />Press F1 to continue</samp>
</p>
```
