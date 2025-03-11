import React, { useRef, useState } from 'react'
import { Bem } from '@ambilight-taro/core'
import { ScrollView, Text, View } from '@tarojs/components'
import { AlLoadingIcon } from '@ambilight-taro/icon'
import { NavBar } from '@/components/nav-bar'
import { AlToast, AlToastPosition } from '@ambilight-taro/toast'
import { Tooltip } from '@/components/tooltip'
import { Card, CardItem } from '@/components/card'
import { AlCapsuleSelector } from '@ambilight-taro/capsule-selector'
import { AlDynamicRenderController } from '@ambilight-taro/dynamic-render-controller'
import { AlBasicView } from '@ambilight-taro/basic-view'
import './index.scss'

const root = new Bem('page-toast', undefined, undefined, false)

const Positions = Object.keys(AlToastPosition)
const Offsets = [0, 64, -64]

export default () => {
  const [position, setPosition] = useState(AlToastPosition.bottom)
  const [visible, setVisible] = useState(false)
  const [mask, setMask] = useState(false)
  const [offset, setOffset] = useState(0)

  return (
    <AlBasicView className={root.className}>
      <NavBar>AlToast</NavBar>
      <ScrollView className={root.hierarchies('content').className} scrollY>
        <View>
          <Tooltip>轻提示组件</Tooltip>
          <Card title="Functional call">
            <CardItem label="基础">
              <Text
                onClick={() =>
                  AlToast.show({
                    label: '你好，世界?'
                  })
                }
              >
                click show
              </Text>
            </CardItem>
            <CardItem label="图标渲染">
              <Text
                onClick={() =>
                  AlToast.show({
                    icon: <AlLoadingIcon style={{ width: '36rpx' }} />,
                    label: '吗喽搬砖中'
                  })
                }
              >
                click show
              </Text>
            </CardItem>
            <CardItem label="阻塞队列">
              <Text
                onClick={() =>
                  AlToast.show(
                    {
                      label: '我不允许有兄弟比我更优秀'
                    },
                    {
                      isBlocked: true
                    }
                  )
                }
              >
                click show
              </Text>
            </CardItem>
          </Card>
          <Card title="Component config">
            <CardItem label="测试">
              <Text onClick={() => setVisible(true)}>点击展示</Text>
            </CardItem>
            <CardItem label="位置">
              <AlCapsuleSelector
                size="sm"
                style={{ width: '360rpx' }}
                value={Positions.indexOf(position)}
                onChange={(index) => setPosition(Positions[index] as any)}
              >
                {Positions.map((item) => (
                  <Text key={item}>{item}</Text>
                ))}
              </AlCapsuleSelector>
            </CardItem>
            <CardItem label="是否开启遮罩">
              <AlCapsuleSelector
                size="sm"
                style={{ width: '256rpx' }}
                value={mask ? 0 : 1}
                onChange={(index) => setMask(index === 0)}
              >
                {['是', '否'].map((item) => (
                  <Text key={item}>{item}</Text>
                ))}
              </AlCapsuleSelector>
            </CardItem>
            <CardItem label="偏移量">
              <AlCapsuleSelector
                size="sm"
                style={{ width: '300rpx' }}
                value={Offsets.indexOf(offset)}
                onChange={(index) => setOffset(Offsets[index])}
              >
                {Offsets.map((item) => (
                  <Text key={item}>{item}</Text>
                ))}
              </AlCapsuleSelector>
            </CardItem>
          </Card>
          <AlToast
            visible={visible}
            onClose={() => setVisible(false)}
            mask={mask}
            offset={offset}
            label="Component <AlToast />"
            position={position}
          />
          <View className={root.hierarchies('placeholder').className}>
            加长用作校验滚动操作是否被拦截
          </View>
        </View>
      </ScrollView>
      <AlDynamicRenderController />
    </AlBasicView>
  )
}
