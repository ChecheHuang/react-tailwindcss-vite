type Compose = <A, B, C>(f: (x: B) => C, g: (x: A) => B) => (x: A) => C

export const compose: Compose = (f, g) => (x) => f(g(x))

type ComposeR = <A, B, C>(f: (x: A) => B, g: (x: B) => C) => (x: A) => C

export const composeR: ComposeR = (f, g) => (x) => g(f(x))
