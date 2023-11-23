/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-23 21:18:03
 * @LastEditTime: 2023-11-23 21:29:52
 * @LastEditors: wsy
 */
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
  ],
  clean: true,
  sourcemap: true,
  outDir: './dist',
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
