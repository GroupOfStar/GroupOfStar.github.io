# 手写对象拷贝

## 深拷贝

1. 最简单的方法就是JSON.parse\(JSON.stringify\())

```js
function deepCopy(o) {
    return JSON.parse(JSON.stringify(o))
}
```

:::tip
需要注意的是：这种拷贝方法不可以拷贝一些特殊的属性（例如正则表达式，undefine，function）
:::

2. 用递归去复制所有层级属性

> 数组的map方法也算是

<<< ./deepClone.ts


## 浅拷贝

```js
object.assign(target,source)
```