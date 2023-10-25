# 快速启动

> 我们选择搭建框架的技术栈一定要选最好最合适的技术，正所谓"货比三家不吃亏”，所以我们第一步就要“预研选型”

## 一、预研选型

### 1.1 选择构建库

[Vue.js](https://v3.cn.vuejs.org/)
[React 官方中文文档 – 用于构建用户界面的 JavaScript 库](https://zh-hans.reactjs.org/)

- React是库，Vue则是完整的框架
- 都能快速运行，都是轻量级前端框架
- 都有一个组件式系统架构
- 都使用virtual DOM
- 都可以放进一个HTML文件中或成为更复杂的Webpack设置模块
- 都有独立但通用的路由器和状态管理库
- 最大的不同在于，Vue通常使用HTML模板文件，而React完全是使用JavaScript库。Vue也有可变状态，以及用于重新呈现的自动化系统，这被称为反应性。

### 1.2 打包工具

有两款流行的打包工具，webpack 和 rollup，它们在没有安装任何 loader、plugin 的情况下，几乎都没有编译功能。转化 es6，webpack 要安装 babel loader，rollup 要 babel plugin；转化 ts，webpack 要 ts loader；rollup 要 ts plugin……
其他： PWA、grunt、snowpack

### 1.3 脚手架

1. React： [Create React App](https://github.com/facebook/create-react-app)
2. Vue:  [vite下一代的前端工具链](https://cn.vitejs.dev/)

其他：
[飞冰 - 基于 React 的研发解决方案](https://ice.work/)
[介绍 | Vue CLI](https://cli.vuejs.org/zh/guide/)

### 1.4 组件库

[Ant Design - 一套企业级 UI 设计语言和 React 组件库](https://ant.design/index-cn)   —React
[Ant Design Vue — An enterprise-class UI components based on Ant Design and Vue.js](https://antdv.com/docs/vue/introduce-cn)  —Vue
[Element - The world’s most popular Vue UI framework](https://element.eleme.cn/#/zh-CN)
[PC 官网 - 首页](https://fusion.design/)  -Fusion
[Bootstrap中文网](https://www.bootcss.com/)
[Amaze UI | 中国首个开源 HTML5 跨屏前端框架 | Amaze UI](http://amazeui.clouddeep.cn/1.x/)
[TDesign - 开源的企业级设计体系](https://tdesign.tencent.com/)
[Vant 3 - Lightweight Mobile UI Components built on Vue](https://vant-contrib.gitee.io/vant/#/zh-CN/home)

### 1.4 css预处理器

[Less 中文网](http://lesscss.cn/)
Sass
Stylus

### 1.5 其他 + 总结

接口请求： [axios中文网|axios API 中文文档](http://www.axios-js.com/)
时间库: [Moment.js 中文网](http://momentjs.cn/)  、 [Day.js中文网](https://dayjs.fenxianglu.cn/)
TypeScript的相关文档：
[💁‍♂️TypeScript之基础指南](https://yuque.antfin.com/cloud-platform/newbie/tu0ul4?view=doc_embed)
[💁‍♂️TypeScript最佳实践之React](https://yuque.antfin.com/cloud-platform/newbie/athxig?view=doc_embed)

:::info
根据多年的工作项目经验，最佳实践是
React： vite + react + antd + ts + less
Vue： vite + vue+ antd + ts + less
:::

## 二、最佳实践之React

### 2.1 使用Vite3脚手架

先找个地方建一个空目录，以项目名为`vite-react-demo01`的主工程为例

```bash
## npm 6.x
npm create vite@latest vite-react-demo01 --template react-ts

## npm 7+, extra double-dash is needed:
npm create vite@latest vite-react-demo01 -- --template react-ts

## 安装依赖
npm i
```

```tsx
// GitBash创建项目不可选的问题
// 用法：winpty + 驱动程序名.cmd + 创建命令 + 项目名。
winpty npm.cmd create vite@latest vite-react-demo01 -- --template react-ts
```

### 2.2 集成F2ELint

> [F2ELint](https://web.npm.alibaba-inc.com/package/f2elint?spm=a2o8t.11089562.0.0.52516654FYd7lC) 是[《阿里巴巴前端规约》](https://yuque.antfin-inc.com/f2e-guide/general/readme.md)的配套 Lint 工具，可以为项目一键接入规约、一键扫描和修复规约问题，保障项目的编码规范和代码质量。

团队开发个人觉得定义规范非常有必要！具体好处我不老生常谈，只提几个词：清晰、提示、少bug、维护、接手人不会骂你、有赞 👍

#### 2.2.1 安装

```bash
## 先全局安装
$ tnpm install f2elint -g

$ f2elint -V
2.2.1

## 一键接入
$ f2elint init
```

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/54556434/1648879114155-97de0231-dd08-4085-9d33-54e8b720ba05.png#clientId=u02ed0b15-0808-4&from=paste&id=u229148a0&originHeight=778&originWidth=1897&originalType=url&ratio=1&rotation=0&showTitle=false&size=386733&status=done&style=none&taskId=u5c4f7c67-e089-4a37-83fd-8cf5168f531&title=)

#### 2.2.2 配置

我选择了使用TypeScript + React，然后 [ESLint](https://eslint.org/)、[stylelint](https://stylelint.io/)、[commitlint](https://commitlint.js.org/#/)、[markdownlint](https://github.com/DavidAnson/markdownlint) 都开启了。
你也可以在项目根目录下修改 f2elint.config.js 配置文件的配置，重新 `f2elint init` 后控制开启；当然你也可以实现配置好后再 `f2elint init` 一样可以

```typescript
// f2elint.config.js
module.exports = {
  enableStylelint: true,
  enableMarkdownlint: true,
  enablePrettier: true,
};
```

#### 2.2.3 使用

`f2elint scan`：一键扫描
`f2elint fix`：一键修复
...
更多见手册[《F2ELint》](https://web.npm.alibaba-inc.com/package/f2elint)

### 2.3 安装Antd

Antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。

#### 2.3.1 安装

```bash
npm install antd --save
```

#### 2.3.2 依赖

- `Antd` 在处理日期时间相关组件逻辑时，使用了 moment 库，且将 moment 作为 peerDependencies，需要用户手动提前安装或引入。

#### 2.3.3 引入

```typescript
import { DatePicker } from 'antd';

ReactDOM.render(<DatePicker />, mountNode);
```

```tsx
// ./main.ts

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
// 引入样式
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
```

## 三、最佳实践之Vue

### 3.1 使用Vite3脚手架

```bash
## npm 6.x
npm create vite@latest vite-react-demo01 --template vue-ts

## npm 7+, extra double-dash is needed:
npm create vite@latest vite-react-demo01 -- --template vue-ts

## 安装依赖
npm i
```

### 3.2 加入plugin提供jsx的支持

[@vitejs/plugin-vue-jsx](https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx)[¶](https://cn.vitejs.dev/plugins/#vitejsplugin-vue-jsx)
提供 Vue 3 JSX 支持（通过 [专用的 Babel 转换插件](https://github.com/vuejs/jsx-next)）。

### 3.3 集成F2ELint

同上

### 3.4 安装Antd

[Ant Design Vue — An enterprise-class UI components based on Ant Design and Vue.js](https://antdv.com/docs/vue/introduce-cn)

## 四、其他

demo代码仓: [https://code.alibaba-inc.com/banma-playground/vite-react-ts-good-code](https://code.alibaba-inc.com/banma-playground/vite-react-ts-good-code)
