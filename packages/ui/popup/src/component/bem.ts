import { Bem } from '@ambilight-taro/core'

const root = new Bem('popup')

export const bem = {
  root: root,
  mask: root.hierarchies('mask'),
  content: root.hierarchies('content'),
}
