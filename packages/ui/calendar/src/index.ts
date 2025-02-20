import Dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

Dayjs.extend(isBetween)

export * from './component'
export * from './type'
export * from './preset/cn'
