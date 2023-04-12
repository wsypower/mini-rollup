/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-04-10 12:48:15
 * @LastEditTime: 2023-04-11 12:50:07
 * @LastEditors: wsy
 */
import path from 'node:path'
import fs from 'node:fs'
import Module from './Module'

interface BundleOptions {
  entry: string
}

class Bundle {
  entry: string
  entryPath: string
  output!: string
  constructor(options: BundleOptions) {
    this.entry = options.entry
    this.entryPath = path.resolve(options.entry)
  }

  build(output: string) {
    const entryModule = this.fetchModule(this.entryPath)
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
}

export default Bundle
