import { Bem, classnames } from '@ambilight-taro/core'
import { createPortal } from '@tarojs/react'
import React from 'react'
import { View, ViewProps } from '@tarojs/components'
import { useRootElement } from '@ambilight-taro/use-root-element'

export interface AlPortalProps extends ViewProps {}

const root = new Bem('portal')

export const AlPortal = (props: AlPortalProps) => {
  const { className, ...others } = props
  const rootElement = useRootElement()

  if (rootElement) {
    return createPortal(
      <View {...others} className={classnames(root.className, className)} />,
      rootElement,
    )
  }

  return <></>
}
