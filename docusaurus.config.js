// @ts-check

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "KXH-WIKI",
  tagline: "学无止境",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://your-docusaurus-test-site.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "kxh4892636", // Usually your GitHub org/user name.
  projectName: "kxh-wiki", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/kxh4892636/kxh-wiki/",
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl: "https://github.com/kxh4892636/kxh-wiki/",
        //   remarkPlugins: [math],
        //   rehypePlugins: [katex],
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: "/katex/katex.css",
      type: "text/css",
    },
  ],

  // ... Your other configurations.
  themes: [
    // ... Your other themes.
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ["en", "zh"],
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
            to: "/docs/读书笔记/毛泽东选集/05dc24c8-806f-40d6-b3d6-dda562cf8908",
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
            to: "/docs/计算机/c教程/ec0bc295-4c4f-4cd8-beaa-eac6de089eef",
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["powershell", "bash", "python", "typescript"],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },
    }),
};

module.exports = config;
