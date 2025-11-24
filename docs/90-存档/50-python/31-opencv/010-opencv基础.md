# opencv 基础

## opencv 入门

### 安装

##### windows

```bash
# conda 不好安装, 故使用 pip
pip install opencv-python
conda install opencv -c conda-forge
```

##### linux

```bash
sudo apt install python3-opencv
```

##### 代码提示

- opencv 安装后没有代码提示；
- 将 `C:\Users\kxh\miniforge3\envs\gis\Lib\site-packages\cv2\cv2.pyd` 文件复制到上级目录即可；

## 伪彩色合成

```python
def gray_to_pseudo_color(output: str) -> None:
    img = cv2.imread('temporary_img.png')
    img_color = cv2.applyColorMap(img, 9)
    alpha = np.ones(
        (img_color.shape[0], img_color.shape[1], 1), dtype=np.uint8)*255
    img_rgba = np.concatenate((img_color, alpha), axis=2)
    mask = (img != 0)
    mask = mask.astype(np.uint8)
    mask_alpha = mask[:, :, 2].reshape(
        img_color.shape[0], img_color.shape[1], 1)
    mask_rgba = np.concatenate((mask, mask_alpha), axis=2)
    img_color = img_rgba*mask_rgba
    cv2.imwrite(output, img_color)
```
