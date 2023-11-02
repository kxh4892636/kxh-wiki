# docker 教程

## 基础

### 基本概念

##### docker

- 虚拟环境容器;
- 将开发环境, 代码, 配置文件打包;

##### 镜像

- 一个包含操作系统的模板;
- 镜像是只读的;

##### 容器

- 基于镜像创建的实例;
- 不同容器之间相互隔离;

##### 仓库

- 存储镜像的仓库;

### 安装

##### windows

- 下载 docker desktop 即可;
- 要求 21H2 版本之后且打开 Hyper-V;

##### debian11

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## 镜像

## 容器

## 仓库

## 数据管理

## 使用网络
