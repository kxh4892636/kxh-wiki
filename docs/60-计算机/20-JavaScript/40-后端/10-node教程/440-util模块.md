---
id: f6f5779c-ab67-4f5f-9435-9a8f4fe7ff97
---

# util 模块

## API

##### 回调和异步

```typescript
// util.callbackify(original)
// 包裹返回 Promise 的函数 fn, 返回一个函数, 函数仅有一个参数, 表示 fn 的回调函数, 形式为 (err, result) => {}
async function fn() {
  return "hello world";
}
const callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
  if (err) throw err;
  console.log(ret);
});

// util.promisify(original)
// 回调形式变为 promise 形式, 要求 original 最后一个参数为回调函数
const stat = util.promisify(fs.stat);
stat(".")
  .then((stats) => {
    // Do something with `stats`
  })
  .catch((error) => {
    // Handle the error.
  });

// util.promisify() 会丢失 original 中的 this, 必须使用 bind() 或 call() 绑定
class Foo {
  constructor() {
    this.a = 42;
  }

  bar(callback) {
    callback(null, this.a);
  }
}

const foo = new Foo();
const naiveBar = util.promisify(foo.bar);

naiveBar().then((a) => console.log(a)); // TypeError: Cannot read property 'a' of undefined
naiveBar.call(foo).then((a) => console.log(a)); // '42'
naiveBar
  .bind(foo)()
  .then((a) => console.log(a)); // '42'
```

##### 调试

```typescript
// util.debuglog(section[, callback])
// 返回一个调试函数, 只有 NODE_DEBUG 环境变量为 section, 该函数才会执行, 将输出结果写入 stderr
const debuglog = util.debuglog("foo");
// NODE_DEBUG 环境变量为 foo 才会输出
debuglog("hello from foo [%d]", 123); // FOO 3245: hello from foo [123]

// debuglog().enabled
// 检验 NODE_DEBUG 是否为 section
const enabled = util.debuglog("foo").enabled;
if (enabled) {
  console.log("hello from foo [%d]", 123);
}

// util.inspect(object[, showHidden[, depth[, colors]]])
// 返回 object 的字符串表示
// showHidden 表示输出对象的非枚举属性, 默认为 false
// depth 表示输出嵌套对象的层级, 无限为 null, 默认为 2
// color 表示输出结果为彩色字符串, 默认为 false
// showProxy 表示是否显示 target and handler objects, 默认为 false
// maxArrayLength 限制输出字符串的显示数组数量
// maxStringLength 限制输出字符串长度
// breakLength 表示输出字符串换行长度
// compact 设置为 null 表示每个对象键换行, n 表示 n 个对象键合并在一行
// sorted 设置为 true 表示对象属性根据字符串排序, 设置为函数表示自定义比较函数
class Bar {}
util.inspect(new Bar()); // 'Bar {}'
```

##### 标记

```typescript
// util.deprecate(fn, msg[, code])
// 标记 fn 已经失效, 调用时输出 msg
const fn1 = util.deprecate(someFunction, someMessage, "DEP0001");
const fn2 = util.deprecate(someOtherFunction, someOtherMessage, "DEP0001");
fn1(); // Emits a deprecation warning with code DEP0001
fn2(); // Does not emit a deprecation warning because it has the same code
```

##### 格式化

```typescript
// util.format(format[, ...args])
// 格式化输出
util.format("%s:%s", "foo", "bar", "baz"); // 'foo:bar baz'
// 不存在对应标识不会发生替换
util.format("%s:%s", "foo");
// 不存在标识符使用空格 join() 参数
util.format(1, 2, 3); // 1 2 3
// 无替换字符串, 不进行格式化
util.format("%% %s"); // %% %s

// util.stripVTControlCharacters(str)
// 返回 str, 并删除任何 ANSI 转义字符
console.log(util.stripVTControlCharacters("\u001B[4mvalue\u001B[0m")); // "value"
```

##### 报错

```typescript
// util.getSystemErrorName(err)
// 获得 node 数字错误代码的名称
fs.access("file/that/does/not/exist", (err) => {
  const name = util.getSystemErrorName(err.errno);
  console.error(name); // ENOENT
});

// util.getSystemErrorMap()
// 获得 node 所有错误代码的映射
fs.access("file/that/does/not/exist", (err) => {
  const errorMap = util.getSystemErrorMap();
  const name = errorMap.get(err.errno);
  console.error(name); // ENOENT
});
```

##### 相等

```typescript
// util.isDeepStrictEqual(val1, val2)
// 判断两个对象是否深度严格相等
```

## MIME

### util.MIMEType

##### util.MIMEType

- 实验性功能；

### util.MIMEParams

##### 创建

```typescript
// new MIMEParams()
const myParams = new MIMEParams();
```

##### curd

```typescript
// mimeParams.delete(name)
// mimeParams.get(name)
// mimeParams.has(name)
// mimeParams.set(name, value)
const { params } = new MIMEType("text/plain;foo=0;bar=1");
params.set("foo", "def");
params.set("baz", "xyz");
console.log(params.toString()); // foo=def&bar=1&baz=xyz
```

##### 迭代

```typescript
// mimeParams.entries()
// mimeParams.keys()
// mimeParams.values()
import { MIMEType } from "util";

const { params } = new MIMEType("text/plain;foo=0;bar=1");
for (const name of params.keys()) {
  console.log(name);
}
// foo
// bar
```

## util.Text

### util.TextDecoder

##### util.TextDecoder

- 解码；

### util.TextEncoder

##### util.TextEncoder

- 编码；

## util.type

##### util.type

- 检验 node 内置对象类型；

```typescript
// util.types.isXXX(value)
// 检验 value 是否为 XXX 类型
util.types.isAnyArrayBuffer(new ArrayBuffer()); // true
util.types.isBigInt64Array(new BigUint64Array()); // false
util.types.isDate(new Date()); // true
```
