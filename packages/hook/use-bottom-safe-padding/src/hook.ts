import { useMemo } from 'react'

import { getWindowInfo, getDeviceInfo } from '@tarojs/taro'
import { Cache } from '@ambilight-taro/core'

const CacheKey = 'hook/use-bottom-safe-padding'

/**
 * get bottom safe padding distance（for ios）
 * @returns `number` distance in px
 */
export const useBottomSafePadding = () =>
  useMemo(() => {
    const cache = Cache.app.get<number>(CacheKey)

    if (cache) {
      return cache
    } else {
      const info = getWindowInfo()
      const distance =
        getDeviceInfo().platform.toLocaleLowerCase() === 'ios' &&
        info.safeArea?.bottom
          ? info.screenHeight - info.safeArea.bottom
          : 0

      Cache.app.set(CacheKey, distance)

      return distance
    }
  }, [])
