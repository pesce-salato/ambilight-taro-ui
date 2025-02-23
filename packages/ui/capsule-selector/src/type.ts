import { AlBaseFcProps, ValueOf } from '@ambilight-taro/core'

export const AlCapsuleSelectorTheme = {
  gray: 'gray',
  brand: 'brand'
} as const

export type AlCapsuleSelectorTheme = ValueOf<typeof AlCapsuleSelectorTheme>

export interface AlCapsuleSelectorProps extends AlBaseFcProps {
  /**
   * 主题
   * @default 'gray'
   */
  theme?: AlCapsuleSelectorTheme
  defaultValue?: number
  value?: number
  onChange?: (value: number) => void
  children: React.ReactNode
}
