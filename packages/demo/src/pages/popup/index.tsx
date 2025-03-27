import React, { useMemo, useRef, useState } from 'react'
import { Bem, classnames } from '@ambilight-taro/core'
import { ScrollView, Text, View } from '@tarojs/components'
import { AlBasicView } from '@ambilight-taro/basic-view'
import { AlPopup, AlPopupPosition } from '@ambilight-taro/popup'
import { NavBar } from '@/components/nav-bar'
import { Card, CardItem } from '@/components/card'
import { CapsuleSelectorOfValue } from '@/components/capsule-selector-of-value'
import './index.scss'
import { AlDynamicRenderController } from '@ambilight-taro/dynamic-render-controller'

const root = new Bem('page-popup', undefined, undefined, false)

export default () => {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState<AlPopupPosition>(AlPopupPosition.bottom)
  const [safePadding, setSafePadding] = useState(true)

  return (
    <AlBasicView id="page-popup" className={root.className}>
      <NavBar>AlPopup</NavBar>
      <ScrollView className={root.hierarchies('content').className} scrollY>
        <Card title="Config">
          <CardItem label="测试">
            <View onClick={() => setVisible(true)}>Click Show</View>
          </CardItem>
          <CardItem label="位置">
            <CapsuleSelectorOfValue
              style={{ width: '480rpx' }}
              value={position}
              onChange={(v) => setPosition(v as any)}
              options={Object.values(AlPopupPosition)}
            />
          </CardItem>
          <CardItem label="是否开启安全距离">
            <CapsuleSelectorOfValue<boolean>
              style={{ width: '256rpx' }}
              value={safePadding}
              onChange={(v) => setSafePadding(v)}
              options={[true, false]}
              optionDescGetter={(index) => ['是', '否'][index]}
            />
          </CardItem>
        </Card>
        <Card title="Functional call">
          <CardItem label="basic">
            <View
              onClick={() => {
                const { close } = AlPopup.show({
                  children: <View style={{ height: '128rpx', background: 'white' }}>Hey bro</View>
                })

                setTimeout(close, 3000)
              }}
            >
              Click Show
            </View>
          </CardItem>
        </Card>
        <View className={root.hierarchies('placeholder').className}>
          加长用作校验滚动操作是否被拦截
        </View>
      </ScrollView>
      <AlPopup
        visible={visible}
        className={root.hierarchies('pop').className}
        onHide={() => setVisible(false)}
        onMaskClick={() => setVisible(false)}
        position={position}
        safePadding={safePadding}
        key={position}
      >
        <ScrollView
          className={classnames(
            root.hierarchies('pop-content').className,
            root.hierarchies('pop-content').status(position).className
          )}
          scrollY
        >
          <View>
            Good morning, and in case I don't see you, good afternoon, good evening, and good night!
          </View>
          <View>
            Good morning, and in case I don't see you, good afternoon, good evening, and good night!
          </View>
          <View>
            Good morning, and in case I don't see you, good afternoon, good evening, and good night!
          </View>
          <View>
            Good morning, and in case I don't see you, good afternoon, good evening, and good night!
          </View>
          <View>
            Good morning, and in case I don't see you, good afternoon, good evening, and good night!
          </View>
          <View>
            Good morning, and in case I don't see you, good afternoon, good evening, and good night!
          </View>
        </ScrollView>
      </AlPopup>
      <AlDynamicRenderController />
    </AlBasicView>
  )
}
