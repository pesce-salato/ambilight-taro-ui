import React, { useMemo, useRef, useState } from 'react'
import { AlPageView } from '@ambilight-taro/page-view'
import { Bem } from '@ambilight-taro/core'
import { View } from '@tarojs/components'
import { AlProgress } from '@ambilight-taro/progress'
import { NavBar } from '@/components/nav-bar'
import { Tooltip } from '@/components/tooltip'
import './index.scss'
import { Card, CardItem } from '@/components/card'
import { AlCapsuleSelector } from '@ambilight-taro/capsule-selector'

const root = new Bem('page-progress', undefined, undefined, false)

export default () => {
  const [linearWithAnimationDisabled, setLinearWithAnimationDisabled] = useState(false)
  const [circularWithAnimationDisabled, setCircularWithAnimationDisabled] = useState(false)
  const [linearValue, setLinearValue] = useState(64)
  const [circularValue, setCircularValue] = useState(64)
  const [circularColor, setCircularColor] = useState<string>()
  const [circularRingColor, setCircularRingColor] = useState<string>()
  const [circularClockwise, setCircularClockwise] = useState(true)
  const [circularThicknessRatio, setCircularThicknessRatio] = useState<number>()

  return (
    <AlPageView id="page-progress" className={root.className}>
      <NavBar>AlProgress</NavBar>
      <Tooltip>进度条组件，包含线形/环形进度条</Tooltip>
      <Card title="线性">
        <CardItem label={`value: ${linearValue}`}>
          <View onClick={() => setLinearValue(Math.floor(Math.random() * 100))}>设置随机值</View>
        </CardItem>
        <CardItem label="是否开启动画">
          <AlCapsuleSelector
            style={{ width: '164rpx' }}
            size="sm"
            value={linearWithAnimationDisabled ? 1 : 0}
            onChange={(v) => setLinearWithAnimationDisabled(v === 1)}
          >
            <View>开启</View>
            <View>关闭</View>
          </AlCapsuleSelector>
        </CardItem>
        <View style={{ padding: '24rpx 0' }}>
          <AlProgress.Linear value={linearValue} withAnimation={!linearWithAnimationDisabled} />
        </View>
      </Card>
      <Card title="环形">
        <CardItem label={`value: ${circularValue}`}>
          <View onClick={() => setCircularValue(Math.floor(Math.random() * 100))}>设置随机值</View>
        </CardItem>
        <CardItem label="是否开启动画">
          <AlCapsuleSelector
            style={{ width: '164rpx' }}
            size="sm"
            value={circularWithAnimationDisabled ? 1 : 0}
            onChange={(v) => setCircularWithAnimationDisabled(v === 1)}
          >
            <View>开启</View>
            <View>关闭</View>
          </AlCapsuleSelector>
        </CardItem>
        <CardItem label="颜色">
          <AlCapsuleSelector
            style={{ width: '256rpx' }}
            size="sm"
            value={circularColor ? 1 : 0}
            onChange={(v) => setCircularColor(v === 1 ? '#222222' : undefined)}
          >
            <View>默认</View>
            <View>#222222</View>
          </AlCapsuleSelector>
        </CardItem>
        <CardItem label="底色">
          <AlCapsuleSelector
            style={{ width: '256rpx' }}
            size="sm"
            value={circularRingColor ? 1 : 0}
            onChange={(v) => setCircularRingColor(v === 1 ? '#EDF2F7' : undefined)}
          >
            <View>undefined</View>
            <View>#EDF2F7</View>
          </AlCapsuleSelector>
        </CardItem>
        <CardItem label="线宽">
          <AlCapsuleSelector
            style={{ width: '164rpx' }}
            size="sm"
            value={circularThicknessRatio ? 1 : 0}
            onChange={(v) => setCircularThicknessRatio(v === 1 ? 0.1 : undefined)}
          >
            <View>默认</View>
            <View>0.1</View>
          </AlCapsuleSelector>
        </CardItem>
        <CardItem label="顺时针渲染">
          <AlCapsuleSelector
            style={{ width: '164rpx' }}
            size="sm"
            value={circularClockwise ? 0 : 1}
            onChange={(v) => setCircularClockwise(v === 0)}
          >
            <View>是</View>
            <View>否</View>
          </AlCapsuleSelector>
        </CardItem>
        <View style={{ display: 'flex', alignItems: 'center', padding: '24rpx 0' }}>
          <View style={{ flex: '1', height: '32rpx' }}>
            <AlProgress.Circular
              value={circularValue}
              color={circularColor}
              clockwise={circularClockwise}
              thicknessRatio={circularThicknessRatio}
              withAnimation={!circularWithAnimationDisabled}
              ringColor={circularRingColor}
            />
          </View>
          <View style={{ flex: '1', height: '64rpx' }}>
            <AlProgress.Circular
              value={circularValue}
              color={circularColor}
              clockwise={circularClockwise}
              thicknessRatio={circularThicknessRatio}
              withAnimation={!circularWithAnimationDisabled}
              ringColor={circularRingColor}
            />
          </View>
          <View style={{ flex: '1', height: '128rpx' }}>
            <AlProgress.Circular
              value={circularValue}
              color={circularColor}
              clockwise={circularClockwise}
              thicknessRatio={circularThicknessRatio}
              withAnimation={!circularWithAnimationDisabled}
              ringColor={circularRingColor}
            />
          </View>
        </View>
      </Card>
    </AlPageView>
  )
}
