import Taro from '@tarojs/taro'
import { getUserDesign } from './environment'
import { Setting } from '../setting'

export const getRatio = () => {
  const { designWidth: userDesignWidth } = getUserDesign()

  return userDesignWidth / Setting.system.size.width
}

export const sizeOf = (size: number): string => {
  // 从taro中获取之前已经设置的配置，存留待恢复
  const { designWidth: reserveDesignWidth, deviceRatio: reserveDeviceRatio } =
    getUserDesign()

  console.error(reserveDesignWidth, reserveDeviceRatio)
  // 切换到系统设计宽度
  Taro.initPxTransform({
    designWidth: Setting.system.size.width,
    deviceRatio: {
      [Setting.system.size.width]: 750 / Setting.system.size.width,
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
