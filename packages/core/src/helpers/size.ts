import Taro from '@tarojs/taro'
import { getUserDesign } from './env'
import { Setting } from '../setting'

export const sizeOf = (size: number): string => {
  // 从taro中获取之前已经设置的配置，存留待恢复
  const { designWidth: reserveDesignWidth, deviceRatio: reserveDeviceRatio } =
    getUserDesign()

  console.error(reserveDesignWidth, reserveDeviceRatio)
  // 切换到系统设计宽度
  Taro.initPxTransform({
    designWidth: Setting.size.systemDesignWidth,
    deviceRatio: {
      [Setting.size.systemDesignWidth]: 750 / Setting.size.systemDesignWidth,
    },
  })
  const result = Taro.pxTransform(size)

  // 恢复 px 设置，防止干扰用户设置的值
  Taro.initPxTransform({
    designWidth: reserveDesignWidth,
    deviceRatio: reserveDeviceRatio,
  })

  return result
}
