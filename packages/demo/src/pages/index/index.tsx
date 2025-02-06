import React, { useEffect, useState } from 'react'
import { AlPageView } from '@ambilight-taro/page-view'
import { AlNavBar } from '@ambilight-taro/nav-bar'
import { AlTabBar } from '@ambilight-taro/tab-bar'
import { Bem, classnames } from '@ambilight-taro/core'
import { ScrollView, View } from '@tarojs/components'
import { Slogan } from '@/components/slogan'
import './index.scss'
import { Config } from './config'
import { AlToast } from '@ambilight-taro/toast'

const root = new Bem('page-index', undefined, undefined, false)
const card = root.hierarchies('card')

const SubPage = {
  component: 'component',
  about: 'about',
} as const

const SubPageMap = {}

export default () => {
  const [current, setCurrent] = useState<string>(SubPage.component)

  useEffect(() => {
    AlToast.show({ label: 'Hello world' })
  }, [])

  return (
    <AlPageView id="page-index" className={root.className}>
      <AlNavBar.Basic
        safePaddingForMenuButton
        className={root.hierarchies('nav-bar').className}
      >
        <View className={root.hierarchies('header').className}>
          <Slogan />
        </View>
      </AlNavBar.Basic>
      <View className={root.hierarchies('sub-page-area').className}>
        <ScrollView
          scrollY
          className={root.hierarchies('sub-page-scroll').className}
        >
          <View className={root.hierarchies('sub-page').className}>
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
      </View>
      <AlTabBar
        className={root.hierarchies('tab-bar').className}
        current={current}
        effect="scale"
        onTabClick={(_, which) => setCurrent(which.id)}
        tabs={[
          {
            id: SubPage.component,
            title: '预览',
            iconSource: {
              active:
                'https://cdn.salted-fish.org/al-mini-demo/preview-active.svg?v=1',
              inactive:
                'https://cdn.salted-fish.org/al-mini-demo/preview-inactive.svg?v=1',
            },
          },
          {
            id: SubPage.about,
            title: '关于',
            iconSource: {
              active: (
                <View
                  className={classnames(
                    root.hierarchies('about-icon').status('active').className,
                    root.hierarchies('about-icon').className,
                  )}
                >
                  A
                </View>
              ),
              inactive: (
                <View
                  className={classnames(
                    root.hierarchies('about-icon').status('inactive').className,
                    root.hierarchies('about-icon').className,
                  )}
                >
                  A
                </View>
              ),
            },
          },
        ]}
      />
    </AlPageView>
  )
}
