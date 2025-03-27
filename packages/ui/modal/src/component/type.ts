import { AlBaseFcProps } from '@ambilight-taro/core'
import { type AlPortalProps } from '@ambilight-taro/portal'

export interface AlModalProps extends AlBaseFcProps {
  title?: React.ReactNode
  visible?: boolean
  /**
   * whether clicking on the mask will call onClose event
   * @default true
   */
  maskClosable?: boolean
  /**
   * on modal close, it will invoked when mask click or close button click
   */
  onClose?: () => void
  /**
   * whether to show the prefab close button
   * @default true
   */
  showCloseButton?: boolean
  /**
   * catch move/scroll event
   * @default true
   */
  catchMove?: boolean
  /**
   * whether open the ios bottom safe padding
   * @default true
   */
  safePadding?: boolean

  _onAnimationEnd?: () => void

  _functionCall?: boolean

  children?: React.ReactNode

  portalProps?: AlPortalProps
}
