type AnyObject = Record<string, any>
type Callback = () => void
type Nullable<T> = T | null
interface Binary<A, B, C> {
  (a: A, b: B): C
}
interface Unary<A, B> {
  (a: A): B
}
