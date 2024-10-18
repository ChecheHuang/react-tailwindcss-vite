import { matchW, matchL, matchE } from './Adt'
import { Either, left, right } from './Either'
import { List, cons, nil, showList } from './List'
import { Option, some, none } from './Option'
import { compose } from './compose'

type StrLength = (x: string) => number

const strLength: StrLength = (x) => x.length

console.log(strLength('abcd'))

type OptionStrLength = (Fx: Option<string>) => Option<number>
const strLength1: OptionStrLength = matchW(
  () => none,
  (value: string) => some(value.length),
)

console.log(strLength1(some('abcd')))
console.log(strLength1(none))

type Increment = (x: number) => number
const increment: Increment = (x) => x + 1

type OptionIncrement = (Fx: Option<number>) => Option<number>
const increment1: OptionIncrement = matchW(
  () => none,
  (value: number) => some(increment(value)),
)

console.log(increment1(some(12)))
console.log(increment1(none))

type MapOption = <A, B>(f: (x: A) => B) => (Fx: Option<A>) => Option<B>
const map_option: MapOption = (f) =>
  matchW(
    () => none,
    (value) => some(f(value)),
  )

const strLength2 = map_option(strLength)
const increment2 = map_option(increment)

console.log(strLength2(some('abcd')))
console.log(strLength2(none))
console.log(increment2(some(12)))
console.log(increment2(none))

const incrementLength = compose(increment, strLength)
console.log(incrementLength('abcd'))

const function1 = compose(map_option(increment), map_option(strLength))
const function2 = map_option(incrementLength)

console.log(function1(some('abcd')))
console.log(function2(some('abcd')))
console.log(function1(none))
console.log(function2(none))

const List1: List<string> = cons('a', cons('bb', cons('ccc', nil)))

type MapList = <A, B>(f: (x: A) => B) => (Fx: List<A>) => List<B>
const map_list: MapList = (f) =>
  matchL(
    () => nil,
    (head, tail) => cons(f(head), map_list(f)(tail)),
  )

const strLength3 = map_list(strLength)
console.log(showList(strLength3(List1)))
const increment3 = map_list(increment)
console.log(showList(increment3(cons(1, cons(2, cons(3, nil))))))

//Either<E,A>

type MapEither = <A, B, E>(f: (x: A) => B) => (Fx: Either<E, A>) => Either<E, B>
const map_either: MapEither = (f) =>
  matchE(
    (e) => left(e),
    (a) => right(f(a)),
  )

const increment4 = map_either(increment)
console.log(increment4(right(12)))
console.log(increment4(left('error')))

const strLength4 = map_either(strLength)
console.log(strLength4(right('abcd')))
console.log(strLength4(left('error')))

//Option<A>
//List<A>
//Either<E,A>
