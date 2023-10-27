namespace Infer {
  // 1. 推断函数的返回值
  type Return<T> = T extends (...args: any[]) => infer K ? K : T;

  type sum = (a: number, b: number) => number;
  type concat = (a: any[], b: any[]) => any[];

  let sumResult: Return<sum>; // number
  let concatResult: Return<concat>; // any[]

  // 2. 推断Promise的泛型参数
  type PromiseType<T> = T extends Promise<infer K> ? K : T;
  type pt = PromiseType<Promise<number>>; // number

  // 2.1 如果是要得到多层嵌套的
  type PromiseType2<T> = T extends Promise<infer K> ? PromiseType2<K> : T;
  type pt2 = PromiseType2<Promise<Promise<string>>>; // string

  // 3. 推断函数参数
  type SecondArg<T> = T extends (
    arg1: unknown,
    arg2: infer K,
    ...args: any[]
  ) => any
    ? K
    : T;
  type sa = SecondArg<(name: string, age: number) => void>; // number

  // 4. 推断数组每一项的类型
  type ArrayType<T> = T extends (infer K)[] ? K : T;
  type ItemType1 = ArrayType<[string, number]>; // string | number
  type ItemType2 = ArrayType<string[]>; // string | number
}
