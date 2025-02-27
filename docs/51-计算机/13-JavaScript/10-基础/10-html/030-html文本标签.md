---
id: 884beb00-75f1-4251-a6ad-f47173c1d6da
---

# html 文本标签

## 段落

### hx element

- 标题;

```html
<h1>Heading level 1</h1>
<h2>Heading level 2</h2>
<h3>Heading level 3</h3>
<h4>Heading level 4</h4>
<h5>Heading level 5</h5>
<h6>Heading level 6</h6>
```

### p element

- 正文;

```html
<p>This is the first paragraph.</p>
<p>This is the second paragraph.</p>
```

## 列表

### ul element

- 无序列表

```html
<ul>
  <li>first item</li>
  <li>second item</li>
  <li>third item</li>
</ul>
```

### ol element

- 有序列表;

```html
<ol reversed start="2">
  <li>Fee</li>
  <li>Fi</li>
  <li>Fo</li>
  <li>Fum</li>
</ol>
```

### dl element

- 描述列表;
- dt 和 dd 之间可以是任意数量搭配;

```html
<dl>
  <dt>Firefox</dt>
  <dd>
    A free, open source, cross-platform, graphical web browser developed by the
    Mozilla Corporation and hundreds of volunteers.
  </dd>
</dl>
```

### 嵌套列表

- li 标签之中嵌套列表;

```html
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

- strong: 语义加粗;
- b: 形式加粗;

```html
<p>
  Before proceeding, <strong>make sure you put on your safety goggles</strong>.
</p>
<p>Before proceeding, <b>make sure you put on your safety goggles</b>.</p>
```

### 斜体

- em: 语义倾斜;
- i: 形式倾斜;

```html
<p>This is <em>not</em> a drill!</p>
<p>This is <i>not</i> a drill!</p>
```

### u element

- 下划线;
- 不推荐使用, 推荐使用 css 定义文本下划线;

```html
<p>This paragraph includes a <u class="spelling">wrnogly</u> spelled word.</p>
```

## 引用

### blockquote element

- 块引用;
- cite 属性指向 url;

```html
<blockquote cite="https://datatracker.ietf.org/doc/html/rfc1149">
  <p>KXH I love you.</p>
</blockquote>
```

### q element

- 行内引用;
- cite 属性指向 url;

```html
<p>
  According to Mozilla's website,
  <q cite="https://www.mozilla.org/en-US/about/history/details/"
    >Firefox 1.0 was released in 2004 and became a big success.</q
  >
</p>
```

### cite element

- 语义层次上的引用;

```html
<p>More information can be found in <cite>[ISO-0000]</cite>.</p>
```

## 信息

### abbr element

- 缩写标签;
- title 显示缩写全称;

```html
<!-- 表示缩写 -->
<!-- title 属性显示缩写全称 -->
<p>Using <abbr title="html">HTML</abbr> is fun and easy!</p>
```

### address element

- 语义表示联系信息;
- 内部标签只能使用 a;

```html
<p>Contact the author of this page:</p>
<address>
  <a href="mailto:jim@rock.com">jim@rock.com</a><br />
  <a href="tel:+13115552368">(311) 555-2368</a>
</address>
```

### time element

- 语义表示时间;
- 使用 ISO8601 标准;

```html
<p>
  The Cure will be celebrating their 40th anniversary on
  <time datetime="2018-07-07">July 7</time> in London's Hyde Park.
</p>
```

## 上下标

### sup element

- 语义表示上标;

```html
<p>
  One of the most common equations in all of physics is <var>E</var>=<var>m</var
  ><var>c</var><sup>2</sup>.
</p>
```

### sub element

- 语义表示下标;

```html
<p>
  Almost every developer's favorite molecule is
  C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>, also known as
  "caffeine."
</p>
```

## 计算机代码

##### code element

- 代码形式;

```html
<p>
  The function <code>selectAll()</code> highlights all the text in the input
  field so the user can, for example, copy or delete the text.
</p>
```

##### pre element

- 保留空格;

```html
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

##### var element

- 程序变量;

```html
<p>
  The volume of a box is <var>l</var> × <var>w</var> × <var>h</var>, where
  <var>l</var> represents the length, <var>w</var> the width and
  <var>h</var> the height of the box.
</p>
```

##### kbd element

- 键盘按键形式;

```html
<p>
  Please press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> to re-render an
  MDN page.
</p>
```

##### samp element

- 程序输出信息;

```html
<p>I was trying to boot my computer, but I got this hilarious message:</p>
<p>
  <samp>Keyboard not found <br />Press F1 to continue</samp>
</p>
```
