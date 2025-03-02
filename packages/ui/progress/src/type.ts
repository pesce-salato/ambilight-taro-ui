import { AlBaseFcProps } from '@ambilight-taro/core'

export interface AlProgressProps extends AlBaseFcProps {
  /**
   * 进度值（0-100）
   */
  value: number
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
}

export interface AlLinearProgressProps extends AlProgressProps {}

export interface AlCircularProgressProps extends AlProgressProps {
  /**
   * 圆形线宽与直径的比例
   * - 不直接设置线宽的原因在于 canvas 只接受 px 为单位，这样在不同设备上表现会出现差异
   * @default 0.05
   */
  thicknessRatio?: number
  /**
   * 进度条颜色
   * @default '#805AD5'
   */
  color?: string
  /**
   * 底部圆环颜色
   * @default undefined 不绘制环形底色
   */
  ringColor?: string
  /**
   * 是否顺时针
   * @default true
   */
  clockwise?: boolean
}
