import React, { useCallback, useEffect } from 'react'
import { View } from '@tarojs/components'
import { AlPortal } from '@ambilight-taro/portal'
import { classnames, withDefaultProps, sizeOf } from '@ambilight-taro/core'
import { AlBasicView } from '@ambilight-taro/basic-view'
import { AlToastPosition, AlToastProps } from './type'
import { root } from './bem'
import './index.scss'

const defaultProps = {
  duration: 3000,
  mask: false,
  visible: false,
  position: AlToastPosition.bottom as AlToastPosition,
  portalProps: {},
}

export const AlToast = (originalProps: AlToastProps) => {
  const props = withDefaultProps<AlToastProps, typeof defaultProps>(
    originalProps,
  )

  const {
    duration,
    visible,
    onClose,
    className,
    mask,
    style,
    label,
    icon,
    position,
    offset,
    portalProps,
  } = props

  useEffect(() => {
    if (!duration || !visible) return

    const durationTimer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(durationTimer)
  }, [duration, visible, onClose])

  const onTouchMove = useCallback(() => {
    return
  }, [])

  if (!visible) return <></>

  return (
    <AlPortal {...portalProps}>
      <AlBasicView
        className={classnames(
          root.className,
          className,
          root.status(position).className,
          {
            [root.status('blocking').className]: mask,
          },
        )}
        style={style}
        // open mask, catch all touch event, and forbidden scroll
        catchMove={mask}
        onTouchMove={mask ? onTouchMove : undefined}
      >
        <View
          className={root.hierarchies(['content']).className}
          style={{
            marginTop: sizeOf(offset || 0),
          }}
        >
          {!!icon && (
            <View className={root.hierarchies(['icon']).className}>{icon}</View>
          )}
          {!!label && (
            <View className={root.hierarchies(['label']).className}>
              {label}
            </View>
          )}
        </View>
      </AlBasicView>
    </AlPortal>
  )
}

AlToast.defaultProps = defaultProps
