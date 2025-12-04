---
id: 98369df1-f047-4ffb-be15-6874cf84c13d
---

# http 基础

## web 基础

### web 构建技术

- HTML: 网页文本标记语言;
- HTTP: 超文本传输协议 (HyperText Transfer Protocol); ;
- URL: 统一资源定位符 (Uniform Resource Locator); ;

### URI

##### URI

- 统一资源标识符 (Uniform Resource Identifier);
- 表示某个协议方案表示的资源的定位标识符;

```bash
ftp://ftp.is.co.za/rfc/rfc1808.txt
http://www.ietf.org/rfc/rfc2396.txt
ldap://[2001:db8::7]/c=GB?objectClass?one
mailto:John.Doe@example.com
news:comp.infosystems.www.servers.unix
tel:+1-816-555-1212
telnet://192.0.2.16:80/
urn:oasis:names:specification:docbook:dtd:xml:4.1.2
```

##### URI 和 URL 的关系

- URL 是 URI 在 HTTP 协议下的子集;

### HTTP 密切相关协议

- IP: 负责不同主机的通信; ;
- TCP: 负责不同进程的通信;
- DNS: 负责 URL 到 IP 的解析; ;

## HTTP 报文

### 基本术语

##### 请求报文

- 客户端发送的报文;

##### 响应报文

- 服务器端发送的报文;

### 报文结构

- 报文首部;
  - 请求行: 方法 + URL + 版本;
  - 状态行: 版本 + 状态码 + 状态码短语;
  - 首部字段: 通用首部/请求首部/响应首部/实体首部;
- 空行;
- 报文主体;

![报文结构](./images/2024-01-15-19-20-43.png)

### HTTP 方法

- GET: 请求资源;
- POST: 传输报文主体;
- PUT: 传输文件, 不常用;
- DELETE: 删除文件, 不常用;
- HEAD: 获得首部字段, 不返回报文主体;
- OPTIONS: 查询支持的方法;
- TRACE: 查询请求的通讯路径;
- CONNECT: 使用通道协议连接代理;
  - SSL: 安全套接字;
  - TLS: 传输层安全;

## http 杂项

### 持久连接

##### 非持久连接

- 一次 HTTP 请求建立并断开一次 TCP 连接;
- 增加无用的通信开销;
- http/1.0 默认为非持久连接;
- 使用 `Connection: Keep-Alive` 尝试持久连接;

![非持久连接](./images/2024-01-15-19-07-30.png)

##### 持久连接

- HTTP keep-alive;
- 任意一端没有断开连接, 保持 TCP 连接状态;
- 减少 TCP 重复建立和断开的开销;
- HTTP/1.1 以上版本默认为持久连接;
- 使用 `Connection: Close` 关闭持久连接;
- 要求 HTTP 请求为同源请求;

![持久连接](./images/2024-01-15-19-08-38.png)

##### 管线化

- http/1.1 特性;
- 管线化技术做到一次发送多个请求;
- 依旧要求按发送顺序接受响应请求;
- 依旧会发生堵塞现象;

![管线化](./images/2024-01-15-19-10-31.png)

### 多路复用

- http/2.0 特性;
- 并行交错发送多个请求;
- 请求和响应之间互不影响;

### 状态管理

##### 无状态

- HTTP 为无状态协议;
- 不保存请求和响应之间的通讯状态;
- 减少服务器端开销;

##### cookie 状态管理

- 服务器端生成 cookie;
- 响应报文设置 `Set-Cookie` 首部字段;
- 通知客户端使用 cookie 保存状态信息;
- 下次请求报文自动添加并发送 cookie;

![cookie 状态管理](./images/2024-01-15-19-13-16.png)

### 内容协商

##### 内容协商

- 服务器端根据客户端语言, 字符集或编码方式;
- 提供客户端最为合适的资源;

##### 首部字段

- Accept;
- Accept-Charset;
- Accept-Encoding;
- Accept-Language;
- Content-Language;

##### 技术类型

- 服务器协商: 服务器根据客户端首部字段自动处理;
- 客户端协商: 客户端用户或 js 脚本自动处理;
- 同名协商: 服务器端和客户端各自协商;

### http 编码

#### 内容编码

##### 目的

- 压缩报文实体内容的体积;

##### 常用编码

- gzip: GNU zip;
- compress: UNIX 标准压缩;
- deflate: zlib;
- identity: 不进行编码

#### 分块传输编码

- Chunked Transfer Coding;
- 用于大体积数据传输;
- 分隔报文实体为若干块 (chunk);
- 客户端负责解码, 恢复报文实体;

### MIME

##### MIME

- 多用途因特网邮箱拓展 (Multipurpose Internet Mail Extensions);
- 标识数据类型;

##### 多部分对象集合

- 一份报文容纳多种类型数据;
- 常见多部分对象集合;
  - multipart/form-data: 表单文件上传;
  - multipart/byteranges: 206 状态码;

### 范围请求

- 客户端指定请求的发送范围;
- 使用 `Range` 首部字段;
- 服务器端;
  - 若响应请范围求: 返回 206 状态码, 使用 multipart/byteranges 格式;
  - 若无法响应范围请求: 返回 200 状态码和完整实体内容;

```bash
# 5001 - 10000 字节
Range: bytes=5001-10000
# 5001 之后所有字节
Range: bytes=5001-
# 0 - 3000 字节, 5000 - 7000 字节
Range: bytes=-3000, 5000-7000
```

## HTTP 状态码

### 状态码概述

|     | 类别                            | 状态短语                   |
| --- | ------------------------------- | -------------------------- |
| 1XX | Informational (信息性状态码)    | 接收的请求正在处理         |
| 2XX | Success (成功状态码)            | 请求正常处理完毕           |
| 3XX | Redirection (重定向状态码)      | 需要进行附加操作以完成请求 |
| 4XX | Client Error (客户端错误状态码) | 客户端发送请求错误         |
| 5XX | Server Error (服务器错误状态码) | 服务器处理请求出错         |

### 1XX

- 101: 切换协议, 一般用于 WebSocket;

### 2XX

- 200 OK: 请求正常处理;
- 201 已创建: 服务器成功处理请求, 并创建新资源;
- 202 已创建: 服务器成功处理请求, 但未处理;
- 203 非授权信息: 服务器成功处理请求, 但返回信息为另一来源;
- 204 No Content: 请求正常处理, 但响应报文无报文主体;
- 206 Partial Content: 请求正常处理, 返回指定范围的报文主体;

### 3XX

##### 状态码

- 301 Moved Permanently: 永久性重定向, 永久使用 URL;
- 302 Found: 临时性重定向, 临时使用其他 URL, 但希望用户依旧使用该 URL;
- 303 See Other: 同 302, 但希望客户端使用单独的 GET 方法访问新 URL;
- 304 Not Modified: 客户端发送附带条件的请求, 服务器端允许访问资源, 但未满足条件;
- 305 使用代理: 用户需使用代理;
- 307 Temporary Redirect: 同 302, 但希望客户端保持请求方法类型不变访问新 URL;

##### 强制转换

- 301, 302, 303 返回时;
- 几乎所有浏览器都会将 HTTP 方法转换为 GET;

### 4XX

- 400 Bad Request: 请求报文存在语法错误;
- 401 Unauthorized: 请求需要具有 HTTP 认证信息;
- 403 Forbidden: 服务器端拒绝请求;
- 404 Not Found: 服务器端未找到资源;
- 405 方法禁用: http 方法禁用;
- 408 请求超时;
- 412: 条件请求不满足条件;

### 5XX

- 500 Internal Server Error: 服务器端执行请求报错;
- 502: 网关错误;
- 503 Service Unavailable: 服务器端停机维护;
- 504: 网关超时;
- 505: 服务器不支持请求的 http 版本;

## HTTP 首部字段

### 基础

##### 字段结构

```bash
首部字段名: 字段值
```

##### 字段类型

- 通用首部字段: 用于请求报文和响应报文;
- 请求首部字段: 仅用于请求报文;
- 响应首部字段: 仅用于响应报文;
- 实体首部字段: 描述报文实体;

##### 字段协议

- HTTP/1.1 协议 (RFC2616);
- 非 HTTP 协议(RFC4229);

##### 端到端首部

- End-to-end Header;
- 必须被转发给最终接受目标的首部;

##### 逐跳首部

- Hop-by-hop Header;
- 只需转发单次的首部;
  - Connection;
  - Keep-Alive;
  - Proxy-Authenticate;
  - Proxy-Authorization;
  - Trailer;
  - TE;
  - Transfer-Encoding;
  - Upgrade;

### 通用首部字段

##### Cache-Control

- 控制缓存行为;

```bash
Cache-Control: private, max-age=0, no-cache
```

```bash
# 所有用户可缓存
Cache-Control: public
# 特定用户缓存
Cache-Control: private
# 使用缓存, 但不使用缓存过期的资源
Cache-Control: no-cache
# 不进行缓存
Cache-Control: no-store
# 缓存最大生效时间
Cache-Control: max-age=604800
# 缓存最小生效时间
Cache-Control: min-fresh=60
# 缓存最大过期时间, 只要小于对应数值, 都接受
Cache-Control: max-stale=3600
# 仅在具有缓存的情况下返回
Cache-Control: only-if-cached
# 缓存服务器必须验证资源是否有效
Cache-Control: must-revalidate
# 缓存服务器必须验证资源是否有效
Cache-Control: proxy-revalidate
# 禁止改变实体主体 MIME 类型
Cache-Control: no-transform
```

##### Connection

- 控制不再转发的首部字段;
- 管理持久连接;

```bash
# 控制不再转发的首部字段
Connection: 不再转发的首部字段名
# 控制持久管理
Connection: Keep-Alive
Connection: close
```

##### Date

- 表示 HTTP 报文的创建时间;

```bash
Date: Tue, 03 Jul 2012 04:40:59 GMT
```

##### Pragma

- HTTP 遗留字段;
- 等效 `Cache-Control: no-cache`;

```bash
Cache-Control: no-cache
Pragma: no-cache
```

##### Trailer

- 记录报文主体中的首部字段;

```bash
...
Trailer: Expires
...(报文主体)...
0
Expires: Tue, 28 Sep 2004 23:59:59 GMT
```

##### Transfer-Encoding

- 传输报文主体使用的编码方式;

```bash
Transfer-Encoding: chunked
```

##### Upgrade

- 检测能否使用更高版本的协议;
- 与 `Connection` 协同使用;

```bash
GET /index.htm HTTP/1.1
Upgrade: TLS/1.0
Connection: Upgrade
```

##### Via

- 记录请求的传输路径;

```bash
GET / HTTP/1.1
# 转发一次
GET / HTTP/1.1
Via: 1.0 gw.hackr.jp(Squid/3.1)
# 转发二次
GET / HTTP/1.1
Via: 1.0 gw.hackr.jp(Squid/3.1),
1.1 a1.example.com(Squid/2.7)
```

##### Warning

- 记录缓存相关的警告;

```bash
Warning: [警告码][警告的主机:端口号] "[警告内容]" ([日期时间])
```

### 请求首部字段

##### Accept

- 客户端支持的多媒体类型和优先级;
  - 优先返回优先级高的多媒体类型;
  - 权重值 q 取值范围 0-1, 默认为 1;
  - ; 分隔;
- \*/\* 表示任何类型;

```bash
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
```

##### Accept-Charset

- 客户端支持的字符集和优先级;

```bash
Accept-Charset: iso-8859-5, unicode-1-1;q=0.8
```

##### Accept-Encoding

- 客户段支持的内容编码类型和优先级;

```bash
Accept-Encoding: gzip, deflate
```

##### Accept-Language

- 客户端支持的自然语言集和优先级;

```bash
Accept-Language: zh-cn,zh;q=0.7,en-us,en;q=0.3
```

##### Authorization

- 客户端认证信息;
- 用于 401 状态码响应;

```bash
GET /index.htm
Authorization: Basic dWVub3NlbjpwYXNzd29yZA==
```

##### Expect

- 客户端期待出现的行为;

```bash
Expect: 100-continue
```

##### From

- 客户端邮箱地址;

```bash
From: info@hackr.jp
```

##### Host

- 指明服务器端 URL, 必须使用;

```bash
Host: www.hackr.jp
```

##### If-Match

- 条件请求字段;
- 服务器资源的 ETag 值对应时返回 200;
- 反之返回 412;

```bash
If-Match: "123456"
```

##### If-None-Match

- `If-Match` 取反;
- 服务器资源的 ETag 值不对应时返回 200;
- 反之返回 412;

##### If-Unmodified-Since

- `If-Modified-Since` 取反;
- 若更新返回 412;
- 反之返回 200;

##### If-Range

- 条件请求字段;
- 若资源的 ETag 值对应, 按照范围请求处理;
- 反之返回 412;

```bash
GET /index.html
If-Range: "123456"
Range: bytes=5001-10000
```

##### Max-Forwards

- 最大转发次数;
- 作用于 TRACE 和 OPTIONS 方法;

```bash
Max-Forwards: 10
```

##### Proxy-Authorization

- 同 `Authorization`;

```bash
Proxy-Authorization: Basic dGlwOjkpNLAGfFY5
```

##### Range

- 设置范围请求中响应报文主体范围;
- 返回 206 或 200;

```bash
Range: bytes=5001-10000
```

##### Refer

- 设置发起请求报文的 URL;

```bash
GET /
Referer: http://www.hackr.jp/index.htm
```

##### TE

- 等效 `Accept-Encoding`;
- 作用于传输编码, 而非内容编码;

```bash
TE: gzip, deflate;q=0.5
```

##### If-Modified-Since

- 条件请求字段;
- 判断资源是否在对应时间后发生更新;
- 若为假, 即 Last Modified 字段时间早于对应值, 返回 304;
- 反之返回 200 的最新副本;

```bash
If-Modified-Since: Thu, 15 Apr 2004 00:00:00 GMT
```

##### User-Agent

- 浏览器种类;

```bash
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/⇒
20100101 Firefox/13.0.1
```

### 响应首部字段

##### Accept-Ranges

- 服务器能否处理范围请求;

```bash
# 可以
Accept-Ranges: bytes
# 不可以
Accept-Ranges: none
```

##### Age

- 源服务器创建响应的时间 (s);
- 常作用于缓存服务器, 查询缓存验证时间;

```bash
# 可以
Age: 600
```

##### ETag

- 资源唯一标识;

```bash
ETag: "82e22293907ce725faf67773957acd12"
```

##### Location

- 引导客户端访问指定 URL;
- 常用于 3XX 状态码;

```bash
Location: http://www.usagidesign.jp/sample.html
```

##### Proxy-Authenticate

- 发送代理服务器要求的认证信息;

```bash
Proxy-Authenticate: Basic realm="Usagidesign Auth"
```

##### Retry-After

- 告知客户端访问时间;
- 常与 3XX 和 503 状态码使用;

```bash
Retry-After: 120
```

##### Server

- 服务器端 Web 服务器信息;

```bash
Server: Apache/2.2.6 (Unix) PHP/5.2.5
```

##### Vary

- 对缓存进行控制;
- 缓存服务器仅对 Vary 首部字段相同的请求使用缓存;

```bash
Vary: Accept-Language
```

![Vary](./images/2024-01-19-16-41-48.png)

### 实体首部字段

##### Allow

- 告知服务器支持的 HTTP 方法;

```bash
Allow: GET, HEAD
```

##### Content-Encoding

- 实体主体部分的内容编码;

```bash
Content-Encoding: gzip
```

##### Content-Language

- 实体主体部分使用的自然语言;

```bash
Content-Language: zh-CN
```

##### Content-Length

- 实体主体部分的字节长度;

```bash
Content-Length: 15000
```

##### Content-Location

- 实体主体部分对应的 URL;
- 不同于 Location 字段;

```bash
Content-Location
```

##### Content-MD5

- 实体主体部分的 MD5;

```bash
Content-MD5: OGFkZDUwNGVhNGY3N2MxMDIwZmQ4NTBmY2IyTY==
```

##### Content-Range

- 用于范围请求;
- 表示发送部分和总体长度;

```bash
Content-Range: bytes 5001-10000/10000
```

##### Content-Type

- 实体主体 MIME 类型和字符集;

```bash
Content-Type: text/html; charset=UTF-8
```

##### Expires

- 实体失效时间;
- 超过指定时间后重新向源服务器请求;

```bash
Expires: Wed, 04 Jul 2012 08:26:05 GMT
```

##### Last-Modified

- 对应资源最后被修改的时间;

```bash
Last-Modified: Wed, 23 May 2012 09:59:55 GMT
```

### 其他首部字段

#### Cookie 首部字段

##### Set-Cookie

- 服务器通知客户端设置 cookie 为指定值;

```bash
Set-Cookie: status=enable; expires=Tue, 05 Jul 2011 07:26:31 GMT; ⇒
path=/; domain=.hackr.jp;
```

##### Cookie

- 请求中客户端的 cookie 信息;

```bash
Cookie: status=enable
```

#### X-Frame-Options

- Frame 标签的权限管理;

```bash
# 拒绝其他页面访问
X-Frame-Options: DENY
# 仅允许同源页面范围
X-Frame-Options: SAMEORIGIN
```

#### X-XSS-Protection

- 控制浏览器 XSS 防护机制;

```bash
X-XSS-Protection: 1
```

#### DNT

- 拒绝个人信息被收集;

```bash
DNT: 1
```

#### P3P

- 将个人隐私信息转换仅程序可读的形式;
- 用于保护用户隐私;

```bash
P3P: CP="CAO DSP LAW CURa ADMa DEVa TAIa PSAa PSDa ⇒
IVAa IVDa OUR BUS IND UNI COM NAV INT"
```

## 数据转发和缓存

### 数据转发

#### 代理

##### 代理

- 服务器和客户端的中间商;
  - 接受客户端请求并转发给服务器;
  - 接受服务器响应并转发给客户端;
- 经过代理服务器写入 Via 首部字段;

![代理](./images/2024-01-17-10-15-59.png)

##### 作用

- 基于缓存技术减少网络带宽;
- 控制访问;
- 日志管理;

##### 分类

- 缓存代理: 缓存请求资源;
- 透明代理: 不加工转发请求的代理;
- 非透明代理: 加工转发请求的代理;

#### 网关

- 类似于代理;
- 转发其他服务器数据的服务器;
- 可以将 HTTP 协议转换为其他通讯协议;

![网关](./images/2024-01-17-10-18-51.png)

#### 隧道

- 建立客户端和服务器端的通信线路;
- 使用 SSL 进行加密通信;

![隧道](./images/2024-01-17-10-19-36.png)

### 缓存

##### 缓存

- 服务器端的资源副本;

##### 作用

- 减少对服务器的访问;
- 降低通信流量和响应时间;

##### 刷新缓存

- 根据客户端要求或者缓存有效期限;
- 缓存服务器再次请求服务器端, 刷新缓存资源;

##### 客户端缓存

- 临时网络文件, 存储在磁盘中;
- 具有缓存刷新机制;

## 功能追加协议

### SPDY

##### HTTP 弊端

- 一次连接只可发送一次请求;
- 请求只能从客户端开始;
- 首部信息冗余且不压缩;

##### SPDY (已废弃)

- 使用 SSL;
- 多路复用流: 单一 TCP 连接多个 HTTP 请求;
- 请求优先级;
- 强制压缩;
- 服务器推送功能;

### WebDAV

##### WebDAV

- 分布式文件系统;
- 客户端直接操作服务器内容

##### 相关方法和状态码

- HTTP/1.1 添加;

| 方法                     | 描述                                            |
| ------------------------ | ----------------------------------------------- |
| PROPFIND                 | 获取属性                                        |
| PROPPATCH                | 修改属性                                        |
| MKCOL                    | 创建集合                                        |
| COPY                     | 复制资源及属性                                  |
| MOVE                     | 移动资源                                        |
| LOCK                     | 资源加锁                                        |
| UNLOCK                   | 资源解锁                                        |
| 102 Processing           | 可正常处理请求,但目前是处理中状态               |
| 207 Multi-Status         | 存在多种状态                                    |
| 422 Unprocessible Entity | 格式正确,内容有误                               |
| 423 Locked               | 资源已被加锁                                    |
| 424 Failed Dependency    | 处理与某请求关联的请求失败,因此不再维持依赖关系 |
| 507 Insufficient Storage | 保存空间不足                                    |

## 跨域

### 浏览器同源策略

##### 同源策略

- 限制不同源之间的资源如何交互;
- 同源, 即两个 URL 协议, 主机和端口号都相同;

##### 限制内容

- js 无法读取非同源网页的 cookie, storage 和 indexedDB;
- js 无法读取非同源网页的 dom;
- ajax 和 fetch 不能发送跨域请求;
- iframe 无法访问非同源 dom;
- https 和 http 资源无法跨协议加载;

### 跨域方案

##### cors

- 通过设置 `Access-Control-Allow-Origin`;
- 设置允许的源;

##### 代理

- 同源页面发送请求至同源服务器;
- 服务器转发至跨域服务器;
- 将请求结果返回至同源页面;

##### websocket

- websocket 并非 http 协议, 不受同源策略限制;
- 使用 websocket 进行客户端和服务器端通信;

### 预检请求

##### options 请求

- 浏览器发送跨域请求之前;
- 发送 options 请求, 用于检查服务器是否允许该跨域请求;
- 简单请求忽略该 options 请求;

##### 简单请求

- 简单请求不会触发预检请求, 即使跨域;
- 请求方法必须为 POST, GET 或 HEAD;
- 指定 Header;
  - 规定的首部字段: Accept-_, Content-_;
  - Context-Type 限制: application/x-www-form-urlencoded, multipart/form-data, text/plain;

##### 复杂请求

- 违背简单请求约束的请求均为复杂请求;
  - 请求方法;
  - 首部字段;
  - Content-Type;

##### 关键首部字段

- Access-Control-Allow-XXX;
  - Method: 服务器允许的 http 方法;
  - Origin: 服务器允许的跨域 URL;
  - Header: 服务器允许的首部字段;
  - Max-Age: 预检请求缓存时间, 缓存时间内不会再次触发预检请求;

## http/1.x

### GET 请求和 POST 请求的区别

##### 一览

|          | GET                 | POST                        |
| -------- | ------------------- | --------------------------- |
| 应用场景 | 幂等请求            | 非幂等请求                  |
| 缓存     | 会缓存              | 不会缓存                    |
| 传参方式 | 查询字符串          | 请求体                      |
| 安全性   | 明文                | 加密                        |
| 请求长度 | 浏览器限制 url 长度 | 无限制                      |
| 参数类型 | ASCII 字符          | 更多的数据类型 (二进制数据) |

##### URL 长度限制

- IE: 2083 字节;
- Firefox: 65535 字节;
- Safari: 80000 字节;
- Opera: 190000 字节;
- Chrome: 8182 字节;

### 常见的 Content-Type

- application/json;
- application/x-www-form-urlencoded;
- multipart/form-data;
- text/plain;
- text/html;
- image/jpeg;
- image/png;

### cookie

##### 自动携带 cookie

- domain 相同;
- 协议相同, 或者 secure 为 false;
- 请求 url 和 path 及其子路径 一致;

##### 跨域携带 cookie

- 客户端设置 `"withCredentials": true;`;
- 服务器端配置;
  - `"Access-Control-Allow-Origin", "http://xxx:${port}"`;
  - `"Access-Control-Allow-Credentials", "true"`;

### http/1.0 和 http/1.1 区别

| 区别      | http/1.0         | http/1.1                           |
| --------- | ---------------- | ---------------------------------- |
| 缓存机制  | 仅支持客户端缓存 | 客户端缓存 + 服务器缓存            |
| 持久连接  | 默认非持久连接   | 持久连接                           |
| 超时机制  | 无明确超时机制   | 连接超时 + 读取超时 + 空闲连接超时 |
| 状态码    | xxxx             | 更多的状态码                       |
| 带宽优化  | xxx              | 分块传输 + 范围请求                |
| Host 头部 | xxx              | 引入 Host 首部字段                 |
| 管线化    | 不支持           | 支持                               |

## HTTP2.0

### 新特性

- 多路复用: 基于二进制帧首部标识字段区分不同请求;
- 服务器推送: SSE;
- 请求优先级: 控制响应优先级;
- 二进制分帧: 提高传输效率;
- 首部压缩: 压缩 http 首部信息;

### 首部压缩算法

- 使用 HPACK 算法, 具有静态压缩和动态压缩两种方式;
- 静态压缩;
  - 预先建立称为静态表的字典, 将经常使用的首部字段预先编码并存储在静态表中;
  - 传递 HTTP 请求时, 仅发送静态表的索引;
- 动态压缩;
  - 基于哈希算法, 对 HTTP 首部进行编码, 双方维护一张哈希表;
  - 传递 HTTP 请求时, 仅发送哈希表索引值;
  - 哈希表空间不足时, 优先删除最少使用的首部字段;

## HTTP3.0

### QUIC 协议

- HTTP3.0 使用 UDP 协议传输;
- 基于 UDP 指定 QUIC 协议;
  - 前向纠错: 基于 FEC 技术, 通过发送冗余数据还原丢包数据;
    - 额外发送一个校验包, 其值为所有数据包的异或值;
    - 若任一非校验包丢包且只丢失一个包, 可通过其他包还原;
  - 重传机制;
  - 堵塞控制;

### 优点

- HTTP3 只需要一次握手, 第一个包即可携带请求数据;
- HTTP2 使用的 TCP 和 TLS 均存在队首堵塞, HTTP3 基于 UDP, 服务器端无滑动窗口, 即无数据包的处理顺序;

## WebSocket

##### WebSocket 协议

- 基于 HTTP/HTTPS;
- 全双工通信;
- 持续时间内保持连接状态;

##### 一次握手

- 客户端发送 HTTP/HTTPS 请求;
  - Upgrade 首部告知服务器使用 WebSocket 协议;
  - Sec-WebSocket-Key 首部作为 key 标识;
  - Sec-WebSocket-Protocol 表示支持协议;
- 服务器生成 HTTP(S) 握手响应;
  - 服务器返回 101 状态码;
  - Sec-WebSocket-Protocol 首部选择 websocket 协议;
  - 基于 Sec-WebSocket-Key 构造 Sec-WebSocket-Accept 首部;
- 客户端接受 HTTP(S) 握手响应;
  - 校验 Sec-WebSocket-Accept 首部;
  - 校验通过建立 websocket 连接, 不再使用 HTTP/HTTPS 协议;

```bash
# 请求
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13

# 响应
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
Sec-WebSocket-Protocol: chat
```

![WebSocket 握手](./images/2024-03-04-19-21-22.png)

##### 优点

- 全双工: 实时推送, 优于轮询;
- 降低网络开销: 一次握手, 持久保持连接, 避免反复连接开销;
- 更少的数据量: 二进制数据帧传输数据, 传输效率高;
- 跨域通信: 支持跨域通信;

## 最佳实践

### 正向代理和反向代理

##### 正向代理

- 客户端的代理, 转发客户端请求至服务器;
- 隐藏客户端信息, 用于 VPN, 内网穿透等;

##### 反向代理

- 服务器的代理, 处理客户端请求并转发至服务器;
- 隐藏服务器信息, 用于负载均衡, 缓存, 安全控制等;

![正向代理和反向代理](images/2024-04-16-11-05-54.png)

### 负载均衡的实现方式

##### 负载均衡

- 多个服务器分配网络请求;
- 提高服务器集群的性能和可靠性;

##### 硬件

- 物理设备;
- 包含交换机, 路由器, 防火墙等;
- 拓展性高, 性能高, 适用于大规模数据;

##### 软件

- 应用程序;
- 基于轮询, 最小连接数, IP 哈希等算法分配至不同服务器;
- 成本低, 易于实现和管理, 适用于中小规模数据;

##### 要求

- 可靠性: 处理硬件, 软件故障, 网络错误等异常故障;
- 稳定性: 运行稳定性, 性能稳定性;
- 安全性: 防止 DDOS, 提供 SSL 加密等;
- 可拓展性;

### 轮询

##### 短轮询

- 客户端每隔一定时间发送 HTTP 请求;
- 优缺点;
  - 实现简单;
  - 需要重复建立连接, 具有延迟;

##### 长轮询

- 客户端发送 HTTP 请求;
- 若对应请求资源变化, 服务器立刻返回响应, 反之服务器保持请求, 直至资源变化或超时;
- 客户端接受响应后重新发送请求;
- 限制;
  - 客户端代码使用长轮询;
  - 服务器对于请求资源未变化的情况进行保持连接处理;
- 优缺点;
  - 减少了无效请求;
  - 具有延迟;

```typescript
async function subscribe() {
  let response = await fetch("/subscribe");
  if (response.status == 502) {
    // 服务器超时重新连接
    await subscribe();
  } else if (response.status != 200) {
    // 服务器报错, 一秒后重新连接
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await subscribe();
  } else {
    // 正确处理, 执行若干处理程序
    // ...
    await subscribe();
  }
}
```

##### SSE

- 服务器推送技术;
- 建立持久连接, 实现单向通信;
- 优缺点;
  - 实时性高;

##### WebSocket

- 全双工, 双向通信;
- 优缺点;
  - 实时性高;
  - 性能耗费大;

### RESTFUL API

- API 描述规范;
- 通过 URL 和 HTTP 动词统一 API 接口;
- 使用 CS 结构;
- 支持不同数据传输;
- 无状态通信;
