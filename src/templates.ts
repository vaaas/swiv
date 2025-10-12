const stylesheet = `
  html {
    background: black;
    overflow: hidden;
    scrollbar-width: none;
  }

  body {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0;
    overflow: scroll;
    scroll-snap-type: x mandatory;
  }

  figure {
    align-items: center;
    display: flex;
    height: 100dvh;
    justify-content: center;
    margin: 0;
    scroll-snap-align: start;
    width: 100dvw;
  }

  img {
    height: inherit;
    object-fit: contain;
    width: inherit;
  }
`

export function indexLayout(body: string) {
  return `
<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <title>swiv</title>
        <style>${stylesheet}</style>
    </head>

    <body>
      ${body}
    </body>
</html>
  `
}

export function imageList(images: Array<string> | ReadonlyArray<string>): string {
  return images.map(image).join('')
}

function image(src: string): string {
  return `<figure><img loading="lazy" src="${src}"></figure>`
}
