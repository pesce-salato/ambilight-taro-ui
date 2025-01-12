import React from 'react'
import { Bem, classnames, withDefaultProps } from '@ambilight-taro/core'
import { AlPopup, AlPopupPosition } from '@ambilight-taro/popup'
import { View } from '@tarojs/components'
import { AlCloseCircleIcon } from '@ambilight-taro/icon'
import { AlModalProps } from './type'
import './index.scss'

const root = new Bem('modal')

const defaultProps = {
  maskClosable: true,
  safePadding: true,
  showCloseButton: true,
}

export const AlModal = (originalProps: AlModalProps) => {
  const props = withDefaultProps<AlModalProps, typeof defaultProps>(
    originalProps,
  )

  const {
    maskClosable,
    onClose,
    visible,
    catchMove,
    className,
    style,
    safePadding,
    title,
    children,
    showCloseButton,
    _onAnimationEnd,
    _functionCall,
  } = props

  return (
    <AlPopup
      visible={visible}
      style={style}
      safePadding={safePadding}
      catchMove={catchMove}
      position={AlPopupPosition.bottom}
      contentWrapperProps={{
        className: root.hierarchies('content-wrapper').className,
      }}
      className={classnames(root.className, className)}
      onMaskClick={() => {
        if (maskClosable) {
          onClose?.()
        }
      }}
      _functionCall={_functionCall}
      onHide={_onAnimationEnd}
    >
      {title && (
        <View className={root.hierarchies('title').className}>{title}</View>
      )}
      {showCloseButton && (
        <View
          className={root.hierarchies('close-button').className}
          onClick={onClose}
        >
          <AlCloseCircleIcon />
        </View>
      )}
      {children}
    </AlPopup>
  )
}

AlModal.defaultProps = defaultProps
