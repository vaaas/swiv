import { FileRepository } from "./file-repository.ts";
import { IO } from "./io.ts";
import { inject } from "./provide-inject.ts";
import { IRouter } from "./router.ts";

export const IOIdentifier = Symbol('IO')

export function useIO(): IO {
  return inject(IOIdentifier)
}


export const FileRepositoryIdentifier = Symbol('FileRepository')

export function useFileRepository(): FileRepository {
  return inject(FileRepositoryIdentifier)
}

export const RouterIdentifier = Symbol('Router')

export function useRouter(): IRouter {
  return inject(RouterIdentifier)
}
