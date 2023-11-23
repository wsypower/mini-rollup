/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-23 21:12:49
 * @LastEditTime: 2023-11-23 22:04:39
 * @LastEditors: wsy
 */
import fs from 'node:fs'
import path from 'node:path'

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
      fs.readFileSync(router, 'utf-8')
    }
  }
}

export default Bundle
