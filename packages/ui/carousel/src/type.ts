import { AlBaseFcProps, ValueOf } from '@ambilight-taro/core'

export const AlCarouselDirection = {
  vertical: 'vertical',
  horizontal: 'horizontal'
} as const

export type AlCarouselDirection = ValueOf<typeof AlCarouselDirection>

export const AlCarouselIndicatorVariant = {
  combine: 'combine',
  dot: 'dot',
  line: 'line',
  slider: 'slider'
} as const

export type AlCarouselIndicatorVariant = ValueOf<typeof AlCarouselIndicatorVariant>

export const AlCarouselIndicatorPosition = {
  bottom: 'bottom',
  left: 'left',
  bottomEnd: 'bottom-end',
  right: 'right',
  bottomStart: 'bottom-start',
  top: 'top'
} as const

export type AlCarouselIndicatorPosition = ValueOf<typeof AlCarouselIndicatorPosition>

export interface AlCarouselProps extends AlBaseFcProps {
  /**
   * 轮播方向
   * @default 'horizontal'
   */
  direction?: AlCarouselDirection
  /**
   * 指示器样式
   * @default 'dot'
   */
  indicatorVariant?: AlCarouselIndicatorVariant
  /**
   * 指示器位置
   * @default 'bottom'
   */
  indicatorPosition?: AlCarouselIndicatorPosition
  /**
   * 禁用指示器
   * @default false
   */
  indicatorDisabled?: boolean
  /**
   * 自动切换周期(ms)
   * - 0 代表无需自动切换
   * @default 0
   */
  duration?: number
  /**
   * 当前展示下标
   */
  value?: number
  /**
   * 当前展示下标（非受控，默认值）
   * @default 0
   */
  defaultValue?: number
  /**
   * 当前展示 index 变化事件
   */
  onChange?: (v: number) => void

  children?: React.ReactNode
}
