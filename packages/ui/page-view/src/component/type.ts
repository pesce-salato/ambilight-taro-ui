import { ViewProps } from '@tarojs/components'

export interface AlPageViewProps extends ViewProps {
  children: React.ReactNode
  /**
   * interact controller id
   */
  interactControllerId?: string
}
