class Rule {
  public readonly selector     : string
  public readonly declarations : Record<string, string>

  constructor(
    selector     : Rule['selector']    ,
    declarations : Rule['declarations'],
  ) {
    this.selector     = selector
    this.declarations = declarations
  }

  toString(): string {
    const block = Object.entries(this.declarations)
                        .map    (entry => `${entry[0]}: ${entry[1]};`)
                        .join   ('')
    return `${this.selector} { ${block} }`
  }
}

export class Stylesheet {
  private rules: Array<Rule>

  constructor(rules: Array<Rule> = []) {
    this.rules = rules
  }

  rule(selector: string, declarations: Record<string, string>): Stylesheet {
    const rule = new Rule(selector, declarations)
    this.rules.push(rule)
    return this
  }

  toString() {
    return this.rules.map(x => x.toString()).join('\n')
  }
}
