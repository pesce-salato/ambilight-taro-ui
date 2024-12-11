import React, { useMemo } from 'react'
import { View, ViewProps } from '@tarojs/components'
import { sizeOf, cssVar, AlSettings } from '@ambilight-taro/core'

export const AlBasicView = (props: ViewProps) => {
  const appWidthValue = useMemo(() => sizeOf(AlSettings.System.size.width), [])

  const { style: _style, ...others } = props

  const style = useMemo(() => {
    const appWidthCssVarName = cssVar('app-width')
    return typeof _style === 'string'
      ? _style + `${appWidthCssVarName}: ${appWidthValue};`
      : {
          ..._style,
          [appWidthCssVarName]: `${appWidthValue}`,
        }
  }, [_style, appWidthValue])

  return <View style={style} {...others} />
}
