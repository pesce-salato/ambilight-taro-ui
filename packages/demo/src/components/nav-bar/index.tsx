import { ReactNode } from 'react'
import { AlNavBar } from '@ambilight-taro/nav-bar'
import { Image, View } from '@tarojs/components'
import BackIcon from '@/resources/icon/back.svg'
import { Bem } from '@ambilight-taro/core'
import './index.scss'

const root = new Bem('nav-bar', undefined, undefined, false)

export interface NavBarProps {
  children?: ReactNode
}

export const NavBar = (props: NavBarProps) => {
  return (
    <AlNavBar.Basic className={root.className} safePaddingForMenuButton>
      <View className={root.hierarchies('content').className}>
        <Image src={BackIcon} className={root.hierarchies('back').className} />
        {props.children}
      </View>
    </AlNavBar.Basic>
  )
}
