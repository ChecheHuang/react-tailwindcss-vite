// import * as R from 'ramda'

// const { lift, compose } = R

// const timer = (marked: string, fn: any) => {
//   console.time(marked)
//   fn()
//   console.timeEnd(marked)
// }
// const makeArr = (randomCeil: number) => (len: number) =>
//   Array.from({ length: len }, (v, i) => Math.floor(Math.random() * randomCeil))
// const arrOfMillion = makeArr(100)(1e6)

// const transduce = (transducer, reducer, initValue, _collection) => {
//   let acc = initValue

//   const collection = R.is(Object, _collection)
//     ? R.toPairs(_collection)
//     : _collection

//   for (const val of collection) {
//     acc = transducer(reducer)(acc, val)
//   }

//   return acc
// }

// const sequence = (transducer, collection) => {
//   const arrReducer = (acc, val) => (acc.push(val), acc)
//   const objectReducer = (obj, value) => Object.assign(obj, value)
//   if (Array.isArray(collection))
//     return transduce(transducer, arrReducer, [], collection)
//   else if (R.is(Object, collection))
//     return transduce(transducer, objectReducer, {}, collection)
//   throw new Error('unsupported collection type!!!')
// }

// const wordArr = ['', 'hello', 'world']
// wordArr.filter(R.identity) // ['hello', 'world']

// const add = (x: any, y: any) => x + y
// // console.log(add(Array.of(1), Array.of(1))) // "11"

// // console.log(Array.of(1).flatMap((x) => Array.of(1).map((y) => add(x, y)))) // [2]

// // console.log(lift(add)([1], [1])) // [2]

// const color = ['Black', 'White']
// const size = ['S', 'M', 'L']

// const pair: (x: string, y: string) => [string, string] = (x, y) => [x, y]

// // [["Black", "S"], ["Black", "M"], ["Black", "L"], ["White", "S"], ["White", "M"], ["White", "L"]]
// // console.log(lift(pair)(color, size))

// const tripleIt = (x: number) => x * 3
// const isEven = (num: number) => num % 2 === 0

// const arr = [1, 2, 3, 4]

// // 原本寫法
// // console.log(
// //   //
// //   arr.map(tripleIt).filter(isEven)
// // ) // [6, 12]
// const transducer_1 = R.compose(R.map(tripleIt), R.filter(isEven))

// // const combine = (transducer: any) => (aaa: any) =>
// //   R.transduce(transducer, R.flip(R.append), [], aaa)

// // console.log(
// //   //
// //   R.transduce(transducer_1, R.flip(R.append), [], [1, 2, 3, 4])
// // ) // [6, 12]

// /**
//  * TODO:
//  *
//  修改: 將使用者居住城市中的第一筆資料改成大寫
//  讀取: 讀取該值
//  */

// type User = {
//   id: number
//   name: string
//   username: string
//   email: string
//   address: {
//     street: string
//     suite: string
//     city: string[]
//     zipcode: string
//     geo: {
//       lat: string
//       lng: string
//     }
//   }
// }

// const user = {
//   id: 0,
//   name: 'JingMultipleFive',
//   username: 'jing.tech',
//   email: 'jing.tech.tw@gmail.com',
//   address: {
//     street: 'Wall',
//     suite: 'Abc 123',
//     city: ['Taipei', 'Subic', 'New York'],
//     zipcode: '242',
//     geo: {
//       lat: '-43.9509',
//       lng: '-34.4618',
//     },
//   },
// }

// const toUpper = (str: string) => str.toUpperCase()

// // 將使用者居住城市中的第一筆資料改成大寫
// // TODO:
// // {
// //   const modified_user = {
// //     ...user,
// //     address: {
// //       ...user.address,
// //       city: [
// //         toUpper(user.address.city.slice(0, 1)[0]),
// //         ...user.address.city.slice(1),
// //       ],
// //     },
// //   }
// //   // 取出該值
// //   console.log(modified_user.address.city[0]) // TAIPEI
// // }

// // TODO:
// // {
// //   const lensCity = R.lens(
// //     R.path(['address', 'city', 0]),
// //     R.assocPath(['address', 'city', 0])
// //   )

// //   // 取出該值
// //   R.view(lensCity, user)

// //   // 將使用者居住城市中的第一筆資料改成大寫
// //   R.over(lensCity, R.toUpper, user)
// // }
// // TODO:

// // {
// //   const makeArr = (randomCeil: number) => (len: number) =>
// //     Array.from({ length: len }, (v, i) =>
// //       Math.floor(Math.random() * randomCeil)
// //     )

// //   const arrOfMillion = makeArr(100)(1e6)

// //   timer('first way - map & filter', () => {
// //     /** run code.1 */
// //     // code.1
// //     const result_1 = arrOfMillion.map(tripleIt).filter(isEven)
// //   })

// //   timer('second way - forEach', () => {
// //     /** run code.2 */
// //     // code.2
// //     const result_2 = []

// //     arrOfMillion.forEach((item) => {
// //       const tripleItem = tripleIt(item)

// //       if (isEven(tripleItem)) {
// //         result_2.push(tripleItem)
// //       }
// //     })
// //   })

// //   timer('third way - transduce', () => {
// //     /** run code.3 */
// //     // code.3
// //     const transducer = R.compose(R.filter(isEven), R.map(tripleIt))

// //     const reducer = (acc, val) => (acc.push(val), acc) // same as (acc, val) => { acc.push(val); return acc }

// //     const result_3 = R.transduce(transducer, reducer, [], arrOfMillion)
// //   })
// // }

// //TODO:
// // {
// //   const reducer = (acc, val) => acc + val
// //   // string
// //   reducer('Hello', ', World') // Hello, World

// //   // number
// //   reducer(5, 20) // 25

// //   // object
// //   const objectReducer = (acc, val) => ({ ...acc, ...val })

// //   const myInfo = {
// //     name: 'Jing',
// //     email: 'jingmultiplefive@gmail.com',
// //   }

// //   console.log(objectReducer({ ...myInfo }, { phone: '0912345678' })) // {name: "Jing", email: "jingmultiplefive@gmail.com", phone: "0912345678"}
// // }
// //TODO:
// // {
// //   const map = (transformer: any, array: any) =>
// //     array.reduce((acc: any, val: any) => [...acc, transformer(val)], [])

// //   const filter = (predicator: any, array: any = []) =>
// //     array.reduce(
// //       (acc: any, val: any) => (predicator(val) ? [...acc, val] : acc),
// //       []
// //     )
// //   filter(isEven, map(tripleIt, [1, 2, 3, 4]))
// // }

// // TODO:
// // {
// //   const transducer = R.compose(R.filter(isEven), R.map(tripleIt))

// //   const reducer = (acc, val) => (acc.push(val), acc) // same as (acc, val) => { acc.push(val); return acc }

// //   const result = R.transduce(transducer, reducer, [], arrOfMillion)
// //   //   console.log(result)
// // }

// // TODO:
// // {
// //   const map = (transformer) => (reducer) => (acc, val) =>
// //     reducer(acc, transformer(val))

// //   const filter = (predicator) => (reducer) => (acc, val) =>
// //     predicator(val) ? reducer(acc, val) : acc
// //   const transducer = compose(filter(isEven), map(tripleIt))
// //   const reducer = (acc, val) => (acc.push(val), acc)

// //   const result = transduce(transducer, reducer, [], arrOfMillion)
// //   console.log(result)
// // }

// // TODO:
// // {
// //   const map = (transformer) => (reducer) => (acc, val) =>
// //     reducer(acc, transformer(val))
// //   console.log(
// //     sequence(compose(map((kv) => ({ [kv[0]]: kv[1].map(R.add(1)) }))), {
// //       a: [1, 2, 3],
// //       b: [2, 3, 4],
// //     })
// //   ) // {a: [2, 3, 4], b: [3, 4, 5]}
// // }

// // TODO:
// {
// }

// export default ''
