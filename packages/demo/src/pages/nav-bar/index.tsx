import { AlBasicView } from '@ambilight-taro/basic-view'
import { AlNavBar } from '@ambilight-taro/nav-bar'
import { Tooltip } from '@/components/tooltip'
import { Bem } from '@ambilight-taro/core'
import { Card, CardItem } from '@/components/card'
import { CapsuleSelectorOfValue } from '@/components/capsule-selector-of-value'
import { useState } from 'react'
import { Image, View } from '@tarojs/components'
import BackIcon from '@/resources/icon/back.svg'
import { navigateBack } from '@tarojs/taro'
import './index.scss'

const root = new Bem('page-nav-bar', undefined, undefined, false)

export default () => {
  const [safePaddingForMenuButton, setSafePaddingForMenuButton] = useState(false)

  return (
    <AlBasicView className={root.className}>
      <AlNavBar.Basic
        className={root.hierarchies('item').className}
        safePaddingForMenuButton={safePaddingForMenuButton}
      >
        <View className={root.hierarchies('content').className}>
          <Image
            src={BackIcon}
            className={root.hierarchies('back').className}
            onClick={() => navigateBack()}
          />
          AlNavBar
        </View>
      </AlNavBar.Basic>
      <Tooltip>一个简单的导航栏组件</Tooltip>
      <Card title="Demo">
        <CardItem label="胶囊按钮安全距离">
          <CapsuleSelectorOfValue
            style={{ width: '256rpx' }}
            value={safePaddingForMenuButton}
            onChange={setSafePaddingForMenuButton}
            options={[true, false]}
            optionDescGetter={(index) => ['开启', '关闭'][index]}
          />
        </CardItem>
      </Card>
    </AlBasicView>
  )
}
