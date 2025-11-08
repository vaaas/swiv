import { Response }                  from "../http/response";
import { IHandler, IRouteInstaller } from "../http/router"
import { useFileRepository }         from "../provisions"
import { imageList, indexLayout }    from "../views/templates";

export const indexEndpoint
  : () => IHandler
  = () => {
    const fileRepository = useFileRepository()
    return () => {
      const page = indexLayout(imageList(fileRepository.all()))
      return Response.html(page)
    }
  }

export const indexEndpointInstaller
  : IRouteInstaller
  = router => router.get('^/$', indexEndpoint())
