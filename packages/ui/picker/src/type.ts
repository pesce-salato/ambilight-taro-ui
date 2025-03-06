import { AlBaseFcProps } from '@ambilight-taro/core'

export interface AlPickerOption {
  /**
   * 选项渲染内容
   */
  content: React.ReactNode
  /**
   * 选项 id
   */
  id: string
}

export interface AlPickerProps extends AlBaseFcProps {
  /**
   * 选项信息
   */
  options: AlPickerOption[]
  /**
   * 选中值 id
   */
  value?: string
  /**
   * 默认选中值 id
   */
  defaultValue?: string
  /**
   * 选中值改变事件
   */
  onChange?: (value: string) => void
}
