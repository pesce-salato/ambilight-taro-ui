import React, { useCallback, useState } from 'react'
import { Bem } from '@ambilight-taro/core'
import { ScrollView, View } from '@tarojs/components'
import { AlBasicView } from '@ambilight-taro/basic-view'
import {
  AlDateTimePickerColumn,
  AlDateTimePickerFilter,
  AlDateTimePickerFineness,
  AlDateTimePickerFormatter,
  AlDatTimePicker
} from '@ambilight-taro/date-time-picker'
import { NavBar } from '@/components/nav-bar'
import { Tooltip } from '@/components/tooltip'
import { Card, CardItem } from '@/components/card'
import { CapsuleSelectorOfValue } from '@/components/capsule-selector-of-value'
import dayjs from 'dayjs'
import './index.scss'

const root = new Bem('page-date-time-picker', undefined, undefined, false)

export default () => {
  const [value, setValue] = useState<number[]>([2023, 1, 1])
  const [fineness, setFineness] = useState<AlDateTimePickerFineness>(AlDateTimePickerFineness.day)
  const [isUseFormatter, setIsUseFormatter] = useState(false)
  const [isUseFilter, setIsUseFilter] = useState(false)
  const [isUseRange, setIsUseRange] = useState(false)

  const formatter = useCallback<AlDateTimePickerFormatter>((column, _, detail) => {
    if (column === AlDateTimePickerColumn.month) {
      return (
        <View className={root.hierarchies('option').className}>
          {
            [
              '一月',
              '二月',
              '三月',
              '四月',
              '五月',
              '六月',
              '七月',
              '八月',
              '九月',
              '十月',
              '十一月',
              '十二月'
            ][detail.rowValue]
          }
        </View>
      )
    }
    return (
      <View className={root.hierarchies('option').className}>
        {detail.rowValue.toString().padStart(2, '0')}
      </View>
    )
  }, [])

  const filter = useCallback<AlDateTimePickerFilter>((column, _, detail) => {
    if (column === AlDateTimePickerColumn.day) {
      const day = dayjs()
        .set('year', detail.currentSelectedValue[0])
        .set('month', detail.currentSelectedValue[1])
        .set('date', detail.rowValue)

      return day.day() !== 0 && day.day() !== 6
    }

    return true
  }, [])

  return (
    <AlBasicView id="page-date-time-picker" className={root.className}>
      <NavBar>AlDateTimePicker</NavBar>
      <ScrollView className={root.hierarchies('content').className}>
        <Tooltip>日期时间选择器</Tooltip>
        <Card title="Demo">
          <CardItem label="Value">{JSON.stringify(value)}</CardItem>
          <CardItem label="Set value" desc="随机到今年的某一天">
            <View
              onClick={() => {
                setValue([
                  dayjs().year(),
                  Math.floor(12 * Math.random()),
                  Math.floor(31 * Math.random())
                ])
              }}
            >
              Click to random
            </View>
          </CardItem>
          <CardItem label="Custom formatter" desc="中文展示月份">
            <CapsuleSelectorOfValue
              style={{ width: '256rpx' }}
              options={[true, false]}
              optionDescGetter={(index) => ['是', '否'][index]}
              value={isUseFormatter}
              onChange={setIsUseFormatter}
            />
          </CardItem>
          <CardItem label="Fineness" desc="这里只演示部分类型">
            <CapsuleSelectorOfValue
              style={{ width: '420rpx' }}
              options={[AlDateTimePickerFineness.day, AlDateTimePickerFineness.minuteOfDay]}
              optionDescGetter={(index) => ['某天', '某天的某分钟'][index]}
              value={fineness}
              onChange={setFineness}
            />
          </CardItem>
          <CardItem label="Custom filter" desc="只允许选择工作日">
            <CapsuleSelectorOfValue
              style={{ width: '256rpx' }}
              options={[true, false]}
              optionDescGetter={(index) => ['是', '否'][index]}
              value={isUseFilter}
              onChange={setIsUseFilter}
            />
          </CardItem>
          <CardItem label="Custom range" desc="只展示今年">
            <CapsuleSelectorOfValue
              style={{ width: '256rpx' }}
              options={[true, false]}
              optionDescGetter={(index) => ['是', '否'][index]}
              value={isUseRange}
              onChange={setIsUseRange}
            />
          </CardItem>
        </Card>
        <View className={root.hierarchies('picker').className}>
          <AlDatTimePicker
            formatter={isUseFormatter ? formatter : undefined}
            fineness={fineness}
            value={value}
            onChange={setValue}
            filter={isUseFilter ? filter : undefined}
            range={
              isUseRange
                ? {
                    date: [
                      dayjs().startOf('year').toDate().valueOf(),
                      dayjs().endOf('year').toDate().valueOf()
                    ]
                  }
                : undefined
            }
          />
        </View>
      </ScrollView>
    </AlBasicView>
  )
}
