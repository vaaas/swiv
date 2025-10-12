export const map
  : <A, B>(f: (x: A) => B) => (xs: Iterable<A>) => Iterable<B>
  = f => function* (xs) {
    for (const x of xs) yield f(x)
  }

export const flatMap
  : <A, B>(f: (x: A) => Iterable<B>) => (xs: Iterable<A>) => Iterable<B>
  = f => function* (xs) {
    for (const x of xs) yield* f(x)
  }

export const materialise
  : <X>(xs: Iterable<X>) => Array<X>
  = xs => Array.from(xs)
