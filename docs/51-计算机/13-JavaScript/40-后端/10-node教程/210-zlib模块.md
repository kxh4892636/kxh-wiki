---
id: b904aa0b-65af-47db-9aff-12dcd65ada09
---

# zlib 模块

## gzip

##### 压缩

```typescript
import fs from "fs";
import zlib from "zlib";

// zlib.createGzip([options])
const gzip = zlib.createGzip();
const inFile = fs.createReadStream("./test.md");
const gzipFile = fs.createWriteStream("./test_gzip.gz");
pipeline(inFile, gzip, gzipFile, (err) => {
  if (err) {
    console.error("An error occurred:", err);
    process.exitCode = 1;
  }
});

// zlib.gzip(buffer[, options], callback)
zlib.gzip("test", (err, result) => {
  res.end(result.toString());
});
```

##### 解压

```typescript
import fs from "fs";
import zlib from "zlib";

// zlib.createGunzip([options])
const gunzip = zlib.createGunzip();
const gzipFile = fs.createReadStream("./test_gzip.gz");
const gunzipFile = fs.createWriteStream("./gzip.md");
pipeline(gzipFile, gunzip, gunzipFile, (err) => {
  if (err) {
    console.error("An error occurred:", err);
    process.exitCode = 1;
  }
});

// zlib.gunzip(buffer[, options], callback)
zlib.gunzip(gzipText, (err, result) => {
  res.end(result.toString());
});
```
