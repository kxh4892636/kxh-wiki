# shadcn

## 基础

### 环境配置

##### tailwindcss

= [[020_tailwindcss]];

##### typescript

- 配置 alias;

```typescript
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

##### vite

- 配置 alias;

```typescript
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

##### 安装

```bash
pnpm dlx shadcn-ui@latest init
```

##### components.json

- 配置 shadcn 配置文件;

```bash
Would you like to use TypeScript (recommended)? no / yes
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › src/index.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Are you using React Server Components? › no / yes (no)
```

##### 基础使用

```bash
pnpm dlx shadcn-ui@latest add button
```
