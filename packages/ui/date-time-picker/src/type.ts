import { AlBaseFcProps, EnumValueUnion } from '@ambilight-taro/core'

export enum AlDateTimePickerFineness {
  year = 'year',
  month = 'month',
  day = 'day',
  hour = 'hour',
  minute = 'minute',
  hourOfDay = 'hour-of-day',
  minuteOfDay = 'minute-of-day'
}

export enum AlDateTimePickerColumn {
  day = 'day',
  hour = 'hour',
  minute = 'minute',
  month = 'month',
  year = 'year'
}

export type AlDateTimePickerFormatter = (
  /**
   * 当前对应处理节点的类型
   */
  column: EnumValueUnion<AlDateTimePickerColumn>,
  /**
   * 列下标
   */
  columnIndex: number,

  detail: {
    /**
     * 正在处理的行对应值
     */
    rowValue: number
    /**
     * 当前整体选择的值
     */
    currentSelectedValue: number[]
  }
) => React.ReactNode

export type AlDateTimePickerFilter = (
  /**
   * 当前对应处理节点的类型
   */
  column: EnumValueUnion<AlDateTimePickerColumn>,
  /**
   * 列下标
   */
  columnIndex: number,

  detail: {
    /**
     * 正在处理的行对应值
     */
    rowValue: number
    /**
     * 当前整体选择的值
     * @warning 只有时间范围大于当前列的选中数据才是准确的（系统会根据设定的 range 和 filter，从大至小确认具体的范围，然后约束其值）
     */
    currentSelectedValue: number[]
  }
) => boolean

export interface AlDateTimePickerRange {
  /**
   * 日期范围，限定年、月、日范围
   * @default [五年前, 五年后]
   */
  date?: [number, number]
  /**
   * 小时范围
   * @default [0, 23]
   */
  hour?: [number, number]
  /**
   * 分钟范围
   * @default [0, 59]
   */
  minute?: [number, number]
}

export interface AlDateTimePickerProps extends AlBaseFcProps {
  /**
   * 选中值，其长度和每一项代表的值与 `fineness` 有关
   * - 'year' -> [year]
   * - 'month' -> [year, month]
   * - 'day' -> [year, month, day]
   * - 'hour' -> [hour]
   * - 'minute' -> [hour, minute]
   * - 'hour-of-day' -> [year, month, day, hour]
   * - 'minute-of-day' -> [year, month, day, hour, minute]
   */
  value?: number[]
  /**
   * 默认选中值，其长度和每一项代表的值与 `fineness` 有关
   * - 'year' -> [year]
   * - 'month' -> [year, month]
   * - 'day' -> [year, month, day]
   * - 'hour' -> [hour]
   * - 'minute' -> [hour, minute]
   * - 'hour-of-day' -> [year, month, day, hour]
   * - 'minute-of-day' -> [year, month, day, hour, minute]
   */
  defaultValue?: number[]
  /**
   * 值改变事件
   */
  onChange?: (v: number[]) => void

  /**
   * 日期时间选择器选择数据精细度
   * @default 'day' value -> [year,month,day]
   */
  fineness?: EnumValueUnion<AlDateTimePickerFineness>
  /**
   * option 自定义格式化展示
   */
  formatter?: AlDateTimePickerFormatter
  /**
   * 过滤不需要展示的项
   */
  filter?: AlDateTimePickerFilter
  /**
   * 范围设定
   */
  range?: AlDateTimePickerRange
}
