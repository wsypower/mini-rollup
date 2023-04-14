/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-04-11 12:48:38
 * @LastEditTime: 2023-04-14 13:00:54
 * @LastEditors: wsy
 */
import MagicString from 'magic-string'
import type { Node } from 'acorn'
import { parse } from 'acorn'
import { analyse } from './ast'
import type Bundle from './bundle'

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
      const statements: acorn.Node[] = this.expandStatement(statement)
      allStatements.push(...statements)
    })
    return allStatements
  }

  expandStatement(statement: Node) {
    (statement as any)._includes = true
    const result: acorn.Node[] = []
    result.push(statement)
    return result
  }
}

export default Module
