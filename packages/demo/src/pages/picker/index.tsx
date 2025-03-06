import React, { useMemo, useRef, useState } from 'react'
import { AlPageView } from '@ambilight-taro/page-view'
import { Bem } from '@ambilight-taro/core'
import { Text, View } from '@tarojs/components'
import { AlPicker } from '@ambilight-taro/picker'
import { NavBar } from '@/components/nav-bar'
import { Tooltip } from '@/components/tooltip'
import { Card, CardItem } from '@/components/card'
import './index.scss'

const root = new Bem('page-picker', undefined, undefined, false)

export default () => {
  const [value, setValue] = useState('🐠')

  return (
    <AlPageView id="page-carousel" className={root.className}>
      <NavBar>AlProgress</NavBar>
      <Tooltip>选择器组件，主要用作在多个选项中快速选择某一项</Tooltip>
      <Tooltip>选项内容完全自定义（但需要保持高度一致）</Tooltip>
      <Card title="basic">
        <CardItem label="value">{value}</CardItem>
        <View style={{ padding: '24rpx 0' }}>
          <AlPicker
            style={{ height: '256rpx' }}
            value={value}
            onChange={setValue}
            options={[
              {
                id: '🐠',
                content: '🐠'
              },
              {
                id: '🐻',
                content: '🐻'
              },
              {
                id: '成年人',
                content: <Text style={{ textAlign: 'center', width: '100%' }}>🐠 + 🐻</Text>
              }
            ]}
          />
        </View>
      </Card>

      {/* <View className={root.hierarchies('container').className}>
        <View onClick={() => setValue(Math.floor(Math.random() * 6).toString())}>test</View>
        {value}

      </View> */}
    </AlPageView>
  )
}
