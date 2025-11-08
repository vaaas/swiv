export class Pipeline<X> {
  private readonly x: X

  constructor(x: X) {
    this.x = x
  }

  static of<X>(x: X): Pipeline<X> {
    return new Pipeline(x)
  }

  then<Y>(f: (x: X) => Y): Pipeline<Y> {
    return Pipeline.of(f(this.x))
  }

  finally<Y>(f: (x: X) => Y): Y {
    return f(this.x)
  }
}
