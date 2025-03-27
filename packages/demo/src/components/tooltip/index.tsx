import { ReactNode } from 'react'
import { View } from '@tarojs/components'
import { Bem } from '@ambilight-taro/core'
import './index.scss'

const root = new Bem('tooltip', undefined, undefined, false)

export interface TooltipProps {
  children?: ReactNode
}

export const Tooltip = (props: TooltipProps) => {
  return <View className={root.className}>{props.children}</View>
}
