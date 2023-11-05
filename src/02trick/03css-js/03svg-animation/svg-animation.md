# SVG描边动画

SVG描边动画

<script setup>
import Demo01 from './demo01.vue'
import Demo02 from './demo02.vue'
import Demo03 from './demo03.vue'
</script>

## 原理

1. `stroke-dasharray` 设置虚线的间隔;

2. `stroke-dashoffset` 设置元素的偏移量;

> 如果把的`stroke-dasharray`值设置成跟其元素本身的宽度一致，`stroke-dashoffset`也偏移同样的宽度，再对`stroke-dashoffset`加上动画就可以了呢

<Demo01 />

> 对应关键代码

<<< ./demo01.vue{12-15,18-21}

但是这里还有个问题：line元素宽度如果不确定，那么`stroke-dasharray`的值就没法设置了，这里就需要使用css变量+js来处理了。

## 完善

<Demo02 />

> 对应关键代码

<<< ./demo02.vue{9-20,26,29-31}

## 应用

<Demo03 />

> 对应关键代码

<<< ./demo03.vue{2-10}