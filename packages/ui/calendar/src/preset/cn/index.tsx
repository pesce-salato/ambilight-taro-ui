/* eslint-disable unicorn/consistent-function-scoping */
// eslint-disable-next-line import/default
import React, { useCallback, useState } from 'react'
import { View } from '@tarojs/components'
import { classnames } from '@ambilight-taro/core'
import { AlCalendarDayRender, AlCalendarDate } from '../../type'
import {
  getHolidayDetail,
  AlCalendarPresetCnHolidayDetail,
  CnHolidayJsonObject,
  getHolidayOfYear,
  CnHoliday
} from './holiday'
import { getLunarDetail, AlCalendarPresetCnLunarDetail } from './lunar'
import { bem } from '../../component/bem'
import { toDateStringValue } from '../../utils'
import './index.scss'

export interface AlCalendarPresetCnBuilderOptions {
  isLunarDisabled?: boolean
  isHolidayDisabled?: boolean
}

export interface AlCalendarPresetCnCellDetail {
  lunar?: AlCalendarPresetCnLunarDetail
  holiday?: AlCalendarPresetCnHolidayDetail
}

const getHolidayOfYearFromCdnUrl = (year: number) =>
  `https://cdn.salted-fish.org/ambilight-taro/holiday-cn/${year}.json`

const usePresetCnDayRender: ((
  options?: AlCalendarPresetCnBuilderOptions
) => AlCalendarDayRender) & {
  preload: (years: number[]) => Promise<Map<string, CnHoliday>[]>
  getHolidayOfYear?: ((year: number) => string | CnHolidayJsonObject) | undefined
} = ((options?: AlCalendarPresetCnBuilderOptions) => {
  const { isHolidayDisabled, isLunarDisabled } = options || {}
  const [dayDetailCache, setDayDetailCache] = useState<
    Record<string, AlCalendarPresetCnCellDetail | undefined>
  >({})

  const updateDayDetail = useCallback(
    async (date: AlCalendarDate) => {
      const dateStringValue = toDateStringValue(date)

      setDayDetailCache((pre) => {
        const detail = pre[dateStringValue] || {}
        if (detail.lunar && isLunarDisabled) {
          return { ...pre, [dateStringValue]: { ...detail, lunar: undefined } }
        }

        // 避免重复无用计算
        if (!detail.lunar && !isLunarDisabled) {
          return { ...pre, [dateStringValue]: { ...detail, lunar: getLunarDetail(date) } }
        }

        return pre
      })

      // holiday 做了缓存处理，故而此处不会出现重复计算
      const holiday = isHolidayDisabled
        ? undefined
        : await getHolidayDetail(
            date,
            (usePresetCnDayRender.getHolidayOfYear || getHolidayOfYearFromCdnUrl)(date.year)
          )

      setDayDetailCache((pre) => {
        const detail = pre[dateStringValue] || {}

        // holiday 从缓存中获取，在有值的情况下每次获取的是相同对象，故而不会造成重复渲染
        if (detail.holiday !== holiday) {
          return { ...pre, [dateStringValue]: { holiday } }
        }

        return pre
      })
    },
    [isHolidayDisabled, isLunarDisabled]
  )

  return useCallback(
    (date, status) => {
      updateDayDetail(date)

      const { lunar, holiday } = dayDetailCache[toDateStringValue(date)] || {}
      let bottomText = lunar?.dayCn
      let isLunarSpecialDay = false

      const bottomBem = bem.preset.hierarchies('cn-bottom')
      const insertBem = bem.preset.hierarchies('cn-insert')

      // 每个阴历月的第一天，底部展示月份
      if (lunar?.lDay === 1) {
        bottomText = lunar.monthCn
      }

      // 存在节气，则使用底部展示节气
      if (lunar?.isTerm) {
        bottomText = lunar.term
        isLunarSpecialDay = true
      }

      // 阴历节日
      if (lunar?.festival) {
        bottomText = lunar?.festival
        isLunarSpecialDay = true
      }

      // 阳历节日
      if (holiday?.festival) {
        bottomText = holiday?.festival
      }

      return {
        main: date.day,
        className: classnames(
          bem.preset.hierarchies('cn-day').status(status).className,
          bem.preset.hierarchies('cn-day').className
        ),
        bottom: (
          <View
            className={classnames(bottomBem.className, {
              [bottomBem.status('special-lunar').className]: isLunarSpecialDay,
              [bottomBem.status('special-solar').className]: holiday?.festival
            })}
          >
            {bottomText}
          </View>
        ),
        insert: holiday ? (
          <View
            className={classnames(
              insertBem.className,
              insertBem.status(holiday.isOffDay ? 'off-day' : 'work-day').className
            )}
          >
            {holiday.isOffDay ? '休' : '班'}
          </View>
        ) : undefined
      }
    },
    [dayDetailCache, updateDayDetail]
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as (options?: AlCalendarPresetCnBuilderOptions) => AlCalendarDayRender as any

usePresetCnDayRender.preload = (years: number[]) =>
  Promise.all(
    years.map((year) =>
      getHolidayOfYear(
        year,
        (usePresetCnDayRender.getHolidayOfYear || getHolidayOfYearFromCdnUrl)(year)
      )
    )
  )

export { usePresetCnDayRender }
