import { AlBaseFcProps, EnumValueUnion } from '@ambilight-taro/core'

export enum AlCapsuleSelectorTheme {
  gray = 'gray',
  brand = 'brand'
}

export enum AlCapsuleSelectorSize {
  md = 'md',
  sm = 'sm'
}

export interface AlCapsuleSelectorProps extends AlBaseFcProps {
  /**
   * 主题
   * @default 'gray'
   */
  theme?: EnumValueUnion<AlCapsuleSelectorTheme>
  /**
   * 尺寸
   * @default 'md'
   */
  size?: EnumValueUnion<AlCapsuleSelectorSize>

  defaultValue?: number
  value?: number
  onChange?: (value: number) => void
  children: React.ReactNode
}
