
# Canvas基本绘图API

## 获取绘制上下文

```js
// cvs为canvas元素
const ctx = cvs.getContext(contextType);
// 之后使用上下文对象ctx完成后续绘图
```

> - 所有的绘图都必须在上下文中完成；
> - 同一个canvas只能产生唯一的上下文；
> - 上下文类型（contextType）是一个指示使用何种上下文的 `DOMString` 可能的值是：
>> 1. `"2d"`建立一个 [`CanvasRenderingContext2D`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 二维渲染上下文；
>> 2. `"webgl"` (或"experimental-webgl") 这将创建一个 [`WebGLRenderingContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext) 三维渲染上下文对象。只在实现WebGL 版本 1(OpenGL ES 2.0) 的浏览器上可用；
>> 3. `"webgl2"` (或 "experimental-webgl2") 这将创建一个 [`WebGL2RenderingContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL2RenderingContext) 三维渲染上下文对象。只在实现 WebGL 版本 2 (OpenGL ES 3.0) 的浏览器上可用；实验性。
>> 4. `"bitmaprenderer"`这将创建一个只提供将 canvas 内容替换为指定 ImageBitmap 功能的 ImageBitmapRenderingContext 。

## Context2D 绘制

通过 `cvs.getContext('2d')` ，会产生一个 `CanvasRenderingContext2D` 对象，它里面包含非常多的绘图方法。
利用这些绘图方法，我们可以完成下列图形的绘制：
1. 直线（有简易版的矩形API）；
2. 椭圆（有简易版的椭圆API）；
3. 文字；
4. 图片。

利用上面的基本形状以及它们的组合，再配合它提供的各种...就可以完成任意二维图像的绘制。
