import { FileRepository } from "./file-repository.ts";
import { IO }             from "./io.ts";
import { inject }         from "./lib/provide-inject";

export const IOIdentifier             = Symbol('IO')
export const FileRepositoryIdentifier = Symbol('FileRepository')

export const useIO
  : () => IO
  = () => inject(IOIdentifier)

export const useFileRepository
  : () => FileRepository
  = () => inject(FileRepositoryIdentifier)
