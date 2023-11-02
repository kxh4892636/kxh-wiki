---
id: 9328cf26-c4cb-4020-b26b-bbede593f89c
---

# pino 教程

##### 安装

```bash
pnpm add pino
```

##### 基础使用

```typescript
import pino from "pino";

const logger = pino();
logger.info("hello world");
logger.error("this is at error level");
logger.trace("this is a trace statement");
logger.debug('this is a "debug" statement with "');
logger.warn('this is a "warn" statement with "');
logger.fatal('this is a "fatal" statement with "');
```

##### 输出详解

- pino.info 为例, 其他以此类推;

```typescript
// logger.info([mergingObject], [message], [...interpolationValues]);
// 仅存在 string 为 message
logger.info("hello world");
logger.info(new Error("test"));
logger.info({ err: new Error("test"), otherkey: 123 }, "some text");
```

##### 输出本地文件

- 使用 pino.destination() 设置输出路径;

```typescript
import pino from "pino";

let dest = pino.destination("./log/log.txt");

export const logger = pino(dest);
```

##### 输出到不同文件

```typescript
import pino from "pino";

interface LogFn {
  <T extends object>(obj: T, msg?: string, ...args: unknown[]): void;
  (obj: unknown, msg?: string, ...args: unknown[]): void;
  (msg: string, ...args: unknown[]): void;
}

const pinoInfo = pino(pino.destination("./log/log_info.txt"));
const pinoError = pino(pino.destination("./log/log_error.txt"));
const pinoTrace = pino(pino.destination("./log/log_trace.txt"));
const pinoDebug = pino(pino.destination("./log/log_debug.txt"));
const pinoWarn = pino(pino.destination("./log/log_warn.txt"));
const pinoFatal = pino(pino.destination("./log/log_fatal.txt"));

export const logger = {
  info: ((...args: unknown[]) => {
    pinoInfo.info(args);
  }) as LogFn,
  error: ((...args: unknown[]) => {
    pinoError.error(args);
  }) as LogFn,
  trace: ((...args: unknown[]) => {
    pinoTrace.trace(args);
  }) as LogFn,
  debug: ((...args: unknown[]) => {
    pinoDebug.debug(args);
  }) as LogFn,
  warn: ((...args: unknown[]) => {
    pinoWarn.warn(args);
  }) as LogFn,
  fatal: ((...args: unknown[]) => {
    pinoFatal.info(args);
  }) as LogFn,
};
```
