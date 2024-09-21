import React from 'react'
import { View } from '@tarojs/components'
import {
  AlBaseFcProps,
  Bem,
  ColorGradation,
  atomic,
  classnames,
} from '@ambilight-taro/core'
import { WithThemeProps, useTheme } from '@ambilight-taro/context'
import './index.scss'

const root = new Bem('button')

export const AlButton = (props: WithThemeProps & AlBaseFcProps) => {
  const { colorScheme } = useTheme(props)

  return (
    <View
      className={classnames(
        atomic.color.gradation(colorScheme, ColorGradation.g500),
        root.className,
      )}
    >
      Test
    </View>
  )
}
