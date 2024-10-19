import { ValueOf } from '@ambilight-taro/core'

export interface AlToastProps {
  visible: boolean
  icon?: React.ReactNode
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
   * after set duration time, onClose event will be invoked
   */
  onClose: () => void
  /**
   * use mask to catch click/move event, forbidden to interact with the page content
   * @default false
   */
  mask?: boolean
  className?: string
  style?: React.CSSProperties
  /**
   * offset in vertical (base in 750px width design)
   */
  offset?: number
}

export const AlToastPosition = {
  top: 'top',
  center: 'center',
  bottom: 'bottom',
} as const

export type AlToastPosition = ValueOf<typeof AlToastPosition>
