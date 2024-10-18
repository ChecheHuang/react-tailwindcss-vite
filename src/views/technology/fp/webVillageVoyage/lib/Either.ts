import { compose } from 'ramda'
import { E } from 'vitest/dist/reporters-yx5ZTtEV'

function devideTwoIfEven(num: number): number {
  if (num === 0) {
    throw 'cannot devide by zero'
  } else if (num % 2 !== 0) {
    throw 'num is not even'
  } else {
    return 2 / num
  }
}

// console.log(devideTwoIfEven(8))
// // console.log(devideTwoIfEven(3))

export type Either<E, A> = Left<E> | Right<A>

export interface Left<E> {
  __tag: 'Left'
  left: E
}

export interface Right<A> {
  __tag: 'Right'
  right: A
}

export const left = <E, A = never>(e: E): Either<E, A> => ({
  __tag: 'Left',
  left: e,
})

export const right = <E, A = never>(a: A): Either<E, A> => ({
  __tag: 'Right',
  right: a,
})

export const isLeft = <E, A>(e: Either<E, A>): e is Left<E> =>
  e.__tag === 'Left'

function devideTwoIfEven2(num: number): Either<string, number> {
  if (num === 0) {
    return left('cannot devide by zero')
  } else if (num % 2 !== 0) {
    return left('num is not even')
  } else {
    return right(2 / num)
  }
}

// console.log(devideTwoIfEven2(8))
// console.log(devideTwoIfEven2(0))

type Increment = (x: number) => number
const increment: Increment = (x) => x + 1

const composed = compose(
  (x) => (isLeft(x) ? x : right(increment(x.right))),
  devideTwoIfEven2,
)

// console.log(composed(8))
// console.log(composed(0))
// console.log(composed(3))
