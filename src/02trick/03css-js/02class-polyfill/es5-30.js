// #region snippet
function Product(name, unitPrice, number) {
  this.name = name;
  this.unitPrice = unitPrice;
  this.number = number;
  Product.count++;
}

Product.count = 0;

Product.prototype.increase = function () {
  this.count++;
};
// #endregion snippet

const p = new Product("qiezi", 2.5, 3);
const b = new Product("xiangjiao", 5.4, 1);

p.increase();
p.increase();
p.increase();

console.log("p :>> ", p);
console.log("Product.count :>> ", Product.count);
