# 数组去重

```js
const array = [' ', 1,  2, ' ',' ', 3];
​
// 1: 使用 "Set"
[...new Set(array)];
​
// 2: 使用 "Filter"
array.filter((item, index, arr) => arr.indexOf(item) === index);
​
// 3: 使用 "Reduce"
array.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);
​
// RESULT:
// [' ', 1, 2, 3];
```

如果输入为两个一维数组，将这两个数组合并，去重，不要求排序，返回一维数组

<<< ./deleteDuplicateArr.ts