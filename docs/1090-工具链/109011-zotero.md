# zotero

## 安装

##### [安装地址](https://www.zotero.org/)

## 检索文献

### zotero connector (浏览器插件)

**[安装地址](https://chrome.google.com/webstore/detail/zotero-connector/ekhagklcjbdpajgpjgmbionohlpdbjgc?utm_source=chrome-ntp-icon)**

##### 使用方法

- 鼠标右键 - 保存至 zotero 即可,
- 若无, 手动导入.

### Zotero translators

**[安装地址](https://github.com/l0o0/translators_CN)**

##### 作用

- 识别中文学术网站.

### 油猴插件

非 zotero 插件, 仅是与 zotero 关系密切, 在此提及.
详见[油猴插件](http://localhost:3000/#/%E6%96%B9%E6%B3%95%E8%AE%BA/%E6%96%87%E7%8C%AE%E7%AE%A1%E7%90%86/%E6%96%87%E7%8C%AE%E6%A3%80%E7%B4%A2?id=%e6%b2%b9%e7%8c%b4%e6%8f%92%e4%bb%b6)

### 手动导入

##### 剪辑板导入导入

- 各文献网站导出稀奇古怪的论文格式;
- zotero - 文件 - 从剪辑版导入.

##### 标识号导入

- 复制 doi 等标识号,
- zotero - 通过标识号添加条目.

##### pdf 导入

- pdf 文件拖至 zotero 界面,
- 根据 pdf 重建条目.

## 管理文献

### delitem

**[安装地址](https://github.com/redleafnew/delitemwithatt)**

##### 功能

- 删除条目或分类的同时将链接的附件也一块删除;
- 将所选条目语言字段设置为 en;
- 将附件导出.

### jasminum

**[安装地址](https://github.com/l0o0/jasminum)**

##### 功能

- 拆分或合并 Zotero 中条目作者姓和名;
- 根据知网上下载的文献文件来抓取引用信息 (就是根据文件名);
- 添加中文 PDF/CAJ 时, 自动拉取知网数据, 该功能默认关闭, 需要到设置中开启, 注意添加的文件名需要含有中文, 全英文没有效果 (还是根据文件名);
- 为知网的学位论文 PDF 添加书签;
- 更新中文 translators;
- 拉取文献引用次数, 是否核心期刊.

### zotero citation counts manager

**[安装地址](https://github.com/eschnett/zotero-citationcounts)**

##### 功能

- 更新英文文献引用;

### zotero 更新期刊信息

**[安装地址](https://github.com/redleafnew/zotero-updateifsE)**

##### 功能

- 更新文献各种元数据;

### 更改查找 pdf 功能网站为 scihub

- zotero - 编辑 - 首选项 - 高级 - 设置编辑器,
- 查找 extensions.zotero.findPDFs.resolvers,
- 将默认值设置为下列代码(复制大括号).

```text
{
    "name":"Sci-Hub",
    "method":"GET",
    "url":"https://sci-hub.ru/{doi}",
    "mode":"html",
    "selector":"#pdf",
    "attribute":"src",
    "automatic":true
}
```

## 引用文献

### 引文样式

**参考网站**: [github](https://github.com/redleafnew/Chinese-STD-GB-T-7714-related-csl)

### word 插件

##### 插入文内引用

- 选择对应位置;
- 点击左一;
- 选择样式;
- 搜索文献;
  - 可插入多个文献;

##### 插入文末尾引用

- 插入若干文内引用后;
- 光标移至文章末尾;
- 点击左三;

##### 删除文内引用

- 选择文内引用;
- 点击左一;
- 退格删除即可;

##### 修改文内引用顺序

- 剪切文内引用至合适位置即自动更新.

##### 其余

- Document Preferences: 修改引用样式;
- refresh: 强制更新;
- unlink citation: 取消 zotero 文内引用链接;
  - 变成普通文本, 自动更新功能失效.

![word 插件](./images/2022-11-29-21-15-16.png)

### 手动引用 (推荐)

##### 步骤

- 右键所选文献-由所选文件创建引文目录,
- 选择引文样式,
- 输出模式为引文目录,
- 输出方法为复制到剪切板.
