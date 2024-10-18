import * as R from 'ramda'

const { curry } = R

const compose_ = <T>(fn1: (a: T) => T, ...fns: Array<(a: T) => T>) =>
  fns.reduce((prevFn, nextFn) => (value) => prevFn(nextFn(value)), fn1)
const pipe_ = <T extends any[], U>(
  fn1: (...args: T) => U,
  ...fns: Array<(a: U) => U>
) => {
  const piped = fns.reduce(
    (prevFn, nextFn) => (value: U) => nextFn(prevFn(value)),
    (value) => value,
  )
  return (...args: T) => piped(fn1(...args))
}
const log =
  <T>(msg: any) =>
  (x: T) => (console.log(msg, x), x)

// TODO: https://ithelp.ithome.com.tw/articles/10263480
// sort
const sort = curry((fn, data) => [...data].sort(fn))
// get
const get = curry((key, data) => data[key])
// concat
const concat = curry((symbol, data) => data.concat(symbol))
// map
const map = curry((transformer, data) => data.map(transformer))

const sortLatitude = sort(
  (a: any, b: any) => b.address.geo.lat - a.address.geo.lat,
)

// fetch('https://jsonplaceholder.typicode.com/users')
//   .then((r) => r.json())
//   .then(sortLatitude)
//   .then(map(get('username')))
//   .then(map(concat('!')))
//   .then(console.log)
//   .catch(console.error)

const responseHandler = compose_(
  map(compose_(concat('!'), get('username'))),
  sortLatitude,
)

// fetch('https://jsonplaceholder.typicode.com/users')
//   .then((r) => r.json())
//   .then(responseHandler)
//   .then(console.log)
//   .catch(console.error)

// TODO:
// 這是我的雞
const WHOLE_CHICKEN = [
  'leg',
  'wing',
  'breast',
  'buttock',
  'breast strips',
  'land',
  'bug',
]
// 全雞上取出雞胸肉
const grab = curry((part: string, chicken: string[]) =>
  chicken.find((p: string) => p === part),
)

// 口味調配
const addFlavor = curry((flavor: string, part: string) => `${flavor} ${part}`)

// 包裝
const wrapIt: (item: string) => string = curry((item) => `Wrapped(${item})`)

const product_1 = wrapIt(
  addFlavor('italianHerbal', grab('breast', WHOLE_CHICKEN)),
)

// const makeItalianHerbalBreast = compose_(
//   R.tap(console.log),
//   wrapIt,
//   R.tap(console.log),
//   addFlavor('italianHerbal'),
//   R.tap(console.log),
//   grab('breast'),
//   R.tap(console.log)
// )(WHOLE_CHICKEN)

// [ 'leg', 'wing', 'breast', 'buttock', 'breast strips', 'land', 'bug' ]
// breast
// italianHerbal breast
// Wrapped(italianHerbal breast

// const makeItalianHerbalBreast = compose_(
//   wrapIt,
//   log('3'),
//   addFlavor('italianHerbal'),
//   log('2'),
//   grab('breast'),
//   log('1')
// )(WHOLE_CHICKEN)

// 1 [ 'leg', 'wing', 'breast', 'buttock', 'breast strips', 'land', 'bug' ]
// 2 breast
// 3 italianHerbal breast
// 4 Wrapped(italianHerbal breast

export default ''
