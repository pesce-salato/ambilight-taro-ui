import { AlBaseFcProps, EnumValueUnion } from '@ambilight-taro/core'

export enum AlCalendarWeekRowFirstDay {
  mon = 'mon',
  sun = 'sun'
}

export enum AlCalendarType {
  single = 'single',
  range = 'range',
  multiple = 'multiple'
}

export enum AlCalendarDayStatus {
  unselected = 'unselected',
  rangeMiddle = 'range-middle',
  rangeStart = 'range-start',
  rangeEnd = 'range-end',
  rangeStartAndEnd = 'range-start-and-end',
  selected = 'selected'
}

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
  status: EnumValueUnion<AlCalendarDayStatus>
) => React.ReactNode | AlCalendarPresetRenderStruct

export interface AlCalendarProps extends AlBaseFcProps {
  /**
   * 类型
   * @default 'single'
   */
  type?: EnumValueUnion<AlCalendarType>
  /**
   * 自定义 日期渲染器
   */
  dayRender?: AlCalendarDayRender
  /**
   * 最小日期
   * @format YYYY-MM-DD
   * @default 三个月前
   */
  min?: string
  /**
   * 最大日期
   * @format YYYY-MM-DD
   * @default 三个月后
   */
  max?: string
  /**
   * 选择值
   * @format YYYY-MM-DD
   */
  value?: string[]
  /**
   * 默认值
   * @format YYYY-MM-DD
   */
  defaultValue?: string[]
  /**
   * 值改变事件
   */
  onChange?: (v: string[]) => void
  /**
   * 每周的第一列
   * @default 'mon' 周一
   */
  weekRowFirstDay?: EnumValueUnion<AlCalendarWeekRowFirstDay>
  /**
   * 自定义 周每日标题渲染器
   */
  dayOfWeekTitleRender?: AlCalendarDayOfWeekTitleRender
  /**
   * 自定义 月标题渲染器
   */
  monthTitleRender?: AlCalendarMonthTitleRender
}

export interface AlCalendarReference {
  scrollTo: (year: number, month: number) => void
}
