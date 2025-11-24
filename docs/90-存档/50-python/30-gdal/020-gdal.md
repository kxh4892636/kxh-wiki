---
id: 018925fe-2107-41f2-a1a7-a6ddda8c38cc
---
# 栅格

## 元数据

### 获取栅格图像范围

```python
from osgeo import gdal

# 获取栅格图像仿射地理变换矩阵
ds: gdal.Dataset = gdal.Open('temporary_raster.tif')
info: tuple = ds.GetGeoTransform()
# 获取栅格图像水平竖直方向像素数量
width: int = ds.RasterXSize
height: int = ds.RasterYSize
# 计算栅格图像水平竖直方向偏移坐标
offset_width: float = width*info[1]
offset_height: float  = height*info[5]
# 计算栅格图像范围
minx: float = info[0]
maxx: float = info[0] + offset_width
miny: float = info[3] + offset_height
maxy: float = info[3]
```

## 算法

### 栅格图像裁剪

```python
from osgeo import gdal
# 裁剪栅格图像
gdal.Warp(out_raster,
          in_raster,
          format='GTiff',
          cutlineDSName=mask_shp,
          cropToCutline=True,
          dstNodata=-9999,
          )
```

### tiff 转 png

```python
from osgeo import gdal
# 获取栅格文件最值
ds: gdal.Dataset = gdal.Open('raster.tif')
band: gdal.Band = ds.GetRasterBand(1)
minmax: tuple = band.ComputeRasterMinMax()
# 灰度图转 png
# 计算 minmax 的原因是需要指定 scaleParams 后两个参数为 1-255, 保留 0 作为透明值, 即 nodata,
# raster.tif nodata 不能设置为 0
# 而指定后两个参数, 需要手动指定前两个参数, 即最值.
gdal.Translate('output.png',
               'raster.tif',
               format='PNG',
               outputType=gdal.GDT_Byte,
               scaleParams=[[minmax[0], minmax[1], 1, 255]],
               )
# 重置
del ds
```

### 灰度图伪彩色合成

```python
from osgeo import gdal
# 获取栅格文件最值
ds: gdal.Dataset = gdal.Open('/vsimem/temp.tiff')
band: gdal.Band = ds.GetRasterBand(1)
minmax = band.ComputeRasterMinMax()
# 栅格图像归一化处理, 因为 gdal 伪彩色合成仅支持栅格值为正整数, 因为 rgb 为 1-255 正整数三元组
# 其余注意见灰度图转 png
translateOptions = gdal.TranslateOptions(format='Gtiff',
                                         outputType=gdal.GDT_Byte,
                                         scaleParams=[
                                             [minmax[0], minmax[1], 1, 255]],
                                         )
gdal.Translate('/vsimem/temp2.tiff',
               '/vsimem/temp.tiff',
               options=translateOptions
               )
del band, ds
ds: gdal.Dataset = gdal.Open('/vsimem/temp2.tiff')
band: gdal.Band = ds.GetRasterBand(1)
[min, max, mean, std] = band.ComputeStatistics(0)
# 创建色彩表, 个人自定义
colors = gdal.ColorTable()
colors.CreateColorRamp(int(min), (48, 18, 59),
                       int(mean-2*std), (70, 134, 251))
colors.CreateColorRamp(int(mean-2*std), (70, 134, 251),
                       int(mean-std), (27, 229, 181))
colors.CreateColorRamp(int(mean-std), (27, 229, 181),
                       int(mean), (164, 252, 60))
colors.CreateColorRamp(int(mean), (164, 252, 60),
                       int(mean+std), (251, 185, 56))
colors.CreateColorRamp(int(mean+std), (251, 185, 56),
                       int(mean+2*std), (227, 68, 10))
colors.CreateColorRamp(int(mean+2*std), (227, 68, 10),
                       int(max), (122, 4, 3))
# 设置色彩表
band.SetRasterColorTable(colors)
del band, ds
# tiff 转 png
translateOptions = gdal.TranslateOptions(format='PNG',
                                         outputType=gdal.GDT_Byte,
                                         )
gdal.Translate('./test.png',
               '/vsimem/temp2.tiff',
               options=translateOptions
               )
```
