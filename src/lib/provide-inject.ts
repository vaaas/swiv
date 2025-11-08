type Identifier = number | string | symbol
type Context    = Record<Identifier, unknown>

const Stack
  : Array<Context>
  = [{}]

const localContext
  : () => Context
  = () => Stack.at(-1)!

export const provide
  : (key: Identifier, value: unknown) => void
  = (key, value) => {
    const context = localContext()
    context[key] = value
  }

export const inject
  : <T = unknown>(key: Identifier) => T
  = key => {
    const context = localContext()
    return context[key] as any
  }

export const withContext
  : (f: () => void) => void
  = f => {
    Stack.push({})
    f()
    Stack.pop()
  }
