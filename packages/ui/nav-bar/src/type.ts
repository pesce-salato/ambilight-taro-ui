import { AlBaseFcProps } from '@ambilight-taro/core'
import React from 'react'

export interface AlNavBarBasicProps extends AlBaseFcProps {
  children?: React.ReactNode
  /**
   * auto add right safe padding for menu button place
   * @requires Taro.getMenuButtonBoundingClientRect() support https://docs.taro.zone/docs/apis/ui/menu/getMenuButtonBoundingClientRect
   */
  safePaddingForMenuButton?: boolean
}
