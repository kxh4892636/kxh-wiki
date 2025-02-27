---
id: 0d879cbe-4270-4f36-945a-1f122cbcd1fe
---

# path 模块

## 方法

##### 获得所属文件夹名

```typescript
// path.dirname(path)
path.dirname("/foo/bar/baz/asdf/quux"); // /foo/bar/baz/asdf
```

##### 获得文件名

```typescript
// path.basename(path[, suffix])
// 返回 path 最后一部分
// 第二个参数移除文件后缀
path.basename("/foo/bar/baz/asdf"); // asdf
path.basename("/foo/bar/baz/asdf/quux.html"); // quux.html
path.basename("/foo/bar/baz/asdf/quux.html", ".html"); // quux
```

##### 返回文件后缀

```typescript
// path.extname(path);
// 返回最后一个 . 到 path 末尾的字符
// 若 . 后无字符或者除了第一个字符之外无 . , 返回空字符串
path.extname("index.html"); // .html
path.extname("index.coffee.md"); // .md
path.extname("index."); // .
path.extname("index"); // ''
path.extname(".index"); // ''
```

##### 拼接路径

```typescript
// path.join([...paths])
// 拼接并解析字符串, 然后运行 path.normalize()
path.join("/foo", "bar", "baz/asdf", "quux", ".."); // /foo/bar/baz/asdf
```

##### 格式化路径

```typescript
// path.format(pathObject)
path.format({
  root: "/home",
  dir: "/user/dir",
  base: "file",
  ext: ".txt",
});
// /home/user/dir/file.txt

// path.parse(path)
// path.format() 的逆操作
path.parse("/home/user/dir/file.txt");
// {
//   root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
//  }
```

##### 解析路径

```typescript
// path.resolve([...paths])
// 从右到左解析路径, 直到拼成一个绝对路径
// 如果所有参数解析完仍不是绝对路径, 将当前路径添加至前面
path.resolve("/foo/bar", "./baz"); // /foo/bar/baz
path.resolve("/foo/bar", "/tmp/file/"); // /tmp/file
// 假设当前路径为 /home/kxh/node
path.resolve("wwwroot", "static_files/png/", "../gif/image.gif");
// /home/kxh/node/wwwroot/static_files/gif/image.gif
```

##### 生成相对路径

```typescript
// path.relative(from, to)
// 生成 from 到 to 的相对路径
path.relative("/data/orandea/test/aaa", "/data/orandea/impl/bbb"); // ../../impl/bbb
```

##### 标准化路径

```typescript
// path.normalize(path)
// 将 path 解析为标准形式的路径
path.normalize("/foo/bar//baz/asdf/quux/.."); // /foo/bar/baz/asdf
```

##### 布尔运算

```typescript
path.isAbsolute(path); // 是否为绝对路径
```

## 属性

##### 属性

```typescript
path.sep; // 路径分隔符, windows 为 \, posix 为 /
```
