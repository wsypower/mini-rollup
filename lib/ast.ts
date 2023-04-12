import type MagicString from 'magic-string'
import type acorn from 'acorn'
import type Module from './Module'

function analyse(ast: acorn.Node, code: MagicString, module: Module) {
  (ast as any).body.forEach((statement: acorn.Node) => {
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
        enumerable: true,
      },
    })
  })
}

export { analyse }
