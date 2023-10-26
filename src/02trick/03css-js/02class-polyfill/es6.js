// #region snippet
class Product {
  static count = 0;
  constructor(name, unitPrice, number) {
    this.name = name;
    this.unitPrice = unitPrice;
    this.number = number;
    Product.count++;
  }

  get totalPrice() {
    return this.number * this.unitPrice;
  }

  increase() {
    this.number++;
  }
}
// #endregion snippet

const p = new Product("qiezi", 2.5, 3);
const b = new Product("xiangjiao", 5.4, 1);

p.increase();
p.increase();
p.increase();

console.log("p :>> ", p);
console.log("p.totalPrice; :>> ", p.totalPrice);
console.log("Product.count :>> ", Product.count);
