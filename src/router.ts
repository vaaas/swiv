import { useFileRepository } from "./provisions.ts"
import { Response } from "./response.ts"
import { imageList, indexLayout } from "./templates.ts"

export type IRouter = (url: string) => Response;

export function Router(): IRouter {
  const fileRepository = useFileRepository()

  return function(url: string): Response {
    if (url === '/') {
      const page = indexLayout(imageList(fileRepository.all()))
      return Response.html(page)
    }
    const pathname = url.slice(1)
    if (fileRepository.has(pathname)) {
      const blob = fileRepository.get(pathname)
      return new Response(200, { 'Content-Type': 'application/octet-stream' }, blob)
    }

    return new Response(404, {}, '')
  }
}
