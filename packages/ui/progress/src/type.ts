import { AlBaseFcProps } from '@ambilight-taro/core'

export interface AlProgressProps extends AlBaseFcProps {
  value: number
  animate?: boolean
}

export interface AlCircularProgressProps extends AlProgressProps {
  /**
   * 圆形线宽与直径的比例
   * - 不直接设置线宽的原因在于 canvas 只接受 px 为单位，这样在不同设备上表现会出现差异
   * @default 0.05
   */
  thicknessRatio?: number
  /**
   * @default '#805AD5'
   */
  color?: string
  /**
   * @default undefined 不绘制环形底色
   */
  ringColor?: string
  /**
   * 是否开启动画效果
   * @default true
   */
  withAnimation?: boolean
  /**
   * 动画周期（ms）
   * @default 240
   */
  animationDuration?: number
  /**
   * 是否顺时针
   * @default true
   */
  clockwise?: boolean
}
