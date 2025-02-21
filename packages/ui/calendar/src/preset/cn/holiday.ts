import { Cache, formatMessage } from '@ambilight-taro/core'
import Taro from '@tarojs/taro'
import Dayjs from 'dayjs'
import { bem } from '../../component/bem'
import { AlCalendarDate } from '../../type'

export interface CnHolidayJsonObject {
  days: CnHoliday[]
}

export interface CnHoliday {
  /**
   * 引起休假、补班的假日名
   */
  name: string
  /**
   * 公历日期 （YYYY-MM-DD）
   */
  date: string
  /**
   * 是否休假
   * - false 为补班
   */
  isOffDay: boolean
}

export interface AlCalendarPresetCnHolidayDetail extends CnHoliday {
  festival?: string
}

const holidayCache = Cache.app.getOrCreate<
  Map<
    number,
    | Map<string, AlCalendarPresetCnHolidayDetail>
    | Promise<Map<string, AlCalendarPresetCnHolidayDetail>>
  >
>(`${bem.root.className}/cn-preset-holiday`, new Map())

const solarFestivalMap = {
  '01-01': '元旦',
  '05-01': '劳动节',
  '10-01': '国庆节'
}

export const getHolidayOfYear = async (year: number, json: string | CnHolidayJsonObject) => {
  const toDayMap = (jsonObject: CnHolidayJsonObject) => {
    const { days = [] } = jsonObject
    const cache = new Map<string, AlCalendarPresetCnHolidayDetail>()

    for (const day of days) {
      cache.set(day.date, {
        ...day,
        festival: solarFestivalMap[Dayjs(day.date).format('MM-DD')]
      })
    }

    return cache
  }

  if (typeof json !== 'string') {
    const cache = toDayMap(json)
    holidayCache.set(year, cache)
    return cache
  }

  const url = json

  if (holidayCache.has(year)) {
    return await holidayCache.get(year)!
  }

  const promise = new Promise<Map<string, CnHoliday>>((resolve, reject) => {
    Taro.request({
      method: 'GET',
      success: (result) => {
        const cache = toDayMap(result.data)
        holidayCache.set(year, cache)

        resolve(cache)
      },
      fail: () => {
        reject(new Error(`从 ${url} 获取 ${year} 中国节假日信息失败`))
      },
      url
    })
  })

  // 避免重复请求
  holidayCache.set(year, promise)

  return promise
}

export const getHolidayDetail = async (
  date: AlCalendarDate,
  holidayJson: string | CnHolidayJsonObject
): Promise<AlCalendarPresetCnHolidayDetail | undefined> => {
  let detailMap: Map<string, CnHoliday> | undefined

  try {
    detailMap = await getHolidayOfYear(date.year, holidayJson)
  } catch (error) {
    console.error(formatMessage(error.toString()))
  }

  return detailMap?.get(
    `${date.year}-${(date.month + 1).toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`
  )
}
