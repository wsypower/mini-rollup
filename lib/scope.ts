/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-04-14 12:51:09
 * @LastEditTime: 2023-04-19 01:34:33
 * @LastEditors: wsy
 */
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
  isBlock: boolean
  constructor(options: ScopeOptions) {
    this.name = options.name ?? ''
    this.parent = options.parent ?? null
    this.names = options.names || []
    this.isBlock = options.isBlock || false
  }

  add(name: string, isBlockDeclaration = false) {
    if (!isBlockDeclaration && this.isBlock)
      this.parent!.add(name)

    else
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
