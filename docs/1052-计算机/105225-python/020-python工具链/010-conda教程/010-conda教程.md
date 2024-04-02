---
id: fbbd256b-63d9-46ea-bdaa-6cf91284225e
---

# conda 教程

## 安装

##### windows

- [安装地址](https://github.com/conda-forge/miniforge)
- 选择对应版本;
- 安装即可;
- 建议添加环境变量, 虽然 conda 不建议, 但我不听;

##### linux

```bash
wget "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh"
bash Miniforge3-Linux-x86_64.sh
rm -f Miniforge3-Linux-x86_64.sh
```

## 换源

- `conda config --system` 创建 .condarc 文件;

```bash
channels:
  - defaults
show_channel_urls: true
default_channels:
  - http://mirrors.aliyun.com/anaconda/pkgs/main
  - http://mirrors.aliyun.com/anaconda/pkgs/r
  - http://mirrors.aliyun.com/anaconda/pkgs/msys2
custom_channels:
  conda-forge: http://mirrors.aliyun.com/anaconda/cloud
  msys2: http://mirrors.aliyun.com/anaconda/cloud
  bioconda: http://mirrors.aliyun.com/anaconda/cloud
  menpo: http://mirrors.aliyun.com/anaconda/cloud
  pytorch: http://mirrors.aliyun.com/anaconda/cloud
  simpleitk: http://mirrors.aliyun.com/anaconda/cloud
```

## 常用命令

```bash
# 新建环境
conda create --name ENV_NAME python=3.8.8
# 删除环境
conda env remove --name ENV NAME python=3.8.8
# 激活环境
conda activate ENV_NAME
# 安装模块
conda install PACKAGE_NAME
# 移除模块
conda remove PACKAGE_NAME
# 显示当前环境安装模块列表
conda list
# 退出当前环境
conda deactivate
# 列出所有环境
conda env list
```
