import { ServerResponse } from "node:http"
import { MIMETYPE } from "./mimetype.ts"

export class Response {
  status: number
  headers: Record<string, string>
  body: string | Buffer

  constructor(
    status: Response['status'],
    headers: Response['headers'],
    body: Response['body']
  ) {
    this.status = status
    this.headers = headers
    this.body = body
  }

  static html(html: string): Response {
    return new Response(200, { 'Content-Type': MIMETYPE.HTML }, html)
  }

  public withStatus(status: Response['status']): this {
    this.status = status
    return this
  }
}

export function writeResponse(socket: ServerResponse, response: Response) {
  socket.writeHead(response.status, response.headers)
  socket.end(response.body)
}
