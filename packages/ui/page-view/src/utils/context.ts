import { EnumValueUnion } from '@ambilight-taro/core'
import { useContext, createContext } from 'react'

export enum AlPageViewListenerType {
  onClick = 'onClick',
  onLongClick = 'onLongClick',
  onLongPress = 'onLongPress',
  onTouchCancel = 'onTouchCancel',
  onTouchEnd = 'onTouchEnd',
  onTouchForceChange = 'onTouchForceChange',
  onTouchMove = 'onTouchMove',
  onTouchStart = 'onTouchStart'
}

export interface AlPageViewContextValue {
  addEventListener: (
    type: EnumValueUnion<AlPageViewListenerType>,
    listener: (...arguments_) => void
  ) => () => void
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
