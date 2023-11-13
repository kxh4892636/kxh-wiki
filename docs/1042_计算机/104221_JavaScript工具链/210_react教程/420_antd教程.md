---
id: 4642b52e-982c-49cf-bf3e-055eda508070
---

# antd 教程

## 设计

## 组件

### form

##### form 使用 upload 组件

```typescript
// Form.Item 的 valuePropName 必须是 fileList
// Form.Item 的 getValueFromEvent 必须为下述所示代码
<Form>
  <Form.Item
    label="图片"
    name="image"
    valuePropName="fileList"
    getValueFromEvent={(e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    }}
  >
    // Upload 的 name 必须为 file
    <Upload
      name="file"
      listType="picture-card"
      maxCount={1}
      showUploadList={false}
      action={"http://localhost:3456/data/upload"}
      onChange={(info) => {
        // ...
      }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  </Form.Item>
</Form>
```

### select

##### select 选项分组和不可选中

```typescript
// options 代替 value 表明分组, label 为组名
// disable: false 表示可选项不可选
const selectOptionDefault = [
  {
    label: "项目分类",
    options: [
      { value: "data", label: "数据集", disabled: false },
      { value: "example", label: "示例集", disabled: false },
    ],
  },
  {
    label: "模型分类",
    options: [
      { value: "hydrodynamics", label: "水动力模型", disabled: false },
      { value: "ecopath", label: "Ecopath 模型", disabled: false },
    ],
  },
];
```

### tree

##### 如何限制 drag 行为

```typescript
// onDrop 返回的 info 中
// info.node.pos 存储拖拽结束位置对应节点的节点层级
// 可通过节点层级限制其行为
if (info.dragNode.group) {
  const pos = info.node.pos.split("-");
  if (pos.length > 2) return;
}
```
