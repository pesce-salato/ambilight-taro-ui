import React, { useMemo, useRef } from 'react'
import { AlPageView } from '@ambilight-taro/page-view'
import { AlNavBar, AlNavBarPopPresetTrigger } from '@ambilight-taro/nav-bar'
import { Bem, uuid } from '@ambilight-taro/core'
import { Image, ScrollView, View } from '@tarojs/components'
import { AlToast } from '@ambilight-taro/toast'
import './index.scss'
import { AlModal } from '@ambilight-taro/modal'

const root = new Bem('page-modal', undefined, undefined, false)

export default () => {
  return (
    <AlPageView id="page-modal" className={root.className}>
      <View
        style={{ marginTop: '256rpx' }}
        onClick={() => {
          const controller = AlModal.show({
            children: <View style={{ height: '256rpx' }}>test</View>,
          })

          controller.changeSetting({ onClose: () => controller.close() })
        }}
      >
        click me
      </View>
    </AlPageView>
  )
}
