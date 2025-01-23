import { createPortal } from '@tarojs/react'
import React, { useMemo } from 'react'
import { useRootElement } from '@ambilight-taro/use-root-element'

export interface AlPortalProps {
  disabled?: boolean
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
