import { Bem } from '@ambilight-taro/core'

const root = new Bem('calendar')

export const bem = {
  root,
  preset: root.hierarchies('preset'),
  dayOfWeekBar: root.hierarchies('day-of-week-bar'),
  dayOfWeekTitle: root.hierarchies('day-of-week-title'),
  day: root.hierarchies('day')
}
