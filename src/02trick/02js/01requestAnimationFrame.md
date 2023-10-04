# requestAnimationFrame

[`window.requestAnimationFrame()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame) 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

## 语法

```js
window.requestAnimationFrame(callback);
```

## 参数

callback：下一次重绘之前更新动画帧所调用的函数(即上面所说的回调函数)。该回调函数会被传入`DOMHighResTimeStamp`参数，该参数与`performance.now()`的返回值相同，它表示`requestAnimationFrame()`开始去执行回调函数的时刻。

## 返回值

一个 long 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。你可以传这个值给 [`window.cancelAnimationFrame()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame) 以取消回调函数。 

## 应用

<script setup>
import Animation from './animation.vue'
</script>

<Animation />

> 对应关键代码

<<< ./animation.vue#snippet

