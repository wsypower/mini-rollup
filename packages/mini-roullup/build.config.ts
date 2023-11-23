/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-23 21:18:03
 * @LastEditTime: 2023-11-23 21:47:43
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
  stubOptions: {
    jiti: {
      debug: true,
      sourceMaps: true,
    },
  },
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
