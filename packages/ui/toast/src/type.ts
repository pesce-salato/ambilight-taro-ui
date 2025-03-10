import { AlBaseFcProps, ValueOf } from '@ambilight-taro/core'
import { AlPortalProps } from '@ambilight-taro/portal'

export interface AlToastProps extends AlBaseFcProps {
  /**
   * 是否可见
   */
  visible: boolean
  /**
   * 图标
   */
  icon?: React.ReactNode
  /**
   * 内容标签
   */
  label?: React.ReactNode
  /**
   * @default 'bottom'
   */
  position?: AlToastPosition
  /**
   * @default 3000 ms
   */
  duration?: number
  /**
   * 自动关闭事件（duration 时间结束后调用）
   */
  onClose?: () => void
  /**
   * 是否使用遮罩去拦截点击、滑动事件，避免与页面内容交互
   * @default false
   */
  mask?: boolean
  /**
   * y 轴偏移值（基于整体宽度 750 的设计稿下的尺寸）
   */
  offset?: number
  /**
   * 透传到 AlPortal 的 props
   */
  portalProps?: Omit<AlPortalProps, 'children'>
}

export const AlToastPosition = {
  top: 'top',
  center: 'center',
  bottom: 'bottom'
} as const

export type AlToastPosition = ValueOf<typeof AlToastPosition>
