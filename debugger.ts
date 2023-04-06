/*
 * @Description: :
 * @Author: wsy
 * @Date: 2023-04-06 13:04:56
 * @LastEditTime: 2023-04-06 13:15:31
 * @LastEditors: wsy
 */
// import rollup from './lib/rollup'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const entry = path.resolve(dirname, './src/index.ts')
const output = path.resolve(dirname, './dist/index.js')
