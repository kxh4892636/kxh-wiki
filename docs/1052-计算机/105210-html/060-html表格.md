---
id: e6080f25-00c4-48bb-9512-cef6963a0846
---

# html 表格

## 表格基础

### 创建表格

```html
<!-- table 表示表格 -->
<!-- tr 换行 -->
<!-- th 单元格标题 -->
<!-- td 单元格 -->
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

### \<td\> 和 \<th\> element

##### 基础

```html
<!-- tr 和 th 通用属性值 -->
<!-- headers 表示与 th 的对应关系, 为 th 的 id 属性值, 空格分隔 -->
<!-- colspan 表示单元格跨列数量 -->
<!-- rowspan 表示单元格跨行数量 -->
<!-- th 特有属性值 -->
<!-- scopes 表示 th 与 td 的对应关系 -->
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

##### scopes

- row: 表明与对应行所有单元格相关;
- col: 表明与对应列所有单元格相关;
- rowgroup: 表明与多列对应行所属所有单元格相关;
- colgroup: 表明与多列对应列所属所有单元格相关;

## 表格进阶

### 可选标签

```html
<!-- caption 为表格标题 -->
<!-- colgroup 定义表格样式 -->
<!-- col 嵌套于 colgroup 中, 定义列样式 -->
<!-- span 表示 col 对应的列数量, 缺省为 1 -->
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

```html
<!-- thead 表示表头 -->
<!-- tbody 表示表格主体内容 -->
<!-- tfoot 表示表尾 -->
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

```html
<!-- 在 \<td\> element 中嵌套一个表格 -->
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

## 最佳实践

#### 可访问性

- 尽可能使用 \<th\> element;
- 使用\<th\> element 中的 scope attribute 和 id attribute;
- 使用 \<td\> element 的 header attribute.
