import { AlBaseFcProps } from '@ambilight-taro/core'

export interface AlPickerOption {
  content: React.ReactNode
  id: string
}

export interface AlPickerProps extends AlBaseFcProps {
  /**
   * 选项信息
   */
  options: AlPickerOption[]
  /**
   * 选中值 下标索引
   */
  value?: string
  /**
   * 默认值下标
   */
  defaultValue?: string
  /**
   * 值改变事件
   */
  onChange?: (value: string) => void
}
