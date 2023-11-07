function deepClone<T>(obj: T): T {
  if (typeof obj !== "object" || obj === null) return obj;
  const result: T = obj instanceof Array ? ([] as T) : ({} as T);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}

const obj = {
  a: 1,
  b: {
    bb: "hh"
  },
  c() {
    console.log("cc");
  }
};

const cloneObj = deepClone(obj);
obj.a = 999;
console.log("cloneObj :>> ", cloneObj);
console.log("obj :>> ", obj);
// cloneObj :>>  { a: 1, b: { bb: 'hh' }, c: [Function: c] }
// obj :>>  { a: 999, b: { bb: 'hh' }, c: [Function: c] }

const arr: Array<number | string> = [1, 2, 3, "6"];
const copyArr = deepClone(arr);
arr[3] = 4;
console.log("arr | copyArr :>> ", arr, copyArr); // arr | copyArr :>>  [ 1, 2, 3, 4 ] [ 1, 2, 3, '6' ]
