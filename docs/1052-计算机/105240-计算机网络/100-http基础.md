---
id: 98369df1-f047-4ffb-be15-6874cf84c13d
---

# http 基础

## web 基础

### web 构建技术

- HTML: 网页文本标记语言;
- HTTP: 超文本传输协议 (HyperText Transfer Protocol);;
- URL: 统一资源定位符 (Uniform Resource Locator);;

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

- IP: 负责不同主机的通信;;
- TCP: 负责不同进程的通信;
- DNS: 负责 URL 到 IP 的解析;;

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

## HTTP 状态码

### 状态码概述

|     | 类别                             | 状态短语                   |
| --- | -------------------------------- | -------------------------- |
| 1XX | Informational（信息性状态码）    | 接收的请求正在处理         |
| 2XX | Success（成功状态码）            | 请求正常处理完毕           |
| 3XX | Redirection（重定向状态码）      | 需要进行附加操作以完成请求 |
| 4XX | Client Error（客户端错误状态码） | 客户端发送请求错误         |
| 5XX | Server Error（服务器错误状态码） | 服务器处理请求出错         |

### 2XX

- 200 OK: 请求正常处理;
- 204 No Content: 请求正常处理, 但响应报文无报文主体;
- 206 Partial Content: 请求正常处理, 返回指定范围的报文主体;

### 3XX

##### 状态码

- 301 Moved Permanently: 永久性重定向, 永久使用 URL;
- 302 Found: 临时性重定向, 临时使用其他 URL;
- 303 See Other: 同 302, 但希望客户端使用 GET 方法获取资源;
- 304 Not Modified: 客户端发送附带条件的请求, 服务器端允许访问资源, 但未满足条件;
- 307 Temporary Redirect: 同 302, 但不会从 POST 变为 GET;

##### 强制转换

- 301, 302, 303 返回时;
- 几乎所有浏览器都会将 HTTP 方法转换为 GET;

### 4XX

- 400 Bad Request: 请求报文存在语法错误;
- 401 Unauthorized: 请求需要具有 HTTP 认证信息;
- 403 Forbidden: 服务器端拒绝请求;
- 404 Not Found: 服务器端未找到资源;

### 5XX

- 500 Internal Server Error: 服务器端执行请求报错;
- 503 Service Unavailable: 服务器端停机维护;

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
Warning: [警告码][警告的主机:端口号]“[警告内容]”([日期时间])
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
- 服务器资源的 ETag 值对应才会执行对应操作;

```bash
If-Match: "123456"
```

##### If-None-Match

- `If-Match` 取反;
- 服务器总会返回最新的资源;

##### If-Modified-Since

- 条件请求字段;
- 判断资源是否在对应时间后发生更新;
- 若未更新返回 304;

```bash
If-Modified-Since: Thu, 15 Apr 2004 00:00:00 GMT
```

##### If-Unmodified-Since

- `If-Modified-Since` 取反;
- 若更新返回 412;

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
