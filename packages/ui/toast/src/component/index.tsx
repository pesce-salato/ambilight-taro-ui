// eslint-disable-next-line import/default
import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import { AlPortal } from '@ambilight-taro/portal'
import { classnames, withDefaultProps, sizeOf, EnumValueUnion } from '@ambilight-taro/core'
import { AlBasicView } from '@ambilight-taro/basic-view'
import { AlToastPosition, AlToastProps } from '../type'
import { root } from './bem'
import './index.scss'

const defaultProps = {
  duration: 3000,
  mask: false,
  visible: false,
  position: AlToastPosition.bottom as EnumValueUnion<AlToastPosition>,
  portalProps: {}
}

export const AlToast = (originalProps: AlToastProps) => {
  const props = withDefaultProps<AlToastProps, typeof defaultProps>(originalProps)

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
    portalProps
  } = props

  useEffect(() => {
    if (!duration || !visible) return

    const durationTimer = setTimeout(() => {
      onClose?.()
    }, duration)

    return () => clearTimeout(durationTimer)
  }, [duration, visible, onClose])

  if (!visible) return <></>

  return (
    <AlPortal {...portalProps}>
      <AlBasicView
        className={classnames(root.className, className, root.status(position).className, {
          [root.status('blocking').className]: mask
        })}
        style={style}
        catchMove={mask || undefined}
      >
        <View className={root.hierarchies(['anchor']).className}>
          <View
            className={root.hierarchies(['content']).className}
            style={{
              transform: `translateY(${sizeOf(offset || 0)})`
            }}
          >
            {!!icon && <View className={root.hierarchies(['icon']).className}>{icon}</View>}
            {!!label && <View className={root.hierarchies(['label']).className}>{label}</View>}
          </View>
        </View>
      </AlBasicView>
    </AlPortal>
  )
}

AlToast.defaultProps = defaultProps
