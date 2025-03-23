import { View, ViewProps } from '@tarojs/components'
import { classnames } from '@ambilight-taro/core'
import React from 'react'
import { basic } from '../../utils/bem'
import './index.scss'

export const AlCloseCircleIcon = (props: ViewProps) => {
  const { className, ...others } = props

  return (
    <View
      {...others}
      className={classnames(basic.className, basic.status('close-circle').className, className)}
    />
  )
}
