/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-04-13 12:48:11
 * @LastEditTime: 2023-04-18 13:26:49
 * @LastEditors: wsy
 */
import type MagicString from 'magic-string'
import type acorn from 'acorn'
import type Module from './Module'
import Scope from './scope'
import walk from './walk'
import { hasOwnProperty } from './utils'

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
      _defines: {
        value: {},
      },
      _modifies: {
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
        const delcarations = declaration.declarations
        delcarations.forEach((variableDeclarator: any) => {
          const localName = variableDeclarator.id.name
          const exportName = localName
          module.exports[exportName] = { localName }
        })
      }
    }
  })

  // 开启第二轮的循环
  let currentScope = new Scope({ name: '模块内的顶级作用域' })
  let newScope: Scope

  (ast as any).body.forEach((statement: any) => {
    function addToScope(name: string, isBlockDeclaration = false) {
      currentScope.add(name)
      if (!currentScope.parent || (currentScope.isBlack && !isBlockDeclaration)) {
        statement._defines[name] = true
        module.definitions[name] = statement
      }
    }
    function checkForReads(node: any) {
      if (node.type === 'Identifier')
        return statement._dependsOn[node.name] = true
    }
    function checkForWrites(node: any) {
      function addNode(node: any) {
        const { name } = node
        statement._modifies[name] = true
        if (!hasOwnProperty(module.modifications, name))
          module.modifications[name] = []

        module.modifications[name].push(statement)
      }
      if (node.type === 'AssignmentExpression')
        addNode(node.left)
      else if (node.type === 'UpdateExpression')
        addNode(node.argument)
    }
    walk(statement, {
      enter(node: any) {
        checkForReads(node)
        checkForWrites(node)
        switch (node.type) {
          case 'FunctionDeclaration':
          case 'ArrowFunctionDeclaration':
            addToScope(node.id.name)// 把函数名添加到当前的作用域变量中
            newScope = new Scope({
              name: node.id.name,
              parent: currentScope, // 当创建新的作用域的时候，父作用域就是当前作用域
              names: node.params.map((param: any) => param.name),
              isBlock: false, // 函数创建的不是一个块级作用域
            })
            break
          case 'VariableDeclaration':
            node.declarations.forEach((declaration: any) => {
              if (node.kind === 'let' || node.kind === 'const')
                addToScope(declaration.id.name, true)
              else
                addToScope(declaration.id.name, false)
            })
            break
          case 'BlockStatement':
            newScope = new Scope({ parent: currentScope, isBlock: true })
            break
          default:
            break
        }
        if (newScope) {
          Object.defineProperty(node, '_scope', { value: newScope })
          currentScope = newScope
        }
      },
      leave(node: any) {
        // eslint-disable-next-line no-prototype-builtins
        if (Object.hasOwnProperty(node))
          currentScope = currentScope.parent ?? currentScope
      },
    })
  })
}

export { analyse }
