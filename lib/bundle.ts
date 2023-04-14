/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-04-10 12:48:15
 * @LastEditTime: 2023-04-15 03:06:54
 * @LastEditors: wsy
 */
import path from 'node:path'
import fs from 'node:fs'
import { Bundle as MagicBundle } from 'magic-string'
import { emptyDir } from 'fs-extra'
import Module from './Module'

interface BundleOptions {
  entry: string
}

class Bundle {
  entry: string
  entryPath: string
  output!: string
  statements!: acorn.Node[]
  constructor(options: BundleOptions) {
    this.entry = options.entry
    this.entryPath = path.resolve(options.entry)
  }

  build(output: string) {
    const entryModule = this.fetchModule(`${this.entryPath.replace(/\.js/, '')}.js`)
    if (entryModule) {
      this.statements = entryModule.expandAllStatements()
      const { code } = this.generate()
      const dir = path.dirname(output)
      emptyDir(dir).then(() => fs.writeFileSync(output, code))
    }
  }

  fetchModule(importee: string, importer?: string) {
    let route
    if (!importer) {
      route = importee
    }
    else {
      if (path.isAbsolute(importee))
        route = importee
      else
        route = path.resolve(path.dirname(importer), `${importee.replace(/\.js/, '')}.js`)
    }

    const code = fs.readFileSync(route, 'utf8')
    const module = new Module({
      code,
      path: route,
      bundle: this,
    })
    return module
  }

  generate() {
    const code = new MagicBundle({
      separator: '\n',
    })

    this.statements.forEach((statement) => {
      const source = (statement as any)._source
      if (statement.type === 'ExportNamedDeclaration')
        source.remove(statement.start, (statement as any).declaration.start)

      code.addSource({
        content: source,
      })
    })
    return { code: code.toString() }
  }
}

export default Bundle
