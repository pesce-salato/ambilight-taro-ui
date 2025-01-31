import { AlBaseFcProps, ValueOf } from '@ambilight-taro/core'
import { ITouchEvent } from '@tarojs/components'
import React from 'react'

export interface AlTabBarProps extends AlBaseFcProps {
  id?: string
  /**
   * 当前活跃的 tab
   */
  current: string
  /**
   * tab 点击回调事件
   * @param event 事件对象
   * @param which 哪一个 tab 被点击
   */
  onTabClick?: (event: ITouchEvent, which: AlTabBarItem) => void
  /**
   * tab 渲染配置
   */
  tabs: AlTabBarItem[]
  /**
   * 激活态切换效果
   */
  effect?: AlTabBarEffect
  /**
   * item 自定义渲染器
   */
  render?: (item: AlTabBarItem) => React.ReactNode
}

export const AlTabBarEffect = {
  pop: 'pop',
  scale: 'scale',
} as const

export type AlTabBarEffect = ValueOf<typeof AlTabBarEffect>

export interface AlTabBarItem {
  id: string
  /**
   * tab 标题
   */
  title?: React.ReactNode
  /**
   * tab icon 源
   */
  iconSource?: {
    /**
     * 激活态
     * - typeof string -> url 将使用 image 自动渲染
     * - others -> 视作 react node 节点直接渲染
     */
    active: React.ReactNode
    /**
     * 非激活态
     * - typeof string -> url 将使用 image 自动渲染
     * - others -> 视作 react node 节点直接渲染
     */
    inactive: React.ReactNode
  }
}
