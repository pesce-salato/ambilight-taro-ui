// eslint-disable-next-line import/default
import React, { useMemo } from 'react'
import { classnames } from '@ambilight-taro/core'
import { AlBasicView } from '@ambilight-taro/basic-view'
import { AlPageViewContextProvider, AlPageViewContextValue } from '../utils/context'
import { useEvent } from '../utils/use-event'
import { AlPageViewProps } from './type'
import { root } from './bem'

export const AlPageView = (props: AlPageViewProps) => {
  const { className, children } = props
  const { addEventListener, rootEventProps } = useEvent(props)

  const contextData = useMemo<AlPageViewContextValue>(
    () => ({
      addEventListener
    }),
    [addEventListener]
  )

  return (
    <AlPageViewContextProvider value={contextData}>
      <AlBasicView className={classnames(className, root.className)} {...rootEventProps}>
        {children}
      </AlBasicView>
    </AlPageViewContextProvider>
  )
}
