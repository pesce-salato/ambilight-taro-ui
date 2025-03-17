import { Bem } from '@ambilight-taro/core'
import { View } from '@tarojs/components'
import { AlBasicView } from '@ambilight-taro/basic-view'
import { NavBar } from '@/components/nav-bar'
import { Tooltip } from '@/components/tooltip'
import { AlPortal } from '@ambilight-taro/portal'

const root = new Bem('page-portal', undefined, undefined, false)

export default () => {
  return (
    <AlBasicView className={root.className}>
      <NavBar>AlPortal</NavBar>
      <Tooltip>传送门</Tooltip>
      <Tooltip>使用过于简单，故而此处就不写Demo啦</Tooltip>
      <Tooltip>具体用法参考组件README</Tooltip>
      <View id="test"></View>
      <AlPortal>
        <View className="to-root" />
      </AlPortal>
      <AlPortal containerId="test">
        <View className="to-test" />
      </AlPortal>
      <AlPortal disabled>
        <View className="to-original-place" />
      </AlPortal>
    </AlBasicView>
  )
}
