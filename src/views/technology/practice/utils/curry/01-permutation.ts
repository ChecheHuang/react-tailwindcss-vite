//描述性，用函數的組合來表達計算過程，而非計算步驟
//函數小巧，靈活組裝使用
//遞迴是常見的手段
//函數通常沒有side effect

//immutable
function remove<T>(set: Set<T>, i: T) {
  const newSet = new Set<T>([...set])
  newSet.delete(i)
  return newSet
}
function flatten(array: Array<any>): Array<any> {
  if (!Array.isArray(array)) {
    return array
  }
  return ([] as Array<any>).concat(...array.map(flatten))
}

export function permutation(str: string): Array<string> {
  function R(set: Set<string>): Array<string> {
    if (set.size === 1) {
      return [set.values().next().value]
    }
    return flatten(
      [...set].map((char) => R(remove(set, char)).map((perm) => char + perm)),
    )
  }
  return R(new Set([...str]))
}

// console.log(remove(new Set([1, 2]), 1));
// console.log(flatten([1, 2, 3, [4, 5, [6]]]));
// console.log(permutation('abc'))

// remove(new Set([1, 2]), 1)={ 2 }
// flatten([1, 2, 3, [4, 5, [6]]]) = [1, 2, 3, 4, 5, 6];
// permutation("abc") = ["abc", "acb", "bac", "bca", "cab", "cba"];
