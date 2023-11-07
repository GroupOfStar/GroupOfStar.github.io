function quickSort(arr: number[], startIndex = 0): number[] {
  if (arr.length <= 1) return arr;
  const right: number[] = [],
    left: number[] = [],
    startNum = arr.splice(startIndex, 1)[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < startNum) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), startNum, ...quickSort(right)];
}
