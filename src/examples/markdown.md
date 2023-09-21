# Markdown扩展示例

本页展示了 `VitePress` 提供的一些内置扩展。

## 语法高亮显示

`VitePress` 的语法高亮由 [Shiki](https://github.com/shikijs/shiki) 提供，具有线条突出显示等附加功能：

Input

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    - }
  }
}
```

Output

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## 自定义容器

Input

[]todo
[]todo
  
```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

Output

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## 更多

查看文档 [Markdown完整扩展](https://vitepress.dev/guide/markdown).
