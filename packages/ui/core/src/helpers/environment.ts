import Taro from '@tarojs/taro'

/**
 * 获取用户设计信息
 */
export const getUserDesign = () => {
  // 从taro中获取之前已经设置的配置，存留待恢复
  const { designWidth, deviceRatio } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Taro as any).config || {}

  return {
    designWidth,
    deviceRatio
  }
}
