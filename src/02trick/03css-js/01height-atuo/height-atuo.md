# 如何实现高度自动的过渡

也许会想到 hover 前设置弹窗的高度为 0px , 移入后再把高度设为 auto 再加上过渡效果 transition 就可以实现了
事实上这是不行的，因为过渡效果必须是一个量化的值，不能是auto

## <s>方案一: max-height</s>

使用 max-height，开始设为 0px , 移入后设置个稍微大一点的值，比如 1000px ，事实上这会有两个弊端：
1. 最大值设置为多少合适呢？多少都不合适；
2. 在动画开始和结束的时间不一致，试试看吧。

<script setup>
import HeightAuto01 from './HeightAuto01.vue'
import HeightAuto02 from './HeightAuto02.vue'
import HeightAuto03 from './HeightAuto03.vue'
import HeightAuto04 from './HeightAuto04.vue'
</script>

<HeightAuto01 />

> 对应关键代码

<<< ./HeightAuto01.vue#snippet{6,11,12}


## 方案二: scaleY

唯一不好就是内容被压缩了，如果设计师说这种效果更喜欢，那么这样就可以了。
试试看吧

<HeightAuto02 />

> 对应关键代码

<<< ./HeightAuto02.vue#snippet{6,11-13}

::: tip
如果非要是下滑的效果呢
:::

## 方案三: dispaly:grid

很遗憾的是这种动画在Safari浏览器里不支持

<HeightAuto03 />

> 对应关键代码

<<< ./HeightAuto03.vue#snippet{6,11-13}


## 最终js方案

是采用 `Flip` 库的现实思想

<HeightAuto04 />

> 对应关键代码

<<< ./HeightAuto04.vue#tmp

<<< ./HeightAuto04.vue#js{9-16,24 ts}

<<< ./HeightAuto04.vue#css{14-15 less}