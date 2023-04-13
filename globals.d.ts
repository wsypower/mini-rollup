/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-04-13 01:58:35
 * @LastEditTime: 2023-04-13 13:15:31
 * @LastEditors: wsy
 */
declare module 'acorn' {
  import type { Node } from 'acorn';
  import type MagicString from 'magic-string';

  interface Node {
    _module?: Module;
    _source?: MagicString;
    _includes?: boolean;
  }
  export { Node };
}
