import SolarLunarOriginal from 'solarlunar'
import { AlCalendarDate } from '../../type'

const SolarLunar = SolarLunarOriginal as unknown as SolarLunar

export interface SolarLunarDetail {
  /**
   * 阴历年（数字）
   */
  lYear: number
  /**
   * 阴历月（数字）
   */
  lMonth: number
  /**
   * 阴历日（数字）
   */
  lDay: number
  /**
   * 年份属相
   */
  animal: string
  /**
   * 阴历月（中文）
   */
  monthCn: string
  /**
   * 阴历日（中文）
   */
  dayCn: string
  cYear: number
  cMonth: number
  cDay: number
  /**
   * 干支纪年
   */
  gzYear: string
  /**
   * 干支纪月
   */
  gzMonth: string
  /**
   * 干支纪日
   */
  gzDay: string
  isToday: boolean
  isLeap: boolean
  nWeek: number
  ncWeek: string
  isTerm: boolean
  /**
   * 节气
   */
  term: string
}

export interface AlCalendarPresetCnLunarDetail extends SolarLunarDetail {
  /**
   * 阴历节日
   */
  festival?: string
}

interface SolarLunar {
  /**
   * 从阳历日期转换到阴历，并且获取对应阴历信息
   * @param year 年份
   * @param month 月份
   * @param day 日期
   * @returns 阴历信息 https://www.npmjs.com/package/solarlunar
   */
  solar2lunar: (year: number, month: number, day: number) => SolarLunarDetail
}

const lunarFestivalMap = {
  '01-01': '春节',
  '01-15': '元宵节',
  '02-02': '龙抬头',
  '05-05': '端午节',
  '07-07': '七夕',
  '07-15': '中元节',
  '08-15': '中秋节',
  '09-09': '重阳节',
  '12-08': '腊八节',
  '12-23': '北方小年',
  '12-24': '南方小年'
}

export const getLunarDetail = (date: AlCalendarDate): AlCalendarPresetCnLunarDetail => {
  const detail = SolarLunar.solar2lunar(date.year, date.month + 1, date.day)

  return {
    ...detail,
    festival:
      lunarFestivalMap[
        `${detail.lMonth.toString().padStart(2, '0')}-${detail.lDay.toString().padStart(2, '0')}`
      ]
  }
}
