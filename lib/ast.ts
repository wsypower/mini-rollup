/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-04-13 12:48:11
 * @LastEditTime: 2023-04-13 22:40:03
 * @LastEditors: wsy
 */
import type MagicString from 'magic-string'
import type acorn from 'acorn'
import { simple } from 'acorn-walk'
import type Module from './Module'

function analyse(ast: acorn.Node, code: MagicString, module: Module) {
  // 开启第一轮的循环
  (ast as any).body.forEach((statement: any) => {
    Object.defineProperties(statement, {
      _module: {
        value: module,
      },
      _source: {
        value: code.snip(statement.start, statement.end),
      },
      _includes: {
        value: false,
        writable: true,
      },
      _dependsOn: {
        value: {},
      },
    })
    // 导入了那些变量
    if (statement.type === 'ImportDeclaration') {
      const specifiers = statement.specifiers
      // 获取导入的模块路径
      const source = statement.source.value
      specifiers.forEach((specifier: any) => {
        const importName = specifier.imported.name
        const localName = specifier.local.name
        module.imports[localName] = { source, importName }
      })
    }
    // 导出了那些变量
    else if (statement.type === 'ExportNamedDeclaration') {
      const declaration = statement.declaration
      if (declaration && declaration.type === 'VariableDeclaration') {
        const delcarations = declaration.delcarations
        delcarations.forEach((variableDeclarator: any) => {
          const localName = variableDeclarator.id.name
          const exportName = localName
          module.exports[exportName] = { localName }
        })
      }
    }
  });

  // 开启第二轮的循环
  // const currentScope = new Scope({ name: '模块内的顶级作用域' })
  (ast as any).body.forEach((statement: any) => {
    simple(statement, {
      // 导出了那些变量
      Identifier(node: any) {
        statement._dependsOn[node.name] = true
      },
      CallExpression(node: any) {
        console.log(node)
      },
    })
  })
}

export { analyse }
