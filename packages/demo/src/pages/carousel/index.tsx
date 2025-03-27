import React, { useMemo, useRef, useState } from 'react'
import { AlPageView } from '@ambilight-taro/page-view'
import { Bem, classnames } from '@ambilight-taro/core'
import { Text, View } from '@tarojs/components'

import {
  AlCarousel,
  AlCarouselDirection,
  AlCarouselIndicatorPosition,
  AlCarouselIndicatorVariant
} from '@ambilight-taro/carousel'
import { NavBar } from '@/components/nav-bar'
import { Tooltip } from '@/components/tooltip'
import { Card, CardItem } from '@/components/card'
import { AlCapsuleSelector } from '@ambilight-taro/capsule-selector'
import './index.scss'

const root = new Bem('page-carousel', undefined, undefined, false)

const Directions = Object.values(AlCarouselDirection)
const Variants = Object.values(AlCarouselIndicatorVariant)
const Positions = Object.values(AlCarouselIndicatorPosition)
const Durations = [0, 2000, 4000]
const Values = [0, 1, 2, 3]

const PositionMap = {
  [AlCarouselIndicatorPosition.bottom]: '底部',
  [AlCarouselIndicatorPosition.bottomEnd]: '右下角',
  [AlCarouselIndicatorPosition.bottomStart]: '左下角',
  [AlCarouselIndicatorPosition.left]: '左侧',
  [AlCarouselIndicatorPosition.right]: '右侧',
  [AlCarouselIndicatorPosition.top]: '顶部'
}

export default () => {
  const [direction, setDirection] = useState(AlCarouselDirection.horizontal)
  const [indicatorDisabled, setIndicatorDisabled] = useState(false)
  const [variant, setVariant] = useState(AlCarouselIndicatorVariant.dot)
  const [position, setPosition] = useState(AlCarouselIndicatorPosition.bottom)
  const [duration, setDuration] = useState(2000)

  const [value, setValue] = useState(0)

  return (
    <AlPageView id="page-carousel" className={root.className}>
      <NavBar>AlCarousel</NavBar>
      <Tooltip>轮播图组件，每一项都可完全自定义</Tooltip>
      <Card title="config">
        <CardItem label="是否展示指示器">
          <AlCapsuleSelector
            style={{ width: '164rpx' }}
            size="sm"
            value={indicatorDisabled ? 1 : 0}
            onChange={(index) => {
              setIndicatorDisabled(!!index)
            }}
          >
            <Text>是</Text>
            <Text>否</Text>
          </AlCapsuleSelector>
        </CardItem>
        {!indicatorDisabled && (
          <CardItem label="指示器样式">
            <AlCapsuleSelector
              style={{ width: '520rpx' }}
              size="sm"
              value={Variants.indexOf(variant)}
              onChange={(index) => setVariant(Variants[index] as any)}
            >
              {Variants.map((item) => (
                <Text key={item}>{item}</Text>
              ))}
            </AlCapsuleSelector>
          </CardItem>
        )}
        <CardItem label="指示器位置">
          <AlCapsuleSelector
            style={{ width: '500rpx' }}
            size="sm"
            value={Positions.indexOf(position)}
            onChange={(index) => setPosition(Positions[index] as any)}
          >
            {Positions.map((item) => (
              <Text key={item}>{PositionMap[item]}</Text>
            ))}
          </AlCapsuleSelector>
        </CardItem>
        <CardItem label="自动切换周期">
          <AlCapsuleSelector
            style={{ width: '320rpx' }}
            size="sm"
            value={Durations.indexOf(duration)}
            onChange={(index) => {
              setDuration(Durations[index] as any)
            }}
          >
            {Durations.map((item) => (
              <Text key={item}>{item}</Text>
            ))}
          </AlCapsuleSelector>
        </CardItem>
        {duration === 0 && (
          <CardItem label="手动切换">
            <AlCapsuleSelector
              style={{ width: '320rpx' }}
              size="sm"
              value={Values.indexOf(value)}
              onChange={(index) => {
                setValue(Values[index] as any)
              }}
            >
              {Values.map((item) => (
                <Text key={item}>{item}</Text>
              ))}
            </AlCapsuleSelector>
          </CardItem>
        )}
        <View style={{ paddingBottom: '8rpx' }}>
          <CardItem label="方向">
            <AlCapsuleSelector
              style={{ width: '256rpx' }}
              size="sm"
              value={Directions.indexOf(direction)}
              onChange={(index) => setDirection(Directions[index] as any)}
            >
              {Directions.map((item) => (
                <Text key={item}>{item}</Text>
              ))}
            </AlCapsuleSelector>
          </CardItem>
        </View>
      </Card>
      <View className={root.hierarchies('container').className}>
        <AlCarousel
          key={direction}
          value={value}
          onChange={setValue}
          className={root.hierarchies('carousel').className}
          duration={duration}
          indicatorVariant={variant}
          indicatorPosition={position}
          direction={direction}
          indicatorDisabled={indicatorDisabled}
        >
          <View
            className={classnames(
              root.hierarchies('item').className,
              root.hierarchies('item').status('0').className
            )}
          >
            0
          </View>
          <View
            className={classnames(
              root.hierarchies('item').className,
              root.hierarchies('item').status('1').className
            )}
          >
            1
          </View>
          <View
            className={classnames(
              root.hierarchies('item').className,
              root.hierarchies('item').status('2').className
            )}
          >
            2
          </View>
          <View
            className={classnames(
              root.hierarchies('item').className,
              root.hierarchies('item').status('3').className
            )}
          >
            3
          </View>
        </AlCarousel>
      </View>
    </AlPageView>
  )
}
