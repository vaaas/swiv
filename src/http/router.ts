import { Maybe }    from "../lib/maybe.ts"
import { Response } from "./response.ts"

export type IRouter
  = (url: string) => Response

export type IHandler
  <XS extends Array<string> = []>
  = (...xs: XS) => Response

export type IRouteInstaller = (router: Router) => Router

type Method = 'GET'

class Route {
  public readonly method  : Method
  public readonly path    : string
  public readonly handler : IHandler

  constructor(
    method  : Route['method'] ,
    path    : Route['path']   ,
    handler : Route['handler']
  ) {
    this.method  = method
    this.path    = path
    this.handler = handler
  }

  match(method: unknown, url: string): Maybe<Array<string>> {
    if (method !== this.method)
      return undefined
    const matches = url.match(new RegExp(this.path))
    if (matches === null)
      return undefined
    matches.shift()
    return matches
  }
}

export class Router {
  private routes: Array<Route>

  constructor(routes: Router['routes'] = []) {
    this.routes = routes;
  }

  get<XS extends any[]>(path: string, handler: IHandler<XS>): this {
    const route = new Route('GET', path, handler)
    this.routes.push(route)
    return this
  }

  route(method: unknown, url: string): Response {
    for (const route of this.routes) {
      const match = route.match(method, url)
      if (match) {
        const handler: IHandler<Array<string>> = route.handler
        return handler(...match)
      }
    }
    return new Response(404, {}, '')
  }

  install(installer: IRouteInstaller): Router {
    return installer(this)
  }
}
