import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Chqx Playground",
  lang: "zh-cn",
  description: "A VitePress Site",
  srcDir: "src",
  outDir: "./dist",
  head: [["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }]],
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: "Chqx Playground",
    logo: "/logo.svg",
    lastUpdatedText: "最后更新",
    outline: { level: [2, 3], label: "本页目录" },
    docFooter: {
      prev: "下一页",
      next: "上一页"
    },
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Examples",
        link: "/examples/markdown",
        activeMatch: "/examples/"
      }
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present Chqx Playground"
    },
    sidebar: [
      {
        text: "Examples",
        collapsed: true,
        items: [
          { text: "Markdown", link: "/examples/markdown" },
          { text: "Runtime API", link: "/examples/runtime-api" }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/GroupOfStar/github-io" }
    ],
    sidebarMenuLabel: "返回顶部",
    externalLinkIcon: true
  }
});
