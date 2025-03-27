import { getWindowInfo } from '@tarojs/taro'
import { useMemo } from 'react'

/**
 * get mobile status bar height
 */
export const useStatusHeight = () => useMemo(() => getWindowInfo().statusBarHeight || 0, [])
