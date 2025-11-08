import { IO }    from "./io.ts"
import { useIO } from "./provisions.ts"

export class FileRepository {
  private readonly files : ReadonlyArray<string>
  private readonly io    : IO

  constructor(files: Array<string>) {
    this.files = files
    this.io    = useIO();
  }

  all(): ReadonlyArray<string> {
    return this.files
  }

  has(file: string): boolean {
    return this.files.includes(file)
  }

  get(file: string): NonSharedBuffer {
    return this.io.read(file)
  }
}
