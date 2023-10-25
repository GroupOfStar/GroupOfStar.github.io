# TypeScript 基础指南

![logo](https://intranetproxy.alipay.com/skylark/lark/0/2022/webp/54556434/1658126670584-0c929bb0-3c1e-43ed-872c-de2db6dc9b4f.webp#clientId=u341a30cc-3344-4&from=paste&id=u36d3930d&originHeight=1394&originWidth=2477&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u063ddbb7-9512-4991-bc23-d51655617c6&title=)
> 作为一个使用 Typescript 很久很久很久的人来说，真真切切感受到了 Typescript 的魔法，大大提高了代码的可维护性，方便了代码的重构；所以，准备了一系列`TypeScript`文章，这里一起拥抱TS。

## 一、什么是TS

> TypeScript是JavaScript类型的超集，它可以编译成纯JavaScript。TypeScript可以在任何浏览器、任何计算机和任何操作系统上运行，并且是开源的。

:::info
扩展了JavaScript的语法，提供了类型系统和对ES6的支持
:::

### 1.1 TypeScript的优缺点

优点：
强大的IDE支持，体现在三个特性上：1.类型检查（在TS中允许你为变量指定类型）；2.语法提示；3.重构；Angular2、Vue3的开发语言
缺点：
有一定的学习成本、需要理解接口（Interface）、泛型（Generics）、类（Class）、枚举（Enums）等前端开发可能不是很熟悉的知识点

### 1.2 快速开始

```bash
> npm install -g typescript

$ tsc -v
Version 4.6.4
```

```typescript
// greeter.ts
function greeter(person) {
  return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);
```

```bash
tsc greeter.ts
```

## 二、类型的定义

> javascript 类型 : `Boolean` `Number` `Array` `Funciton` `Object` `Symbol` `undefined` `null`

TypeScript补充类型：`void` `any` `never` `元祖` `枚举` `高级类型`

```typescript
// 基本数据类型
let bool: boolean = true
let num: number = 111
let str: string = 'aaa'
let s1: symbol = Symbol()

// 数组
let arr1: number[] = [1,2,3]
let arr2: Array<number>= [1,2,3]
let arr3: Array<number | string> = [1, 2, 3, '4']

// 函数
function add(x: number, y: number): number;
let myAdd: (x: number, y: number) => number;

// 元祖
let tuple: [number, string] = [1, '2']  // 可以给该元祖添加新元素, 但不能 “越界” 访问
tuple.push('3'); // 正常push
tuple[2]  // 报错, 因为越界访问了

// 枚举
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];
console.log(colorName);  // 显示'Green'因为上面代码里它的值是2

// undefined null
let x: undefined = undefined; // 正常
let x: undefined = ‘1’; // 报错
let h: number = undefined; // 报错, 如果strictNullChecks为true 

// void 一个没有任何返回的函数, 就用void
function warnUser(): void {}

// any 类型 如果都使用any ,那就没必要使用ts了

// never 类型 一般很少使用
function error(message): never {
    throw new Error(message);
}
function infiniteLoop(): never {
    while (true) {}
}

```

## 三、接口的理解

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: "white", area: 100};
  if (config.clor) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.clor;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});

// 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}

// 索引签名
interface StringArray {
  [index: number]: string;
}
```

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
```

```typescript
interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

## 四、泛型的理解

### 4.1 泛型接口

```typescript
interface IStudent<T> {
  name: string
  age?: number
  level: T
  study(type: T):  void
}
```

```typescript
/** 高中 */
interface IHighSchool {
  /** 学费 */
  cost: number
}
/** 小学 */
interface IPrimarySchool {}

let zhangsan : IStudent<IHighSchool> = {
  name: 'zhangsan',
  level: { cost: 1 },
  study(type){}
};
zhangsan.level.cost
```

### 4.2 泛型函数

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <U>(arg: U) => U = identity;
```

```typescript
function identity<T>(arg: T): T {
    return arg;
}
let myIdentity: {<T>(arg: T): T} = identity;

/** 这引导我们去写第一个泛型接口 */

interface GenericIdentityFn {
    <T>(arg: T): T;
}
function identity<T>(arg: T): T {
    return arg;
}
let myIdentity: GenericIdentityFn = identity;

```

```typescript
function identity<T>(arg: T): T {
  if (typeof arg === "string") {
    console.log(arg.length);
  }
  return arg;
}

// 1. 传入所有的参数，包含类型参数
let output = identity<string>("myString");  // type of output will be 'string'
// 2. 利用了类型推论，编译器会根据传入的参数自动地帮助我们确定T的类型
let output = identity("myString");  // type of output will be 'string'
```

```typescript
// A required parameter cannot follow an optional parameter.
function add(x?: number,y: number) {
    return x + y;
}
```

## 五、最佳实践

### 5.1 如何处理第三方库类型相关问题

`TypeScript`所提供的第三方库类型定义不仅约束我们的输入调用，还能为我们提供文档。现在`NPM`上的第三方类型定义种类繁多，很难保证所有使用的第三方库都有类型定义且是正确的，那么，在这个充满未知的过程中，如何才能正确地找到第三方类型库呢？下面列举了四种常见的无法正常工作的场景以及对应的解决方法：

#### 5.1.1 库本身没有自带类型定义

在TypeScript 2.0以上的版本，获取类型声明文件只需要使用npm。

```bash
npm install --save @types/lodash
```

大多数情况下，类型声明包的名字总是与它们在npm上的包的名字相同，但是有@types/前缀， 但如果你需要的话，你可以在 [https://aka.ms/types](https://aka.ms/types)这里查找你喜欢的库。
> 注意：如果你要找的声明文件不存在，你可以贡献一份，这样就方便了下一位要使用它的人。 查看DefinitelyTyped [贡献指南页](http://definitelytyped.org/guides/contributing.html)了解详情。

#### 5.1.2 库本身没有类型定义, 也没有相关的@type

```typescript
declare module “lodash”

// 或者定义的同时，添加声明
declare module 'awesome-react-component' {
  // 依赖其他模块的声明文件
  import * as React from 'react';
  export const Foo: React.FC<{ a: number; b: string }>;
}
```

#### 5.1.3 类型声明库有误

- 推动解决官方类型定义的问题，提issue, pr
- Import 后通过 extends 或者 merge 能力对原类型进行扩展
- 忍受类型的丢失或不可靠性
- // @ts-ignore 忽略

#### 5.1.4 类型声明报错

在 compilerOptions 的添加"skipLibCheck": true, 曲线救国

### 5.2 巧用类型收缩解决报错

#### 5.2.1 类型断言

类型断言可以明确的告诉`TypeScript`值的详细类型； 在某些场景我们非常确认它的类型，且与 `TypeScript`推断出来的类型不一致，那我们可以使用类型断言。语法如下：

```typescript
<类型>值

值 as 类型 // 推荐使用这种语法. 因为<>容易跟泛型, react 中的语法起冲突
```

#### 5.2.2 类型守卫

类型守卫有以下几种方式，简单的概括以下：

- typeof: 用于判断 "number"，"string"，"boolean"或 "symbol" 四种类型.
- instanceof: 用于判断一个实例是否属于某个类
- in: 用于判断一个属性/方法是否属于某个对象
- 字面量类型保护

```typescript
function padLeft(value: string, padding: string | number) {
    if (typeof padding === 'number') {
        console.log(padding + 3); // 正常
        console.log(padding + 2); // 正常
        return Array(padding + 1).join(' ') + value; // 正常
    }
    if (typeof padding === 'string') {
        return padding + value;
    }
}
```

```typescript
class Man {
    handsome = 'handsome';
}
class Woman {
    beautiful = 'beautiful';
}

function Human(arg: Man | Woman) {
    if (arg instanceof Man) {
        console.log(arg.handsome);
        console.log(arg.beautiful); // error
    } else {
        // 这一块中一定是 Woman
        console.log(arg.beautiful);
    }
}
```

```typescript
interface B {
    b: string;
}
interface A {
    a: string;
}
function foo(x: A | B) {
    if ('a' in x) {
        return x.a;
    }
    return x.b;
}
```

有些场景，使用 in, instanceof, typeof 太过麻烦，这时候可以自己构造一个字面量类型。

```typescript
type Man = {
    handsome: 'handsome';
    type: 'man';
};
type Woman = {
    beautiful: 'beautiful';
    type: 'woman';
};

function Human(arg: Man | Woman) {
    if (arg.type === 'man') {
        console.log(arg.handsome);
        console.log(arg.beautiful); // error
    } else {
        // 这一块中一定是 Woman
        console.log(arg.beautiful);
    }
}
```

#### 5.2.3 双重断言

有些时候使用 as 也会报错，因为 as 断言的时候也不是毫无条件的。它只有当S类型是T类型的子集，或者T类型是S类型的子集时，S能被成功断言成T。所以面对这种情况，只想暴力解决问题的情况，可以使用双重断言。

```typescript
function handler(event: Event) {
  const element = event as HTMLElement; 
  // Error: 'Event' 和 'HTMLElement' 中的任何一个都不能赋值给另外一个
}
```

如果你仍然想使用那个类型，你可以使用双重断言。首先断言成兼容所有类型的any

```typescript
function handler(event: Event) {
  const element = (event as any) as HTMLElement; // 正常
}
```

### 5.3 巧用 typescript 支持的js最新特性优化代码

```typescript
let x=foo?.bar.baz();

// typescript 中的实现如下:
var _a;
let x = (_a = foo) === null || _a === void 0 ? void 0 : _a.bar.baz();
```

利用这个特性, 我们可以省去写很多恶心的 a && a.b && a.b.c 这样的代码

```typescript
let x =foo ?? '22';

// typescript 中的实现如下:
let x = (foo !== null && foo !== void 0 ? foo : '22');
```

```typescript
let b = '你好';
let a = 0
let c = null;
let d = ’123‘
b ??= a;  // b = “你好”
c ??= d  // c = '123'
```

趣味问答

```typescript
let a;
let b = "不知名前端"
let c = null;
let d = 0;
let e;

e ??= a?.b ?? c ?? d?.a ?? b;
console.log(e)
```

### 5.4 巧用高级类型灵活处理数据

typescript 提供了一些很不错的工具函数

|       Partial<T\>        | 构造一个新类型，将类型参数 T 中的所有属性变为 **可选属性**                                                                                                                                           |
| :----------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|       Required<T\>       | 构造一个**新类型**，将类型参数 T 中的所有属性变为 **必选属性**                                                                                                                                       |
|       Readonly<T\>       | 构造一个**新类型**，将类型参数 T 中的所有属性变为 **只读属性**                                                                                                                                       |
|      Record<K, T\>       | 构造一个新的**对象类型**。类型参数 K 提供了**对象属性名联合类型**，类型参数 T 提供了**对象属性值的类型**。                                                                                           |
|       Pick<T, K\>        | 从对象类型 T 中选取指定的属性及其类型 K，然后构建出一个新的**对象类型**。                                                                                                                            |
|       Omit<T, K\>        | 与 Pick<T, K\> 是互补的，能够从已有的对象属性中剔除指定的属性，然后构建出一个新的**对象类型**。                                                                                                      |
|      Exclude<T, U\>      | 从类型参数 T 中剔除所有可以赋值给类型参数 U 的类型，并构建一个新类型。                                                                                                                               |
|      Extract<T, U\>      | 与 Exclude<T, U\> 类型是互补的，它能够获取类型参数 T 中所有能够赋值给类型参数 U 的类型，并构建一个新类型。(交集)                                                                                     |
|     NonNullable<T\>      | 从类型参数 T 中剔除 **null 类型**和 **undefined 类型**，并构建一个新的类型。即获取类型 T 中的所有非空类型。                                                                                          |
|      Parameters<T\>      | 获取**函数类型 T** 的参数类型并使用参数类型构造一个**元组类型**。                                                                                                                                    |
| ContructorParameters<T\> | 获取构造函数 T 中的参数类型，并使用参数类型构造一个**元组类型**。若参数类型 T 不是函数类型，则返回 never 类型。                                                                                      |
|      ReturnType<T\>      | 获取函数类型 T 的返回值类型。                                                                                                                                                                        |
|     InstanceType<T\>     | 获取构造函数的返回值类型。                                                                                                                                                                           |
|  ThisParameterType<T\>   | 获取函数类型 T 中的 this 参数的类型，若函数类型中没有定义 this 参数，则返回 unknown 类型。                                                                                                           |
|  OmitThisParameter<T\>   | 从类型 T 中剔除 this 参数的类型，并构造一个新的类型。                                                                                                                                                |
|       ThisType<T\>       | 该工具类型比较特殊，它不是用来构造新类型的，而是用于定义对象字面量的方法中的 this 的类型。如果对象字面量的类型是 ThisType 或者是包含 ThisType 的交叉类型，那么在对象字面量的方法中的 this 类型为 T。 |



详细案例参考： [关于 TypeScript 内置工具类型](https://blog.csdn.net/super_ying123/article/details/124465822)

#### 5.4.1 类型索引

- keyof: 获取类型上的 key 值
- extends: 泛型里面的约束
- T[K] : 获取对象 T 相应 K 的元素类型

```typescript
type Partial<T> = {
    [P in keyof T]?: T[P]
}

type Record<K extends string, T> = {
    [P in K]: T;
}
```

#### 5.4.2 never构造条件类型

- never: 从未出现的值的类型

```typescript
// 如果 T 是 U 的子类型的话，那么就会返回 never，否则返回 T
type Exclude<T, U> = T extends U ? never : T;

// 相当于: type A = 'a'
type A = Exclude<'x' | 'a', 'x' | 'y' | 'z'>
```

#### 5.4.3 -与+修饰符

- 与 + 可以直接去除 ? 将所有对象属性变成必传内容

```typescript
type Required<T> = { [P in keyof T]-?: T[P] };

// Remove readonly
type MutableRequired<T> = { -readonly [P in keyof T]: T[P] };  
```

#### 5.4.4 infer

- 在 extends 条件语句中待推断的类型变量

```typescript
// 需要获取到 Promise 类型里蕴含的值
type PromiseVal<P> = P extends Promise<infer INNER> ? INNER : P;

// Test === string
type Test = PromiseVal<Promise<string>>;
```

### 5.5 辨别 type & interface

在各大类型库中，会看到形形色色的 type 和 interface。然而很多人在实际中却不知道它们的区别：

| **Type**                                        | **Interface**                           |
| ----------------------------------------------- | --------------------------------------- |
| 只能通过 & 进行合并                             | 同名自动合并，通过 extends 扩展         |
| 更强大，除了以上类型，还可以支持string，数组... | 自身只能表达 object/class/function 类型 |

建议: 能用 interface 实现，就用 interface , 如果不能才用 type。
更多见： [type 与 interface 的区别](https://blog.csdn.net/weixin_42232325/article/details/123994867)

## 六、参考文献

1. [文档简介 · TypeScript中文网 · TypeScript——JavaScript的超集](https://www.tslang.cn/docs/home.html)
