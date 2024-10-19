import { uuid } from '@ambilight-taro/core'
import { useCallback, useMemo, useRef } from 'react'
import { AlPageViewListenerType } from './context'
import { AlPageViewProps } from '../components/view/type'
import { root } from '../components/bem'

// generate default listener map
const generateDefaultListenerMap = () => {
  const result = new Map<
    AlPageViewListenerType,
    Map<string, (...arguments_) => void>
  >()
  for (const type of Object.keys(AlPageViewListenerType))
    result.set(type as AlPageViewListenerType, new Map())

  return result
}

export const useEvent = (props: AlPageViewProps) => {
  const {
    className: _cn,
    children: _c,
    interactControllerId: _index,
    ...others
  } = props

  const listenerMap = useRef(generateDefaultListenerMap())

  const addEventListener = useCallback(
    (type: AlPageViewListenerType, listener: (...arguments_) => void) => {
      // check the type valid
      if (!Object.values(AlPageViewListenerType).includes(type)) {
        throw new Error('invalid type')
      }
      const guid = uuid(root.className)
      const belongEventMap = listenerMap.current.get(type)!
      belongEventMap.set(guid, listener)

      return () => {
        if (belongEventMap.has(guid)) {
          belongEventMap.delete(guid)
        }
      }
    },
    [],
  )

  const rootEventProps = useMemo(() => {
    const result = { ...others }
    for (const eventName of Object.keys(AlPageViewListenerType)) {
      const originalEventCallback =
        result[eventName] ||
        (() => {
          // default
        })

      result[eventName] = (...arguments_) => {
        originalEventCallback(...arguments_)

        const cache = listenerMap.current.get(
          eventName as AlPageViewListenerType,
        )!

        for (const listener of cache.values()) {
          listener(...arguments_)
        }
      }
    }
    return result
  }, [others])

  return { addEventListener, rootEventProps }
}
