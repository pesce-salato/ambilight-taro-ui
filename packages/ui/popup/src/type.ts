import { AlBaseFcProps, EnumValueUnion } from '@ambilight-taro/core'
import { AlPortalProps } from '@ambilight-taro/portal'
import { ITouchEvent } from '@tarojs/components'

export enum AlPopupPosition {
  bottom = 'bottom',
  center = 'center',
  left = 'left',
  right = 'right',
  top = 'top'
}

export interface AlPopupProps extends AlBaseFcProps {
  visible?: boolean
  /**
   * @default 'bottom'
   */
  position?: EnumValueUnion<AlPopupPosition>
  /**
   * 是否开启安全边距
   * - position = 'bottom' -> ios bottom safe padding
   * - position = 'top' -> status bar safe padding
   * @default true
   */
  safePadding?: boolean
  /**
   * 遮罩点击事件
   */
  onMaskClick?: (event: ITouchEvent) => void

  children: React.ReactNode
  /**
   * 透传到 AlPortal 的 props
   */
  portalProps?: Omit<AlPortalProps, 'children'>
  /**
   * 是否开启 catchMove 配置，拦截点击滚动事件，避免出现滚动穿透
   * - 请在组件初始化的时候就配置好，动态改变可能不会有预期的效果
   * - 如果此时想要实现弹出内容滚动，则可以使用 ScrollView 来做滚动处理
   * @default true
   */
  catchMove?: boolean
  /**
   * is invoked by functional call
   * @private
   */
  _functionCall?: boolean
  /**
   * 弹出动画完成事件
   */
  onAppear?: () => void
  /**
   * 收起动画完成事件
   */
  onHide?: () => void
}
