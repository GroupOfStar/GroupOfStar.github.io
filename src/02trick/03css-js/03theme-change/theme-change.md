# 主题切换

跟随系统的主题切换

## 知识点

1. [`prefers-color-scheme`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme): CSS 媒体特性用于检测用户是否有将系统的主题色设置为亮色或者暗色。

2. [`window.matchMedia()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia): 方法返回一个新的 MediaQueryList 对象，表示指定的媒体查询 (en-US)字符串解析后的结果。返回的 MediaQueryList 可被用于判定 Document 是否匹配媒体查询，或者监控一个 document 来判定它匹配了或者停止匹配了此媒体查询。

```css
@media (prefers-color-scheme: dark) { }

@media (prefers-color-scheme: light) { }
```


## 示例

::: code-group

<<< ./useTheme.ts{9-13,17-21,23}

<<< ./theme.css

:::