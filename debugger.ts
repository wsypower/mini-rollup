/*
 * @Description: :
 * @Author: wsy
 * @Date: 2023-04-06 13:04:56
 * @LastEditTime: 2023-04-11 12:43:01
 * @LastEditors: wsy
 */
import path from 'node:path'
import rollup from './lib/rollup'

const entry = path.resolve(__dirname, './src/index.ts')
const output = path.resolve(__dirname, './dist/index.js')

rollup(entry, output)
