// eslint-disable-next-line import/default
import React, { useMemo } from 'react'
import { createPortal } from '@tarojs/react'
import { useRootElement } from '@ambilight-taro/use-root-element'

export interface AlPortalProps {
  /**
   * 是否禁用 portal
   * @default false
   */
  disabled?: boolean
  /**
   * 容器 id
   * @default 默认将渲染到根容器
   */
  containerId?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any
}

export const AlPortal = (props: AlPortalProps) => {
  const { containerId, disabled, children } = props

  const rootElement = useRootElement()

  const containerElement = useMemo(() => {
    return containerId ? document.querySelector(`#${containerId}`) : rootElement
  }, [containerId, rootElement])

  if (containerElement && !disabled) {
    return createPortal(<>{children}</>, containerElement)
  }

  return <>{children}</>
}
