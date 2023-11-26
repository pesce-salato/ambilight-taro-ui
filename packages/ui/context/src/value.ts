import { createContext, useContext } from 'react'
import { Color } from '@/core'
import { AlContextValue } from './types'

const DefaultValue: AlContextValue = {
  colorScheme: Color.purple,
}

export const AlContext = createContext<AlContextValue>(DefaultValue)

export const useAlContext = () => {
  return useContext(AlContext) || (DefaultValue as Required<AlContextValue>)
}
