import { ValueOf, AlBaseFcProps } from '@ambilight-taro/core'

export const AlCalendarWeekRowFirstDay = {
  mon: 'mon',
  sun: 'sun'
} as const

export type AlCalendarWeekRowFirstDay = ValueOf<typeof AlCalendarWeekRowFirstDay>

export const AlCalendarType = {
  single: 'single',
  range: 'range',
  multiple: 'multiple'
} as const

export type AlCalendarType = ValueOf<typeof AlCalendarType>

export const AlCalendarDayStatus = {
  unselected: 'unselected',
  rangeMiddle: 'range-middle',
  rangeStart: 'range-start',
  rangeEnd: 'range-end',
  rangeStartAndEnd: 'range-start-and-end',
  selected: 'selected'
} as const

export type AlCalendarDayStatus = ValueOf<typeof AlCalendarDayStatus>

export interface AlCalendarDate {
  year: number
  /**
   * 0 - 11
   */
  month: number
  day: number
}

/**
 * @param dayOfWeek 0 (Sunday) to 6 (Saturday).
 */
export type AlCalendarDayOfWeekTitleRender = (dayOfWeek: number) => React.ReactNode

/**
 * @param month 0-11
 */
export type AlCalendarMonthTitleRender = (year: number, month: number) => React.ReactNode

export interface AlCalendarPresetRenderStruct {
  main: React.ReactNode
  top?: React.ReactNode
  bottom?: React.ReactNode
  className?: string
  insert?: React.ReactNode
}

export type AlCalendarDayRender = (
  date: AlCalendarDate,
  status: AlCalendarDayStatus
) => React.ReactNode | AlCalendarPresetRenderStruct

export interface AlCalendarProps extends AlBaseFcProps {
  /**
   * @default 'single'
   */
  type?: AlCalendarType

  dayRender?: AlCalendarDayRender

  /**
   * @default 三个月前
   */
  min?: string
  /**
   * @default 三个月后
   */
  max?: string

  /**
   * @format YYYY-MM-DD
   */
  value?: string[]
  /**
   * @format YYYY-MM-DD
   */
  defaultValue?: string[]

  onChange?: (v: string[]) => void

  /**
   * 每周的第一列
   * @default 'mon' 周一
   */
  weekRowFirstDay?: AlCalendarWeekRowFirstDay

  dayOfWeekTitleRender?: AlCalendarDayOfWeekTitleRender

  monthTitleRender?: AlCalendarMonthTitleRender
}

export interface AlCalendarReference {
  scrollTo: (year: number, month: number) => void
}
