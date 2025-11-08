import { Response } from "../http/response";
import { IHandler, IRouteInstaller } from "../http/router";
import { MIMETYPE } from "../mimetype";
import { useFileRepository } from "../provisions";

export const fileEndpoint
  : () => IHandler<[string]>
  = () => {
    const fileRepository = useFileRepository();
    return path => {
      if (fileRepository.has(path)) {
        const blob = fileRepository.get(path)
        return new Response(200, {'Content-Type': MIMETYPE.BINARY}, blob)
      } else {
        return new Response(404, {}, 'File not found: ' + path)
      }
    }
  }

export const fileEndpointInstaller
  : IRouteInstaller
  = router => router.get('^(/.+)$', fileEndpoint())
