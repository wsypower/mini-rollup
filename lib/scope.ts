interface ScopeOptions {
  name?: string
  parent?: Scope | null
  names?: string[]
  [key: string]: any
}

class Scope {
  name: string
  parent: Scope | null
  names: string[]

  constructor(options: ScopeOptions) {
    this.name = options.name ?? ''
    this.parent = options.parent ?? null
    this.names = options.names || []
  }

  add(name: string) {
    this.names.push(name)
  }

  findDefiningScope(name: string): any {
    if (this.names.includes(name))
      return this

    if (this.parent)
      return this.parent.findDefiningScope(name)

    return null
  }
}

export default Scope
