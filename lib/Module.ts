/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-04-11 12:48:38
 * @LastEditTime: 2023-04-12 12:40:36
 * @LastEditors: wsy
 */
import MagicString from 'magic-string'
import { parse } from 'acorn'
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
  ast: any
  constructor(options: ModuleOptions) {
    this.code = new MagicString(options.code)
    this.path = options.path
    this.bundle = options.bundle
    this.ast = parse(options.code, {
      ecmaVersion: 8,
      sourceType: 'module',
    })
  }
}

export default Module
