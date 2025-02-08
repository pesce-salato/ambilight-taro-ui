import React, { useMemo, useRef, useState } from 'react'
import { AlPageView } from '@ambilight-taro/page-view'
import { Bem } from '@ambilight-taro/core'
import { Text, View } from '@tarojs/components'
import { AlDatTimePicker } from '@ambilight-taro/date-time-picker'
import './index.scss'

const root = new Bem('page-date-time-picker', undefined, undefined, false)

export default () => {
  const [value, setValue] = useState([2025, 1, 1, 12, 12])

  return (
    <AlPageView id="page-date-time-picker" className={root.className}>
      <View className={root.hierarchies('container').className}>
        {value}
        <AlDatTimePicker value={value} onChange={setValue} />
      </View>
    </AlPageView>
  )
}
