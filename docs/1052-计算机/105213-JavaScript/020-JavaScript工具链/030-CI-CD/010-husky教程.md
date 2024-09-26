# husky 教程

## 基础

##### husky

- git hook 工具;

##### 安装

```bash
pnpm dlx husky-init && pnpm install
```

## 配置

### Jest

```bash
npx husky add .husky/pre-commit  'pnpm -r test:coverage'
```

### lint-staged

```bash
npx husky add .husky/pre-commit  'npx lint-staged'
```

### commitlint

```bash
npx husky add .husky/commit-msg  'npx commitlint --edit ${1}'
```
