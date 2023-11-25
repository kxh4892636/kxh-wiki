---
id: a51be5f5-66ea-48a3-bdb6-9ed2b97cd6eb
---
# PlantUML

## 思维导图

### MarkDown 语法

```
@startmindmap
- root node
- some first level node
- second level node
- another second level node
- another first level node
@endmindmap
```

### 图形方向

- 右方向: +;
- 左方向 -;

```
@startmindmap
+ OS
++ Ubuntu
+++ Linux Mint
++ LMDE
++ SolydXK
-- Windows NT
--- Windows 8
@endmindmap
```

### 多行表示

- : 和 ; 包裹;

```python
@startmindmap
* Class Templates
**:Example 1
<code>
template <typename T>
class cname{
void f1()<U+003B>
...
}
</code>
;
```

### 多个根节点

- 多个 \*;

```
@startmindmap
* Root 1
** Foo
** Bar
* Root 2
** Lorem
** Ipsum
@endmindmap
```

### 移除外部方框

- \*/+/- 后使用 \_;

```
@startmindmap
*_ root node
**_ some first level node
***_ second level node
***_ another second level node
***_ foo
***_ bar
***_ foobar
**_ another first level node
@endmindmap
```
