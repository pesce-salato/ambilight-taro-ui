import React, { useEffect, useState } from 'react'
import { AlPageView } from '@ambilight-taro/page-view'
import { AlNavBar } from '@ambilight-taro/nav-bar'
import { AlTabBar } from '@ambilight-taro/tab-bar'
import { navigateTo } from '@tarojs/taro'
import { Bem, classnames } from '@ambilight-taro/core'
import { ScrollView, View } from '@tarojs/components'
import { Slogan } from '@/components/slogan'
import { AlToast } from '@ambilight-taro/toast'
import { AlDynamicRenderController } from '@ambilight-taro/dynamic-render-controller'
import PreviewActiveIcon from '@/resources/icon/preview-active.svg'
import PreviewInactiveIcon from '@/resources/icon/preview-inactive.svg'
import { usePresetCnDayRender } from '@ambilight-taro/calendar'
import dayjs from 'dayjs'
import { Config } from './config'
import './index.scss'

const root = new Bem('page-index', undefined, undefined, false)
const card = root.hierarchies('card')

const SubPage = {
  component: 'component',
  about: 'about'
} as const

export default () => {
  const [current, setCurrent] = useState<string>(SubPage.component)

  useEffect(() => {
    AlToast.show({ label: 'Hello world' })
    usePresetCnDayRender.preload([dayjs().year()])
  }, [])

  return (
    <AlPageView id="page-index" className={root.className}>
      <AlNavBar.Basic safePaddingForMenuButton className={root.hierarchies('nav-bar').className}>
        <View className={root.hierarchies('header').className}>
          <Slogan />
        </View>
      </AlNavBar.Basic>
      <View className={root.hierarchies('sub-page-area').className}>
        <ScrollView scrollY className={root.hierarchies('sub-page-scroll').className}>
          <View className={root.hierarchies('sub-page').className}>
            {Config.map((item, index) => (
              <View key={index} className={card.className}>
                <View className={card.hierarchies('title').className}>{item.title}</View>
                {item.components.map((componentDetail, componentIndex) => (
                  <View
                    className={card.hierarchies('item').className}
                    key={componentIndex}
                    onClick={() => navigateTo({ url: componentDetail.path })}
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
              active: PreviewActiveIcon,
              inactive: PreviewInactiveIcon
            }
          },
          {
            id: SubPage.about,
            title: '关于',
            iconSource: {
              active: (
                <View
                  className={classnames(
                    root.hierarchies('about-icon').status('active').className,
                    root.hierarchies('about-icon').className
                  )}
                >
                  A
                </View>
              ),
              inactive: (
                <View
                  className={classnames(
                    root.hierarchies('about-icon').status('inactive').className,
                    root.hierarchies('about-icon').className
                  )}
                >
                  A
                </View>
              )
            }
          }
        ]}
      />
      <AlDynamicRenderController />
    </AlPageView>
  )
}
