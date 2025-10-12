import { createServer, IncomingMessage, Server, ServerResponse } from "node:http"
import { useRouter } from "./provisions.ts"
import { writeResponse } from "./response"

export function HttpServer(port: number, host: string): Server {
  function requestListener(request: IncomingMessage, socket: ServerResponse) {
    const url = decodeURIComponent(request.url || '/')
    const response = router(url)
    writeResponse(socket, response)
  }

  const router = useRouter()
  const server = createServer(requestListener)
  server.listen(port, host)
  return server
}
