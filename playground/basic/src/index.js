/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-23 21:34:13
 * @LastEditTime: 2023-11-24 22:42:05
 * @LastEditors: wsy
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import rollup from 'mini-rollup'

function getFilePath(file) {
  return fileURLToPath(new URL(file, import.meta.url))
}
rollup({
  entry: getFilePath('./test.js'),
  output: getFilePath('./bundle.js'),
})
