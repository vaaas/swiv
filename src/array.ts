type ISortingFunction<X> = (a: X, b: X) => -1 | 0 | 1

export const sort
  : <X>(f: ISortingFunction<X>) => (xs: Array<X>) => Array<X>
  = f => xs => xs.toSorted(f)

export const alphabetically
  : <X extends string>(a: X, b: X) => -1 | 0 | 1
  = (a, b) => {
    if (a === b) {
      return 0
    } else if (a < b) {
      return -1
    } else {
      return 1
    }
  }
