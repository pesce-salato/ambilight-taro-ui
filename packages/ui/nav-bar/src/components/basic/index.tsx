import React, { useMemo } from 'react'
import { getMenuButtonBoundingClientRect, getEnv, ENV_TYPE } from '@tarojs/taro'
import { AlBasicView } from '@ambilight-taro/basic-view'
import { AlSettings, classnames, sizeOf } from '@ambilight-taro/core'
import { View } from '@tarojs/components'
import { root } from '../../utils/bem'
import { AlNavBarBasicProps } from '../../type'
import { useStatusHeight } from '../../utils/use-status-height'
import './index.scss'

export const AlNavBarBasic = (props: AlNavBarBasicProps) => {
  const { className, style, children, safePaddingForMenuButton, id } = props

  const menuButtonDetail = useMemo(() => {
    let rect = { left: 0, right: 0, top: 0, height: 0 }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ([ENV_TYPE.TT, ENV_TYPE.WEAPP].includes(getEnv() as any)) {
      rect = getMenuButtonBoundingClientRect()
    } else {
      console.warn('Taro.getMenuButtonBoundingClientRect dose not support in current env')
      return
    }

    const systemWidth = sizeOf(AlSettings.System.size.width)

    return {
      rect,
      distance: {
        right: `calc(2 * ${systemWidth} - ${rect.left}px - ${rect.right}px)`,
        left: `calc(${systemWidth} - ${rect.right}px)`
      }
    }
  }, [])

  const statusHeight = useStatusHeight()

  const rootStyle = useMemo<React.CSSProperties | string>(() => {
    if (typeof style === 'string') {
      let result: string = style

      result = `padding-top: ${statusHeight}px;` + result

      if (safePaddingForMenuButton && menuButtonDetail?.distance) {
        result =
          `padding-right: ${menuButtonDetail.distance.right};padding-left: ${menuButtonDetail.distance.left};` +
          result
      }

      return result
    }

    return {
      paddingTop: `${statusHeight}px`,
      ...(safePaddingForMenuButton && menuButtonDetail?.distance
        ? {
            paddingRight: menuButtonDetail.distance.right,
            paddingLeft: menuButtonDetail.distance.left
          }
        : {}),
      ...style
    }
  }, [style, statusHeight, safePaddingForMenuButton, menuButtonDetail])

  const contentHeight = useMemo(() => {
    if (statusHeight && menuButtonDetail?.rect) {
      return `${(menuButtonDetail.rect.top - statusHeight) * 2 + menuButtonDetail.rect.height}px`
    }

    return
  }, [statusHeight, menuButtonDetail])

  return (
    <AlBasicView className={classnames(className, root.className)} style={rootStyle} id={id}>
      <View className={root.hierarchies('content').className} style={{ height: contentHeight }}>
        {children}
      </View>
    </AlBasicView>
  )
}
