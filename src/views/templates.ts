/** @ts-expect-error */
import clientScript   from '../assets/client-script.js';
import { Stylesheet } from '../lib/css.js';
import { h, HTMLDocument, HTMLNode }
                      from '../lib/html.js';

const stylesheet = new Stylesheet()
  .rule('html', {
    'background'      : 'black' ,
    'overflow'        : 'hidden',
    'scrollbar-width' : 'none'  ,
  })
  .rule('body', {
    'align-items'      : 'center'     ,
    'display'          : 'flex'       ,
    'flex-direction'   : 'row'        ,
    'justify-content'  : 'flex-start' ,
    'margin'           : '0'          ,
    'overflow'         : 'auto'       ,
    'scroll-snap-type' : 'x mandatory',
  })
  .rule('figure', {
    'align-items'       : 'center',
    'display'           : 'flex'  ,
    'height'            : '100dvh',
    'justify-content'   : 'center',
    'margin'            : '0'     ,
    'scroll-snap-align' : 'start' ,
    'width'             : '100dvw',
  })
  .rule('img', {
    'height'     : 'inherit',
    'object-fit' : 'contain',
    'width'      : 'inherit',
  })
  .toString()

const IEFE
  : (f: Function) => string
  = f => `(${f.toString()}())`

const script = IEFE(clientScript)

export const indexLayout
  : (body: Array<HTMLNode>) => string
  = body =>
    new HTMLDocument().head([
                        h('meta', { charset: 'utf-8' }),
                        h('meta', {
                          name    : 'viewport',
                          content : 'width=device-width, initial-scale=1'
                        }),
                        h('title', {}, ['swiv']),
                        h('style', {}, [stylesheet]),
                        h('script', {}, [script]),
                      ])
                      .body(body)
                      .toString()

export const imageList
  : (images: Array<string> | ReadonlyArray<string>) => Array<HTMLNode>
  = images => images.map(image)

const image
  : (src: string, index: number) => HTMLNode
  = (src, index) => h(
    'figure',
    {
      id: index.toString(),
      onvisible: `updateHash(${index})`
    },
    [ h('img', { loading: 'lazy', src }) ]
  )
