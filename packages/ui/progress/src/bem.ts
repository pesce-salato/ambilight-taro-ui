import { Bem } from '@ambilight-taro/core'

const root = new Bem('progress')

export const bem = { root, bar: root.hierarchies('bar') }
