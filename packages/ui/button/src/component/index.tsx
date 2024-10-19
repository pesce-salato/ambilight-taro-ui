import React from 'react'
import { View } from '@tarojs/components'
import {
  AlBaseFcProps,
  Bem,
  classnames,
  WithThemeProps,
} from '@ambilight-taro/core'
import './index.scss'

const root = new Bem('button')

export const AlButton = (_props: WithThemeProps & AlBaseFcProps) => {
  return <View className={classnames(root.className)}>Test</View>
}
