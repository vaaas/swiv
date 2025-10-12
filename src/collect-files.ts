import { resolve } from "node:path";
import { Pipeline } from "./pipeline.ts";
import { flatMap, map, materialise } from "./iterables.ts";
import { IO } from "./io.ts";

export const collectFiles
  : (files: string[], io: IO) => string[]
  = (files, io) =>
    Pipeline.of     (files)
            .then   (flatMap(walk(io)))
            .then   (map(resolve))
            .finally(materialise)

const walk = (io: IO) => function* walkInner(root: string): Iterable<string> {
  const stats = io.stat(root)
  if (stats.isFile()) {
    yield root
  } else if (stats.isDirectory()) {
    const children = io.scandir(root).map(x => `${root}/${x}`)
    for (const child of children) {
      yield* walkInner(child)
    }
  }
}
