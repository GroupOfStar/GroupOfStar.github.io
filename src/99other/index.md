# 前端面试题

## 一、关于HTML

### img标签的title和alt属性有什么区别？

- alt：图片加载失败时，显示在网页上的替代文字，必需属性（但属性值可为空）；
- title：鼠标（手机端该属性无意义）放在图片上时显示的文字，非必需属性。

### 图片懒加载的原理？

#### 懒加载思路及实现

实现懒加载有四个步骤，如下

1. 加载loading图片；
2. 判断哪些图片要加载【重点】；
3. 隐形加载图片；
4. 替换真图片。

#### 懒加载原理

一张图片就是一个`<img>`标签，浏览器是否发起请求图片是根据`<img>`的src属性，所以实现懒加载的关键就是，在图片没有进入可视区域时，先不给`<img>`的src赋值，这样浏览器就不会发送请求了，等到图片进入可视区域再给src赋值。

图片懒加载的原理就是我们先设置图片的`data-src`属性（当然也可以是其他任意的，只要不会发送 http 请求就行了，作用就是为了存取值）值为其图片路径，由于不是 src，所以不会发送 http 请求。 然后我们计算出页面 scrollTop 的高度和浏览器的高度之和， 如果图片举例页面顶端的坐标 Y（相对于整个页面，而不是浏览器窗口）小于前两者之和，就说明图片就要显示出来了（合适的时机，当然也可以是 其他情况），这时候我们再将`data-src`属性替换为 src 属性即可。

```js
// onload是等所有的资源文件加载完毕以后再绑定事件
window.onload = function(){
    // 获取图片列表，即img标签列表
    var imgs = document.querySelectorAll('img');

    // 获取到浏览器顶部的距离
    function getTop(e){
        return e.offsetTop;
    }

    // 懒加载实现
    function lazyload(imgs){
        // 可视区域高度
        var h = window.innerHeight;
        //滚动区域高度
        var s = document.documentElement.scrollTop || document.body.scrollTop;
        for(var i=0;i<imgs.length;i++){
            //图片距离顶部的距离大于可视区域和滚动区域之和时懒加载
            if ((h+s)>getTop(imgs[i])) {
                // 真实情况是页面开始有2秒空白，所以使用setTimeout定时2s
                (function(i){
                    setTimeout(function(){
                        // 不加立即执行函数i会等于9
                        // 隐形加载图片或其他资源，
                        // 创建一个临时图片，这个图片在内存中不会到页面上去。实现隐形加载
                        var temp = new Image();
                        temp.src = imgs[i].getAttribute('data-src');//只会请求一次
                        // onload判断图片加载完毕，真是图片加载完毕，再赋值给dom节点
                        temp.onload = function(){
                            // 获取自定义属性data-src，用真图片替换假图片
                            imgs[i].src = imgs[i].getAttribute('data-src')
                        }
                    },2000)
                })(i)
            }
        }
    }
    lazyload(imgs);

    // 滚屏函数
    window.onscroll =function(){
        lazyload(imgs);
    }
}
```

### H5和H4有什么不同？

H5新特性有：
- 用于媒体回放的video和audio元素
- 对本地离线存储的更好的支持
- 新的特殊内容元素，如article、aside、audio、video、footer、header、nav、section

简单地说，它更标准、更可读性、更好的性能和更方便的执行。

### 块级元素、行内元素分别有哪些？

- 块级元素：div , p , form, ul, li , ol, dl, address, fieldset, hr, menu, table
- 行内元素：span, strong, em, br, img , input, label, select, textarea, cite

### svg和canvas的区别？

**svg**: 表示以XML格式定义图像的可伸缩矢量图形。

- 依赖分辨率
- 不支持事件处理
- 弱的文本渲染能力
- 能够以.png和.jpg格式保存结果图像
- 最适合图片密集型的游戏，其中的许多对象会被频繁重绘

**canvas**: 通过 JavaScript 来绘制 2D 图形。

- 不支持分辨率
- 支持事件处理
- 最适合带有大型渲染区域的应用程序（比如谷歌地图）
- 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
- 不适合游戏应用

### svg如何调整颜色

标签`fill`属性设置即可

## 二、关于CSS

### CSS3新的特性

- CSS3边框如border-radius，box-shadow等；
- CSS3背景如background-size，background-origin等；
- CSS3的2D、3D转换如transform等；
- CSS3动画如animation等。

### RGBA和透明度

是RGB颜色模型的一个扩展。本质上，在设置元素中添加了一个alpha通道，即一个表示除红色、绿色和蓝色三种颜色之外的透明度的通道。

### background属性

- background-image：设置元素的背景图像。
- background-origin：规定背景图片的定位区域。
- background-size ：规定背景图片的尺寸。
- background-repeat：设置是否及如何重复背景图像。

### word-wrap属性

word-wrap 属性允许长单词或 URL 地址换行到下一行。

```css
word-wrap: normal|break-word;
```

:::info
所有主流浏览器都支 `word-wrap`属性。
:::

### font-face属性

font-face属性：定义自己的字体

> 在新的 @font-face 规则中，您必须首先定义字体的名称（比如 myFirstFont），然后指向该字体文件。

### 元素居中的方式有哪些？

#### 水平居中

1. 行内元素水平居中
> - 利用 text-align: center 可以实现在块级元素内部的行内元素水平居中。此方法对inline、inline-block、inline-table和inline-flex元素水平居中都有效。 此外，如果块级元素内部包着也是一个块级元素，我们可以先将其由块级元素改变为行内块元素，再通过设置行内块元素居中以达到水平居中。

2. 块级元素的水平居中
> - 将该块级元素左右外边距margin-left和margin-right设置为auto。
> - 使用table+margin 先将子元素设置为块级表格来显示（类似），再将其设置水平居中。 display:table在表现上类似block元素，但是宽度为内容宽。
> - 使用absolute+transform 先将父元素设置为相对定位，再将子元素设置为绝对定位，向右移动子元素，移动距离为父容器的一半，最后通过向左移动子元素的一半宽度以达到水平居中。 不过transform属于css3内容，兼容性存在一定问题，高版本浏览器需要添加一些前缀。
> - 使用flex+justify-content 通过CSS3中的布局利器flex中的justify-content属性来达到水平居中。
> - 使用flex+margin 通过flex将父容器设置为为Flex布局，再设置子元素居中。

1. 多块级元素水平居中
> - 利用flex布局 利用弹性布局(flex)，实现水平居中，其中justify-content 用于设置弹性盒子元素在主轴（默认横轴）方向上的对齐方式，本例中设置子元素水平居中显示。
> - 利用inline-block 将要水平排列的块状元素设为display:inline-block，然后在父级元素上设置text-align:center，达到与上面的行内元素的水平居中一样的效果。

2. 浮动元素水平居中
> - 对于定宽的浮动元素，通过子元素设置relative + 负margin 对于不定宽的浮动元素，父子容器都用相对定位 通用方法(不管是定宽还是不定宽)：flex布局

#### 垂直居中

1. 多行内联元素垂直居中
> - 利用flex布局（flex） 利用flex布局实现垂直居中，其中flex-direction: column定义主轴方向为纵向。这种方式在较老的浏览器存在兼容性问题。
> - 利用表布局（table） 利用表布局的vertical-align: middle可以实现子元素的垂直居中。

2. 块级元素垂直居中
> - 使用absolute+负margin(已知高度宽度) 通过绝对定位元素距离顶部50%，并设置margin-top向上偏移元素高度的一半，就可以实现了。
> - 使用absolute+transform 当垂直居中的元素的高度和宽度未知时，可以借助CSS3中的transform属性向Y轴反向偏移50%的方法实现垂直居中。但是部分浏览器存在兼容性的问题。
> - 使用flex+align-items 通过设置flex布局中的属性align-items，使子元素垂直居中。
> - 使用table-cell+vertical-align 通过将父元素转化为一个表格单元格显示（类似 和 ），再通过设置 vertical-align属性，使表格单元格内容垂直居中。

#### 水平垂直居中

1. 绝对定位+CSS3(未知元素的高宽) 利用Css3的transform，可以轻松的在未知元素的高宽的情况下实现元素的垂直居中。 CSS3的transform固然好用，但在项目的实际运用中必须考虑兼容问题，大量的hack代码可能会导致得不偿失。 
2. flex布局 利用flex布局，其中justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式；而align-items属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。不能兼容低版本的IE浏览器。 
3. flex/grid与margin:auto(最简单写法) 容器元素设为 flex 布局或是grid布局，子元素只要写 margin: auto 即可,不能兼容低版本的IE浏览器。

### 自适应的方案？

#### viewport方案

配置默认根字号、默认字号、默认设计稿宽度，然后使用postcss插件将代码中的px自动转换成rem，这种方法可以完成使用1080p设计稿再不同手机下的适应方案，所有元素大小均按照1080p下的大小来定义px。配置上述插件后，px单位在编译后会默认转为rem单位，如果不需要被转换，可以将小写的px改成大写的PX或Px。取消使用viewport.js文件，如果遇到不能适配的公共组件，则拷贝一个新的版本，适配新的方案，逐步淘汰老版本。

```css
/* 引用该mixin，其中包含了默认的变量等 */
$default-font-size: 100;    // 默认根字号大小，用于换算vw单位
$baseFontSize: 100px;   // 默认字号大小，用于计算rem值
$pageWidth: 1080;       // 默认的设计稿宽度
@import '@oppobrowser/lib-browser-scss/src/mixins.scss';
```

```js
// 项目的vue.config.js中增加如下postcss配置
// 在css配置项中增加postcss配置，用于px转rem单位，后续合到master后就统一配置了
css: {
    loaderOptions: {
      sass: {
        data: '@import "@/common/scss/variables.scss";',
      },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            // 把px单位换算成rem单位
            rootValue: 100, // 换算的基数(设计图1080的根字体为100)
            selectorBlackList: [], // 忽略转换正则匹配项
            propList: ['*'],
          }),
        ],
      }
}
```

#### rem方案

针对Android4.4以下版本，全部使用rem单位兼容方案，并在head标签内添加脚本重写html根字号的大小，1080p下为100px。并且针对受影响的公共组件写出兼容性代码。

```js
<script type="text/javascript">
    (function(doc, win) {
        var basicWidth = 1080;
        var minWidth = 360;
        var htmlElement = doc.documentElement;
        var dpr = parseInt(window.devicePixelRatio || 1, 10);
        var recalc = function() {
            var clientWidth = htmlElement.clientWidth || (basicWidth / 2);
            window.rootFontSize = 100 * (clientWidth / basicWidth);
            clientWidth = clientWidth < minWidth? minWidth : clientWidth;
            htmlElement.style.fontSize = 100 * (clientWidth / basicWidth) + 'px';
            htmlElement.setAttribute("data-dpi", dpr);
        };
        recalc();
        if (!win.addEventListener) return;
        win.addEventListener('resize', recalc, false);
    })(document, window);
</script>
```

### 父容器高度塌陷的解决方案？

overflow: hidden

#### 利用伪元素

```css
div::after {
    display: block;    
    content: "";
    clear: both;
}
```

#### 添加一个div

```html
<style>
    .cf {
        clear: both;
    }
</style>
<div>
    .......
    .......
    <div class="cf"></div>
</div>
```

### 清除浮动的方法有哪些？

#### 额外标签法

给谁清除浮动，就在其后额外添加一个空白标签。
- 优点：通俗易懂，书写方便。（不推荐使用）
- 缺点：添加许多无意义的标签，结构化比较差。

:::info
给元素small清除浮动（在small后添加一个空白标签clear（类名可以随意），设置clear:both;即可）
:::

#### 父级添加overflow方法

可以通过触发BFC的方式，实现清楚浮动效果。 

- 优点：代码简洁（慎重使用，若该父盒子里还有position定位会引起麻烦）
- 缺点：内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素。

:::warning
别加错位置，是给父亲加（并不是所有的浮动都需要清除，谁影响布局，才清除谁。）
:::

#### 使用after伪元素清除浮动

after方式为空元素的升级版，好处是不用单独加标签了。
- 优点：符合闭合浮动思想，结构语义化正确
- 缺点：由于IE6-7不支持：after，使用zoom：1，触发hasLayout。

:::warning
是给父亲添加`clearfix`
:::

### 盒模型的差异？

css盒模型本质是一个盒子，它由边距、边框、填充和实际内容组成。盒模型能够让我们在其他元素和周边元素边框之间的空间放置元素。

标准盒与怪异盒的区别在于他们的总宽度的计算公式不一样。
> - 标准模式下总宽度=width+margin（左右）+padding（左右）+border（左右）；
> - 怪异模式下总宽度=width+margin（左右）（就是说width已经包含了padding和border值）。

标准模式下如果定义的DOCTYPE缺失，则在ie6、ie7、ie8下汇触发怪异模式。当设置为box-sizing:content-box时，将采用标准模式解析计算，也是默认模式；当设置为box-sizing:border-box时，将采用怪异模式解析计算。

### 什么是BFC？

BFC(Block formatting content),中文的翻译是：**块级格式化上下文** 。

可以把BFC理解为一种属性，一种类似于box-sizing的可以决定元素进行何种布局规则的属性（比如BFC规定上下margin需要重叠）。

> 比如开发中我们经常遇见的问题：

1. 上下margin坍塌或者说重叠, overflow: hiddent可以解决
2. float元素和普通元素重叠问题;
3. 内部节点float导致父节点高度塌陷, 清除浮动解决。

### less和sass的区别？

不管是Sass，还是Less，都可以视为一种基于CSS之上的高级语言，其目的是使得CSS开发更灵活和更强大，Sass的功能比Less强大,基本可以说是一种真正的编程语言了，Less则相对清晰明了,易于上手,对编译环境要求比较宽松。考虑到编译Sass要安装Ruby,而Ruby官网在国内访问不了,个人在实际开发中更倾向于选择Less。

## 三、关于JS、ES6
### es6兼容的浏览器版本

支持ie 11+

### var，let，const的比较？

- var声明变量存在变量提升，let和const不存在变量提升；
- let、const都是块级局部变量；
- 同一作用域下let和const不能声明同名变量，而var可以。

### 继承的方式有那几种？

1. 原型链继承: 父类的实例作为子类的原型;
2. 借用构造函数继承（伪造对象、经典继承）: 复制父类的实例属性给子类;
3. 实例继承（原型式继承）；
4. 组合式继承: 调用父类构造函数，继承父类的属性，通过将父类实例作为子类原型，实现函数复用；
5. 寄生组合继承: 通过寄生的方式来修复组合式继承的不足，完美的实现继承；
6. es6 extends继承: 代码量少，易懂。

### ES5继承和ES6继承的区别

es5继承首先是在子类中创建自己的this指向，最后将方法添加到this中
```js
Child.prototype=new Parent() || Parent.apply(this) || Parent.call(this)
```
es6继承是使用关键字先创建父类的实例对象this，最后在子类class中修改this

### 说说对原型和原型链的理解

#### 原型

每个函数都有一个属性prototype，它就是原型，默认情况下它是一个普通Object对象，这个对象是调用该构造函数所创建的实例的原型。

1. JavaScript所有的对象本质上都是通过new 函数创建的，包括对象字面量的形式定义对象(相当于new Object()的语法糖)。
2. 所有的函数本质上都是通过new Function创建的，包括Object、Array等 （隐式执行，是我们看不到的但在执行过程中发生过的）
3. 所有的函数都是对象。

#### 原型链

原型链的工作原理是：当访问一个对象的属性或方法时，如果查找不到，就会沿着__proto__去与对象关联的原型上查找，如果还查找不到，就去找原型的原型，直至查到最顶层，这也就是原型链的概念。

原型链是用来实现继承的一种机制

原型链有以下几个用处：
1. 实现继承：通过原型链，可以实现对象之间的继承，即子对象可以继承父对象的属性和方法；
2. 共享属性和方法：通过原型链，可以实现多个对象共享同一个原型对象，从而节省内存空间；
3. 扩展对象的功能：可以通过修改对象的原型对象来为对象添加新的属性和方法，从而扩展对象的功能。


![原型链](/__proto__.jfif "原型链示意图")

### 有哪些数据类型

基础数据类型有如下七种: String, Number, Boolean, Null, Undefined, Symbol, BigInt

对象数据类型: Object(包含Array, Function)

> `BigInt`是ES11引入的新的基本数据类型。BigInt数据类型的目的是比Number数据类型支持的范围更大的整数值，以任意精度表示整数。使用BigInt解决了之前Number整数溢出的问题。


### 判断数据类型的方式有哪些
1. typeof
2. instanceof
3. constructor
4. Object.prototype.toString.call()

### 闭包和作用域

1. 闭包是作用域应用的特殊场景。
2. js中常见的作用域包括全局作用域、函数作用域、块级作用域。要知道js中自由变量的查找是在函数定义的地方，向上级作用域查找，不是在执行的地方。 
3. 常见的闭包使用有两种场景：一种是函数作为参数被传递；一种是函数作为返回值被返回。这也就是**高阶函数**

### 箭头函数和普通函数有什么区别

1. 箭头函数不会创建自身的this，只会从上一级继承this，箭头函数的this在定义的时候就已经确认了，之后不会改变。
2. 同时箭头函数无法作为构造函数使用，没有自身的prototype，也没有arguments。

### 二叉树的遍历有几种方法？

- 先序
- 中序
- 后序
- 层序遍历

具体实现方法详见：[二叉树遍历的几种常见方法](https://blog.csdn.net/xxxxxxxx00772299/article/details/109318495/)

### 使用过的webpack插件

可参考常用的 [18个webpack插件总结](https://blog.csdn.net/weixin_43720095/article/details/107720200)

## 四、移动端问题

### 手势事件的应用

- 可以使用touchstart或者touchend事件，来代替click事件，用来触发移动端的点击事件。
- 可以使用touchmove事件代替scroll事件，来检测移动端的滑动事件。并且可以通过touchmove事件，来实施获取滚动条滚动的高度。

### 2X图3X图适配

实际程序开发当中，我们代码中用的值是指逻辑分辨率pt，而不是像素分辨率px，比如我们定义一个按钮的告诉为45，这个45指的是45pt而不是45px。在非Retina屏下1pt=1px，4和4.7Retina屏下1pt=2px，5.5和x下1pt=3px。我们制作不同尺寸的图片，比如@1x为22px，则@2x为44px，@3x为66px，命名分别为image.png，在项目的Assets.xcassets中新建New Image Set，修改名字为image，并把相应尺寸的图片拖放至相应位置。

```less
/* 根据dpr显示2x图/3x图 */
.bg-image(@url){
   background-image:~"url('@{url}@2x.png'";
   @media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
     background-image:~"url('@{url}@2x.png'";
   }
}

.bg-color(@color){
   background-color:@color;
}
```

### 图片在安卓上，有些设备模糊问题

这个问题是devicePixelRatio的不同导致的，因为手机分辨率太小，如果按照分辨率来显示网页，字会非常小，所以苹果系统当初酒把iphone4的960x640像素的分辨率在网页里改为480x320像素，这devicePixelRatio=2。而Android的devicePixelRatio比较乱，值有1.5、2和3.为了在手机里更为清晰地显示图片，必须使用2倍宽高的背景图来代替img标签（一般情况下都是用2倍）。

例如一个div的宽高是100PX x 100PX，背景图必须是200PX x 200PX，然后设置background-size：contain样式，显示出来的图片酒比较清晰了。

### 固定定位布局键盘挡住输入框内容

通过定时器实时监听是否触发input。如果触发input框，就把固定定位改为静态定位。这样就会把内容顶上去。

```js
function fixedWatch(el){
   if(document.activeElement.nodeName=='INPUT'){
     el.css('position','static')
   }else{
     el.css('position','fixed')
   }
}
setInterval(function(){
   fixedWatch($('.mian'))
},500)
```

### 移动端底部input被弹出的键盘遮挡

Element.srollIntoView():方法让当前的元素滚动到浏览器窗口的可视区域内。

```js
// 只要在input的点击事件或者获取焦点的事件中，加入这个api就好了
document.querySelector('#inputed').srollIntoView();
```

### click的300ms延迟问题和点击穿透问题

1. 方案一: 模拟的事件

300ms延迟导致用户体验不好。为了解决这个问题，一般在移动端用touchstart、touchend、touchmove、tap（模拟的事件）事件来取代click事件。

2. 方案二: FastClick

FastClick是FTLabs专门为解决移动端浏览器300ms点击延迟问题所开发的一个轻量级的库。FastClick的实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即触发膜牛一个click事件，并把浏览器在300ms之后的click事件阻止掉。

### 点击穿透问题

说完移动端点击300ms延迟的问题，还不得不提一下移动端点击穿透的问题。可能有人会想，既然click点击有300ms的延迟，那对于触摸屏，我们直接监听touchstart事件不就好了吗？

使用touchstart去代替click事件有两个不好的地方。

第一：touchstart是手指触摸屏幕就触发，有时候用户只是想滑动屏幕，却触发了touchstart事件，这不是我们想要的结果；

第二：使用touchstart事件在某些场景下可能会出现点击穿透的现象。

**什么是点击穿透？**

假如页面上有两个元素A和B。B元素在A元素之上。我们在B元素的touchstart事件上注册了一个回调函数，该回调函数的作用是隐藏B元素。我们发现，当我们点击B元素，B元素被隐藏了，随后，A元素触发了click元素。

这是因为在移动端浏览器，事件执行的顺序是touchstart>touchend>click。而click事件有300ms的延迟，当touchstart事件把B元素隐藏之后，隔了300ms，浏览器触发了click事件，但是此时B元素不见了，所以该事件被派发到A元素身上。如果A元素是一个链接，那此时页面就会意外地跳转。

### iphone及ipad下输入框默认内阴影

通过以下代码设置样式

```css
element{
  -webkit-appearance:none;
}
```

### 移动端-dpr浅析

> dpr = 物理像素 / css像素

在dpr=2；1px的css像素在设备中是2px的物理像素，这会导致在设备上看上去1px的边框是2px，解决方法：

1. 用transfrom：scale（）缩小dpr倍数
2. 在meta标签中设定scale缩小两倍


### 上下拉动滚动条时卡顿、慢

通过以下代码设置样式：

```css
body{
  -webkit-overflow-scrolling:touch;
   overflow-scrolling:touch;
}
```

### 长时间按住页面出现闪退

通过以下代码设置样式：

```css
element{
  -webkit-touch-callout:none;
}
```

### ios和android下触摸元素时出现半透明灰色遮罩

```css
element{
  -webkit-tap-highlight-color:rgba(255,255,255,0)
}
```

### active兼容处理，即伪类：active失效

移动端:  (active伪类无效的解决方法)[https://blog.csdn.net/diaobuwei1238/article/details/101716814]

### webkit mask兼容处理

(简单说CSS中的mask-好好利用mask-image)[https://segmentfault.com/a/1190000011838367]

### transiton闪屏

```css
/* 设置内连的元素在3D空间如何呈现：保留 */
3D-webkit-transform-style: preserve-3D;
/* 设置进行转换的元素的背面在对面用户时是否可见：隐藏 */
-webkit-backface-visibility: hidden;
```
### 如何解决android手机圆角失效问题？

通过background-clip：padding-box为失效的元素设置样式。

## 五、关于浏览器、HTTP

### 从浏览器地址输入URL到显示网页都发生了什么？

1. DNS解析，将域名地址解析为IP地址；
> 浏览器DNS缓存 => 系统DNS缓存 => 路由器DNS缓存 => 运营商DNS缓存。 再找不到就递归搜索该网址
2. 建立TCP连接（通过SYN标志的数据包来的）；
3. 浏览器向Web服务器发起Http请求；
> 建立TCP连接之后，发起HTTP请求，请求一般分为三部分: 
> - 请求方法URI协议/版本；
> - 请求头(Request Header)；
> - 请求正文。
4. 服务器端处理后将结果返回给浏览器客户端；
5. 关闭TCP链接: TCP的四次挥手；
6. 浏览器解析资源；
> - 对于获取到的HTML、CSS、JS、图片等等资源。
> - 浏览器通过解析HTML，生成DOM树，解析CSS，生成CSS规则树，然后通过DOM树和CSS规则树生成渲染树。渲染树与DOM树不同，渲染树中并没有head、display为none等不必显示的节点。
> - 在解析CSS的同时，可以继续加载解析HTML，但在解析执行JS脚本时，会停止解析后续HTML，这就会出现阻塞问题，关于JS阻塞相关问题，这里不过多阐述,后面会单独开篇讲解。

![浏览器解析资源示意图](/browser_parsing.webp '浏览器解析资源示意图')

7. 浏览器布局渲染。
> - 根据渲染树布局，计算CSS样式，即每个节点在页面中的大小和位置等几何信息。HTML默认是流式布局的，css和js会打破这种布局，改变DOM的外观样式以及大小和位置。这时就要提到两个重要概念：`reflow`（回流）和`repaint`（重绘）。
>> 1. reflow（回流）：意味着元件的几何尺寸变了，我们需要重新验证并计算渲染树。是渲染树的一部分或全部发生了变化。这就是`reflow`，或是`layout`。
>> 2. repaint（重绘）：屏幕的一部分重画，不影响整体布局，比如某个CSS的背景色变了，但元素的几何尺寸和位置不变。
> - 有些情况下，比如修改了元素的样式，浏览器并不会立刻`reflow`或`repaint`一次，而是会把这样的操作积攒一批，然后做一次`reflow`，这又叫异步`reflow`或增量异步 reflow。
> - 有些情况下，比如 resize 窗口，改变了页面默认的字体等。对于这些操作，浏览器会马上进行`reflow。`

### 浏览器的事件循环机制

首先要知道一件事，JavaScript是单线程的（指的是js引擎在执行代码的时候只有一个主线程，每次只能干一件事），同时还是非阻塞运行的（执行异步任务的时候，会先挂起相应任务，待异步返回结果再执行回调），这就要知道其事件的循环机制才能正确理解js代码的执行顺序。

在js代码执行时，会将对象存在堆（heap）中，在栈（stack）中存放一些基础类型变量和对象的指针。在执行方法时，会根据当前方法的执行上下文，来进行一个执行。对于普通函数就是正常的入栈出栈即可，涉及到异步任务的时候，js执行会将对应的任务放到事件队列中（微任务队列、宏任务队列）。

- 常见微任务：queueMicrotask、Promise、MutationObserve等。
- 常见宏任务：ajax、setTimeout、setInterval、script（js整体代码）、IO操作、UI交互、postMessage等。

故事件循环可以理解为是一个桥梁，连接着应用程序的js和系统调用之间的通道。其过程为：

1. 执行一个宏任务（一般为一段script），若没有可选的宏任务，就直接处理微任务；
2. 执行中遇到微任务，就将其添加到微任务的任务队列中；
3. 执行中遇到宏任务，就将其提交到宏任务队列中；
4. 执行完当前执行的宏任务后，去查询当前有无需要执行的微任务，有就执行；
5. 检查渲染，若需要渲染，浏览器执行渲染任务；
6. 渲染完毕后，Js线程会去执行下一个宏任务...（如此循环）。

```js
console.log("script start");

const promiseA = new Promise((resolve, reject) => {
  console.log("init promiseA");
  resolve("promiseA");
});

const promiseB = new Promise((resolve, reject) => {
  console.log("init promiseB");
  resolve("promiseB");
});

setTimeout(() => {
  console.log("setTimeout run");
  promiseB.then(res => {
    console.log("promiseB res :>> ", res);
  });
  console.log("setTimeout end");
}, 500);

promiseA.then(res => {
  console.log("promiseA res :>> ", res);
});

queueMicrotask(() => {
  console.log("queue Microtask run");
});

console.log("script end");

// script start
// init promiseA
// init promiseB
// script end
// promiseA res :>>  promiseA
// queue Microtask run
// setTimeout run
// setTimeout end
// promiseB res :>>  promiseB
```

### 如何避免和减少网页中的重绘和回流？

1. 尽量使用不会导致回流的样式：比如在一个display:none的元素上进行操作，可以避免引发回流和重绘；CSS3动画属性`transform`；
2. 避免设置多层内联样式：每一个内联样式都会导致浏览器重新渲染，样式合并到一个`class样式中`可以减少重绘和回流；
3. 在DOM树的末端改变class：在DOM树的末端改变class可以减少回流和重绘，因为这样可以限制回流的范围，使其影响尽可能少的节点；
4. 使用文档片段（DocumentFragment）：先在文档片段上做好所有DOM操作，然后再将其添加到文档中，这样可以减少DOM操作的次数，优化性能；
5. 使用虚拟DOM库：如React或Vue等，可以避免频繁的DOM操作，优化性能。

### 什么是跨域？

当一个请求url的协议、域名、端口三者之间任意一个与当前页面url不同即为跨域。解决方法：

1. jsonp方式；
2. 代理服务器的方式；
3. 服务端允许跨域访问(CORS)。

### 登录鉴权怎么处理？

1. HTTP Auth Authentication
2. Cookie + Session
3. JWT
4. OAuth

详情见：[前端需知道的常见登录鉴权方案](https://blog.csdn.net/xgangzai/article/details/109505843)

### 后端返回的错误码及含义？

| 状态代码 | 状态描述              | 说明                                                           |
| :------: | --------------------- | -------------------------------------------------------------- |
|   200    | OK                    | 客户端请求成功                                                 |
|   400    | Bad Request           | 客户端请求有语法错误，不能被服务器所理解                       |
|   401    | Unauthorized          | 请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用 |
|   403    | Forbidden             | 服务器收到请求，但是拒绝提供服务                               |
|   404    | Not Found             | 请求资源不存在，eg:输入了错误的URL                             |
|   500    | Internal Server Error | 服务器发生不可预期的错误                                       |
|   503    | Server Unavailable    | 服务器当前不能处理客户端的请求，一段时间后可能恢复正常         |

### 三次握手的过程？

在`TCP/IP`协议中，TCP协议提供可靠的连接服务，采用三次握手建立一个连接。

- 第一次握手：建立连接时，客户端发送syn包(syn=j)到服务器，并进入SYN_SEND状态，等待服务器确认； SYN：同步序列编号(Synchronize Sequence Numbers) 
- 第二次握手：服务器收到syn包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态；
- 第三次握手：客户端收到服务器的SYN＋ACK包，向服务器发送确认包ACK(ack=k+1)，此包发送完毕，客户端和服务器进入ESTABLISHED状态，完成三次握手。

完成三次握手，客户端与服务器开始传送数据

### 前端性能优化方案有哪些？

详情见：[前端性能优化方案都有哪些？](https://blog.csdn.net/Time_Flies_lei/article/details/116609835)

### 两个项目如何共享cookie？

详情见：[项目之间Cookie的共享？](https://blog.csdn.net/smq29661318/article/details/51025905)

### cookie,sessionStorage和localStorage的区别？

1. cookie是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）；
2. cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递；
3. sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存；
4. 存储大小
> - cookie数据大小不能超过4k；
> - sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。
5. 有期时间：
> - cookie: 设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭；
> - sessionStorage: 数据在当前浏览器窗口关闭后自动删除；
> - localStorage: 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据。

### 你用过的Web api有哪些？

1. `window.getSelection()` 在网页上选中的文本；
2. `element.requestFullscreen()` 某个元素进入全屏模式；
3. `navigator.clipboard` 剪贴板API,复制和粘贴文本
```js
// Copy text to clipboard
navigator.clipboard.writeText('Hello JavaScript!')
  .then(() => {
    console.log('Text copied to clipboard.');
  })
  .catch((error) => {
    console.error('Failed to copy text: ', error);
  });
// 读取剪贴板中的文本
const getText = await navigator.clipboard.readText();
```
4. `navigator.geolocation` 地理位置 API
5. `navigator.vibrate` 震动 AP
```js
// Vibrate device for 1000 milliseconds
navigator.vibrate(1000);
```
6. `navigator.connection` 网络监测
```js
navigator.connection.downlink;
```
7. `Web Speech` Web Speech API 可以让你将语音数据整合到网络应用中。Web Speech API 由两个部分组成： SpeechSynthesis （文本转语音）和 SpeechRecognition （异步语音识别）。
```js
// Speech Synthesis
const synth = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance("Hello World");
synth.speak(utterance);

// Speech Recognition
const SpeechRecognition =
  window.SpeechRecognition ?? window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.start();
recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
  console.log(speechToText);
};
```
8. `ResizeObserver` Resize Observer API 允许我们轻松观察元素的大小并处理其变化。当你拥有一个可调整大小的侧边栏时，它非常有用。
```js
const sidebar = document.querySelector(".sidebar");
const observer = new ResizeObserver((entries) => {
  const sidebar = entries[0];
  //Do something with the element's new dimensions
});
observer.observe(sidebar);
```
9. `Page Visibility` 页面可见性 API 允许我们检查页面对用户是否可见。当你想要暂停视频时，这非常有用。有两种方法来进行此检查：
```js
// Method 1
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    document.title = "Visible";
    return;
  }
  document.title = "Not Visible";
});

// Method 2
window.addEventListener("blur", () => {
  document.title = "Not Visible";
});
window.addEventListener("focus", () => {
  document.title = "Visible";
});
```

## 六、关于Vue

### Vue3和Vue2最大区别

Vue3最最最最最大的特性是Vue3有组合式API 可以解决复用逻辑的问题，因为它可以封装自定义Hook(Composition) <span style="color: red">(Hook是一个函数，mixin是一个对象，Hook就是拆分版的mixin，将导入操作交给开发者，能够清楚地溯源每个属性和方法)</span>

### 虚拟DOM和Diff算法的工作原理

Vue3中的虚拟DOM是一个类似于真实DOM结构的JavaScript对象。当数据发生变化时，Vue3会通过对比新旧虚拟DOM的差异，找出需要更新的部分，然后仅更新那些需要变化的部分，而不是直接操作真实的DOM。

Diff算法是用于比较新旧虚拟DOM树的算法。它会逐层对比两棵树的节点，找出差异，并生成一系列需要进行更新的操作。Diff算法通过一些优化策略，如同级比较、Key的使用等，来尽量减少更新的操作次数，提高性能。

### 响应式系统是如何工作的？

Vue3中的响应式系统使用Proxy对象来追踪数据的变化，当数据被访问时，Proxy会收集依赖关系，并在数据变化时触发更新。

### 响应式数据如何实现异步更新？请解释一下setup()函数中的异步处理

Vue3中的响应式数据可以通过reactive()函数或ref()函数进行定义。当响应式数据发生变化时，Vue3会将更新操作推迟到下一个事件循环中执行，以保证多个更新操作的批处理。

在setup()函数中，可以返回一个Promise对象来实现异步处理。当Promise对象解析时，组件会重新渲染，以反映最新的数据状态。

### Reactive和Ref有什么区别？

Reactive函数是Vue3中提供的一个全局函数，用于将一个对象转换为响应式对象。它接收一个普通对象作为参数，并返回一个响应式代理对象，可以通过该代理对象访问和修改原始对象的属性。

Ref是Vue3中提供的一个函数，用于创建一个包装器对象，将一个普通的JavaScript值转换为响应式对象。Ref对象可以通过.value属性访问和修改其包装的值。

### Composition API（Hooks）是什么？它与Options API有何不同？

Composition API是Vue3中引入的一种新的API风格，用于组织和重用组件逻辑。它与Options API相比，提供了更灵活和可组合的方式来编写组件逻辑。
Composition API使用函数式的API，将相关的逻辑组合在一起，而不是将逻辑分散在不同的选项中。

### Teleport和Suspense是什么，以及它们的作用。

`Teleport`是Vue3中引入的一个新组件，用于将组件的内容渲染到DOM树中的指定位置。它可以在组件的模板中指定一个目标，使得组件的内容可以被渲染到目标的位置，而不是直接渲染在组件所在的位置。

`Suspense`是Vue3中引入的另一个新组件，用于处理异步组件的加载过程。通过在Suspense组件中包裹异步组件，并提供一个fallback选项，可以在异步组件加载过程中展示一个占位符，直到异步组件加载完成后才显示真正的内容。

### 动态组件是什么？如何使用动态组件？

动态组件是指在运行时根据条件来动态选择渲染不同的组件。在Vue3中，可以使用元素和:is属性来实现动态组件的渲染。在模板中使用元素，并将要渲染的组件的名称或组件对象赋给:is属性。根据条件的变化，Vue3会动态地选择渲染不同的组件。

### 静态提升（Static Tree Hoisting）和Patch Flag的优化策略

静态提升是Vue3中的一项优化策略，用于减少渲染时的虚拟DOM节点创建和比较的开销。在编译过程中，Vue3会分析模板中的静态内容，并将其提升为一个单独的静态节点，减少对比的复杂性。 [详细见](https://cn.vuejs.org/guide/extras/rendering-mechanism.html#patch-flags)

`Patch Flag`是Vue3中的一种标记，用于标识虚拟DOM节点的属性和状态变化。通过在虚拟DOM节点上设置`Patch Flag`，Vue3可以跳过对比不必要的属性和状态，以提高性能。 个人理解只有在使用h函数创建虚拟DOM节点的场景下才会用得到。

### eventbus事件车兄弟组件传值原理

EventBus是消息传递的一种方式，基于一个消息中心，订阅和发布消息的模式，称为发布订阅者模式。

1. on('name', fn)订阅消息，name:订阅的消息名称， fn: 订阅的消息
2. emit('name', args)发布消息, name:发布的消息名称 ， args：发布的消息

> eventbus应用，详情见eventbus使用详情介绍

:::info
只不过在vue中已经替我们实现好了$emit,$on这些方法，所以直接用的时候去 new Vue()就可以了.
:::

### slot插槽类型

默认插槽、具名插槽、作用域插槽

### vue3.0为什么要用Proxy API替代defineProperty API？

响应式优化。

1. **defineProperty API的局限性最大原因是它只针对单例属性做监听。** vue2.x中的响应式实现是基于defineProperty中的descriptor，对data中的属性遍历+递归，为每个属性设置了getter、setter。这也就是为什么vue只能对data中预定义的属性做出响应的原因，在vue中使用下标的方式直接修改属性的值或者添加一个预先不存在的对象属性是无法做到settter监听的，这是defineProperty的局限性。
2. **Proxy API的监听是针对一个对象的，那么对这个对象的所有操作会进入监听操作，这就完全可以代理所有属性，将会带来很大的性能提升和更优的代码。** Proxy可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
3. **响应式是惰性的。** 在vue2.x中，对于一个深层属性嵌套的对象，要劫持它内部深层次的变化，就需要递归便利这个对象，**执行Object.defineProperty把每一层对象数据都变成响应式的，这无疑会有很大的性能消耗。** 在vue3.0中，使用Proxy API并不能监听到对象内部深层次的属性变化，因此它的处理方式是在getter中去递归响应式，这样的好处是**真正访问到的内部属性才会变成响应式，简单可以说是按需实现响应式，减少性能消耗。**

### vue3.0编译做了哪些优化？

1. **生成 Block tree。** vue2.x的数据更新并触发渲染的粒度是组件级的，单个组件内部需要遍历该组件的整个vnode数。在2.0里，渲染效率的快慢与组件大小成正相关。并且，对于一些静态节点，又无数据更新，这些遍历都是性能浪费。

vue3.0做到了通过编译阶段对静态模版的分析，编译生成了 Block tree。Block tree是一个将模版基于动态节点指令切割的嵌套区块，每个区域内部的节点结构是固定的，每个区块只需要追踪自身包含的动态节点。所以，在3.0里，渲染效率不再与模版大小成正相关，而是与模版中动态节点的数量成正相关。

2. **slot编译优化。** 在vue2.x中，如果一个组件传入了slot，那么每次父组件更新的时候，会强制使子组件uplate，造成性能浪费。

vue3.0优化了slot的生成，使得非动态slot中属性的更新只会触发子组件的更新。动态slot指的是在slot上面使用v-if，v-for，动态slot名字等会导致slot产生运行时动态变化但是又无法被子组件track的操作。

3. **diff算法优化。**

### 说说你对proxy的理解

vue的数据劫持有两个缺点：

1. 无法监听到索引修改数组的指的变化
2. 无法监听object的值的变化

所以vue2.x中才会有$set属性的存在

proxy是set中推出的新api，可以弥补以上两个缺点，所以vue3.x版本用proxy替换object.defineproperty。

### Vue性能优化方案？

1. 懒加载: `<Suspense>`组件和`<teleport>`元素，使得懒加载更加方便。懒加载可以减少初始加载时间，提升应用的加载性能。
```vue
<template>
  <div>
    <Suspense>
      <template #default>
        <AsyncComponent />
      </template>
      <template #fallback>
        <LoadingSpinner />
      </template>
    </Suspense>
  </div>
</template>
```
2. 虚拟滚动: 在处理大型列表时，虚拟滚动可以避免同时渲染大量DOM元素，从而提高页面渲染性能。Vue 3可以借助库（如vue-virtual-scroller）来实现虚拟滚动。
3. Memoization：Memoization是一种优化技术，它缓存函数的计算结果，以避免重复计算。在Vue 3中，可以使用computed属性和ref的结合来实现Memoization。
4. Tree Shaking: 是一种优化技术，用于从打包后的代码中移除未使用的模块和代码，减小bundle体积。Vue 3默认支持Tree Shaking，但需要确保您的代码和依赖项是正确地配置和使用的。

## 七、关于React

### angularJs和React区别？

React对比Angular是思想上的转变，它并不是一个库，是一种开发理念，组件化，分治的管理，数据与view的一体化，它只有一个中心，渲染view，对于虚拟dom它并没有提高渲染页面的性能，它提供更多的是利用jsx便捷生成dom元素，利用组件概念进行分治管理页面每个部分。

### React中有哪些生命周期方法？

React中有三个生命周期阶段：
- 挂载阶段：组件被创建并添加到DOM中。
- 更新阶段：组件的props或state发生变化时，组件被重新渲染。
- 卸载阶段：组件被从DOM中移除。

在这些阶段中，React提供了以下生命周期方法：
- constructor()
- static getDerivedStateFromProps()
- render()
- componentDidMount()
- shouldComponentUpdate()
- getSnapshotBeforeUpdate()
- componentDidUpdate()
- componentWillUnmount()

### React Hooks有哪些？

React Hooks有以下函数：
- useState()
- useEffect()
- useContext()
- useReducer()
- useCallback()
- useMemo()
- useRef() 引用一个不需要渲染的值
- useImperativeHandle()
- useLayoutEffect()
- useDebugValue()

### 什么是React Native？

React Native是一个用于构建原生移动应用程序的React库。它允许我们使用JavaScript和React构建跨平台的应用程序，并且可以在iOS和Android上运行。

### React Native中有哪些核心组件？

- View：类似于HTML中的div元素，用于包含其他组件。
- Text：用于显示文本。
- Image：用于显示图像。
- TextInput：用于获取用户输入的文本。
- ScrollView：用于滚动页面。
- FlatList：用于显示列表。
- TouchableOpacity：用于创建可点击的元素。

### 如何实现组件的懒加载

从 16.6.0 开始，React 提供了 `lazy` 和 `Suspense` 来实现懒加载。

```js
import React, { lazy, Suspense } from 'react';
const OtherComponent = lazy(() => import('./OtherComponent'));
 
function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  );
}
```

### React性能优化？

1. 使用`React.lazy`和`Suspense`将页面设置为懒加载，避免 js 文件过大；
2. 使用`SSR`同构直出技术，提高首屏的渲染速度；[更多](https://blog.51cto.com/u_15283585/5016677)
3. 使用`useCallback`和`useMemo` 缓存函数或变量，使用 React.memo 缓存组件；
4. 尽量调整样式或`className`的变动，减少 jsx 元素上的变动，尽量使用与元素相关的字段作为 key，可以减少 diff 的时间（React 会尽量复用之前的节点，若jsx 元素发生变动，就需要重新创建节点）；
5. 对于不需要产生页面变动的数据，可以放到`useRef()`中；


## 八、前端工程化

### 前端技术分类

- 语言：html、css、js
- 协议： http、websocket、oauth2
- 环境： 浏览器、Web API（Drag API、File API、Observer API、Canvans API）、Node环境、小程序环境、app环境、桌面应用
- 框架/库： vue react axios egg rn uniapp taro lodash moment
- 服务器： node express koa mysql redis mongodb
- 工程化：ts、sass、less、stylus

### 什么是前端工程化？

前端开发的管理工具，作用是降低开发成本、提升开发效率；能够降低多少、提升多少，取决于这个工程的复杂程度；项目越复杂、人员越多，项目规模越大，其管理成本就越高，并且成几何倍数的增长。

### 为什么要进行前端工程化？

比如公司前端开发人员绝大多数都是初级，只能写一些简单的业务代码，但是遇到抽离组件、开发一个更加契合团队的前端框架，自定义一些脚手架，他们就做不了。因此如何让这些初级前端开发工程师发挥他们的工作效能，这就是前端技术管理层面要做的事。因此在具体前端技术管理层面，我们需要一系列的管理工具来帮我们完成这些事，比如：如何处理兼容性，成员的代码风格不一样影响代码的维护和阅读，如何来划分模块，如何进行单元测试，命名规范，版本控制，性能优化工具 等等这一系类的都需要有一个工具来解决这些问题，让这些初学工程师们即使不懂这些东西也能完成开发工作，而把这些各个层面的管理工具汇集在一起，进行有效的组织，这个过程就叫做前端工程化。

截至目前，前端有200多万个第三方库，其绝大多数都是跟工程化工具相关的

### 如何进行前端工程化？

前端工程化就是在分解聚合的思想下通过以下方面来体现
- 模块化和包管理来体现的：函数、文件（模块）、包（库）。具体从问题、标准、实现来聊。
- 模块化：应用的是分解和聚合的思想。可以拿现实世界的学科分类来举例说明，其实客观世界是没有的。分解契合的是主观规律，聚合契合的是客观规律。因为要认识所以要分解，因为要改造所以要聚合。
> 1. 问题：文件在分解方面有全局污染、在聚合方面有依赖混乱的问题。
标准：CommonJS简称CJS、EcmaScript Module简称ESM规范，剩下的AMD、CMD、UMD民间标准已经被淘汰了。最核心的区别，CJS是社区规范，是运行时的，ESM是es6出来的官方标准，是编译时。
> 2. 实现：浏览器支持ESM（`<script type="module" />`）、node 支持CJS和ESM，通过package.json中的type字段来区分、构建工具支持CJS和ESM，具体有webpack（CJS和ESM都支持）、rollup（只支持ESM）、esbuilder（只支持ESM）， vue-cli、vite、cra、umijs这些脚手架内部就包含这些构建工具。
- 包管理：package,一系列模块的集合。
> 1. 问题：包的聚合有一下问题，从哪里下载？如何升级？如何卸载？如何发布？版本控制？
> 2. 标准：npm（包的属性、registry、command-line-interface简称cli等等都在package.json中配置）
> 3. 实现：npm,pnpm,yarn,cnpm,bower

### 工程化要解决的问题

模块化和包管理只是工程化的开始,随着项目复杂度的增加,模块化和包是解决不完的,所以还需要其他工具来,问题大致分为三类

- 语言问题: html, css, js 三个语言的兼容性和语言缺失问题。
> 1. html: haml增强html语言，因为基本都是单页面通过js的`doucment.createElement()`来创建,所以问题不大。
> 2. js: 
>> - api兼容: 比如`Array.flatMap`在node V10之前就没有,`polyfill`的做法,具体的实现库是core-js;
>> - 语法兼容: syntax transformer语法转换器也叫runtime,运行时的语法转换,没有较全的库需要针对语法去安装,比如对Promise语法就要用regennerator库来兼容; 
>> - 语法增强: 比如jsx,TS. 其实有一个代码集成转换工具的babel, `@babel/core`所有的api及语法转换api, @babel/cli命令工具,通过命令行调用@babel/core
> 3. css:
>> - api兼容: 比如有的样式浏览器不支持，需要加上厂家前缀；
>> - 语法增强: 难以书写，就有less和sass
- 工程问题: 我们要搭建一个什么样的工程才能开发的舒服,才能最大化的提高生产效率.比如:开发服务器,文件指纹,代码压缩,代码混淆
- 流程问题:代码写完后如何进行提交发布,如何来做自动化测试,什么叫预发布,灰度发布 等等这些运维的问题.

### 前端性能优化

1. 项目中小图片图片转base64：通过工具如webpack进行图片压缩，文件进行压缩混淆等
2. 路由懒加载：异步路由第三方依赖按需加载，比如使用element-ui框架，但是里面的组件只用到了其中一部分，可以单独按需引入组件。
3. 配置`externals`打包配置将不怎么需要更新的第三方库脱离webpack打包，不被打入bundle中，从而减少打包时间，但又不影响运用第三方库的方式。比如vue、element-ui等等设置进去，打包的时候就不会打包他们，然后再在HTML中引入CDN的资源。
4. 对打包后的代码进行压缩；
5. 可以借助开启gzip压缩文件，减小文件大小；
6. 生产环境build时不生成map文件；
7. 将项目根据业务和模块，改造为多页面，而不是紧靠单页面支撑；
8. 代码优化方面：通用方法封装为模块，减少代码冗余，写一些性能高的代码。比如：
> - 尽量使用css3动画：合理使用requestAnimationFrame动画代替setTimeout。
> - 优化高频事件：scroll、touchmove等事件尽量使用函数防抖节流等进行限制。
> - 不滥用WEB字体：WEB字体需要下载、解析、重绘当前页面，尽量减少使用。
9. 加上loading或者骨架进行感知上的性能优化；


### 单页面应用SEO实践建议

虽然Vue对SEO可能有一定的挑战，但通过使用服务器端渲染，设置Meta信息，使用静态路由以及一些实践建议，您可以确保Vue应用程序对搜索引擎友好，提高您的网站排名和流量。

1. 创建XML站点地图：站点地图是一份清单，列出您的站点上所有页面的URL。创建一个XML站点地图可以帮助搜索引擎爬虫更好地了解您的站点，从而提高您的排名。Vue应用程序可以使用“vue-router-sitemap”插件生成XML站点地图。
2. 集成Google Analytics：监控和分析网站的数据对于SEO至关重要。Google Analytics是一种免费的工具，可以帮助您了解网站的流量，来源和行为，让您能够优化您的网站，以获得更好的搜索排名。
3. 异步数据加载：由于搜索引擎爬虫不会执行JavaScript，我们需要确保Vue应用程序可以在没有JavaScript的情况下正常运行。为了解决这个问题，我们可以使用异步数据加载，确保搜索引擎可以获取到我们的网站内容。
4. 优化图片：图片在SEO中也起着重要的作用。为了确保搜索引擎可以正确索引您的图片，您应该在页面中包含图片标题和描述，并将图片压缩至适当的大小。

### 单页面应用首屏加载空白？

单页面应用的 html 是靠 js 生成，因为首屏需要加载很大的js文件(app.js vendor.js)，所以当网速差的时候会产生一定程度的白屏。解决办法：
1. 优化 webpack 减少模块打包体积，code-split 按需加载
2. 服务端渲染，在服务端事先拼装好首页所需的 html
3. 首页加 loading 或 骨架屏 （仅仅是优化体验）
4. 服务端开启gzip压缩
5. 打包文件分包，提取公共文件包

## 九、其他

### TS中type和interface的区别

| **Type**                                        | **Interface**                           |
| ----------------------------------------------- | --------------------------------------- |
| 只能通过 & 进行合并                             | 同名自动合并，通过 extends 扩展         |
| 更强大，除了以上类型，还可以支持string，数组... | 自身只能表达 object/class/function 类型 |

在对象扩展的情况下，使用接口继承要比交叉类型的性能更好。同时建议：
- 使用interface来描述对象对外暴露的借口；
- 使用type将一组类型重命名（或对类型进行复杂编程）。

### TS使用第三方库，没有类型声明文件报错处理

就近的types文件夹中，新建index.d.ts文件如下:

```ts
declare module 'jQuery'

// 或者
declare let jQuery: (selector: string) => any;
```

### Git优缺点

优点

1. 适合分布式开发，强调个体。
2. 公共服务器压力和数据量都不会太大。
3. 速度快、灵活。
4. 任意两个开发者之间可以很容易的解决冲突。
5. 离线工作。

缺点：

1. 学习周期相对而言比较长。
2. 不符合常规思维。
3. 代码保密性差，一旦开发者把整个库克隆下来就可以完全公开所有代码和版本信息。


### 对内容安全策略CSP的理解

见 https://zhuanlan.zhihu.com/p/604549352

内容安全策略 ([CSP]) 是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 XSS 和数据注入攻击等。无论是数据盗取、网站内容污染还是散发恶意软件，这些攻击都是主要的手段。

CSP 被设计成完全向后兼容（除CSP2 在向后兼容有明确提及的不一致; 更多细节查看这里 章节1.1）。不支持CSP的浏览器也能与实现了CSP的服务器正常合作，反之亦然：不支持 CSP 的浏览器只会忽略它，如常运行，默认为网页内容使用标准的同源策略。如果网站不提供 CSP 头部，浏览器也使用标准的同源策略。

为使CSP可用, 你需要配置你的网络服务器返回 `Content-Security-Policy` HTTP头部 ( 有时你会看到一些关于`X-Content-Security-Policy`头部的提法, 那是旧版本，你无须再如此指定它)。

除此之外, 元素也可以被用来配置该策略, 例如

```html
<meta 
    http-equiv="Content-Security-Policy"
    content="default-src 'self'; img-src https://*; child-src 'none';"
/>
```

### 工作经历

本科，计算机专业，有7年前端开发经验。熟悉 React、Vue 等前端主流框架和库，有组件库和 npm 包的开发和发布经验；了解 express、koa、nestjs 等服务器的开发；注重代码规，善用 ts+eslint+prettier等，有一定的前端工程化经验；了解自动化开发流程，带领过3-5人的前端团队。对前端布局、UI 交互设计有独特的理解和追求，喜欢 TDD 开发方式，喜欢在 GitHub 上对 Web 前沿技术进行研究。

数据平台

提供从数据采集（数据集成平台）-数据构建（主数据）-数据管理（数据生命周期、数据地图、元数据）-数据应用（用户增长引擎、智能决策驾驶舱-数据可视化展示）全链路一站式的解决方案，覆盖用户整个营销运营周期（潜客营销、会员管理、售后运营），可以根据客户(车厂)所处的阶段和具体业务需求，制定定制化的解决方案。

有7年左右的前端开发经验

目前在一家做车载系统的公司担任高级前端开发，负责数据平台方向和二手车业务的前端技术选型、工程化和部分业务的开发工作。

内容:
1. 担当数据平台产品线下，知点、数据资产、用户增长引擎、智能决策驾驶舱产品的前端一号位；进行技术选型、开发方案的编写
和核心业务的开发工作；
2. 负责二手车产品线下，web和h5端打印版报告、h5端闲鱼 app 订单上传页、远程监测小程序、管理后台这5个项目的工程化搭
建和核心业务代码的开发工作，并跟进项目的落地情况和各迭代版本的持续演进；
3. 负责小程序平台产品线下，交付管理平台的开发工作；
4. 搭建舒服高效的前端工程，接入自动化 DevOps 研发流程，接入代码门神质量卡点，确保其开发迭代效率及质量；
5. 制定前端团队的开发流程规范，包括开发前的需求 story 创建、开发方案模板，开发后的 bug 处理规范、代码发布申请流程
等；
6. 对成员开发方案进行审核、代码 checked 合并，跟进代码门神质量情况，审核成员上线发布申请；
7. 开发维护 Fusion 物料组件，解决 issue 问题，跟进组件在其他项目中的落地情况；
8. 开发基于 DevOps 自动化流程上的 npm包，确保定制化项目能接入到 DEF中。

业绩:
1. 制定了前端团队的开发流程规范，保证团队能高效地完成各自的工作；
2. 带领团队完成数据平台、二手车和小程序平台这三条业务线下前端项目的开发工作，确保在交付效率和交付质量上满足了预
期；
3. 负责的产品先项目接入到了标准化的O2 Space 研发流程中，在质量方面确保 block和 major 问题数都为0；
4. 基于 Fusion 组件开发的交付管理平台，其代码没有页面级别自定义样式，所有页面均要是符合规范的优质页面；
5. 沉淀了基于 DEF DevOps 的 oss 资源上传构建器的 npm包，并在二手车下的项目中进行了落地。