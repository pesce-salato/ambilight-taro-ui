import { View } from '@tarojs/components'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Taro from '@tarojs/taro'
import { AlBasicView } from '@ambilight-taro/basic-view'
import { withDefaultProps, classnames } from '@ambilight-taro/core'
import { useBottomSafePadding } from '@ambilight-taro/use-bottom-safe-padding'
import { AlPortal } from '@ambilight-taro/portal'
import { AlPopupPosition, AlPopupProps } from './type'
import { bem } from './bem'
import './index.scss'

const defaultProps = {
  visible: false,
  position: AlPopupPosition.bottom as AlPopupPosition,
  safePadding: true,
  catchMove: true,
  portalProps: {},
}

/**
 *
 * ScrollView 作为 content 的容器配合 catchMove 可以做到滚动穿透拦截
 * @param originalProps
 * @returns
 */
export const AlPopup = (originalProps: AlPopupProps) => {
  const props = withDefaultProps<AlPopupProps, typeof defaultProps>(
    originalProps,
  )
  const {
    className,
    catchMove,
    children,
    position,
    safePadding,
    visible,
    _functionCall,
    onAppear,
    onHide,
    onMaskClick,
    onMaskTouch,
    portalProps,
  } = props

  const [hasAppearedOnce, setHasAppearedOnce] = useState(false)
  const isInAnimation = useRef(false)

  useEffect(() => {
    if (visible) {
      setHasAppearedOnce(true)
    }
  }, [visible])

  const useAnimation = useMemo(
    () => _functionCall || visible || hasAppearedOnce,
    [_functionCall, hasAppearedOnce, visible],
  )

  const bottomSafePadding = useBottomSafePadding()
  const topSafePadding = useMemo(() => Taro.getWindowInfo().statusBarHeight, [])

  const contentWrapperStyle = useMemo(() => {
    let paddingTop: string = ''
    let paddingBottom: string = ''

    if (safePadding && position === AlPopupPosition.top) {
      paddingTop = `${topSafePadding}px`
    }

    if (safePadding && position === AlPopupPosition.bottom) {
      paddingBottom = `${bottomSafePadding}px`
    }

    return {
      paddingTop,
      paddingBottom,
    }
  }, [bottomSafePadding, position, safePadding, topSafePadding])

  const onAnimationEnd = useCallback(() => {
    if (isInAnimation.current) {
      if (visible) {
        onAppear?.()
      } else {
        onHide?.()
      }
    }

    isInAnimation.current = false
  }, [onAppear, onHide, visible])

  const onAnimationStart = useCallback(() => {
    if (isInAnimation.current) {
      if (visible) {
        onHide?.()
      } else {
        onAppear?.()
      }
    }

    isInAnimation.current = true
  }, [onAppear, onHide, visible])

  return (
    <AlPortal {...portalProps}>
      <AlBasicView
        className={classnames(
          className,
          bem.root.className,
          bem.root.status(position).className,
          {
            [bem.root.status('visible').className]: visible,
            [bem.root.status('use-animation').className]: useAnimation,
          },
        )}
        catchMove={catchMove || undefined}
      >
        <View
          className={bem.mask.className}
          onTouchStart={onMaskTouch}
          onClick={onMaskClick}
        />
        <View
          style={contentWrapperStyle}
          onAnimationStart={onAnimationStart}
          onAnimationEnd={onAnimationEnd}
          className={bem.content.className}
        >
          {children}
        </View>
      </AlBasicView>
    </AlPortal>
  )
}

AlPopup.defaultProps = defaultProps
