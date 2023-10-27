namespace Question {
  declare function curry(obj: Function): Function;

  function sum(a: number, b: number, c: number) {
    return a + b + c;
  }

  const currySum = curry(sum);

  currySum(1)(2)(3); // 6
}
