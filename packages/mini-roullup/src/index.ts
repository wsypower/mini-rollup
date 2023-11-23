import Bundle from './bundle'

/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-17 21:20:56
 * @LastEditTime: 2023-11-23 21:54:52
 * @LastEditors: wsy
 */
interface RollupOptions {
  entry: string
  output: string
}

function rollup(config: RollupOptions) {
  const { entry, output } = config
  const bundle = new Bundle({ entry })
  bundle.build(output)
}

export default rollup
