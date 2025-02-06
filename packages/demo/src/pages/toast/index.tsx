import React, { useMemo, useRef } from 'react'
import { AlPageView } from '@ambilight-taro/page-view'
import { AlNavBar, AlNavBarPopPresetTrigger } from '@ambilight-taro/nav-bar'
import { Bem, uuid } from '@ambilight-taro/core'
import { Image, ScrollView, View } from '@tarojs/components'
import { AlToast } from '@ambilight-taro/toast'
import './index.scss'

const root = new Bem('page-toast', undefined, undefined, false)

export default () => {
  const test = useRef(0)
  return (
    <AlPageView id="toast-page" className={root.className}>
      <View
        style={{ marginTop: '256rpx' }}
        onClick={() => {
          test.current++

          AlToast.show({
            label: test.current.toString(),
            duration: 10 * 1000,
            portalProps: {
              children: '666',
            },
          })
        }}
      >
        click me
      </View>
    </AlPageView>
  )
}
