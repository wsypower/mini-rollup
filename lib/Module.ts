/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-04-11 12:48:38
 * @LastEditTime: 2023-04-12 12:48:49
 * @LastEditors: wsy
 */
import MagicString from 'magic-string'
import type acorn from 'acorn'
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
  ast: acorn.Node
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
}

export default Module
