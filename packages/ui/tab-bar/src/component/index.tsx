// eslint-disable-next-line import/default
import React, { Fragment, useCallback, useEffect, useMemo, useRef } from 'react'
import { Image, View } from '@tarojs/components'
import { classnames } from '@ambilight-taro/core'
import { AlTabBarItem, AlTabBarProps } from '../type'
import { bem } from './bem'
import './index.scss'

export const AlTabBar = (props: AlTabBarProps) => {
  const { id, className, style, tabs, onTabClick, effect, render, current } = props
  // 用作标识是否已经渲染了一次，避免初始渲染就开启了动画效果
  const hasRenderedOnce = useRef(false)

  useEffect(() => {
    hasRenderedOnce.current = true
  }, [])

  const itemRender = useCallback(
    (item: AlTabBarItem) => {
      const isActive = current === item.id

      return (
        <View
          onClick={(event) => onTabClick?.(event, item)}
          className={classnames(bem.item.className, {
            [bem.item.status('active').className]: isActive
          })}
        >
          {render ? (
            render(item)
          ) : (
            <>
              <View className={bem.iconAnchor.className}>
                <View
                  className={classnames(
                    bem.iconWrapper.className,
                    bem.iconWrapper.status('active').className
                  )}
                >
                  {typeof item.iconSource?.active === 'string' ? (
                    <Image src={item.iconSource.active} className={bem.icon.className} />
                  ) : (
                    item.iconSource?.active
                  )}
                </View>
                <View
                  className={classnames(
                    bem.iconWrapper.className,
                    bem.iconWrapper.status('inactive').className
                  )}
                >
                  {typeof item.iconSource?.inactive === 'string' ? (
                    <Image src={item.iconSource.inactive} className={bem.icon.className} />
                  ) : (
                    item.iconSource?.inactive
                  )}
                </View>
              </View>
              <View className={bem.title.className}>{item.title}</View>
            </>
          )}
        </View>
      )
    },
    [render, onTabClick, current]
  )

  // 只有在 活跃 id 改变的时候才会去计算是否使用预设动画
  // 避免初次渲染组件活跃态动画起作用
  const usePresetAnimation = useMemo(() => {
    return hasRenderedOnce.current
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  return (
    <View
      className={classnames(bem.root.className, className, {
        [bem.root.status(effect || '').className]: effect && usePresetAnimation
      })}
      id={id}
      style={style}
    >
      {tabs.map((item) => (
        <Fragment key={item.id}>{itemRender(item)}</Fragment>
      ))}
    </View>
  )
}
