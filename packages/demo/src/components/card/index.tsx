import { ReactNode } from 'react'
import { View } from '@tarojs/components'
import { Bem } from '@ambilight-taro/core'
import './index.scss'

const root = new Bem('card', undefined, undefined, false)

export interface CardProps {
  children?: ReactNode
  title?: ReactNode
}

export interface CardItemProps {
  children?: ReactNode
  label?: ReactNode
  desc?: ReactNode
}

export const Card = (props: CardProps) => {
  return (
    <View className={root.className}>
      <View className={root.hierarchies('title').className}>{props.title}</View>
      {props.children}
    </View>
  )
}

export const CardItem = (props: CardItemProps) => {
  return (
    <View className={root.hierarchies('item').className}>
      <View className={root.hierarchies(['item', 'label']).className}>
        {props.label}
        {props.desc && (
          <View className={root.hierarchies(['item', 'desc']).className}>{props.desc}</View>
        )}
      </View>
      <View className={root.hierarchies(['item', 'content']).className}>{props.children}</View>
    </View>
  )
}
