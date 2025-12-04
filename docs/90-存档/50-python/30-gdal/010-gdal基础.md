---
id: 137073e7-94ef-444b-a67b-14b880ad234d
---

# gdal 基础

## gdal 安装

### windows

##### gdal core

- 进入[下载网站](https://www.gisinternals.com/index.html);
- 点击左栏 - DOWNLOADS - Stable Releases,
- 下载 gdal-305-1916-x64-core.msi 安装包,
- 安装 gdal core, 安装模式选择 typical,
- 配置环境变量,
  - 编辑 PATH 环境变量, 添加 GDAL 安装路径;
    - 如 C: \Program Files\GDAL;
  - 添加 GDAL_DATA 环境变量, 变量值设置为 GDAL 安装路径下的 gdal-data 子文件夹;
    - 如 C: \Program Files\GDAL\gdal-data;
  - 添加 GDAL_DRIVER_PATH 环境变量, 变量值设置为 GDAL 安装路径下的 gdalplugins 子文件夹;
    - 如 C: \Program Files\GDAL\gdalplugins;

##### gdal python binding

- 进入[下载网站](https://www.lfd.uci.edu/~gohlke/pythonlibs/#gdal);
- 根据你的 python 版本选择对应安装包;
- 安装 python binding;
- 通过 pip list 检测 GDAL 是否安装成功;

```
# 文件路径修改为你的 whl 安装包路径
pip install C:\Users\KXH\Downloads\GDAL-3.4.3-cp39-cp39-win_amd64.whl
```

### linux

##### gdal core 和 gdal python binding

- 终端执行下列代码, 可一口气复制并执行;

  ```terminal
  sudo add-apt-repository ppa:ubuntugis/ppa && sudo apt update
  sudo apt update
  sudo apt install gdal-bin
  sudo apt install libgdal-dev
  export CPLUS_INCLUDE_PATH=/usr/include/gdal
  export C_INCLUDE_PATH=/usr/include/gdal
  pip install GDAL
  ```

### conda

```bash
conda install -c conda-forge gdal
```

## gdal 黑魔法

##### vsimem

```python
# 存储至内存中
gdal.Warp('/vsimem/simplify_tif.tif',
          in_raster,
          )
```

## gdal 体系结构

### osr

##### osr

- 处理空间坐标系;

##### 体系结构

- SpatialReference 类: 建立地理/投影坐标系;
- CoordinateTransformation 类: 地理/投影坐标系转换;

### ogr

##### ogr

- 处理矢量文件;

##### 体系结构

- Driver: 矢量文件对应格式的数据驱动;
  - DataSource: 矢量数据文件(库);
    - Layer: 矢量文件图层;
      - Feature: 矢量文件要素;
        - FieldDefn: 字段元数据;
        - Geometry: 几何对象;
      - FeatureDefn: Feature 元数据;
    - SpatialReference: 空间参考;

##### 具体关系

- DataSource 中具有多个 Layer;
- Layer 具有多个 Feature;
- Layer 中的所有 Feature 对应一个 FeatureDefn;
- Feature 具有多个 Geometry 和 Field;
  - Field 对应 一个 FieldDefn;

### gdal

##### gdal

- 处理栅格文件;

##### 体系结构

- Driver: 栅格文件对应格式的数据驱动;
  - Dataset: 栅格数据文件;
    - Band: 波段;
- ColorTable: 栅格文件颜色表;

## 常用 API

### osr

##### SpatialReference

- osr.SpatialReference() -> SpatialReference 构造函数;
  - 创建 SpatialReference 实例;
- SpatialReference.ImportFromXXX() 方法;
  - 根据 XXX 创建 SpatialReference 实例;
  - EPSG: int;
  - WKT/XML: str;
- SpatialReference.CloneGeogCS() -> SpatialReference 方法;
  - 克隆地理坐标系;
- SpatialReference.SetAxisMappingStrategy(strategy: str) 方法;
  - 设置投影策略;
  - 常用值: osr.OAMS_TRADITIONAL_GIS_ORDER;

##### CoordinateTransformation

- osr.CoordinateTransformation(src: str | gdal.Dataset | org.Datasource, dst: str | gdal.Dataset | org.Datasource) -> CoordinateTransformation 构造函数;
  - 创建 CoordinateTransformation 实例;
- CoordinateTransformation.TransformPoint(x: int, y: int, [, z: int]) -> tuple 方法;
  - 对 [x, y, z] 进行坐标变换;

### ogr

##### ogr

- ogr.GetDriverByName(name: str) -> Driver 函数;
  - 创建 Driver 实例;
  - 常见 Driver;
    - ESRI Shapefile;
    - GeoJSON;
- ogr.CreateLayer(name: str, srs: SpatialReference, geomType: ogr.geomType, options=["ENCODING=UTF-8"]) -> Layer 函数;
  - 创建 Layer 实例;
- ogr.Feature(featureDefn: ogr.FeatureDefn) -> Feature 构造函数;
  - 根据 featureDefn 实例创建 Feature 实例;
- ogr.FieldDefn(name: str, fieldType: ogr.FieleType) -> FieldDefn 构造函数;
  - 创建 FieldDefn 实例;
- ogr.Geometry(: ogr.geomType) -> Geometry 构造函数;
  - 创建 Geometry 实例;
- ogr.CreateGeometryFromXXX() -> Geometry 函数;
  - 根据 XXX 创建 Geometry 实例;
  - GML/Json/Wkb/Wkt: str;

##### Driver

- Driver.Open(path: str, update: int = 0) -> DataSource 方法;
  - 创建 DataSource 实例;
  - update: DataSource 实例是否可编辑, 默认不可编辑;
- Driver.CreateDataSource(path: str) -> DataSource 方法;
  - 创建 DataSource 实例;
- Driver.DeleteDataSource(path: str) 方法;
  - 删除 DataSource 实例;

##### DataSource

- DataSource.GetLayer(index: int = 0) 方法;
  - 获取 Layer 实例;
- DataSource.GetLayerCount() -> int 方法;
  - 获取 Layer 实例数量;

##### Layer

- Layer.GetExtent() -> tuple 方法;
  - 获取 空间范围;
  - tuple: [minx, maxx, miny, maxy]
- Layer.GetSpatialRef() -> str 方法;
  - 获取 SpatialReference 实例;
- Layer.GetLayerDefn() -> FeatureDefn 方法;
  - 获取 FeatureDefn 实例;
- Layer.CreateFeature(feature: ogr.Feature) 方法;
  - 添加 Feature 实例;
- Layer.GetNextFeature() 方法;
  - 获取下一个 Feature 实例;
- Layer.SetFeature(feature: ogr.Feature) 方法;
  - 重写已经存在的 Feature 实例;
- Layer.CreateField(fieldDefn: ogr.FieldDefn) 方法;
  - 添加 Field 实例;
- Layer.DeleteFeature(FID: int) 方法;
  - 删除 Feature 实例;

##### Feature

- Feature.GetFieldCount() -> int 方法;
  - 获取 Field 实例数量;
- Feature.GetField(id/name: int | str) -> Field 方法;
  - 获取 Field 实例;
- Feature.SetField(id/name: int | str, value) 方法;
  - 设置 Field 实例字段值;
- Feature.SetGeometry(geom: ogr.Geometry) 方法;
  - 添加 Geometry 实例;
- Feature.GetGeometryRef() -> Geometry 方法;
  - 获取 Geometry 实例;
- Feature.GetFID() -> int 方法;
  - 获取 FID;

##### FeatureDefn

- FeatureDefn.GetFieldCount() -> int 方法;
  - 获取 Field 实例数量;
- FeatureDefn.GetFieldDefn(id/name: int | str) -> FieldDefn 方法;
  - 获取 FieldDefn 实例;

##### FieldDefn

- FieldDefn.GetNameRef() -> str 方法;
  - 获取字段名;

##### Geometry

- Geometry.AddPoint(x: float, y: float, z: float = 0) 方法;
  - 添加 [x, y, z] 坐标点;
- Geometry.AddGeometry(geom: ogr.Geometry) 方法;
  - 添加 Geometry 实例;
- Geometry.CloseRings() 方法;
  - 闭合 wkbLinearRing 类型实例;
- Geometry.Transform(coordinateTransformation: osr.CoordinateTransformation) 方法;
  - 对自身进行投影转换;

##### 几何图形类型

| 元数据 | 含义 |
| ------ | ---- |
| x, y   | 坐标 |
| z      | 高程 |
| m      | 属性 |

| 数据类型                          | 含义               |
| --------------------------------- | ------------------ |
| ogr.wkbPoint(Z/M/ZM)              | 点                 |
| ogr.wkbLineString(Z/M/ZM)         | 线                 |
| ogr.wkbPolygon(Z/M/ZM)            | 面                 |
| ogr.wkbMultiLineString(Z/M/ZM)    | 多个点             |
| ogr.wkbMultiPolygon(Z/M/ZM)       | 多个面             |
| ogr.wkbGeometryCollection(Z/M/ZM) | 不同种类几何体集合 |
| ogr.wkbLinearRing(Z/M/ZM)         |                    |

##### 字段数据类型

| 数据类型             | 含义                            |
| -------------------- | ------------------------------- |
| ogr.OFTInteger       | 32bit integer                   |
| ogr.OFTIntegerList   | List of 32bit integers          |
| ogr.OFTReal          | Double Precision floating point |
| ogr.OFTRealList      | List of doubles                 |
| ogr.OFTString        | String of ASCII chars           |
| ogr.OFTStringList    | Array of strings                |
| ogr.OFTBinary        | Raw Binary data                 |
| ogr.OFTDate          | Raw Binary data                 |
| ogr.OFTTime          | Time                            |
| ogr.OFTDateTime      | Date and Time                   |
| ogr.OFTInteger64     | Single 64bit integer            |
| ogr.OFTInteger64List | List of 64bit integers          |

### gdal

##### gdal

- gdal.open(path) -> Dataset 方法;
  - 打开 path 对应栅格文件创建 Dataset 实例;
- gdal.GetDriverByName(name) -> Driver 方法;
  - 根据 name 创建 Driver 实例;

##### Dataset

- Dataset.GetProjectionRef() -> str 方法;
  - 获取 Dataset 实例投影信息;
- Dataset.RasterCount -> int 属性: Dataset 实例波段数量;
- Dataset.RasterXSize -> int 属性: Dataset 实例水平方向像素数量;
- Dataset.RasterYSize -> int 属性: Dataset 实例垂直方向像素数量;
- Dataset.GetGeoTransform() -> tuple 方法;
  - 获取 Dataset 实例的仿射地理坐标变换 (tuple 类型);
  - 0: 左上角横坐标;
  - 1: 水平分辨率;
  - 2: 地图旋转角度, 一般为 0;
  - 3: 左上角纵坐标;
  - 4: 地图旋转角度 一般为 0;
  - 5: 垂直分辨率;
- Dataset.GetRasterBand(i) -> Band 方法;
  - 根据 i (从 1 开始) 获取 Dataset 实例的对应波段;

##### Band

- Band.ComputeRasterMinMax(approx_ok: int = 0) -> tuple 方法;
  - 返回最大最小值;
  - approx_ok: 0 为精确计算, 1 为近似计算;
  - tuple: [max, min]
- Band.ComputeStatistics(approx_ok: int) -> tuple 方法;
  - 返回统计数据;
  - tuple: [max, min, mean, std];
- Band.ReadAsArray(xoff=0, yoff=0, win_xsize=None, win_ysize=None, buf_xsize=None, buf_ysize=None) -> numpy array 方法;
  - 转换为 numpy 数组;
  - xoff/yoff: 读取矩阵的起始位置, 默认为 0;
  - win_xsize/win_ysize: 读取矩阵大小, 默认为整幅图像;
  - buf_xsize/buf_ysize: 输出矩阵大小, gdal 自动缩放;
- Band.SetRasterColorTable(colorTable: gdal.ColorTable) 方法;
  - 设置 ColorTable 实例;

##### ColorTable

- gdal.ColorTable() -> gdal.ColorTable 构造函数;
  - 返回 ColorTable 实例;
- ColorTable.CreateColorRamp(startValue: int, startRgb: list, endValue: int, endRgb: list);
  - 设置颜色表中一段色阶;
  - value: 起始/终止值;
  - Rgb: value 对应 rgb(a) 颜色;

### gdalconst

##### 栅格文件编码类型

| 类型          | 调用                    |
| ------------- | ----------------------- |
| GDT_Unknown   | gdalconst.GDT_Unknown   |
| GDT_Byte      | gdalconst.GDT_Byte      |
| GDT_UInt16    | gdalconst.GDT_UInt16    |
| GDT_Int16     | gdalconst.GDT_Int16     |
| GDT_UInt32    | gdalconst.GDT_UInt32    |
| GDT_Int32     | gdalconst.GDT_Int32     |
| GDT_Float32   | gdalconst.GDT_Float32   |
| GDT_Float64   | gdalconst.GDT_Float64   |
| GDT_CInt16    | gdalconst.GDT_CInt16    |
| GDT_CInt32    | gdalconst.GDT_CInt32    |
| GDT_CFloat32  | gdalconst.GDT_CFloat32  |
| GDT_CFloat64  | gdalconst.GDT_CFloat64  |
| GDT_TypeCount | gdalconst.GDT_TypeCount |

### 复杂 API

##### gdal.Warp() 函数

- gdal.Warp(dst, src, options) 函数;
  - 对 src 进行重采样, 镶嵌, 裁剪, 合并等一系列操作并输出至 dst;
  - dst/src: dataset / filePath;
  - options: gdal.WarpOptions() 函数;

##### gdal.WarpOptions() 函数

- format: 设置输出栅格文件格式;
  - "GTiff";
  - "PNG";
- dstNodata: 设置栅格文件的无效值;
- cutlineDSName: 裁剪输出栅格文件的矢量文件;
- cropToCutline: 设置是否使用 cutline 对应范围作为输出栅格文件的范围;

##### gdal.Translate() 函数

- gdal.Translate(dst, src, options) 函数;
  - 对 src 栅格图像类型转换等一系列操作并输出至 dst;
  - dst/src: dataset / filePath;
  - options: gdal.TranslateOptions() 函数;

##### gdal.TranslateOptions() 函数

- format: 设置输出栅格文件格式;
  - "GTiff";
  - "PNG";
- outputType: 设置栅格文件编码格式
- scaleParams: 设置栅格文件栅格值转换的比例缩放参数

  - \[[src_min, src_max, [dst_min, dst_max]]]

##### gdal.Grid() 函数

- gdal.Grid(dst, src, options) 函数;
  - 实现矢量数据内插栅格数据;
  - dst/src: dataset / filePath;
  - options: gdal.GridOptions() 函数;

##### gdal.GridOptions() 函数

- format: 设置输出栅格文件格式;
  - "GTiff";
  - "PNG";
- outputType: 设置栅格文件编码格式;
- algorithm: 设置空间内插方法;
  - 具体参数: 'https: //gdal.org/programs/gdal_grid.html#interpolation-algorithms'
  - 反距离加权: "invdist: power=2.0: smoothing=0.0: radius1=0.0: radius2=0.0: angle=0.0: max_points=0: min_points=0: nodata=0.0"
- zfield: 设置 Z 字段;
- weight/height: 设置输出栅格图像尺寸;
