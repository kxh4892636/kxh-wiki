---
id: fe7c5a86-959e-43e1-85f2-d70595dee6fb
---

# better-sqlite 教程

## 基础

##### 安装

```typescript
pnpm add better-sqlite3
pnpm add --save-dev @types/better-sqlite3
```

## 基本使用

##### 连接数据库

```typescript
import Database from "better-sqlite3";
const db = new Database("foobar.db", options);
db.pragma("journal_mode = WAL");
```

#### 拼接 sql

```typescript
// 直接执行
const createIndex = `
    CREATE UNIQUE INDEX tile_index on tiles(zoom,col,row)
  `;
db.exec(createIndex);

// 拼接 sql 并直接执行
const insertRecord = db.prepare(
  "INSERT INTO tiles (zoom, col,row,data) VALUES (?, ?,?,?)"
);
insertRecord.run(tileMatrix, col, row, data);

// 拼接 sql 并返回第一个结果
const stmt = db.prepare("SELECT age FROM cats WHERE name = ?");
const cat = stmt.get("Joey");

// 拼接 sql 并返回所有结果
const stmt = db.prepare("SELECT * FROM cats WHERE name = ?");
const cats = stmt.all("Joey");
```
