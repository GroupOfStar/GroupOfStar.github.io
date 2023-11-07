function dealArr(arr1: any[], arr2: any[]): any[] {
  return Array.from(new Set([...arr1.flat(), ...arr2.flat()]));
}

const arr1 = ["a", 1, 2, 3, ["b", "c", 5, 6]];
const arr2 = [1, 2, 4, "d", ["e", "f", "5", 6, 7]];

// [ 'a', 1, 2, 3,'b', 'c', 5, 6, 4, 'd', 'e', 'f','5', 7]
console.log(dealArr(arr1, arr2));
