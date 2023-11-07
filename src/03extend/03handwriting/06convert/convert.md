# 金额千分位表示法

编写函数convert(money) ，传入金额，将金额转换为千分位表示法。ex:-87654.3 => -87,654.3

> 思路：判断是否是负数，判断是否有小数点，将整数部分进行处理


```ts
function convert(money: number): string {
  let result: string[] = []; // 用于存放整数部分
  let negativeFlag: string = ""; // 是否要负号
  let tail: string = ""; // 用于存放小数点后面部分
  let arr: string[] = [...String(money)];
​
  // 判断是否是负数
  if (arr[0] === "-") {
    negativeFlag = "-";
    arr.shift();
  }
​
  // 判断是否存在小数点
  const dotIndex: number = arr.indexOf(".");
  if (dotIndex !== -1) {
    tail = arr.splice(dotIndex, arr.length - dotIndex).join("");
  }
​
  // 处理整数部分加上千分位
  const reverseArray: string[] = arr.reverse();
  for (let i = 0; i < reverseArray.length; i++) {
    if ((i + 1) % 3 === 0 && i + 1 < reverseArray.length) {
      result[i] = "," + reverseArray[i];
    } else {
      result[i] = reverseArray[i];
    }
  }
  return negativeFlag + result.reverse().join("") + tail;
}
```