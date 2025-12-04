---
id: bf91894f-ff06-4bef-9408-dda35bb10f40
---

# pnpm 教程

## 基础

##### 安装

```bash
# windows - powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
# linux
wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
```

##### 换源

```bash
pnpm get registry
pnpm config set registry https://registry.npmmirror.com
pnpm config set registry https://registry.npmjs.org
```

##### 代理

```bash
pnpm config set proxy http://127.0.0.1:7890
pnpm config set https-proxy http://127.0.0.1:7890

pnpm config delete proxy
pnpm config delete https-proxy
```

## 命令

### 模块相关命令

```bash
# 全局模块列表
pnpm --global list
# 该目录下模块列表
pnpm list
# 该目录下 dependencies 模块列表
pnpm --prod list
# 该目录下 devDependencies 模块列表
pnpm --dev list


# 根据 package.json 安装
pnpm install
# 安装至 global
pnpm add --global packageName
# 安装至 dependencies
pnpm add packageName
pnpm add --save-prod packageName
# 安装至 devDependencies
pnpm add --save-dev packageName

# 卸载命令, 同安装命令, add 换成 remove
```

### 项目相关命令

```bash
# 运行命令, run 可以省略
pnpm run cmd
```

## 原理

- 硬链接: 基于硬链接共享依赖包, 节省硬盘空间;
- 冗余移除: 自动移除不需要的依赖包;
- 压缩存储: 基于 CAS (内容可寻址存储) 存储依赖包;
  - 依赖包进行哈希操作, 用于共享, 缓存;
- 并行安装: 加快安装速度;
- 锁定文件: 使用 lockfile 锁定依赖关系和版本信息;
