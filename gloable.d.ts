/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-04-13 01:58:35
 * @LastEditTime: 2023-04-13 02:18:42
 * @LastEditors: wsy
 */

import { Node } from 'acorn';
import MagicString from 'magic-string';

declare module 'acorn' {
  interface Node {
    _module: Module
    _source: MagicString
    _includes: boolean
  }
}
