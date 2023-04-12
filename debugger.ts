/*
 * @Description: :
 * @Author: wsy
 * @Date: 2023-04-06 13:04:56
 * @LastEditTime: 2023-04-13 02:30:55
 * @LastEditors: wsy
 */
import path from 'node:path'
import rollup from './lib/rollup'

const entry = path.resolve(__dirname, './src/index.js')
const output = path.resolve(__dirname, './dist/index.js')

rollup(entry, output)
