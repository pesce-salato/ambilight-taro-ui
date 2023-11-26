import React, { useMemo } from 'react'
import { useAlContext } from './value'
import { WithThemeProps } from './types'

export const useTheme = <T extends WithThemeProps>(props: T) => {
  const { colorScheme } = props
  const { colorScheme: globalColorScheme } = useAlContext()

  return useMemo<Required<WithThemeProps>>(
    () => ({
      colorScheme: colorScheme || globalColorScheme,
    }),
    [colorScheme, globalColorScheme],
  )
}
