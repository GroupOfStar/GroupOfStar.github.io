# 手写Promise

## 基本构造

<<< ./promise01.ts#snippet

## 代码封装和优化

1. 处理resolve和reject的调用问题；
2. 处理有报错的问题。

<<< ./promise02.ts#snippet{1,12-16,19-31,38,46,51-54}

## 微队列函数的封装

看一下下面的js代码

<<< ./promise03.html#snippet

执行后的结果

```consle
2
变化了
1
```
现在我们就可以用它来模拟微队列

<<< ./promise04.ts#microTask

## then函数的创建

TODO

## 执行队列函数

TODO

## 核心代码实现

TODO