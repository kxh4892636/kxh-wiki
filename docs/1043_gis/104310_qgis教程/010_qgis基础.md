# qgis 应用基础

## qgis 概述

- 免费;
- 开源;
- 积极维护的社区;
- 全平台;

### qgis 配置

##### 下载 qgis

- 进入 [下载页面](https://www.qgis.org/en/site/forusers/download.html),
- 选择系统对应版本, 本机基于 windows, 因此选择 Download for Windows,
- 选择 qgis 版本.
  - QGIS in OSGeo4W: 在线安装包;
  - Standalone installers (MSI) from OSGeo4W packages: 离线安装包.
    - Latest release (richest on features): 最新版本;
    - Long term release (most stable): 长期支持版本.

##### 安装 qgis

- 打开 qgis 安装包;
- 一路 `next` 即可.

### gis 学习资源

- [QGIS 官方文档](https://www.qgis.org/en/notes/index.html);
- [QGIS Tutorials and Tips v1](https://www.qgistutorials.com/en/).
- [自认为最好的 gis 论坛](https://gis.stackexchange.com/)

## 加载数据

### 文本数据加载

- browser 直接点击文本数据;
  - 缺点: 生成属性表字段数据类型为字符串类型, 一些操作会产生未知错误, 最好不要使用.
- 菜单栏-layer-add layer-add delimited text layer;
- 菜单栏-data source manager-delimited text.
  - 快捷键: ctrl + L.

##

### 设置空间标签

##### 操作步骤

- view-new spatial bookmark,
- 或 browser-spatial bookmarks-new spatial bookmark.
- 命名,
- 选择空间范围,
  - calculate form layer: 根据图层自动计算;
  - map canvas extent: 现画布范围;
  - draw on canvas: 手动绘制.
- 选择投影坐标系,
- 选择保存位置.

##### 作用

- 快速切换研究区域;
- 出图页面布局.

##### 导入/导出空间标签

- browser-spatial bookmarks-export/import spatial bookmark.
