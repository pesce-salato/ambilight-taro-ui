import { Bem } from '@ambilight-taro/core'

const root = new Bem('calendar')

export const bem = {
  root,
  preset: root.hierarchies('preset'),
  scrollContainer: root.hierarchies('scroll-container'),
  scrollContent: root.hierarchies('scroll-content'),
  dayOfWeekBar: root.hierarchies('day-of-week-bar'),
  dayOfWeekTitle: root.hierarchies('day-of-week-title'),
  day: root.hierarchies('day'),
  monthTitle: root.hierarchies('month-title'),
  monthCard: root.hierarchies('month-card'),
  monthGrid: root.hierarchies('month-grid'),
  monthRow: root.hierarchies('month-row'),
  monthTooltip: root.hierarchies('month-tooltip')
}
