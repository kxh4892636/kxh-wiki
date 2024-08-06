import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const config: Config = {
  title: "KXH-WIKI",
  tagline: "学到老，活到老",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://wiki.kongxiaohan.cn",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "kxh4892636", // Usually your GitHub org/user name.
  projectName: "kxh-wiki", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs",
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/kxh4892636/kxh-wiki/",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  // stylesheets: [
  //   {
  //     href: "/katex/katex.css",
  //     type: "text/css",
  //   },
  // ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "KXH-WIKI",
      items: [
        {
          to: "/docs/方法论/0d286b10-e13d-4b61-bbfd-535a59f3eed5",
          label: "方法论",
          position: "right",
        },
        {
          to: "/docs/读书笔记/政治/毛泽东选集/05dc24c8-806f-40d6-b3d6-dda562cf8908",
          label: "读书笔记",
          position: "right",
        },
        {
          to: "/docs/数学/线性代数/d74ca4aa-a44c-4aa0-bd53-4e9da59060e5",
          label: "数学",
          position: "right",
        },
        {
          to: "/docs/英语/方法论/如何学习英语",
          label: "英语",
          position: "right",
        },
        {
          to: "/docs/计算机/c/3480920b-bb5b-41ef-aa77-3f9d81ec9e97",
          label: "计算机",
          position: "right",
        },
        {
          to: "/docs/gis/地理信息原理/3971f3e7-2a24-42b7-beb8-fe991dde431e",
          label: "gis",
          position: "right",
        },
        {
          to: "/docs/工具链/anki",
          label: "工具链",
          position: "right",
        },
        {
          href: "https://github.com/kxh4892636/kxh-wiki/",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["powershell", "bash", "python", "typescript"],
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
        hideable: true,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
