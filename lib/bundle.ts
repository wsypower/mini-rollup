/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-04-10 12:48:15
 * @LastEditTime: 2023-04-13 21:14:12
 * @LastEditors: wsy
 */
import path from 'node:path'
import fs from 'node:fs'
import { Bundle as MagicBundle } from 'magic-string'
import { ensureDir } from 'fs-extra'
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
    const entryModule = this.fetchModule(this.entryPath)
    if (entryModule)
      this.statements = entryModule.expandAllStatements()
    const { code } = this.generate()
    const dir = path.dirname(output)
    ensureDir(dir).then(() => fs.writeFileSync(output, code))
  }

  fetchModule(importee: string) {
    const route = importee
    if (route) {
      const code = fs.readFileSync(route, 'utf8')
      const module = new Module({
        code,
        path: route,
        bundle: this,
      })
      return module
    }
  }

  generate() {
    const code = new MagicBundle({
      separator: '\n',
    })
    this.statements.forEach((statement) => {
      code.addSource({
        content: (statement as any)._source,
      })
    })
    return { code: code.toString() }
  }
}

export default Bundle
