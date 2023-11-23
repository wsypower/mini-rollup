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
  console.log(ast, code, module)
}

export default analyse
