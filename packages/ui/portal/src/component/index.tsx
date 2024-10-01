import { Bem, classnames } from '@ambilight-taro/core'
import { createPortal } from '@tarojs/react'
import React, { useMemo } from 'react'
import { View, ViewProps } from '@tarojs/components'
import { useRootElement } from '@ambilight-taro/use-root-element'

export interface AlPortalProps extends ViewProps {
  containerId?: string
}

const root = new Bem('portal')

export const AlPortal = (props: AlPortalProps) => {
  const { className, containerId, ...others } = props

  const rootElement = useRootElement()

  const containerElement = useMemo(() => {
    return containerId ? document.querySelector(`#${containerId}`) : rootElement
  }, [containerId, rootElement])

  if (containerElement) {
    return createPortal(
      <View {...others} className={classnames(root.className, className)} />,
      containerElement,
    ) as unknown as React.ReactNode
  }

  return <></>
}
