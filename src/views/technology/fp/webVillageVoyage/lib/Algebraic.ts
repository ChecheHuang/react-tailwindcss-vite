import { concat } from 'lodash'

import { matchL } from './Adt'
import { List, cons, nil } from './List'

type AddAll = (xs: List<number>) => number

const addAll: AddAll = (xs) =>
  matchL(
    () => 0,
    (head, tail: List<number>) => head + addAll(tail),
  )(xs)

console.log(addAll(cons(2, cons(3, cons(4, nil)))))

type MultiplyAll = (xs: List<number>) => number
const multiplyAll: MultiplyAll = (xs) =>
  matchL(
    () => 1,
    (head, tail: List<number>) => head * multiplyAll(tail),
  )(xs)

console.log(multiplyAll(cons(2, cons(3, cons(4, nil)))))

type AppendAll = (xs: List<string>) => string

const appendAll: AppendAll = matchL(
  () => '',
  (head, tail: List<string>) => head + appendAll(tail),
)
console.log(appendAll(cons('a', cons('b', cons('c', nil)))))

interface Magma<A> {
  concat: (x: A, y: A) => A
}

interface Semigroup<A> extends Magma<A> {}

const addSemigroup: Semigroup<number> = {
  concat: (x, y) => x + y,
}

const multiplySemigroup: Semigroup<number> = {
  concat: (x, y) => x * y,
}

const appendSemigroup: Semigroup<string> = {
  concat: (x, y) => x + y,
}

const concatAll =
  <A>(s: Semigroup<A>) =>
  (startWith: A) =>
  (xs: List<A>): A =>
    matchL(
      () => startWith,
      (head: A, tail: List<A>) => s.concat(head, concatAll(s)(startWith)(tail)),
    )(xs)
console.log(concatAll(addSemigroup)(0)(cons(2, cons(3, cons(4, nil)))))
console.log(concatAll(multiplySemigroup)(1)(cons(2, cons(3, cons(4, nil)))))
console.log(
  concatAll(appendSemigroup)('')(cons('a', cons('b', cons('c', nil)))),
)

export interface Monoid<A> extends Semigroup<A> {
  empty: A
}

const addMonoid: Monoid<number> = {
  ...addSemigroup,
  empty: 0,
}

const multiplyMonoid: Monoid<number> = {
  ...multiplySemigroup,
  empty: 1,
}

const appendMonoid: Monoid<string> = {
  ...appendSemigroup,
  empty: '',
}

const concatAll2 =
  <A>(m: Monoid<A>) =>
  (xs: List<A>): A =>
    matchL(
      () => m.empty,
      (head: A, tail: List<A>) => m.concat(head, concatAll2(m)(tail)),
    )(xs)

console.log(concatAll2(addMonoid)(cons(2, cons(3, cons(4, nil)))))
console.log(concatAll2(multiplyMonoid)(cons(2, cons(3, cons(4, nil)))))
console.log(concatAll2(appendMonoid)(cons('a', cons('b', cons('c', nil)))))
