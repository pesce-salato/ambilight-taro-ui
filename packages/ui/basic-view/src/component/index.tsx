import React, { useMemo } from 'react'
import { View, ViewProps } from '@tarojs/components'
import { sizeOf, cssVar, AlSettings, Cache, Bem } from '@ambilight-taro/core'

const root = new Bem('basic-view')

export const AlBasicView = (props: ViewProps) => {
  const systemDesignWidth = useMemo(() => {
    const cacheKey = `${root.className}/width-css-var`
    const cache = Cache.app.get(cacheKey)

    if (cache) {
      return cache
    } else {
      // save to cache, forbidden to waste time
      const widthCssVarValue = sizeOf(AlSettings.System.size.width)
      Cache.app.set(cacheKey, widthCssVarValue)

      return widthCssVarValue
    }
  }, [])

  const { style: _style, ...others } = props

  const style = useMemo(() => {
    const appWidthCssVarName = cssVar('app-width')
    return typeof _style === 'string'
      ? _style + `${appWidthCssVarName}: ${systemDesignWidth};`
      : {
          ..._style,
          [appWidthCssVarName]: `${systemDesignWidth}`,
        }
  }, [_style, systemDesignWidth])

  return <View style={style} {...others} />
}
