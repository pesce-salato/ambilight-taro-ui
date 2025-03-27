import React, { useCallback, useState } from 'react'
import { Bem } from '@ambilight-taro/core'
import { AlBasicView } from '@ambilight-taro/basic-view'
import { NavBar } from '@/components/nav-bar'
import { Tooltip } from '@/components/tooltip'
import { Card, CardItem } from '@/components/card'
import { ScrollView, View } from '@tarojs/components'
import {
  AlCalendar,
  AlCalendarDayOfWeekTitleRender,
  AlCalendarMonthTitleRender,
  AlCalendarType,
  AlCalendarWeekRowFirstDay,
  usePresetCnDayRender
} from '@ambilight-taro/calendar'
import { CapsuleSelectorOfValue } from '@/components/capsule-selector-of-value'
import './index.scss'

const root = new Bem('page-calendar', undefined, undefined, false)

export default () => {
  const [value, setValue] = useState<string[]>([])
  const [type, setType] = useState<AlCalendarType>(AlCalendarType.single)
  const [firstDay, setFirstDay] = useState<AlCalendarWeekRowFirstDay>(AlCalendarWeekRowFirstDay.mon)
  const [isUseDayRender, setIsUseDayRender] = useState(true)
  const [isUseDayOfWeekTitleRender, setIsUseDayOfWeekTitleRender] = useState(false)
  const [isUseMonthTitleRender, setIsUseMonthTitleRender] = useState(false)

  const render = usePresetCnDayRender()
  const dayOfWeekTitleRender = useCallback<AlCalendarDayOfWeekTitleRender>((dayOfWeek) => {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek]
  }, [])
  const monthTitleRender = useCallback<AlCalendarMonthTitleRender>((year, month) => {
    return (
      <View
        className={root.hierarchies('month-title').className}
      >{`${year}/${month.toString().padStart(2, '0')}`}</View>
    )
  }, [])

  return (
    <AlBasicView className={root.className}>
      <NavBar>AlCalendar</NavBar>
      <ScrollView scrollY className={root.hierarchies('content').className}>
        <Tooltip>日历组件</Tooltip>
        <Card title="Demo">
          <CardItem label="Value">{JSON.stringify(value)}</CardItem>
          <CardItem label="Type">
            <CapsuleSelectorOfValue
              style={{ width: '480rpx' }}
              value={type}
              options={Object.values(AlCalendarType)}
              onChange={setType}
            />
          </CardItem>
          <CardItem label="Week row first day">
            <CapsuleSelectorOfValue
              style={{ width: '256rpx' }}
              value={firstDay}
              options={Object.values(AlCalendarWeekRowFirstDay)}
              onChange={setFirstDay}
            />
          </CardItem>
          <CardItem label="自定义日期渲染器" desc="使用预设好的 usePresetCnDayRender">
            <CapsuleSelectorOfValue
              style={{ width: '256rpx' }}
              value={isUseDayRender}
              options={[true, false]}
              optionDescGetter={(index) => ['开启', '关闭'][index]}
              onChange={setIsUseDayRender}
            />
          </CardItem>
          <CardItem label="自定义周每日标题渲染器" desc="切换到英文">
            <CapsuleSelectorOfValue
              style={{ width: '256rpx' }}
              value={isUseDayOfWeekTitleRender}
              options={[true, false]}
              optionDescGetter={(index) => ['开启', '关闭'][index]}
              onChange={setIsUseDayOfWeekTitleRender}
            />
          </CardItem>
          <CardItem label="自定义月标题渲染器" desc="切换到缩写">
            <CapsuleSelectorOfValue
              style={{ width: '256rpx' }}
              value={isUseMonthTitleRender}
              options={[true, false]}
              optionDescGetter={(index) => ['开启', '关闭'][index]}
              onChange={setIsUseMonthTitleRender}
            />
          </CardItem>
        </Card>
        <View className={root.hierarchies('demo').className}>
          <AlCalendar
            type={type}
            weekRowFirstDay={firstDay}
            value={value}
            onChange={setValue}
            dayOfWeekTitleRender={isUseDayOfWeekTitleRender ? dayOfWeekTitleRender : undefined}
            dayRender={isUseDayRender ? render : undefined}
            monthTitleRender={isUseMonthTitleRender ? monthTitleRender : undefined}
          />
        </View>
      </ScrollView>
    </AlBasicView>
  )
}
