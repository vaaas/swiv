import { argv }           from 'node:process'
import { provide }        from './lib/provide-inject'
import { IO }             from './io.ts'
import { FileRepository } from './file-repository.ts'
import { HttpServer }     from './http-server.ts'
import { collectFiles }   from './collect-files.ts'
import { FileRepositoryIdentifier, IOIdentifier }
                          from './provisions.ts'

export const main
  : () => void
  = () => {
    const io    = new IO()
    const files = collectFiles(argv.slice(2), io)
    provide(IOIdentifier, io)
    provide(FileRepositoryIdentifier, new FileRepository(files))
    HttpServer(8000, '0.0.0.0')
  }
