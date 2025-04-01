---
id: e6080f25-00c4-48bb-9512-cef6963a0846
---

# html 表格标签

## 表格基础

### 表格结构

- table：表格标签；
- tr：换行标签；
- th：单元格标题标签；
- td：单元格标签；

```html
<table>
  <tr>
    <th scope="col">Player</th>
    <th scope="col">Gloobles</th>
    <th scope="col">Za'taak</th>
  </tr>
  <tr>
    <th scope="row">TR-7</th>
    <td>7</td>
    <td>4,569</td>
  </tr>
  <tr>
    <th scope="row">Khiresh Odo</th>
    <td>7</td>
    <td>7,223</td>
  </tr>
  <tr>
    <th scope="row">Mia Oolong</th>
    <td>9</td>
    <td>6,219</td>
  </tr>
</table>
```

### td 和 th element

##### 属性

- 通用属性；
  - headers：表示与 th 的对应关系，为 th 的 id 属性值，空格分隔；
  - colspan：表示单元格跨列数量；
  - rowspan：表示单元格跨行数量；
- th 特有属性；
  - scopes：表示 th 与 td 的对印关系；

```html
<table>
  <tr>
    <th scope="col">Player</th>
    <th scope="col" id="col">Gloobles</th>
    <th scope="col">Za'taak</th>
  </tr>
  <tr>
    <th scope="row" id="row">Mia Oolong</th>
    <td colspan="1" rowspan="1" headers="row col">9</td>
    <td>6,219</td>
  </tr>
</table>
```

##### scopes 属性详解

- row：表明与对应行所有单元格相关；
- col：表明与对应列所有单元格相关；
- rowgroup：表明与多列对应行所属所有单元格相关；
- colgroup：表明与多列对应列所属所有单元格相关；

### 可访问性

- 使用 th 标签 中的 scope attribute 和 id attribute；
- 使用 td 标签 的 header attribute。

## 表格进阶

### 可选标签

- caption：表格标题；
- colgroup：表格列样式；
- col：嵌套于 colgroup 中，定义具体列样式
  - span 属性对应 col 对应的列数量，默认为 1；

```html
<table>
  <caption>
    Superheros and sidekicks
  </caption>
  <colgroup>
    <col />
    <col span="2" class="batman" />
    <col span="2" class="flash" />
  </colgroup>
  <tr>
    <td> </td>
    <th scope="col">Batman</th>
    <th scope="col">Robin</th>
    <th scope="col">The Flash</th>
    <th scope="col">Kid Flash</th>
  </tr>
</table>
```

### 表格结构

- thead 标签：表示表头；
- tbody 标签：表示表格主体内容；
- tfoot 标签：表示表尾；

```html
<table>
  <thead>
    <tr>
      <th>Items</th>
      <th scope="col">Expenditure</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Donuts</th>
      <td>3,000</td>
    </tr>
    <tr>
      <th scope="row">Stationery</th>
      <td>18,000</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Totals</th>
      <td>21,000</td>
    </tr>
  </tfoot>
</table>
```

### 嵌套表格

- 在 td 标签中嵌套一个表格；

```html
<table id="table1">
  <tr>
    <th>title1</th>
    <th>title2</th>
    <th>title3</th>
  </tr>
  <tr>
    <td id="nested">
      <table id="table2">
        <tr>
          <td>cell1</td>
          <td>cell2</td>
          <td>cell3</td>
        </tr>
      </table>
    </td>
    <td>cell2</td>
    <td>cell3</td>
  </tr>
</table>
```
