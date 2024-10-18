import * as _ from 'ramda'

const { toLower, split, filter, reverse, map, join } = _

const trim = (str: string) => str.trim()

const log = <T>(message: T): T => {
  // console.log(message)
  return message
}

const log2 =
  <T>(msg: any) =>
  (x: T) => {
    // console.log(msg, '--->', x, '<---')
    return x
  }

const doStuff = _.pipe(
  toLower,
  split(' '),
  filter((x: string) => x.length > 3),
  reverse,
  map(trim),
  // log,
  join(' '),
)

// // console.log(doStuff('Welcome to FP world'))

//https://ithelp.ithome.com.tw/articles/10242568

// logSomething :: () -> Number
function logSomething() {
  // console.log('Hello World')
  return 0
}

// Box :: Function -> Box
const Effect = (f: any) => ({
  map: (g: any) => Effect((x: any) => g(f(x))), // 神奇的運算在此
  runEffects: (x?: any) => f(x), // 執行 Effect 看是輸出什麼
  flatMap: (x?: any) => f(x),
  chain: (g: any) => Effect(f).map(g).flatMap(),
  of: (val: any) => Effect(() => val),
})

const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const cube = (x: number) => Math.pow(x, 3)
const eight = Effect(logSomething) // 0
  .map(increment) // 1
  .map(double) // 2
  .map(cube) // 4

// // console.log(eight.runEffects()) // 4

const nextCharForNumberString_ = (str: string) => {
  const trimmed = str.trim()
  const number = parseInt(trimmed)
  const nextNumber = number + 1

  return String.fromCharCode(nextNumber)
}

const box = <T>(value: T) => ({
  pipe: <U>(fn: Unary<T, U>) => box(fn(value)),
  fold: () => value,
})

const nextCharForNumberString = (str: string) =>
  box(str)
    .pipe((x: string) => x.trim())
    .pipe((x: string) => parseInt(x))
    .pipe((x: number) => x + 1)
    .pipe((x: number) => String.fromCharCode(x))
    .fold()

// // console.log(nextCharForNumberString(' 64')) // 'A'

// ====================
// Definitions
// ====================
// This is Happy Path
const Right = <A>(x: A) => ({
  chain: <B>(fn: Unary<A, B>) => fn(x),
  map: <B>(fn: Unary<A, B>) => Right(fn(x)),
  fold: <B>(fn: Unary<A, B>, g: any) => g(x),
  toString: `Right(${x})`,
})

const Left = <A>(x: A) => ({
  chain: <B>(f: Unary<A, B>) => Left(x),
  map: <B>(f: Unary<A, B>) => Left(x),
  fold: <B>(f: Unary<A, B>, g: any) => f(x),
  toString: `Left(${x})`,
})
const fromNullable = <A>(x: A) => (x != null ? Right(x) : Left(null))

const findColor = (name: string) => {
  const found = {
    red: '#ff4444',
    blue: '#3b5998',
  }[name]

  return found ? Right(found) : Left('not found')
}

// return 一個 Right() data type
// // console.log(findColor('red'))
// return 一個 Left()
// // console.log(findColor('reddd'))

// Success Happy Path
// '#FF4444'
// // console.log(
//   ((): string =>
//     findColor('red')
//       .map((x: string) => x.toUpperCase())
//       .fold(
//         () => 'no Color',
//         (color: string) => color
//       ))()
// )

// Failed Sad Path
// 'no Color'
// // console.log(
//   (() =>
//     findColor('redddd')
//       .map((x: string) => x.toUpperCase()) // 不會執行這行，會直接輸出 'no Color'
//       .fold(
//         () => 'no Color',
//         (color: string) => color
//       ))()
// )

const findColor2 = (name: string) =>
  fromNullable(
    {
      red: '#ff4444',
      blue: '#3b5998',
    }[name],
  )

// Success Happy Path
// '#FF4444'
// // console.log(
//   (() =>
//     findColor2('red')
//       .map(log2('hello'))
//       .map((x: string | null) => x?.toUpperCase())
//       .fold(
//         () => 'no Color',
//         (color: string) => color
//       ))()
// )

//練習
// type User = {
//   address: {
//     street: string
//   }
// }
// const street_ = (user: User) => {
//   const address = user.address

//   if (address) {
//     return address.street
//   } else {
//     return 'no street'
//   }
// }
// const street = (user: User): string =>
//   fromNullable(user.address)
//     .map((address) => address?.street)
//     .fold(
//       () => 'no street',
//       (x: string) => x
//     )

export default ''
