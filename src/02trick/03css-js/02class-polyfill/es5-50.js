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
  }

  Product.count = 0;

  Product.prototype.increase = function () {
    this.count++;
  };
  return Product;
})();
// #endregion snippet

const p = new Product("qiezi", 2.5, 3);
const b = new Product("xiangjiao", 5.4, 1);

p.increase();
p.increase();
p.increase();

console.log("p :>> ", p);
console.log("Product.count :>> ", Product.count);
