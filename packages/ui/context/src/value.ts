import { createContext, useContext, useMemo } from 'react'
import { Color } from '@ambilight-taro/core'
import defaultsDeep from 'lodash.defaultsdeep'
import { AlContextValue } from './types'

const DefaultValue: AlContextValue = {
  colorScheme: Color.purple,
}

export const AlContext = createContext<AlContextValue>(DefaultValue)

export const useAlContext = () => {
  const context = useContext(AlContext)
  return useMemo<Required<AlContextValue>>(() => {
    return defaultsDeep(context, DefaultValue)
  }, [context])
}
