// #region snippet
var Product = (function () {
  function Product(name, unitPrice, number) {
    // this.__proto__ !== Product.prototype 这种写法es官方不推荐
    if (Object.getPrototypeOf(this) !== Product.prototype) {
      throw new TypeError(
        "Class constructor Product cannot be invoked without 'new'"
      );
    }
    this.name = name;
    this.unitPrice = unitPrice;
    this.number = number;
    Product.count++;

    // 实例上添加访问器属性
    Object.defineProperty(this, "totalPrice", {
      get() {
        return this.unitPrice * this.number;
      }
    });
  }

  Product.count = 0;

  // 原型上添加访问器属性
  Object.defineProperty(Product.prototype, "totalPrice", {
    get() {
      return this.unitPrice * this.number;
    }
  });

  Object.defineProperty(Product.prototype, "increase", {
    value: function () {
      this.count++;
    },
    enumerable: false
  });

  return Product;
})();
// #endregion snippet

const p = new Product("qiezi", 2.5, 3);
const b = new Product("xiangjiao", 5.4, 1);

p.increase();
p.increase();
p.increase();

console.log("p :>> ", p);
console.log("Object.keys(p.__proto__) :>> ", Object.keys(p.__proto__));
console.log("p.totalPrice; :>> ", p.totalPrice);
console.log("Product.count :>> ", Product.count);
