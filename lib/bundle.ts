/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-04-10 12:48:15
 * @LastEditTime: 2023-04-10 13:02:55
 * @LastEditors: wsy
 */
import path from 'node:path'

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
  }
}

export default Bundle
