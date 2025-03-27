import { NavBar } from '@/components/nav-bar'
import { AlBasicView } from '@ambilight-taro/basic-view'
import { Bem, classnames } from '@ambilight-taro/core'
import { AlTabBar, AlTabBarEffect } from '@ambilight-taro/tab-bar'
import { ScrollView, View } from '@tarojs/components'
import { useState } from 'react'
import LoveInactive from '@/resources/icon/love-inactive.svg'
import LoveActive from '@/resources/icon/love-active.svg'
import { Card, CardItem } from '@/components/card'
import { CapsuleSelectorOfValue } from '@/components/capsule-selector-of-value'
import './index.scss'

const root = new Bem('page-tab-bar', undefined, undefined, false)

export default () => {
  const [current, setCurrent] = useState('0')
  const [effect, setEffect] = useState<AlTabBarEffect>()
  const [isOnlyShowIcon, setIsOnlyShowIcon] = useState(false)
  const [isUseUrlIcon, setIsUseUrlIcon] = useState(false)
  const [isUseRender, setIsUseRender] = useState(false)

  return (
    <AlBasicView className={root.className}>
      <NavBar>AlTabBar</NavBar>
      <ScrollView className={root.hierarchies('content').className} scrollY>
        <Card title="Config">
          <CardItem label="effect">
            <CapsuleSelectorOfValue
              style={{ width: '420rpx' }}
              options={[undefined, ...Object.values(AlTabBarEffect)]}
              optionDescGetter={(index) =>
                index === 0 ? 'undefined' : Object.values(AlTabBarEffect)[index - 1]
              }
              value={effect}
              onChange={setEffect}
            />
          </CardItem>
        </Card>
        <Card title="Demo">
          <CardItem label="是否只展示 Icon">
            <CapsuleSelectorOfValue
              style={{ width: '256rpx' }}
              options={[true, false]}
              optionDescGetter={(index) => ['是', '否'][index]}
              value={isOnlyShowIcon}
              onChange={setIsOnlyShowIcon}
            />
          </CardItem>
          <CardItem label="是否使用 Url Icon Source">
            <CapsuleSelectorOfValue
              style={{ width: '256rpx' }}
              options={[true, false]}
              optionDescGetter={(index) => ['是', '否'][index]}
              value={isUseUrlIcon}
              onChange={setIsUseUrlIcon}
            />
          </CardItem>
          <CardItem label="是否使用自定义 Render">
            <CapsuleSelectorOfValue
              style={{ width: '256rpx' }}
              options={[true, false]}
              optionDescGetter={(index) => ['是', '否'][index]}
              value={isUseRender}
              onChange={setIsUseRender}
            />
          </CardItem>
        </Card>
      </ScrollView>
      <AlTabBar
        className={root.hierarchies('tab-bar').className}
        effect={effect}
        tabs={[
          {
            id: '0',
            title: isOnlyShowIcon ? undefined : 'what',
            iconSource: {
              inactive: (
                <View
                  className={classnames(
                    root.hierarchies('text-icon').status('inactive').className,
                    root.hierarchies('text-icon').className
                  )}
                >
                  i
                </View>
              ),
              active: (
                <View
                  className={classnames(
                    root.hierarchies('text-icon').status('active').className,
                    root.hierarchies('text-icon').className
                  )}
                >
                  i
                </View>
              )
            }
          },
          {
            id: '1',
            title: isOnlyShowIcon ? undefined : 'a',
            iconSource: isUseUrlIcon
              ? {
                  inactive: LoveInactive,
                  active: LoveActive
                }
              : {
                  inactive: (
                    <View
                      className={classnames(
                        root.hierarchies('text-icon').status('inactive').className,
                        root.hierarchies('text-icon').className
                      )}
                    >
                      ❦
                    </View>
                  ),
                  active: (
                    <View
                      className={classnames(
                        root.hierarchies('text-icon').status('active').className,
                        root.hierarchies('text-icon').className
                      )}
                    >
                      ❦
                    </View>
                  )
                }
          },
          {
            id: '2',
            title: isOnlyShowIcon ? undefined : 'love',
            iconSource: {
              inactive: (
                <View
                  className={classnames(
                    root.hierarchies('text-icon').status('inactive').className,
                    root.hierarchies('text-icon').className
                  )}
                >
                  y
                </View>
              ),
              active: (
                <View
                  className={classnames(
                    root.hierarchies('text-icon').status('active').className,
                    root.hierarchies('text-icon').className
                  )}
                >
                  y
                </View>
              )
            }
          }
        ]}
        render={
          isUseRender
            ? (item, isActive) => (
                <View
                  className={classnames(root.hierarchies('custom-node').className, {
                    [root.hierarchies('custom-node').status('active').className]: isActive
                  })}
                >
                  <View className={root.hierarchies('custom-content').className}>{item.title}</View>
                </View>
              )
            : undefined
        }
        current={current}
        onTabClick={(_, which) => setCurrent(which.id)}
      />
    </AlBasicView>
  )
}
