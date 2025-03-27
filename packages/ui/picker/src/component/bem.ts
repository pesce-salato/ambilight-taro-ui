import { Bem } from '@ambilight-taro/core'

const root = new Bem('picker')

export const bem = {
  root,
  wrapper: root.hierarchies('wrapper'),
  optionWrapper: root.hierarchies('option-wrapper'),
  option: root.hierarchies('option'),
  optionHeightGager: root.hierarchies('option-height-gager'),
  mask: root.hierarchies('mask'),
  indicator: root.hierarchies('indicator'),
}
