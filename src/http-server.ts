import { createServer, IncomingMessage, Server, ServerResponse }
                                  from "node:http"
import { writeResponse }          from "./http/response.ts"
import { Router }                 from "./http/router.ts"
import { fileEndpointInstaller }  from "./endpoints/file.ts"
import { indexEndpointInstaller } from "./endpoints/index.ts"

const makeRouter
  : () => Router
  = () => new Router().install(fileEndpointInstaller)
                      .install(indexEndpointInstaller)

export function HttpServer(port: number, host: string): Server {
  function requestListener(request: IncomingMessage, socket: ServerResponse) {
    const url      = decodeURIComponent(request.url || '/')
    const response = router.route(request.method, url)
    writeResponse(socket, response)
  }

  const router = makeRouter()
  const server = createServer(requestListener)
  server.listen(port, host)
  return server
}
