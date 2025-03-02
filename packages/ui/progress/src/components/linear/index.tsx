import React from 'react'
import { classnames, withDefaultProps } from '@ambilight-taro/core'
import { AlBasicView } from '@ambilight-taro/basic-view'
import { View } from '@tarojs/components'
import { bem } from '../../bem'
import { AlLinearProgressProps } from '../../type'
import './index.scss'

const defaultProps = {
  withAnimation: true,
  animationDuration: 240
}

export const AlLinearProgress = (originalProps: AlLinearProgressProps) => {
  const props = withDefaultProps<AlLinearProgressProps, typeof defaultProps>(originalProps)

  const { className, style, withAnimation, animationDuration, value } = props

  return (
    <AlBasicView
      className={classnames(className, bem.root.className, bem.root.status('linear').className, {
        [bem.root.status('animate').className]: withAnimation
      })}
      style={style}
    >
      <View
        className={bem.bar.className}
        style={{
          transform: `translateX(${value}%)`,
          transitionDuration: `${animationDuration}ms`
        }}
      />
    </AlBasicView>
  )
}

AlLinearProgress.defaultProps = defaultProps
