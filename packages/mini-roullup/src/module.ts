/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-23 22:09:25
 * @LastEditTime: 2023-11-23 22:24:43
 * @LastEditors: wsy
 */
import MagicString from 'magic-string'
import { type Program, parse } from 'acorn'
import type Bundle from './bundle'
import analyse from './analyse'

interface ModuleConfig {
  code: string
  path: string
  bundle: Bundle
}

class Module {
  code: MagicString
  path: string
  bundle: Bundle
  ast: Program
  constructor(config: ModuleConfig) {
    this.code = new MagicString(config.code)
    this.path = config.path
    this.bundle = config.bundle
    this.ast = parse(config.code, {
      ecmaVersion: 8,
      sourceType: 'module',
    })
    analyse(this.ast, this.code, this)
  }
}

export default Module
