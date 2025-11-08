import { ServerResponse } from "node:http"
import { MIMETYPE }       from "../mimetype"

export class Response {
  status  : number
  headers : Record<string, string>
  body    : string | Buffer

  constructor(
    status  : Response['status'] ,
    headers : Response['headers'],
    body    : Response['body']
  ) {
    this.status  = status
    this.headers = headers
    this.body    = body
  }

  static html(html: string): Response {
    return new Response(200, { 'Content-Type': MIMETYPE.HTML }, html)
  }

  public withStatus(status: Response['status']): this {
    this.status = status
    return this
  }
}

export const writeResponse
  : (socket: ServerResponse, response: Response) => void
  = (socket, response) => socket.writeHead(response.status, response.headers)
                                .end      (response.body)
