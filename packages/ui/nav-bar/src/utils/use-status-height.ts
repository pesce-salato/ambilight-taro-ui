import { getSystemInfoSync } from '@tarojs/taro'
import { useMemo } from 'react'

/**
 * get mobile status bar height
 */
export const useStatusHeight = () =>
  useMemo(() => getSystemInfoSync().statusBarHeight || 0, [])
