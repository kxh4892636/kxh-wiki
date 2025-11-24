import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
	title: "KXH-WIKI",
	tagline: "学到老，活到老",
	favicon: "img/avatar.png",

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
				// blog: {
				//   showReadingTime: true,
				//   feedOptions: {
				//     type: ["rss", "atom"],
				//     xslt: true,
				//   },
				//   // Please change this to your repo.
				//   // Remove this to remove the "edit this page" links.
				//   editUrl:
				//     "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
				//   // Useful options to enforce blogging best practices
				//   onInlineTags: "warn",
				//   onInlineAuthors: "warn",
				//   onUntruncatedBlogPosts: "warn",
				// },
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],

	// search plugin
	themes: [
		[
			"@easyops-cn/docusaurus-search-local",
			/** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
			{
				hashed: true,
				language: ["en", "zh"],
				highlightSearchTermsOnTargetPage: true,
				explicitSearchResultPath: true,
			},
		],
	],

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
			logo: {
				alt: "KXH-WIKI",
				src: "img/avatar.png",
			},
			items: [
				{
					to: "/docs/",
					label: "📗Wiki",
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
		},
		docs: {
			sidebar: {
				autoCollapseCategories: true,
				hideable: true,
			},
		},
	} satisfies Preset.ThemeConfig,

	future: {
		experimental_faster: true,
	},
};

export default config;
