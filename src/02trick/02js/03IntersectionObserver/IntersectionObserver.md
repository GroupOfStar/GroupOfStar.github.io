# IntersectionObserver

`IntersectionObserver` 接口（从属于 [`Intersection Observer API`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)）提供了一种异步观察目标元素与其祖先元素或顶级文档视口（viewport）交叉状态的方法。其祖先元素或视口被称为根（root）。

当一个 `IntersectionObserver` 对象被创建时，其被配置为监听根中一段给定比例的可见区域。一旦 `IntersectionObserver` 被创建，则无法更改其配置，所以一个给定的观察者对象只能用来监听可见区域的特定变化值；然而，你可以在同一个观察者对象中配置监听多个目标元素。

## 构造函数

`IntersectionObserver()`

创建一个新的 IntersectionObserver 对象，当其监听到目标元素的可见部分（的比例）超过了一个或多个阈值（threshold）时，会执行指定的回调函数。

## 实例属性

`IntersectionObserver.root` 只读

测试交叉时，用作边界盒的元素或文档。如果构造函数未传入 `root` 或其值为`null`，则默认使用顶级文档的视口。

`IntersectionObserver.rootMargin` 只读

计算交叉时添加到根边界盒 (en-US)的矩形偏移量，可以有效的缩小或扩大根的判定范围从而满足计算需要。此属性返回的值可能与调用构造函数时指定的值不同，因此可能需要更改该值，以匹配内部要求。所有的偏移量均可用**像素（px）** 或**百分比（%）** 来表达，默认值为“0px 0px 0px 0px”。

`IntersectionObserver.thresholds (en-US)` 只读

一个包含阈值的列表，按升序排列，列表中的每个阈值都是监听对象的交叉区域与边界区域的比率。当监听对象的任何阈值被越过时，都会生成一个通知（Notification）。如果构造器未传入值，则默认值为 0。


## 实例方法

`IntersectionObserver.disconnect()`

使 `IntersectionObserver` 对象停止监听目标。

`IntersectionObserver.observe()`

使 `IntersectionObserver` 开始监听一个目标元素。

`IntersectionObserver.takeRecords()`

返回所有观察目标的 `IntersectionObserverEntry` 对象数组。

`IntersectionObserver.unobserve()`

使 `IntersectionObserver` 停止监听特定目标元素。

## 示例

```js
const intersectionObserver = new IntersectionObserver((entries) => {
  // 如果 intersectionRatio 为 0，则目标在视野外，
  // 我们不需要做任何事情。
  if (entries[0].intersectionRatio <= 0) return;

  loadItems(10);
  console.log("Loaded new items");
});
// 开始监听
intersectionObserver.observe(document.querySelector(".scrollerFooter"));
```

## 应用

TODO

<!-- <script setup>
import PreformChunk from './PreformChunk.vue'
</script>

<PreformChunk />

> 对应关键代码

<<< ./PreformChunk.vue#snippet{35-39,41-46,51,58-102} -->
