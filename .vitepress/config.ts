import { defineConfig } from "vitepress";
import {
  codePointSidebar,
  trickSidebar,
  extendSidebar,
  projectSidebar
} from "./siderbar";

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
    outline: { level: [2, 4], label: "本页目录" },
    docFooter: {
      prev: "下一页",
      next: "上一页"
    },
    nav: [
      { text: "首页", link: "/" },
      {
        text: "基础知识",
        activeMatch: "/01code-point/",
        link: "/01code-point/01html/01document"
      },
      {
        text: "前端技巧",
        activeMatch: "/02trick/",
        link: "/02trick/03css-js/01height-atuo/height-atuo"
      },
      {
        text: "前端扩展",
        activeMatch: "/03extend/",
        link: "/03extend/01typescript/01tsBasicGuide"
      },
      {
        text: "仓库",
        activeMatch: "/04repositories/",
        link: "/04repositories/01webpack/01thinking"
      }
      // { text: "环境部署", link: "/", activeMatch: "/05deployment/" }
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present Chqx Playground"
    },
    sidebar: {
      "/01code-point/": { base: "/01code-point/", items: codePointSidebar() },
      "/02trick/": { base: "/02trick/", items: trickSidebar() },
      "/03extend/": { base: "/03extend/", items: extendSidebar() },
      "/04repositories/": { base: "/04repositories/", items: projectSidebar() }
    },
    // socialLinks: [
    //   { icon: "github", link: "https://github.com/GroupOfStar/github-io" }
    // ],
    sidebarMenuLabel: "返回顶部",
    externalLinkIcon: true
  },
  markdown: { lineNumbers: true }
});
