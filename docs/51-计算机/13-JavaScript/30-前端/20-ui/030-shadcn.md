# shadcn

## 基础

### 安装

##### tailwindcss

- [tailwindcss](./020-tailwindcss.md);

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
√ Would you like to use TypeScript (recommended)? ... no / yes
√ Which style would you like to use? » Default
√ Which color would you like to use as base color? » Slate
√ Where is your global CSS file? ... src/index.css
√ Would you like to use CSS variables for colors? ... no / yes
√ Are you using a custom tailwind prefix eg. tw-? (Leave blank if not) ...
√ Where is your tailwind.config.js located? ... tailwind.config.js
√ Configure the import alias for components: ... @/component
√ Configure the import alias for utils: ... @/util/shadcn.util
√ Are you using React Server Components? ... no / yes
√ Write configuration to components.json. Proceed? ... yes
```

##### 基础使用

```bash
pnpm dlx shadcn-ui@latest add button
```
