import { useContext, createContext } from 'react'
import { ValueOf } from '@ambilight-taro/core'

export const AlPageViewListenerType = {
  onClick: 'onClick',
  onLongClick: 'onLongClick',
  onLongPress: 'onLongPress',
  onTouchCancel: 'onTouchCancel',
  onTouchEnd: 'onTouchEnd',
  onTouchForceChange: 'onTouchForceChange',
  onTouchMove: 'onTouchMove',
  onTouchStart: 'onTouchStart'
} as const

export type AlPageViewListenerType = ValueOf<typeof AlPageViewListenerType>

export interface AlPageViewContextValue {
  addEventListener: (type: AlPageViewListenerType, listener: (...arguments_) => void) => () => void
}

const context = createContext<AlPageViewContextValue | undefined>(undefined)

export const AlPageViewContextProvider = context.Provider

export const useAlPageViewContext = (invokeComponent: string) => {
  const data = useContext(context)

  if (!data) {
    throw new Error(`${invokeComponent} must be the child of the AlPageView`)
  }

  return data
}
