import { AlBasicView } from '@ambilight-taro/basic-view'
import { AlLoadingIcon } from '@ambilight-taro/icon'
import { NavBar } from '@/components/nav-bar'
import { Tooltip } from '@/components/tooltip'
import { View } from '@tarojs/components'
import { Bem } from '@ambilight-taro/core'
import './index.scss'

const root = new Bem('page-icon', undefined, undefined, false)

export default () => {
  return (
    <AlBasicView className={root.className}>
      <NavBar>AlIcon</NavBar>
      <Tooltip>由于版权等等原因，组件库不提供内置的图标</Tooltip>
      <Tooltip>暂时只提供一个 Svg loading icon with animation</Tooltip>
      <View className={root.hierarchies('wrapper').className}>
        <AlLoadingIcon color="#805AD5" className={root.hierarchies('item').className} />
        <AlLoadingIcon color="#aaaaaa" className={root.hierarchies('item').className} />
        <AlLoadingIcon color="#111111" className={root.hierarchies('item').className} />
      </View>
    </AlBasicView>
  )
}
