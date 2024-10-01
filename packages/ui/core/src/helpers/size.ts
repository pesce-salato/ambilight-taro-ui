import Taro from '@tarojs/taro'
import { getUserDesign } from './environment'
import { System } from '../setting'

export const getRatio = () => {
  const { designWidth: userDesignWidth } = getUserDesign()

  return userDesignWidth / System.size.width
}

export const sizeOf = (size: number): string => {
  const { designWidth: reserveDesignWidth, deviceRatio: reserveDeviceRatio } =
    getUserDesign()

  // set to our system width
  Taro.initPxTransform({
    designWidth: System.size.width,
    deviceRatio: {
      [System.size.width]: 750 / System.size.width,
    },
  })
  // calc size
  const result = Taro.pxTransform(size)

  // recover
  Taro.initPxTransform({
    designWidth: reserveDesignWidth,
    deviceRatio: reserveDeviceRatio,
  })

  return result
}
