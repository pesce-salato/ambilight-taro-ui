import { Bem } from '@ambilight-taro/core'

const root = new Bem('tab-bar')

export const bem = {
  root,
  item: root.hierarchies('item'),
  iconAnchor: root.hierarchies('icon-anchor'),
  iconWrapper: root.hierarchies('icon-wrapper'),
  icon: root.hierarchies('icon'),
  title: root.hierarchies('title-wrapper'),
}
