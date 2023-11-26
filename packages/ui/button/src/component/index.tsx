import React from 'react'
import { View } from '@tarojs/components'
import {
  AlBaseFcProps,
  ColorGradation,
  getGradationColor,
} from '@ambilight-taro/core'
import { WithThemeProps, useTheme } from '@ambilight-taro/context'
import './index.scss'

export const AlButton = (props: WithThemeProps & AlBaseFcProps) => {
  const { colorScheme } = useTheme(props)

  return (
    <View className={getGradationColor(colorScheme, ColorGradation.g500)}>
      Test
    </View>
  )
}
