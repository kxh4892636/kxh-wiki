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
