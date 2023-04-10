/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-04-06 13:16:35
 * @LastEditTime: 2023-04-10 13:03:52
 * @LastEditors: wsy
 */
import Bundle from './bundle'

function rollup(entry: string, output: string) {
  const bundle = new Bundle({ entry })
  bundle.build(output)
}

export default rollup
