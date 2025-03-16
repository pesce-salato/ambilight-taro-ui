import { AlDynamicRenderController, safeRender } from '@ambilight-taro/dynamic-render-controller'
import { Bem } from '@ambilight-taro/core'
import { View } from '@tarojs/components'
import { AlBasicView } from '@ambilight-taro/basic-view'
import { NavBar } from '@/components/nav-bar'
import { Tooltip } from '@/components/tooltip'
import { Card, CardItem } from '@/components/card'

const root = new Bem('page-dynamic-render-controller', undefined, undefined, false)

export default () => {
  return (
    <AlBasicView className={root.className}>
      <NavBar>AlDynamicRenderController</NavBar>
      <Tooltip>动态渲染控制器</Tooltip>
      <Tooltip>此组件并无太多UI上的表现形态，故而只做简单展示</Tooltip>
      <Tooltip>具体用法参考组件README</Tooltip>
      <Card title="Demo">
        <CardItem label="SafeRender">
          <View
            onClick={() => {
              const controller = safeRender({
                component: View,
                targetId: root.className,
                props: {
                  children: '¥999999999'
                }
              })

              setTimeout(() => {
                controller.changeProps({
                  children: '¥1000000000'
                })
              }, 1000)

              setTimeout(() => {
                controller.remove()
              }, 2000)
            }}
          >
            Show me the money
          </View>
        </CardItem>
        <AlDynamicRenderController controllerId={root.className} />
      </Card>
    </AlBasicView>
  )
}
