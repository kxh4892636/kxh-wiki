---
id: b9567d9f-17ec-4f36-b4d7-d9849e930507
---

# docker 教程

## 基础

### 安装

##### windows

- 下载 docker desktop 即可;
- 要求 21H2 版本之后且打开 Hyper-V;

##### debian11

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## 镜像

### 基本概念

##### 镜像

- 最小化的 linux 系统;

### 管理镜像

##### 拉取镜像

- `docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]`;

```bash
docker pull debian
```

##### 镜像列表

```bash
docker image ls
```

##### 镜像体积

```bash
docker system df
```

##### 删除镜像

- `docker image rm [选项] <镜像1> [<镜像2> ...]`;
- `docker image prune`;

```bash
# 删除指定镜像
# -f 强制删除
docker image rm -f 501

# 删除所有未使用镜像
docker image prune
```

##### 导出镜像

- 不推荐使用;

```bash
# 导出为 file
docker save alpine -o filename
# 导出并 gzip 压缩
docker save alpine | gzip > alpine-latest.tar.gz
```

##### 导入镜像

```bash
docker load -i alpine-latest.tar.gz
```

### DockerFile

##### DockerFile

- 名为 DockerFile 的文本文件;
- 包含若干指令;

##### FROM

- 指定基础镜像;

```bash
FROM debian:stretch
```

##### RUN

- 执行命令行命令;
- shell 格式: `RUN <命令>`;
- exec 格式: `RUN ["可执行文件", "参数1", "参数2"]`;

```bash
RUN apt-get update \
    && apt-get install gcc vim \
    && apt-get purge -y --auto-remove
```

##### COPY

- 复制文件;
- `COPY [--chown=<user>:<group>] <源路径>... <目标路径>`;
- `COPY [--chown=<user>:<group>] ["<源路径1>",... "<目标路径>"]`;

```bash
COPY package.json /usr/src/app/
COPY hom* /mydir/
COPY hom?.txt /mydir/
```

##### CMD

- 容器默认启动命令;
- 默认为 `bash`;
- shell 格式: `CMD <命令>`;
  - 使用 shell 格式实际为 `CMD [ "sh", "-c", "<命令>" ]`;
- exec 格式: `CMD ["可执行文件", "参数1", "参数2"]`;

```bash
CMD echo $HOME
CMD ["nginx", "-g", "daemon off;"]
```

##### ENV

- 定义环境变量;

```bash
ENV VERSION=1.0 DEBUG=on \
    NAME="Happy Feet"
```

##### EXPOSE

- 告知容器使用什么端口;
- 同时宿主机使用随机端口映射时默认映射的该端口;

```bash
EXPOSE 1234
```

##### 构建镜像

- `docker build [选项] <上下文路径/URL/->`;

```bash
# -t 容器名称
docker build -t nginx .
```

##### 指令数量

- DockerFile 中一条指令构建一层镜像;
- 指令数量尽可能的少;

## 容器

### 基本概念

##### 镜像

- 镜像是系统的定义模板;
- 容器是镜像的实例化;

### 管理镜像

##### 容器列表

```bash
# 所有处于启动状态的容器
docker container ls
docker ps
# 所有容器
docker container ls -a
docker ps -a
```

##### 启动容器

- `docker run [选项] [镜像名/id] [命令]`;

```bash
# -d 后台运行
# -i 交互式操作
# -t 进入终端
# --rm 容器退出后立刻删除
# -p 映射端口号, 宿主 port:容器 port
# --name 容器名称
docker run -dit --rm -p 1234:8080 --name test  debian bash
```

##### 启动已终止容器

```bash
docker container start <id>
```

##### 终止容器

```bash
docker container stop <id>
```

##### 进入容器

```bash
docker exec -it 69d1 bash
```

##### 导出容器

```bash
docker export 7691a814370e > ubuntu.tar
```

##### 导入容器

```bash
cat ubuntu.tar | docker import - test/ubuntu:v1.0
```

##### 删除容器

```bash
# 删除指定容器
docker container rm <id>
# 删除所有处于终止状态的容器
docker container prune
```

##### 容器元数据

```bash
docker inspect web
```

## 数据管理

### 数据卷

##### 数据卷

- 可被多个容器共享使用的文件目录;
- 数据卷默认一直存在;
- 生命周期独立于容器;

##### 创建数据卷

```bash
docker volume create vol-name
```

##### 数据卷列表

```bash
docker volume ls
```

##### 数据卷信息

```bash
docker volume inspect vol-name
```

##### 挂载数据卷

```bash
docker run -d -P --name web -v my-vol:/usr/share/nginx/html nginx:alpine
docker run -d -P --name web --mount source=my-vol,target=/usr/share/nginx/html nginx:alpine
```

##### 删除数据卷

```bash
docker volume rm my-vol
docker volume prune
```

### 挂载主机目录

##### 挂载主机目录

```bash
docker run -d -P --name web -v /src/webapp:/usr/share/nginx/html nginx:alpine
docker run -d -P --name web --mount type=bind,source=/src/webapp,target=/usr/share/nginx/html nginx:alpine
```

##### 挂载主机文件

```bash
docker run -d -P --name web --mount -v $HOME/.bash_history:/root/.bash_history nginx:alpine
docker run -d -P --name web --mount type=bind,source=$HOME/.bash_history,target=/root/.bash_history nginx:alpine
```

## 网络

### 外部访问容器

##### 映射接口

```bash
# -p 指定映射端口, ip:hostPort:containerPort | ip::containerPort | hostPort:containerPort
docker run -d -P nginx:alpine
```

##### 映射所有接口地址

```bash
docker run -d -p 80:80 nginx:alpine
```

##### 映射指定地址

```bash
ip:hostPort:containerPort | ip::containerPort | hostPort:containerPort
```

##### 映射指定地址的任意端口

```bash
$ docker run -d -p 127.0.0.1::80 nginx:alpine
```
