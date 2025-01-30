import { AlBaseFcProps, ValueOf } from '@ambilight-taro/core'
import { AlPortalProps } from '@ambilight-taro/portal'
import { CommonEventFunction, ITouchEvent } from '@tarojs/components'

export const AlPopupPosition = {
  bottom: 'bottom',
  center: 'center',
  left: 'left',
  right: 'right',
  top: 'top',
} as const

export type AlPopupPosition = ValueOf<typeof AlPopupPosition>

export interface AlPopupProps extends AlBaseFcProps {
  visible?: boolean
  /**
   * @default 'bottom'
   */
  position?: AlPopupPosition
  /**
   * whether open the auto safe padding
   * - position = 'bottom' -> ios bottom safe padding
   * - position = 'top' -> status bar safe padding
   * @default true
   */
  safePadding?: boolean
  /**
   * mask click event
   */
  onMaskClick?: (event: ITouchEvent) => void
  /**
   * mask touch event
   */
  onMaskTouch?: CommonEventFunction

  children: React.ReactNode

  portalProps?: Omit<AlPortalProps, 'children'>
  /**
   * whether to catch move, forbidden the rolling penetration of mask touch move
   * - it should be set during component initialization, and not suppose to be changed
   * @default true
   */
  catchMove?: boolean
  /**
   * is invoked by functional call
   * @private
   */
  _functionCall?: boolean
  /**
   * after appear animation end
   */
  onAppear?: () => void
  /**
   * after hide animation end
   */
  onHide?: () => void
}
