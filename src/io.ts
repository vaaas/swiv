import { readdirSync, readFileSync, Stats, statSync } from "node:fs"

export class IO {
  read(pathname: string): NonSharedBuffer {
    return readFileSync(pathname)
  }

  stat(pathname: string): Stats {
    return statSync(pathname)
  }

  scandir(pathname: string): string[] {
    return readdirSync(pathname)
  }
}
