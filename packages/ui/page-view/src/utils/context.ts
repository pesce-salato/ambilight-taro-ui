import { ValueOf } from '@ambilight-taro/core'
import React, { useContext } from 'react'

export const AlPageViewListenerType = {
  onClick: 'onClick',
  onLongClick: 'onLongClick',
  onLongPress: 'onLongPress',
  onTouchCancel: 'onTouchCancel',
  onTouchEnd: 'onTouchEnd',
  onTouchForceChange: 'onTouchForceChange',
  onTouchMove: 'onTouchMove',
  onTouchStart: 'onTouchStart',
} as const

export type AlPageViewListenerType = ValueOf<typeof AlPageViewListenerType>

export interface AlPageViewContextValue {
  addEventListener: (
    type: AlPageViewListenerType,
    listener: (...arguments_) => void,
  ) => () => void
}

const context = React.createContext<AlPageViewContextValue | undefined>(
  undefined,
)

export const AlPageViewContextProvider = context.Provider

export const useAlPageViewContext = (invokeComponent: string) => {
  const data = useContext(context)

  if (!data) {
    throw new Error(`${invokeComponent} must be the child of the AlPageView`)
  }

  return data
}
