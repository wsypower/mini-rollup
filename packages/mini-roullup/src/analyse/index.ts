/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-23 22:25:19
 * @LastEditTime: 2023-11-24 22:16:19
 * @LastEditors: wsy
 */
import type { Program } from 'acorn'
import type MagicString from 'magic-string'
import type Module from '../module'

/**
 * @description: 分析模块
 * @param ast 语法数
 * @param code 代码
 * @param module 模块实例
 * @return {*}
 */
function analyse(ast: Program, code: MagicString, module: Module) {
  ast.body.forEach((statement) => {
    Object.defineProperties(statement, {
      // 指向自己的模块
      _module: {
        value: module,
      },
      // 这个语句对应的源代码
      _source: {
        value: code.snip(statement.start, statement.end),
      },
    })
  })
}

export default analyse
