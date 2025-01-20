import React from 'react'
import { AlPageView } from '@ambilight-taro/page-view'
import { AlNavBar } from '@ambilight-taro/nav-bar'
import { Bem } from '@ambilight-taro/core'
import { ScrollView, View } from '@tarojs/components'
import { Slogan } from '@/components/slogan'
import './index.scss'
import { Config } from './config'

const root = new Bem('page-index', undefined, undefined, false)
const card = root.hierarchies('card')

export default () => {
  return (
    <AlPageView id="index-page" className={root.className}>
      <ScrollView
        scrollY
        enhanced
        bounces={false}
        className={root.hierarchies('wrapper').className}
      >
        <AlNavBar.Basic
          safePaddingForMenuButton
          className={root.hierarchies('nav-bar').className}
        >
          <View className={root.hierarchies('header').className}>
            <Slogan />
          </View>
        </AlNavBar.Basic>
        <View className={root.hierarchies('content').className}>
          {Config.map((item, index) => (
            <View key={index} className={card.className}>
              <View className={card.hierarchies('title').className}>
                {item.title}
              </View>
              {item.components.map((componentDetail, componentIndex) => (
                <View
                  className={card.hierarchies('item').className}
                  key={componentIndex}
                >
                  {componentDetail.title}
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </AlPageView>
  )
}
