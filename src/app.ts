import { argv } from 'node:process'
import { provide } from './provide-inject.ts'
import { FileRepositoryIdentifier, IOIdentifier, RouterIdentifier } from './provisions.ts'
import { IO } from './io.ts'
import { FileRepository } from './file-repository.ts'
import { Router } from './router.ts'
import { HttpServer } from './http-server.ts'

export function main() {
  const images = argv.slice(2)
  provide(IOIdentifier, new IO())
  provide(FileRepositoryIdentifier, new FileRepository(images))
  provide(RouterIdentifier, Router())
  HttpServer(8000, '0.0.0.0')
}
