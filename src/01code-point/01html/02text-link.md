# 文本与链接

## 1. 文本相关

### 1.1 基本标签

|  标签  | 语义描述                                                                                            |
| :----: | :-------------------------------------------------------------------------------------------------- |
|  `p`   | `p`标签标记了一个段落内容                                                                           |
| `pre`  | `pre`原样显示文本内容包括空白、换行等                                                               |
|  `br`  | 在`html`中回车是忽略的，使用`br`标签可以实现换行效果                                                |
| `span` | `span`标签与`div`标签都是没有语义的，`span`常用于对某些文本特殊控制，但该文本又没有适合的语义标签。 |


### 1.2 描述文本

有以下描述文本

#### 1.2.1 `<small>`

`<small>` 标签用于设置描述、声明等文本。 

```html
<small> 半年付 </small>
```

<div class="escape-demo"><small> 半年付 </small></div>


#### 1.2.2 `<time>`

`<time>` 标签用于定义日期或时间，或者两者

```html
<time> 2019-07-26 </time>
```

<div class="escape-demo"><time> 2019-07-26 </time></div>


#### 1.2.3 `<abbr>`

`<abbr>` 用于描述一个缩写内容

```html
在WWW上，每一信息资源都有统一的且在网上唯一的地址，该地址就叫 <abbr title="Uniform Resource Locator">URL</abbr> 统一资源定位符。
```

<div class="escape-demo">在WWW上，每一信息资源都有统一的且在网上唯一的地址，该地址就叫 <abbr title="Uniform Resource Locator">URL</abbr> 统一资源定位符。</div>

#### 1.2.4 `<sub>`

`<sub>` 用于数字的下标内容 

```html
水的化学式为H<sub>2</sub>O
```

<div class="escape-demo">水的化学式为H<sub>2</sub>O</div>

#### 1.2.5 `<sup>`

`<sup>` 用于数字的上标内容

```html
请计算5<sup>2</sup>平方
```

<div class="escape-demo">请计算5<sup>2</sup>平方</div>

#### 1.2.6 `<del>`

`<del>` 标签表示删除的内容，`ins`一般与`del`标签配合使用描述更新与修正

```html
原价 <del>200元</del> 现价 <ins>100元</ins>
```

<div class="escape-demo">原价 <del>200元</del> 现价 <ins>100元</ins></div>

#### 1.2.7 `<s>`

`<s>` 标签显示效果与`del`相似，但语义用来定义那些不正确、不准确或没有用的文本

```html
<s>A 太阳是方的</s> <br>
B 地球是圆的
```

<div class="escape-demo">
  <s>A 太阳是方的</s> <br>
  B 地球是圆的
</div>

#### 1.2.8 `<code>`

`<code>` 用于显示代码块内容，一般需要代码格式化插件完成

```html
<span v-pre>{{ will be displayed as-is }}</span>
```

```
<span v-pre>{{ will be displayed as-is }}</span>
```

#### 1.2.9 `<progress>`

`<progress>` 用于表示完成任务的进度，当游览器不支持时显示内容

```html
<progress value="60" max="100">完成60%</progress>
```

<div class="escape-demo"><progress value="60" max="100">完成60%</progress></div>


### 1.3 强调文本

有以下强调文本

#### 1.3.1 `<strong>`

`<strong>` 标签和 `<em>` 一样，用于强调文本，但是它们的强调程度不同

```html
<strong>Chqx Playground</strong>是个人进行知识总结的<em>网站</em>
```

<div class="escape-demo"><strong>Chqx Playground</strong>是个人进行知识总结的<em>网站</em></div>

#### 1.3.2 `<mark>`

`<mark>` 用于突出显示文本内容，类似我们生活中使用的马克笔

```html
请认真学习以下语言 <mark>PHP</mark>、<mark>JavaScript</mark>
```

<div class="escape-demo">请认真学习以下语言 <mark>PHP</mark>、<mark>JavaScript</mark></div>


### 1.4 引用标签

有以下强调文本

#### 1.4.1 `<cite>`

`<cite>` 标签通常表示它所包含的文本对某个参考文献的引用，或文章作者的名子。

```html
最新版资料已经在 <cite>Chqx Playground</cite> 编写完成
```

<div class="escape-demo">最新版资料已经在 <cite>Chqx Playground</cite> 编写完成</div>

#### 1.4.2 `<blockquote>`

`<blockquote>` 用来定义摘自另一个源的块引用

```html
下而是来自某一个大叔，对失败的认知
<blockquote cite="https://groupofstar.github.io">
	在坚持的人面前，失败终将被踏过。
</blockquote>
```

<div class="escape-demo">
  下而是来自某一个大叔，对失败的认知
  <blockquote cite="https://groupofstar.github.io">在坚持的人面前，失败终将被踏过。</blockquote>
</div>

#### 1.4.3 `<q>`

`<q>` 用于表示行内引用文本，在大部分浏览器中会加上引号

```html
最新项目 <q>mini-vue</q> 已经发布了
```

<div class="escape-demo">最新项目 <q>mini-vue</q> 已经发布了</div>


### 1.5 联系信息

有以下联系信息

#### 1.5.1 `<address>`

`<address>` 用于设置联系地址等信息，一般将 `address` 放在 `footer` 标签中。

```html
<address>
	感谢您提交建议到 2724620649@qq.com
</address>
```

<div class="escape-demo">
  <address>感谢您提交建议到 2724620649@qq.com</address>
</div>
