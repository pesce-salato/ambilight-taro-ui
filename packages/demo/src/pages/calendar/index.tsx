import React, { useMemo, useRef, useState } from 'react'
import { AlPageView } from '@ambilight-taro/page-view'
import { Bem } from '@ambilight-taro/core'
import { Text, View } from '@tarojs/components'
import { AlDatTimePicker } from '@ambilight-taro/date-time-picker'
import './index.scss'
import { AlCalendar, usePresetCnDayRender } from '@ambilight-taro/calendar'

const root = new Bem('page-calendar', undefined, undefined, false)

export default () => {
  const [value, setValue] = useState<string[]>([])

  const render = usePresetCnDayRender()

  return (
    <AlPageView id="page-calendar" className={root.className}>
      <Text>{value.join('/') || 'none'}</Text>
      <View className={root.hierarchies('container').className}>
        <AlCalendar
          type="range"
          dayRender={render}
          value={value}
          onChange={setValue}
          weekRowFirstDay="sun"
        />
      </View>
    </AlPageView>
  )
}
