// 柯里化

// function add(a,b,c,d){
//     return a+b+c+d
// }
// add = curry(__add)
// add(1)(2)(3)(4);
// add(1, 2, 3), 4;
// add(1)(2, 3, 4);

declare type FNCurry = (...args: Array<any>) => any
// Y-combinator
function curry(f: FNCurry) {
  const g = (...args: Array<any>) => {
    if (args.length >= f.length) {
      return f(...args)
    }
    return (...left: Array<any>) => {
      return g(...args, ...left)
    }
  }
  return g
}

function __add(a: number, b: number, c: number, d: number): number {
  return a + b + c + d
}
const add1 = curry(__add)

// console.log(add1(1, 2, 3, 4));
// console.log(add1(1, 2, 3)(4));
// console.log(add1(1)(2, 3, 4));
