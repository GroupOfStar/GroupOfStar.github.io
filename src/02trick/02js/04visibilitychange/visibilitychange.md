# Document：visibilitychange 事件

当其选项卡的内容变得可见或被隐藏时，会在 document 上触发 [`visibilitychange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilitychange_event) 事件。

:::warning
该事件不可取消。
:::

## 语法

在像`addEventListener()`的方法中使用事件名称，或设置事件处理器属性。

## 使用说明

该事件不包括文档的更新的可见性状态，但是你可以从文档的 `visibilityState` 属性中获取该信息。

当用户导航到新页面、切换标签页、关闭标签页、最小化或关闭浏览器，或者在移动设备上从浏览器切换到不同的应用程序时，该事件就会触发，其 `visibilityState` 为 `hidden`。过渡到 `hidden` 是页面能可靠观察到的最后一个事件，因此开发人员应将其视为用户会话的可能结束（例如，用于发送分析数据）。

向 `hidden` 过渡也是页面停止用户界面更新和停止用户不想在后台运行的任何任务的好时机。

## visibilityState

[`Document.visibilityState` ](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilityState)（只读属性）, 返回`document`的可见性，即当前可见元素的上下文环境。由此可以知道当前文档 (即为页面) 是在背后，或是不可见的隐藏的标签页，或者 (正在) 预渲染。可用的值如下：

- `'visible'` : 此时页面内容至少是部分可见。即此页面在前景标签页中，并且窗口没有最小化；
- `'hidden'` : 此时页面对用户不可见。即文档处于背景标签页或者窗口处于最小化状态，或者操作系统正处于 '锁屏状态'；
- `'prerender'` : 页面此时正在渲染中，因此是不可见的（considered hidden for purposes of document.hidden），文档只能从此状态开始，永远不能从其他值变。

为此状态。注意：浏览器支持是可选的。

当此属性的值改变时，会递交 `visibilitychange` 事件给`Document`。

典型用法是防止当页面正在渲染时加载资源，或者当页面在背景中或窗口最小化时禁止某些活动。

## 示例

### 在文档转向隐藏状态时暂停音乐

本示例在文档可见时开始播放音乐曲目，在文档不再可见时暂停音乐。

```js
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
});
```

### 在文档转向隐藏状态时发送会话结束分析报告

本示例将 hidden 转换视为用户会话的结束，并使用 Navigator.sendBeacon() API 发送相应的分析结果。

```js
document.onvisibilitychange = () => {
  if (document.visibilityState === "hidden") {
    navigator.sendBeacon("/log", analyticsData);
  }
};
```