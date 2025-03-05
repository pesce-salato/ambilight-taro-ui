import { AlBaseFcProps, ValueOf } from '@ambilight-taro/core'

export const AlCapsuleSelectorTheme = {
  gray: 'gray',
  brand: 'brand'
} as const

export type AlCapsuleSelectorTheme = ValueOf<typeof AlCapsuleSelectorTheme>

export const AlCapsuleSelectorSize = {
  md: 'md',
  sm: 'sm'
} as const

export type AlCapsuleSelectorSize = ValueOf<typeof AlCapsuleSelectorSize>

export interface AlCapsuleSelectorProps extends AlBaseFcProps {
  /**
   * 主题
   * @default 'gray'
   */
  theme?: AlCapsuleSelectorTheme
  /**
   * 尺寸
   * @default 'md'
   */
  size?: AlCapsuleSelectorSize

  defaultValue?: number
  value?: number
  onChange?: (value: number) => void
  children: React.ReactNode
}
