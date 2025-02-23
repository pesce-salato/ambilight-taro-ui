import React, { useMemo, useRef, useState } from 'react'
import { AlPageView } from '@ambilight-taro/page-view'
import { Bem } from '@ambilight-taro/core'
import { Text, View } from '@tarojs/components'
import { AlDatTimePicker } from '@ambilight-taro/date-time-picker'
import './index.scss'
import { AlCalendar, usePresetCnDayRender } from '@ambilight-taro/calendar'
import { AlCapsuleSelector } from '@ambilight-taro/capsule-selector'

const root = new Bem('page-capsule-selector', undefined, undefined, false)

export default () => {
  const [value, setValue] = useState<string[]>([])

  return (
    <AlPageView id="page-capsule-selector" className={root.className}>
      <View className={root.hierarchies('container').className}>
        <AlCapsuleSelector>
          <Text>0</Text>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </AlCapsuleSelector>
      </View>
    </AlPageView>
  )
}
