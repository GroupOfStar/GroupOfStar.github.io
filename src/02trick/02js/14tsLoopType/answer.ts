namespace Answer {
  /**
   * Curried 有以下几种情况
   * 1. () => R
   * 2. (x) => R
   * 3. (x) => 新的函数
   */
  type Curried<A, R> = A extends []
    ? () => R
    : A extends [infer ARG]
    ? (param: ARG) => R
    : A extends [infer ARG, ...infer REST]
    ? (param: ARG) => Curried<REST, R>
    : never;

  /**
   * A 表示入参类型
   * R 表示返回类型
   */
  declare function curry<A extends any[], R>(
    fn: (...args: A) => R
  ): Curried<A, R>;

  function sum(a: number, b: string, c: object) {
    return 123;
  }

  const currySum = curry(sum);

  currySum(1)("abc")({}); // 6
}
