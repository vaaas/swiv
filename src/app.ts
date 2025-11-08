import { argv } from 'node:process'
import { provide } from './lib/provide-inject'
import { FileRepositoryIdentifier, IOIdentifier, RouterIdentifier } from './provisions.ts'
import { IO } from './io.ts'
import { FileRepository } from './file-repository.ts'
import { Router } from './router.ts'
import { HttpServer } from './http-server.ts'
import { collectFiles } from './collect-files.ts'

export function main() {
  const io = new IO()
  const files = collectFiles(argv.slice(2), io)
  provide(IOIdentifier, io)
  provide(FileRepositoryIdentifier, new FileRepository(files))
  provide(RouterIdentifier, Router())
  HttpServer(8000, '0.0.0.0')
}
