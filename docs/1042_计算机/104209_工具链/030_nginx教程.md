# nginx 教程

## 环境配置

##### windows

- http://nginx.org/en/download.html 下载压缩包;
- 解压至任意路径下;
- 不建议配置环境变量, 因为即使配置了, nginx 配置文件你依旧要手动指向 nginx 文件夹下;

## 基本命令

```bash
# 启动 nginx
nginx
# 查看版本
nginx -v
# 关闭 nginx
nginx -s stop
# 重启 nginx
nginx -s reload
```

## 配置文件

##### 默认配置文件位置

- windows;
  - 根目录 - conf - nginx.conf;
- linux;
  - /etc/nginx/nginx.conf

##### 配置文件详解

```conf
# 全局块
#user  nobody;
worker_processes  1;

# event块
events {
    worker_connections  1024;
}

# http块
http {
    # http全局块
    include       mime.types; # 加载 MIME 标准文件
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    # server块, 一个块监听一个端口
    server {
        # server全局块
        listen       8000; # 指定监听端口
        server_name  localhost; # 指定监听地址
        # location块
        location / { # 指定监听路由
            root   html; # 指定 root 文件夹
            index  index.html index.htm; # 指定启动文件
        }
        error_page   500 502 503 504  /50x.html; # 指定错误页面
        location = /50x.html {
            root   html;
        }
    }
    # 这边可以有多个server块
    server {
      ...
    }
}
```
