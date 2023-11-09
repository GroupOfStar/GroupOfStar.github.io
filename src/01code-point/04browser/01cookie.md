# 浏览器cookie

## cookie是什么

网络早期最大的问题之一是如何管理状态。简而言之，服务器无法知道两个请求是否来自同一个浏览器。当时最简单的方法是在请求时，在页面中插入一些参数，并在下一个请求中传回参数。这需要使用包含参数的隐藏的表单，或者作为URL参数的一部分传递。这两个解决方案都手动操作，容易出错。cookie出现来解决这个问题。

## cookie原理

- 第一次访问网站，浏览器会发送一个请求，服务器响应这个请求，会将cookie放进响应体中。
- 第二次访问网站，浏览器发送的请求带有cookie，服务器会辨别这个用户的身份。

## cookie的属性

1. Name：cookie的名字，一个域名下绑定的cookie的name不能相同。如果是相同的name则会被覆盖。
2. value：每个cookie拥有的属性，表示cookie的值。
3. domain：cookie的域名。cookie绑定的域名，如果没有设置，自动绑定当前执行语句的的域。同一个域名下的二级域名也是不可以交换cookie的。
4. path：path是默认属性’/'，匹配web路由。
5. Expires：expires是cookie的有效期。一般浏览器的cookie是默认存储的，关闭浏览器结束会话，cookie就会被删除。

> - 如果想要cookie续存一段时间，可以通过设置expires有效期。
> - expires现在被Max-Age取代：Max-Age，是以秒为单位的，Max-Age为正数时，cookie会在Max-Age秒之后，被删除；当Max-Age为负数时，表示的是临时储存，不会生出cookie文件，只会存在浏览器内存中，且只会在打开的浏览器窗口或者子窗口有效，一旦浏览器关闭，cookie就会消失；当Max-Age为0时，删除cookie，因为cookie机制本身没有设置删除cookie，失效的cookie会被浏览器自动从内存中删除，所以，它实现的就是让cookie失效。

6. secure：安全。http无状态无加密，不安全协议容易被攻击挟持。比如你在浏览页面的时候是不是会有小广告出来。这个secure属性为true的时候，这个时候的cookie只会在https和ssl等安全协议下传输。不能对cookie加密，绝对安全保证做不到。
7. httpOnly：安全的 Cookie 需要经过 HTTPS 协议通过加密的方式发送到服务器。即使是安全的，也不应该将敏感信息存储在cookie 中，因为它们本质上是不安全的，并且此标志不能提供真正的保护。

## cookie的两种类型

1. 一种是Session Cookies(会话cookie)：客户端关闭，数据删除，永久丢失。没有指定的Expires/Max-Age指令，存储在内存；
2. 一种是Persistent Cookies(永久性cookie)：客户端关闭，数据不会删除。当Expires或者Max-Age过期，才会删除数据，存储在磁盘。

## cookie的缺点

1. 存储大小有限最大4KB；
2. http请求时会自动发送给服务器, 增加了请求的数据量；
3. 原生的操作语法不太方便操作cookie；
4. 浏览器可以设置禁用。