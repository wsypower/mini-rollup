/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-23 21:12:49
 * @LastEditTime: 2023-11-23 22:11:11
 * @LastEditors: wsy
 */
import fs from 'node:fs'
import path from 'node:path'
import Module from './module'

interface BundleConfig {
  entry: string
}

class Bundle {
  entry: string
  constructor(config: BundleConfig) {
    this.entry = path.resolve(config.entry)
  }

  build(output: string) {
    const entryModule = this.fetchModule(this.entry)
    console.log(entryModule)
  }

  fetchModule(importee: string) {
    const router = importee
    if (router) {
      const code = fs.readFileSync(router, 'utf-8')
      const module = new Module({
        code,
        path: router,
        bundle: this,
      })
    }
  }
}

export default Bundle
