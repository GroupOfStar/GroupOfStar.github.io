# 如何对class降级

这里有一个es6的class写法，如何降级成es5？

<<< ./es6.js#snippet


### 30分的写法 - 基本

<<< ./es5-30.js#snippet

写出上面代码能拿到30分，但还有很多问题

暂时性死区问题： es6的class在不能在申明前调用的，但是在上面的构造函数中却可以，因为函数有提升

```js{1}
Product()
function Product(name, unitPrice, number) {
  this.name = name;
  this.unitPrice = unitPrice;
  this.number = number;
  Product.count++;
}
```

### 40分的写法 - 自执行函数

通过自执行函数来解决这一问题

<<< ./es5-40.js#snippet{1,14-15}

在es6里的class里，只能通过new来调用，不能当初普通函数来调用，但上面的写法却可以

### 50分的写法 - 只能new调用

<<< ./es5-50.js#snippet{3-8}

class中还有totalPrice访问器，而且这访问器不仅出现在原型，还会出现在实例上

### 60分的写法 - 访问器

<<< ./es5-60.js#snippet{14-19,24-29}

class中原型上方法都不可枚举，即不可通过以下方式获得

```js
console.log("Product keys :>> ", Object.keys(Product.prototype));
// > [ "increase"] // 不应该获得到increase
```

### 70分的写法 - 方法不可枚举

<<< ./es5-70.js#snippet{31-36}

同样的原型是的静态属性也不可以枚举

### 80分的写法 - 静态属性不可枚举

<<< ./es5-80.js#snippet{15-18}

class中的方法是不能关键字new来当构造器调用的，但上面却可以，比如：

```js
const p = new Product("qiezi", 2.5, 3);
new p.increase()
// 在class中
// > TypeError: p.increase is not a constructor

// 但在es5中
// > {"count": null}
```

所以在es5中也需要对increase函数的调用做约束

### 90分的写法 - 方法不可new调用

<<< ./es5-90.js#snippet{39-43}

剩下的10分会考察原型继承上，有待于探索...
