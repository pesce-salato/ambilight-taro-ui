import { Image, ImageProps } from '@tarojs/components'
import { uuid, classnames } from '@ambilight-taro/core'
import React, { useMemo } from 'react'
import { template } from './template'
import { basic } from '../../utils/bem'
import { toBase64Svg } from '../../utils/svg'

export interface LoadingIconProps extends Omit<ImageProps, 'src'> {
  color?: string
}

export const AlLoadingIcon = (props: LoadingIconProps) => {
  const { color, className, ...others } = props

  const base64Image = useMemo(() => {
    return toBase64Svg(template(color || '#ffffff', uuid(basic.className)))
  }, [color])

  return (
    <Image
      {...others}
      src={base64Image}
      className={classnames(basic.className, basic.status('loading').className, className)}
    />
  )
}
