import { on } from 'ramda'
import { Either, isLeft, left, right } from './Either'
import { Cons, List, cons, isNil, nil } from './List'
import { Option, None, none, some, Some, isNone } from './Option'
// import { match } from 'ts-pattern'

//TODO:option

type MatchW = <A, B, C>(
  onNone: () => B,
  onSome: (a: A) => C
) => (x: Option<A>) => B | C

export const matchW: MatchW = (onNone, onSome) => (x) =>
  isNone(x) ? onNone() : onSome(x.value)

const maybeNum: Option<number> = some(15)

const result_ = matchW(
  () => -2,
  (a: number) => `num is ${a}`
)(maybeNum)

// console.log(result_)
//TODO:either

type MatchE = <E, A, B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => (x: Either<E, A>) => B

export const matchE: MatchE = (onLeft, onRight) => (x) =>
  isLeft(x) ? onLeft(x.left) : onRight(x.right)

const errorOrNum: Either<string, number> = left('bad input')

const result__ = matchE(
  (e: string) => `Error happened: ${e}`,
  (a: number) => `num is ${a}`
)(errorOrNum)
// console.log(result__)

//TODO:list

type MatchL = <A, B>(
  onNil: () => B,
  onCons: (head: A, tail: List<A>) => B
) => (xs: List<A>) => B

export const matchL: MatchL = (onNil, onCons) => (xs) =>
  isNil(xs) ? onNil() : onCons(xs.head, xs.tail)

// const myList: List<number> = nil
const myList: List<number> = cons(1, cons(2, cons(3, nil)))
// const result = matchL(
//   () => `list is empty`,
//   (head: number, tail: List<number>) => `head is ${head}`
// )(myList)
// // console.log(result)

// const result = match(myList)
//   .with({ __tag: 'Nil' }, () => `list is empty`)
//   .with({ __tag: 'Cons' }, ({ head, tail }: Cons<number>) => `head is ${head}`)
//   .exhaustive()

// console.log(result)
