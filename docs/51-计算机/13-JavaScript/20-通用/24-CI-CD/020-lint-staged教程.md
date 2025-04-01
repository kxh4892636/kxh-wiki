# lint-staged 教程

## 基础

##### lint-staged

- 搭配 git hooks；
- 检查代码风格；

##### 安装

```bash
pnpm add --save-dev lint-staged
```

##### 配置

- package。json 配置；

```json
{
  "name": "ts_monorepo",
  "scripts": {
    "lint:check": "eslint package --max-warnings 0",
    "lint:fix": "eslint package --fix"
  },
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": ["eslint --fix", "eslint --max-warnings 0"]
  },
  "devDependencies": {
    "eslint": "^8.42.0",
    "husky": "^8.0.0",
    "lint-staged": "^13.2.2"
  }
}
```
