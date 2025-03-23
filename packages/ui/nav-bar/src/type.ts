import React from 'react'
import { AlBaseFcProps } from '@ambilight-taro/core'
import { NodesRef } from '@tarojs/taro'

export interface AlNavBarBasicProps extends AlBaseFcProps {
  children?: React.ReactNode
  /**
   * 是否自动根据胶囊位置，自动为内容区域添加安全边距
   * @requires Taro.getMenuButtonBoundingClientRect support https://docs.taro.zone/docs/apis/ui/menu/getMenuButtonBoundingClientRect
   * @default false
   */
  safePaddingForMenuButton?: boolean
  /**
   * 组件根节点 Id
   */
  id?: string
}

export type AlNavBarPopTrigger = (
  elementRect: NodesRef.BoundingClientRectCallbackResult,
  navBarRect: NodesRef.BoundingClientRectCallbackResult
) => boolean

export interface AlNavBarPopProps extends AlBaseFcProps {
  basicProps?: Omit<AlNavBarBasicProps, 'children'>

  children?: React.ReactNode

  /**
   * 需要观察其位置变化的元素 id
   */
  observeElementId: string

  /**
   * 触发器
   * @param elementRect
   * @param navBarRect 默认我们认为 nav bar 高度是固定的，只会在初始化时获取一次（如果出现改变，请调用 `ref.requeryComponent`，主动驱使组件更新 navBarRect）
   * @returns
   * - `true` nav bar 弹出
   * - `false` nav bar 隐藏
   */
  trigger: AlNavBarPopTrigger

  /**
   * 是否交由系统去自动周期（使用 period 为周期）轮询 observeElement 的信息
   * - `true`，系统自动轮询（页面隐藏时将会自动关闭查询）
   * - `false`，则需要用户调用 `ref.queryObserveElement 方法`，主动驱动组件去查询
   * @default true
   */
  autoObserve?: boolean

  /**
   * 实时获取位置周期，单位 ms，（可根据需求降低或者提升周期）
   * @default 240
   */
  period?: number

  id?: string
}

export interface AlNavBarPopReference {
  queryObserveElement: () => void
  requeryComponent: () => void
}
