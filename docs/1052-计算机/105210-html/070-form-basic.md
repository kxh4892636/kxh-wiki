# 表单

##### html 表单

- 用户与浏览器的交互,
- 由表单控件构成.

## \<form\> 标签

##### 作用

- 定义一个表单.

##### 语法格式

```html
<form action="/my-handling-form-page" method="post"></form>
```

### 属性

##### action

- 设置表单数据发送至的位置.

##### method

- 设置数据发送方法.
  - get;
  - post.

## 表单控件通用属性

##### value

- 设置表单输入默认值,
- 推荐总是使用.

##### id

- 用于表单 for 属性,
- 推荐总是使用.

##### name

- 设置表单控件名称,
- 随数据一并发送,
- 以供服务端识别,
- 推荐总是使用.

##### form

- 属性值为关联表单 id 属性值,
- 表示控件关联到同一文档下的表单,
- 使其在 \<form\> 标签外部甚至其他 \<form\> 标签内部定义.

##### disabled

- 布尔属性;
- 表示禁止该标签.

## Designing your form

##### 设计经验

[文章一](https://www.smashingmagazine.com/2018/08/ux-html5-mobile-form-part-1/)  
[文章二](https://www.uxmatters.com/mt/archives/2012/05/7-basic-best-practices-for-buttons.php)
