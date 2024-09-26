---
id: 4e2da8c8-7675-444a-bf0f-6173d69323f2
---

# buffer 模块

## 基础

##### 基本单元

- Buffer 是一个 Uint8Array 的子集;
- 以 1 个字节作为基本单元;
- 支持 TypedArray 的所有方法;

##### 字符编码

- 默认值;
  - utf8;
- 常见值:
  - latin1;
  - base64;
  - ascii: 等效于 latin1;
  - binary: latin1 的别名;

##### node 中的 utf8 编码

- node 中的 utf8 编码为变长编码;
- 一个字符使用 1 - 4 个字节;
- 通过开头的若干位表示该字符占用多少字节;
  - 开头为 0: 1 个字节, 与 ascii 兼容;
  - 开头为 1: 有多少个 1 就占用多少个字节;

##### buffer 的内存分配

- 当 buffer 小于 Buffer.poolSize 时;
- node 会将多个 buffer 进行合并;
- 减少内存耗费和 gc;

##### 大字端和小字端

- 大字端: 高位在前面;
- 小字端: 低位在前面;

```typescript
// 大字端
const buf = Buffer.allocUnsafe(4);
buf.writeInt32BE(0x01020304, 0); // <Buffer 01 02 03 04>

// 小字端
const buf = Buffer.allocUnsafe(4);
buf.writeInt32LE(0x05060708, 0); <Buffer 08 07 06 05>
```

##### 迭代

```typescript
import { Buffer } from "node:buffer";

const buf = Buffer.from([1, 2, 3]);

for (const b of buf) {
  console.log(b);
}
// 1
// 2
// 3
```

## Blob

##### 创建 Blob

```typescript
import { Blob } from "buffer";

// new buffer.Blob([sources[, options]])
// 浏览器 Blob 对象在 node 中的 API
// 使用 sources 的一个副本, sources 在 blob 创建后可以安全修改
// sources 可以是  <string[]> | <ArrayBuffer[]> | <TypedArray[]> | <DataView[]> | <Blob[]>
const blob = new Blob(["test"]);
const blob = new Blob(new Int8Array().from([1, 2, 3]));
const blob = new Blob(new ArrayBuffer(8), {
  type: "application/pdf", // blob 对应的 MIME 类型
});
```

##### 方法

```typescript
// blob.arrayBuffer()
// 返回一个 promise, resolve 值为 blob 数据的副本
const data = await blob.arrayBuffer();

// blob.slice([start[, end[, type]]])
// 切片

// blob.stream()
// 创建一个 ReadableStream 实例用于读取 blob
const readableStream = blob.stream();

// blob.text()
// 返回一个 promise, resolve 值为 blob 数据的 utf8 编码的字符串
```

##### 属性

```typescript
blob.size; // blob 的字节数量
blob.type; // blob 的 MIME 类型
```

## Buffer

### 属性

```typescript
Buffer.poolSize; // buffer 预分配的字节大小
buf.buffer; // buffer 对应的 ArrayBuffer
buf.byteOffset; // buffer 对应的 ArrayBuffer 的偏移量, 用于多个 buf 共享一个 Buffer.poolSize 时
buf.length; // buf 的字节大小
```

### 方法

##### 创建 buffer

```typescript
import { Buffer } from "buffer";

// Buffer.alloc(size[, fill[, encoding]])
const buf = Buffer.alloc(5, "a");
console.log(buf); // <Buffer 61 61 61 61 61>

// Buffer.allocUnsafe(size)
// 该方法创建的实例内存未初始化, 数据未知
const buf = Buffer.allocUnsafe(10);
console.log(buf); //  <Buffer a0 8b 28 3f 01 00 00 00 50 32>

// Buffer.from(array)
// 一个数组元素为 8 位, 数组范围在 0 - 255 之间, 超过截取
const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);

// Buffer.from(arrayBuffer[, byteOffset[, length]])
// 根据 arrayBuffer 的 [byteOffset, byteOffset + length) 创建
const ab = new ArrayBuffer(10);
const buf = Buffer.from(ab, 0, 2);
console.log(buf.length); // 2

// Buffer.from(buffer)
// 创建副本
const buf1 = Buffer.from("buffer");
const buf2 = Buffer.from(buf1);

// Buffer.from(string[, encoding])
// 根据 string 和对应编码创建 buffer
const buf1 = Buffer.from("this is a tést");
console.log(buf1.toString()); // this is a tést
console.log(buf1.toString("latin1")); // this is a tÃ©st
```

##### 元数据

```typescript
// Buffer.byteLength(string[, encoding])
// 获得字符串的占用字节大小
const str = "\u00bd + \u00bc = \u00be";
Buffer.byteLength(str, "utf8"); // 12
```

##### 读写

```typescript
// buf.readXXX[[offset]]
// 根据 XXX 从 offset 位置开始读取
// LE 表示为小字端, BE 为大字端
const buf = Buffer.from([-1, 5]);
console.log(buf.readInt8(0)); // -1

const buf = Buffer.from([0, 5]);
console.log(buf.readInt16BE(0)); // 5

// buf.write(string[, offset[, length]][, encoding])
// 从 offset 开始根据 encoding 写入 string, 最大长度为 length
// 返回写入的字节数量
const buf = Buffer.alloc(256);
const len = buf.write("\u00bd + \u00bc = \u00be", 0);
console.log(`${len} bytes: ${buf.toString("utf8", 0, len)}`); // 12 bytes: ½ + ¼ = ¾

// buf.writeXXX[[offset]]
// 根据 XXX 从 offset 位置开始写入
// LE 表示为小字端, BE 为大字端
const buf = Buffer.allocUnsafe(2);
buf.writeInt8(2, 0);
buf.writeInt8(-2, 1);
console.log(buf); // <Buffer 02 fe>

const buf = Buffer.allocUnsafe(4);
buf.writeInt32LE(0x05060708, 0);
console.log(buf); // <Buffer 08 07 06 05>
```

##### 填充

```typescript
// buf.fill(value[, offset[, end]][, encoding])
// 填充 buff 的指定区间
const c = Buffer.allocUnsafe(5).fill("h");
// <Buffer 68 68 68 68 68>
```

##### 复制

```typescript
// buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
// 将 buf 的指定区间复制到 target 的指定区间
const buf1 = Buffer.allocUnsafe(26);
const buf2 = Buffer.allocUnsafe(26).fill("!");

for (let i = 0; i < 26; i++) {
  buf1[i] = i + 97;
}

buf1.copy(buf2, 8, 16, 20); // buf2.set(buf1.subarray(16, 20), 8);
console.log(buf2.toString("ascii", 0, 25)); // !!!!!!!!qrst!!!!!!!!!!!!!
```

##### 连接

```typescript
// Buffer.concat(list[, totalLength])
// 连接多个 buffer, 并截取至 totalLength
const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(14);
const buf3 = Buffer.alloc(18);
const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);
```

##### 截取

```typescript
// Buffer.copyBytesFrom(view[, offset[, length]])
// 从 offset 截取 view length 长度的元素
const u16 = new Uint16Array([0, 0xffff]);
const buf = Buffer.copyBytesFrom(u16, 1, 1);
u16[1] = 0;
console.log(buf.length); // 2
console.log(buf[0]); // 255
console.log(buf[1]); // 255

// buf.subarray([start[, end]])
// 根据 buf [start, end) 位置数据返回 buffer
const buf1 = Buffer.allocUnsafe(26);
for (let i = 0; i < 26; i++) {
  buf1[i] = i + 97;
}

const buf2 = buf1.subarray(0, 3);
console.log(buf2.toString("ascii", 0, buf2.length)); // abc

// buf.slice([start[, end]])
// 已废弃, 等效于 buf.subarray()
```

##### 交换

```typescript
// buf.swap16()
// 以 16 bit 为一组, 交换一组内的两个元素的顺序
// buf.length 必须为 2 的倍数, 否则报错
const buf1 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);
console.log(buf1); // <Buffer 01 02 03 04 05 06 07 08>

buf1.swap16();
console.log(buf1); // <Buffer 02 01 04 03 06 05 08 07>

// buf.swap32()
// 以 32 bit 为一组, 交换一组内的四个元素的顺序
// buf.length 必须为 4 的倍数, 否则报错
const buf1 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);
console.log(buf1); // <Buffer 01 02 03 04 05 06 07 08>

buf1.swap32();
console.log(buf1); // <Buffer 04 03 02 01 08 07 06 05>

// buf.swap64()
// 以 64 bit 为一组, 交换一组内的四个元素的顺序
// buf.length 必须为 8 的倍数, 否则报错
const buf1 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);
console.log(buf1); // <Buffer 01 02 03 04 05 06 07 08>

buf1.swap64();
console.log(buf1); // <Buffer 08 07 06 05 04 03 02 01>
```

##### 包含

```typescript
// buf.includes(value[, byteOffset][, encoding])
// 检索 buf 的字符编码是否包含 value
const buf = Buffer.from("this is a buffer");

// 字符串和 buffer 转换成对应编码
console.log(buf.includes("this")); // true
console.log(buf.includes(Buffer.from("a buffer"))); // true
console.log(buf.includes(Buffer.from("a buffer example"))); // false
// 数字解释为 latin1 编码
console.log(buf.includes(97)); // true (97 is the decimal ASCII value for 'a')
```

##### 索引

```typescript
// buf.indexOf(value[, byteOffset][, encoding])
// 返回 value 在 buf 中第一次出现的索引
const buf = Buffer.from("this is a buffer");

// 字符串和 buffer 转换成对应编码
console.log(buf.indexOf("a buffer example")); // -1
console.log(buf.indexOf("a buffer")); // 8
console.log(buf.indexOf(Buffer.from("a buffer"))); // 8
// 数字解释为 latin1 编码
console.log(buf.indexOf(97)); // 8

// buf.lastIndexOf(value[, byteOffset][, encoding])
// 返回 value 在 buf 中最后出现的索引
```

##### 比较

```typescript
// buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
// 比较 buf 和 target, 相同返回 0, buf 排序在 target 之后返回 1, 之前返回 -1
const buf1 = Buffer.from("ABC");
const buf2 = Buffer.from("BCD");
const buf3 = Buffer.from("ABCD");

console.log(buf1.compare(buf1)); // 0
console.log(buf1.compare(buf2)); // -1
console.log(buf1.compare(buf3)); // -1
console.log(buf2.compare(buf1)); // 1
console.log(buf2.compare(buf3)); // 1
console.log([buf1, buf2, buf3].sort(Buffer.compare)); // [buf1, buf3, buf2].)

// Buffer.compare(buf1, buf2)
// 等效于 buf1.compare(buf2)
// 常用于 buffer 排序
const buf1 = Buffer.from("1234");
const buf2 = Buffer.from("0123");
const arr = [buf1, buf2];
console.log(arr.sort(Buffer.compare));

// buf.equals(otherBuffer)
// 判断 buf 和 otherBuffer 是否相等
const buf1 = Buffer.from("ABC");
const buf2 = Buffer.from("414243", "hex");
const buf3 = Buffer.from("ABCD");

console.log(buf1.equals(buf2)); // true
console.log(buf1.equals(buf3)); // false
```

##### 迭代

```typescript
// buf.entries()
// 迭代返回 buf 键值对
const buf = Buffer.from("buffer");
for (const pair of buf.entries()) {
  console.log(pair);
}
// [0, 98]
// [1, 117]
// [2, 102]
// [3, 102]
// [4, 101]
// [5, 114]

// buf.keys()
// 迭代返回 buf 键

// buf.values()
// 迭代返回 value
```

##### 转换

```typescript
// buf.toJSON()
// 返回 buf 的 json 形式, JSON.stringify() 对象为 buffer 时隐式调用
const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf);

console.log(json); // {"type":"Buffer","data":[1,2,3,4,5]}

// buf.toString([encoding[, start[, end]]])
// 根据 encoding 返回 buf 的字符串形式
const buf1 = Buffer.allocUnsafe(26);
for (let i = 0; i < 26; i++) {
  buf1[i] = i + 97;
}
console.log(buf1.toString("utf8")); // abcdefghijklmnopqrstuvwxyz
console.log(buf1.toString("utf8", 0, 5)); // abcde
```

##### 布尔运算

```typescript
// Buffer.isBuffer(obj)
// obj 是否为 buffer

// Buffer.isEncoding(encoding)
// Buffer 是否支持 encoding 编码
```

## 其余 API

##### 布尔运算

```typescript
Buffer.isAscii(input); // 判断 input 是否是 ascii 编码
Buffer.isUtf8(input); // 判断 input 是否是 utf8 编码
```

##### 属性

```typescript
Buffer.kMaxLength; // 单个 Buffer 实例的最大字节数
Buffer.constants.MAX_LENGTH; // 同 Buffer.kMaxLength

Buffer.kStringMaxLength; // 单个 String 实例的最大字节数
Buffer.constants.MAX_STRING_LENGTH; // 同 Buffer.kStringMaxLength
```

##### 编码转换

```typescript
import { Buffer, transcode } from "Buffer";

// Buffer.transcode(source, fromEnc, toEnc)
// 转换 source 编码
const newBuf = transcode(Buffer.from("€"), "utf8", "ascii");
console.log(newBuf.toString("ascii")); // ?
```

## 最佳实践

### 二进制数据格式的转换

##### File 和 Blob

```typescript
// file 转 blob
const blob = new Blob([fs.createReadStream(file.path)]);
// blob 转 file
const file = new File([blob], "hello.txt", {
  type: "text/plain",
});
```

##### Blob 和 Buffer

```typescript
// blob 转 buffer
const blob = new Blob(["hello world"], { type: "text/plain" });
blob.arrayBuffer().then((arrayBuffer) => {
  const buffer = Buffer.from(arrayBuffer);
});

// buffer 转 blob
const buffer = Buffer.from("hello world");
const json = buffer.toJSON();
const blob = new Blob([JSON.stringify(json)], { type: "text/plain" });
```

##### String 和 Buffer

```typescript
const buffer = Buffer.from("hello world");
const str = buffer.toString();
```
