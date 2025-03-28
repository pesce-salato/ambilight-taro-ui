import React, { useMemo } from 'react'
import { AlPageView } from '@ambilight-taro/page-view'
import { AlNavBar, AlNavBarPopPresetTrigger } from '@ambilight-taro/nav-bar'
import { Bem, uuid } from '@ambilight-taro/core'
import { Image, ScrollView, View } from '@tarojs/components'
import './index.scss'

const root = new Bem('page-nav-bar-pop', undefined, undefined, false)

export default () => {
  const observeId = useMemo(() => uuid(root.className), [])

  return (
    <AlPageView id="nav-bar-pop-page" className={root.className}>
      <ScrollView
        scrollY
        enhanced
        bounces={false}
        className={root.hierarchies('wrapper').className}
      >
        <AlNavBar.Pop
          observeElementId={observeId}
          trigger={AlNavBarPopPresetTrigger.bottomIntersectBottom}
          basicProps={{
            safePaddingForMenuButton: true,
            className: root.hierarchies('nav-bar').className
          }}
          period={120}
        >
          <View className={root.hierarchies('header').className}>
            <View className={root.hierarchies('search-bar').className}>
              这是一个虚假的毫无意义的搜索框
            </View>
          </View>
        </AlNavBar.Pop>
        <View id={observeId} className={root.hierarchies('before').className}>
          于暴雨中行走，伞是倒挂天空的船
        </View>
        <View className={root.hierarchies('after').className}>
          <Image
            className={root.hierarchies('image').className}
            src="https://cdn.salted-fish.org/ambilight-taro/demo/rain.svg"
          />
        </View>
      </ScrollView>
    </AlPageView>
  )
}
