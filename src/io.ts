import { readFileSync } from "node:fs"

export class IO {
  read(pathname: string): NonSharedBuffer {
    return readFileSync(pathname)
  }
}
