export type Node = HTMLNode | string | number

export type HTMLNode = {
  tag      : string
  attrs    : Record<string, string>
  children : Array<Node>
}

const DOCTYPE = '<!DOCTYPE html>'

export class HTMLDocument {
  private _head : Array<HTMLNode> = []
  private _body : Array<HTMLNode> = []

  head(head: Array<HTMLNode>): HTMLDocument {
    this._head = head
    return this
  }

  body(body: Array<HTMLNode>) {
    this._body = body
    return this
  }

  toString(): string {
    return DOCTYPE + serialise(
      h('html', {}, [
        h('head', {}, this._head),
        h('body', {}, this._body)
      ])
    )
  }
}

export const h
  : (tag: string, attrs?: Record<string, string>, children?: Array<Node>) => HTMLNode
  = (tag, attrs = {}, children = []) => ({ tag, attrs, children })

const serialise
  : (node: Node) => string
  = node => {
    switch (typeof node) {
      case 'string' : return node
      case 'object' : return serialiseHTMLNode(node)
      default       : return ''
    }
  }

const serialiseHTMLNode
  : (node: HTMLNode) => string
  = node => {
    let parts = '<' + node.tag
    const attrs = Object.entries(node.attrs)
    if (attrs.length) {
      for (const [name, value] of attrs) {
        parts += ` ${name}="${value}"`
      }
    }
    if (!node.children.length) {
      parts += '/>'
    } else {
      parts += '>'
      for (const child of node.children) {
        parts += serialise(child)
      }
      parts += `</${node.tag}>`
    }
    return parts
  }
