# 课程表

给标签元素添加全局属性的`draggable`属性，就可以使用[HTML拖放操作API](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)进行拖动了。

> 主要使用的是以下事件：

1. [`dragstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragstart_event) 事件在用户开始拖动元素或被选择的文本时调用。
2. [`dragover`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragover_event) 事件在可拖动的元素或者被选择的文本被拖进一个有效的放置目标时（每几百毫秒）触发。
3. [`dragenter`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragenter_event) 事件在可拖动的元素或者被选择的文本进入一个有效的放置目标时触发。
4. [`drop`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drop_event) 事件在元素或文本选择被放置到有效的放置目标上时触发。为确保`drop`事件始终按预期触发，应当在处理 dragover 事件的代码部分始终包含`preventDefault()`调用。

<script setup>
import Demo01 from './demo01.vue'
</script>

## 原生js实现

<Demo01 />

> 对应代码

::: code-group

<<< ./demo01.vue#snippet01

<<< ./demo01.vue#snippet02

<<< ./demo01.vue#snippet03

:::