import Dayjs from 'dayjs'
import { AlCalendarDate } from './type'

export const DateStringFormat = 'YYYY-MM-DD'

export const toDateStringValue = (date: AlCalendarDate) =>
  Dayjs()
    .set('year', date.year)
    .set('month', date.month)
    .set('date', date.day)
    .format(DateStringFormat)
