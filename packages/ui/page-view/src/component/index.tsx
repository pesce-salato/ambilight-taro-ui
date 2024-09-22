import React, { useMemo } from 'react'
import { classnames } from '@ambilight-taro/core'
import { View } from '@tarojs/components'
import {
  AlPageViewContextProvider,
  AlPageViewContextValue,
} from '../utils/context'
import { useEvent } from '../utils/use-event'
import { AlPageViewProps } from './type'
import { root } from './bem'
import { useInteractController } from '../utils/use-interact-controller'
import './index.scss'

export const AlPageView = (props: AlPageViewProps) => {
  const { className, children } = props
  const { addEventListener, rootEventProps } = useEvent(props)
  const { renderQueue } = useInteractController(props)

  const contextData = useMemo<AlPageViewContextValue>(
    () => ({
      addEventListener,
    }),
    [addEventListener],
  )

  return (
    <AlPageViewContextProvider value={contextData}>
      <View
        className={classnames(className, root.className)}
        {...rootEventProps}
      >
        {children}
        <View className={root.hierarchies('interact-layer').className}>
          {renderQueue.map((item) => {
            const Component = item.component
            return <Component {...item.props} key={item.id} />
          })}
        </View>
      </View>
    </AlPageViewContextProvider>
  )
}
