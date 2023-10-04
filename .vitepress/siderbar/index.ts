import { DefaultTheme } from "vitepress";

/** 基础知识 */
export const codePointSidebar = (): DefaultTheme.SidebarItem[] => {
  return [
    {
      text: "HTML",
      collapsed: false,
      items: [
        { text: "页面与结构", link: "01html/01document" },
        { text: "文本与链接", link: "01html/02text-link" },
        { text: "表单与多媒体", link: "01html/03form-media" }
      ]
    },
    {
      text: "CSS",
      collapsed: false,
      items: [
        { text: "阴影", link: "02css/01shadow" },
        { text: "渐变", link: "02css/02gradients" },
        { text: "过渡", link: "02css/03transforms" },
        { text: "动画", link: "02css/04animations" }
      ]
    },
    {
      text: "JavaScript",
      collapsed: false,
      items: [
        { text: "基础知识", link: "03js/01base" },
        { text: "函数", link: "03js/02function" }
      ]
    }
  ];
};

/** 前端技巧 */
export const trickSidebar = (): DefaultTheme.SidebarItem[] => {
  return [
    {
      text: "CSS",
      collapsed: false,
      items: [
        { text: "阴影", link: "02css/01shadow" },
        { text: "渐变", link: "02css/02gradients" },
        { text: "过渡", link: "02css/03transforms" },
        { text: "动画", link: "02css/04animations" }
      ]
    },
    {
      text: "JavaScript",
      collapsed: false,
      items: [
        {
          text: "Web Api",
          collapsed: false,
          items: [
            {
              text: "requestAnimationFrame",
              link: "02js/01requestAnimationFrame"
            }
          ]
        },
        { text: "文本与链接", link: "01html/02text-link" },
        { text: "表单与多媒体", link: "01html/03form-media" }
      ]
    },
    {
      text: "css & js",
      collapsed: false,
      items: [{ text: "高度自动的过渡", link: "03css-js/01height-atuo" }]
    }
  ];
};

/** 前端扩展 */
export const extendSidebar = (): DefaultTheme.SidebarItem[] => {
  return [
    {
      text: "HTML",
      collapsed: false,
      items: [
        { text: "页面与结构", link: "01html/01document" },
        { text: "文本与链接", link: "01html/02text-link" },
        { text: "表单与多媒体", link: "01html/03form-media" }
      ]
    },
    {
      text: "CSS",
      collapsed: false,
      items: [
        { text: "阴影", link: "02css/01shadow" },
        { text: "渐变", link: "02css/02gradients" },
        { text: "过渡", link: "02css/03transforms" },
        { text: "动画", link: "02css/04animations" }
      ]
    },
    {
      text: "JavaScript",
      collapsed: false,
      items: [
        { text: "页面与结构", link: "01html/01document" },
        { text: "文本与链接", link: "01html/02text-link" },
        { text: "表单与多媒体", link: "01html/03form-media" }
      ]
    }
  ];
};

/** 项目经验 */
export const projectSidebar = (): DefaultTheme.SidebarItem[] => {
  return [
    {
      text: "mini-webpack",
      collapsed: false,
      items: [{ text: "思路", link: "01webpack/01thinking" }]
    },
    {
      text: "mini-compiler",
      collapsed: false,
      items: [
        { text: "解析", link: "02compiler/01parser" },
        { text: "转换", link: "02compiler/02transform" },
        { text: "编译", link: "02compiler/03compiler" }
      ]
    },
    {
      text: "mini-vue",
      collapsed: false,
      items: [{ text: "core", link: "03vue/core" }]
    }
  ];
};
