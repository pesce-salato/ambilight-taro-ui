import React, { useMemo, useRef, useState } from 'react'
import { AlPageView } from '@ambilight-taro/page-view'
import { Bem } from '@ambilight-taro/core'
import { Text, View } from '@tarojs/components'
import { AlDatTimePicker } from '@ambilight-taro/date-time-picker'
import './index.scss'
import { AlCalendar } from '@ambilight-taro/calendar'

const root = new Bem('page-calendar', undefined, undefined, false)

export default () => {
  const [value, setValue] = useState<string[]>([])

  return (
    <AlPageView id="page-calendar" className={root.className}>
      <View className={root.hierarchies('container').className}>
        {value}
        <AlCalendar value={value} onChange={setValue} weekRowFirstDay="sun" />
      </View>
    </AlPageView>
  )
}
