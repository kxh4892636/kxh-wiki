# 教程

## 常用命令

##### 同时执行多条命令

```bash
# 前一条执行成功才会执行下一条
cd client && npm start
```

## debian

### 命令

##### 换源

```json
// 打开 /etc/apt/sources.list, 覆盖原有内容
deb http://deb.debian.org/debian bullseye main contrib non-free
deb-src http://deb.debian.org/debian bullseye main contrib non-free

deb http://deb.debian.org/debian bullseye-updates main contrib non-free
deb-src http://deb.debian.org/debian bullseye-updates main contrib non-free

deb http://deb.debian.org/debian bullseye-backports main contrib non-free
deb-src http://deb.debian.org/debian bullseye-backports main contrib non-free

deb http://security.debian.org/debian-security/ bullseye-security main contrib non-free
deb-src http://security.debian.org/debian-security/ bullseye-security main contrib non-free
```

##### 更新

```bash
sudo apt update && sudo apt upgrade -y
```

##### 端口

```bash
# 查询占用 7788 端口的进程
netstat -tunlp|grep 7788
```
