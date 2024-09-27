import { List } from './List'
import { Option, none, some } from './Option'
import { Either, left, right } from './Either'
import { HKT, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { matchE as eitherMatch, matchW } from './Adt'

declare module 'fp-ts/HKT' {
  interface URItoKind<A> {
    List: List<A>
    Option: Option<A>
  }

  interface URItoKind2<E, A> {
    Either: Either<E, A>
  }
}

interface Functor<F> {
  URI: F
  map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}

interface Functor1<F extends URIS> {
  URI: F
  map: <A, B>(f: (x: A) => B) => (fa: Kind<F, A>) => Kind<F, B>
}

interface Functor2<F extends URIS2> {
  URI: F
  map: <E, A, B>(fa: Kind2<F, E, A>, f: (a: A) => B) => Kind2<F, E, B>
}

const optionFunctor: Functor1<'Option'> = {
  URI: 'Option',
  map: (f) =>
    matchW(
      () => none,
      (a) => some(f(a))
    ),
}
