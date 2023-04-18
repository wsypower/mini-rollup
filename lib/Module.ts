/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-04-11 12:48:38
 * @LastEditTime: 2023-04-19 01:18:07
 * @LastEditors: wsy
 */
import MagicString from 'magic-string'
import type { Node } from 'acorn'
import { parse } from 'acorn'
import { analyse } from './ast'
import type Bundle from './bundle'
import { hasOwnProperty } from './utils/index'

const SYSTEM_VARS = ['console', 'log']

interface ModuleOptions {
  code: string
  path: string
  bundle: Bundle
}

class Module {
  code: MagicString
  path: string
  bundle: Bundle
  ast: Node
  // 存在依赖的模块
  imports: Record<string, any> = {}
  // 被依赖的模块
  exports: Record<string, any> = {}
  modifications: Record<string, any> = {}
  definitions: Record<string, any> = {}

  constructor(options: ModuleOptions) {
    this.code = new MagicString(options.code)
    this.path = options.path
    this.bundle = options.bundle
    this.ast = parse(options.code, {
      ecmaVersion: 8,
      sourceType: 'module',
    })
    analyse(this.ast, this.code, this)
  }

  expandAllStatements() {
    const allStatements: acorn.Node[] = [];
    (this.ast as any).body.forEach((statement: Node) => {
      if (statement.type === 'ImportDeclaration')
        return
      if (statement.type === 'VariableDeclaration')
        return
      const statements: acorn.Node[] = this.expandStatement(statement)
      allStatements.push(...statements)
    })
    return allStatements
  }

  expandStatement(statement: Node) {
    (statement as any)._includes = true
    const result: acorn.Node[] = []
    const _dependsOn = Object.keys((statement as any)._dependsOn)
    _dependsOn.forEach((name) => {
      const definition = this.define(name)
      result.push(...definition)
    })
    result.push(statement)
    const defines = Object.keys((statement as any)._defines)
    defines.forEach((name) => {
      const modifications = hasOwnProperty(this.modifications, name) && this.modifications[name]
      if (modifications) {
        modifications.forEach((statement: any) => {
          if (!statement._includes) {
            const modifies = this.expandStatement(statement)
            result.push(...modifies)
          }
        })
      }
    })
    return result
  }

  define(name: string): any[] {
    if (hasOwnProperty(this.imports, name)) {
      const { source, importName } = this.imports[name]
      const importModule = this.bundle.fetchModule(source, this.path)
      const { localName } = importModule.exports[importName]
      return importModule.define(localName)
    }
    else {
      const statement = this.definitions[name]

      if (statement) {
        if (statement._includes)
          return []
        else
          return this.expandStatement(statement)
      }
      else {
        if (SYSTEM_VARS.includes(name))
          return []
        else
          throw new Error(`Cannot find name '${name}'`)
      }
    }
  }
}

export default Module
