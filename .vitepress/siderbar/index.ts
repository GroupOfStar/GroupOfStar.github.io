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
        { text: "阴影", link: "01css/01shadow/shadow" },
        { text: "渐变", link: "01css/02gradients/gradients" },
        { text: "过渡", link: "01css/03transforms/transforms" },
        { text: "动画", link: "01css/04animations/animations" }
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
              link: "02js/01requestAnimationFrame/requestAnimationFrame"
            },
            {
              text: "requestIdleCallback",
              link: "02js/02requestIdleCallback/requestIdleCallback"
            }
          ]
        },
        {
          text: "TypeScript",
          collapsed: false,
          items: [
            {
              text: "从字段到函数的推导",
              link: "02js/11tsFieldFunction/tsFieldFunction"
            },
            {
              text: "使用infer封装通用类型工具",
              link: "02js/12tsInfer/tsInfer"
            },
            {
              text: "通过拆分获取类型推断",
              link: "02js/13splitorType/splitorType"
            },
            {
              text: "递归类型推断",
              link: "02js/14tsLoopType/tsLoopType"
            },
            {
              text: "前置不确定参数",
              link: "02js/15preUndefinedParams/preUndefinedParams"
            }
          ]
        },
        {
          text: "Canvans",
          collapsed: false,
          items: [
            {
              text: "简介",
              link: "02js/50canvasIntroduction/canvasIntroduction"
            },
            {
              text: "基本绘制",
              link: "02js/51canvasBaseDraw/canvasBaseDraw"
            },
            {
              text: "文字绘制",
              link: "02js/52canvasFontDraw/canvasFontDraw"
            },
            {
              text: "图片绘制",
              link: "02js/53canvasImgDraw/canvasImgDraw"
            }
          ]
        },
        {
          text: "SVG",
          collapsed: false,
          items: [
            {
              text: "SVG描边动画",
              link: "02js/70svg-animation/svg-animation"
            }
          ]
        },
        {
          text: "Drag",
          collapsed: false,
          items: [
            {
              text: "课程表",
              link: "02js/90drag-timetable/drag-timetable"
            }
          ]
        }
      ]
    },
    {
      text: "css & js",
      collapsed: false,
      items: [
        { text: "高度自动的过渡", link: "03css-js/01height-atuo/height-atuo" },
        {
          text: "class降级处理",
          link: "03css-js/02class-polyfill/class-polyfill"
        },
        {
          text: "跟随系统的主题切换",
          link: "03css-js/03theme-change/theme-change"
        },
        {
          text: "轮播图",
          link: "03css-js/04img-swiper/swiper"
        }
      ]
    }
  ];
};

/** 前端扩展 */
export const extendSidebar = (): DefaultTheme.SidebarItem[] => {
  return [
    {
      text: "TyepScript",
      collapsed: false,
      items: [
        { text: "基础指南", link: "01typescript/01tsBasicGuide" },
        { text: "最佳实践之React", link: "01typescript/02practice-react" }
      ]
    },
    {
      text: "工程搭建",
      collapsed: false,
      items: [{ text: "快速引导", link: "02builder/01fastboot.md" }]
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
      items: [
        { text: "简介", link: "03vue/01introduction" },
        { text: "@vue/reactivity", link: "03vue/02reactivity" },
        { text: "@vue/runtime-core", link: "03vue/03runtime-core" }
      ]
    }
  ];
};
