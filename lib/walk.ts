/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-04-14 00:45:06
 * @LastEditTime: 2023-04-14 02:11:19
 * @LastEditors: wsy
 */

function walk(astNode: any, { enter, leave }: { enter: any; leave: any }) {
  visit(astNode, null, enter, leave)
}

function visit(node: any, parent: any, enter: any, leave: any) {
  if (enter)
    enter(node, parent)

  const keys = Object.keys(node).filter(key => typeof node[key] === 'object')
  keys.forEach((key) => {
    const value = node[key]
    if (Array.isArray(value)) {
      value.forEach((val) => {
        visit(val, node, enter, leave)
      })
    }
    else if (value && value.type) {
      visit(value, node, enter, leave)
    }
  })
  if (leave)
    leave(node, parent)
}

export default walk
